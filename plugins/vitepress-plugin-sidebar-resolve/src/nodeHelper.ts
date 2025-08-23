import { existsSync, readFileSync, statSync } from "fs";
import { join } from "path";
import { getTitleFromMarkdown } from "./utils";
import matter from "gray-matter";

/**
 * 解析文件名，返回文件序号、文件标题、文件类型
 * @param filename 文件名
 * @param filePath 文件绝对路径
 */
export const resolveFileName = (filename: string, filePath: string, separator: string = ".") => {
  // 检查文件是否存在
  if (!existsSync(filePath)) return { index: "", title: filename, type: "", name: filename };

  const stat = statSync(filePath);

  /**
   * 文件名解析逻辑：
   * 1. 点(.)分隔符逻辑始终存在：
   *    - 01.ke.md -> { index: "01", title: "ke", type: "md", name: "01.ke" }
   *    - ke.md -> { index: "ke", title: "ke", type: "md", name: "ke" }
   *    - index.md -> { index: "0", title: "index", type: "md", name: "index" }
   *
   * 2. 自定义分隔符(_)额外支持：
   *    - 01_ke.md -> { index: "01", title: "ke", type: "md", name: "01_ke" }
   *    - a_b.md -> { index: "", title: "a_b", type: "md", name: "a_b" } (不含数字前缀，不处理)
   *    - 01.a_b.md -> { index: "01", title: "a_b", type: "md", name: "01.a_b" } (仍使用点分隔符)
   *    - 01_a_b.md -> { index: "01", title: "a_b", type: "md", name: "01_a_b" } (自定义分隔符)
   */

  // 处理自定义分隔符
  if (separator !== "." && isExtraSeparator(filename, separator)) {
    return parseExtraSeparator(filename, stat.isDirectory(), separator);
  }

  // 处理点(.)分隔符
  if (filename.includes(".")) {
    return parseDotSeparator(filename, stat.isDirectory());
  }

  // 无分隔符情况
  return { index: "", title: filename, type: "", name: filename };
};

/**
 * 使用点分隔符解析文件名
 */
const parseDotSeparator = (filename: string, isDirectory: boolean) => {
  const parts = filename.split(".");

  if (parts.length === 2) {
    // 简单情况：name.ext 或 index.md
    const index = parts[0] === "index" ? "0" : parts[0];
    const title = isDirectory ? parts[1] : parts[0];
    const type = isDirectory ? "" : parts[1];
    const name = parts[0];

    return { index, title, type, name };
  } else {
    // 复杂情况：01.name.ext
    const firstDotIndex = filename.indexOf(".");
    const lastDotIndex = filename.lastIndexOf(".");
    const index = filename.substring(0, firstDotIndex);

    // 对于文件，需要处理扩展名，对于目录，则不处理
    const title = filename.substring(firstDotIndex + 1, lastDotIndex);
    const type = isDirectory ? "" : filename.substring(lastDotIndex + 1);
    const name = isDirectory ? filename : filename.substring(0, lastDotIndex);

    return { index, title, type, name };
  }
};

/**
 * 检查是否符合自定义分隔符模式：数字开头 + 自定义分隔符 + 内容（对于目录）或内容 + . + 扩展名（对于文件）
 */
const isExtraSeparator = (filename: string, separator: string) => {
  // 必须包含自定义分隔符
  if (!filename.includes(separator)) return false;

  const parts = filename.split(separator, 2);
  // 第一部分必须是数字
  if (!/^\d+$/.test(parts[0])) return false;

  return true;
};

/**
 * 解析符合自定义分隔符模式的文件名或目录名
 */
const parseExtraSeparator = (filename: string, isDirectory: boolean, separator: string) => {
  const firstSeparatorIndex = filename.indexOf(separator);
  const lastDotIndex = filename.lastIndexOf(".");
  const index = filename.substring(0, firstSeparatorIndex);

  // 对于文件，需要处理扩展名，对于目录，则不处理
  const title = isDirectory
    ? filename.substring(firstSeparatorIndex + 1)
    : filename.substring(firstSeparatorIndex + 1, lastDotIndex);
  const type = isDirectory ? "" : filename.substring(lastDotIndex + 1);
  const name = isDirectory ? filename : filename.substring(0, lastDotIndex);

  return { index, title, type, name };
};

/**
 * 按顺序从该目录下的 [index.md, 目录名.md] 文件获取数据
 * @param root 目录绝对路径
 * @param dirOrFilename 文件夹名
 */
export const getInfoFromMarkdownDir = (root: string, dirOrFilename: string) => {
  const state = {
    title: undefined as string | undefined,
    sort: undefined as number | undefined,
    prefix: "",
    suffix: "",
  };

  const filePaths = [
    join(root, dirOrFilename, "index.md"),
    join(root, dirOrFilename, "index.MD"),
    join(root, dirOrFilename, dirOrFilename + ".md"),
  ];

  for (const filePath of filePaths) {
    if (!existsSync(filePath)) continue;

    const content = readFileSync(filePath, "utf-8");
    const { data: { title, sidebarSort, sidebarPrefix, sidebarSuffix } = {}, content: mdContent } = matter(content, {});
    const t = title || getTitleFromMarkdown(mdContent);

    if (!state.title) state.title = t;
    if (!state.sort) state.sort = sidebarSort;
    if (!state.prefix) state.prefix = sidebarPrefix;
    if (!state.suffix) state.suffix = sidebarSuffix;
  }

  return state;
};
