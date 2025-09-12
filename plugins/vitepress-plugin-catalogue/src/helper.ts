import type { CatalogueInfo, CatalogueItem, CatalogueOption } from "./types";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { basename, extname, join, resolve } from "node:path";
import matter from "gray-matter";
import { getTitleFromMarkdown, isIllegalIndex, isMarkdownFile, isSome, removeMarkdownExt } from "./util";

interface VitePressConfig {
  rewrites?: Record<string, string>;
  cleanUrls?: boolean;
}

// 默认忽略的文件夹列表
export const DEFAULT_IGNORE_DIR = ["node_modules", "dist", ".vitepress", "public"];

// 目录页数据
const catalogueInfo: CatalogueInfo[] = [];

export default (option: CatalogueOption = {}, vitepressConfig: VitePressConfig = {}) => {
  const { path = "", ignoreList = [] } = option;
  if (!path) return [];

  // 获取指定根目录下的所有目录绝对路径
  const dirPaths = readDirPaths(path, ignoreList);

  // 遍历根目录下的每个子目录
  dirPaths.forEach(dirPath => scannerMdFile(dirPath, option, basename(dirPath), vitepressConfig));

  return catalogueInfo;
};

/**
 * 指定根目录下的所有目录绝对路径，win 如 ['D:\docs\01.guide', 'D:\docs\02.design']，linux 如 ['/usr/local/docs/01.guide', '/usr/local/docs/02.design']
 * @param sourceDir 指定文件/文件夹的根目录
 */
const readDirPaths = (sourceDir: string, ignoreList: CatalogueOption["ignoreList"] = []) => {
  const ignoreListAll = [...DEFAULT_IGNORE_DIR, ...ignoreList];
  const dirPaths: string[] = [];
  // 读取目录，返回数组，成员是 root 下所有的目录名（包含文件夹和文件，不递归）
  const dirOrFilenames = readdirSync(sourceDir);

  dirOrFilenames.forEach(dirOrFilename => {
    // 将路径或路径片段的序列解析为绝对路径，等于使用 cd 命令
    const secondDirPath = resolve(sourceDir, dirOrFilename);
    // 是否为文件夹目录，并排除指定文件夹
    if (!isSome(ignoreListAll, dirOrFilename) && statSync(secondDirPath).isDirectory()) {
      dirPaths.push(secondDirPath);
    }
  });

  return dirPaths;
};

/**
 * 递归扫描指定目录下所有的 md 文件
 * @param root 指定目录
 * @param option 配置项
 * @param prefix 目录前缀，每次递归都加前端目录名
 */
const scannerMdFile = (root: string, option: CatalogueOption, prefix = "", vitepressConfig: VitePressConfig = {}) => {
  const { path: srcDir = "", ignoreList = [] } = option;
  const ignoreListAll = [...DEFAULT_IGNORE_DIR, ...ignoreList];
  // 读取目录名（文件和文件夹）
  const dirOrFilenames = readdirSync(root);

  dirOrFilenames.forEach(dirOrFilename => {
    if (isSome(ignoreListAll, dirOrFilename)) return [];

    const filePath = resolve(root, dirOrFilename);

    if (statSync(filePath).isDirectory()) {
      // 是文件夹目录
      scannerMdFile(filePath, option, `${prefix}/${dirOrFilename}`, vitepressConfig);
    } else {
      // 是文件
      if (!isMarkdownFile(dirOrFilename)) return;

      const content = readFileSync(filePath, "utf-8");
      // 解析出 frontmatter 数据
      const { data: { catalogue, path = "" } = {} } = matter(content, {});

      if (catalogue && path) {
        const filename = basename(dirOrFilename, extname(dirOrFilename));

        catalogueInfo.push({
          filePath: `${prefix}/${filename}`,
          path,
          catalogues: createCatalogueList(join(srcDir, path), option, `/${path}/`, vitepressConfig),
        });
      }
    }
  });
};

/**
 * 扫描指定目录下的子目录和文件，生成目录页数据
 * @param root 指定目录
 * @param option 配置项
 * @param prefix 目录前缀，每次递归都加前端目录名
 */
const createCatalogueList = (
  root: string,
  option: CatalogueOption,
  prefix = "/",
  vitepressConfig: VitePressConfig = {}
): CatalogueItem[] => {
  if (!existsSync(root)) {
    console.warn(`'${root}' 路径不存在，将忽略该目录页的生成`);
    return [];
  }

  const { ignoreIndexMd = false, titleFormMd = false, indexSeparator, catalogueItemResolved } = option;

  const catalogueItemList: CatalogueItem[] = [];
  // 存放没有序号的目录页
  const catalogueItemListNoIndex: CatalogueItem[] = [];
  const dirOrFilenames = readdirSync(root);

  dirOrFilenames.forEach(dirOrFilename => {
    const fileAbsolutePath = resolve(root, dirOrFilename);
    const { index: indexStr, title, name } = resolveFileName(dirOrFilename, fileAbsolutePath, indexSeparator);
    const index = parseInt(indexStr as string, 10);

    if (statSync(fileAbsolutePath).isDirectory()) {
      // 是文件夹目录
      const mdTitle = titleFormMd ? tryGetMarkdownTitle(root, dirOrFilename) : "";

      const catalogueItem = {
        title: mdTitle || title,
        children: createCatalogueList(fileAbsolutePath, option, `${prefix}${dirOrFilename}/`, vitepressConfig),
        frontmatter: {},
      };

      if (isIllegalIndex(index)) catalogueItemListNoIndex.push(catalogueItem);
      else catalogueItemList[index] = catalogueItem;
    } else {
      // 是文件
      if (!isMarkdownFile(dirOrFilename)) return [];
      if (ignoreIndexMd && ["index.md", "index.MD"].includes(dirOrFilename)) return [];

      const content = readFileSync(fileAbsolutePath, "utf-8");
      // 解析出 frontmatter 数据
      const { data: frontmatter = {}, content: mdContent } = matter(content, {});
      const { title: frontmatterTitle, catalogue, inCatalogue = true } = frontmatter;

      // 不扫描目录页和 inCatalogue 为 false 的文档
      if (catalogue || !inCatalogue) return [];

      // title 获取顺序：md 文件 frontmatter.title > md 文件一级标题 > md 文件名
      const mdTitle = titleFormMd ? getTitleFromMarkdown(mdContent) : "";
      const finalTitle = frontmatterTitle || mdTitle || title;
      const filePath = prefix + name;

      const { rewrites = {}, cleanUrls } = vitepressConfig;

      const catalogueItem = {
        title: finalTitle,
        url:
          "/" +
          (removeMarkdownExt(rewrites[`${filePath.replace(/^\//, "")}.md`]) || filePath).replace(/^\//, "") +
          (cleanUrls ? "" : ".html"),
        frontmatter,
      };

      if (isIllegalIndex(index)) catalogueItemListNoIndex.push(catalogueItem);
      else catalogueItemList[index] = catalogueItem;
    }
  });

  // 将没有序号的 catalogueItemsNoIndex 放到最后面
  const data = [...catalogueItemList, ...catalogueItemListNoIndex].filter(Boolean);

  return catalogueItemResolved?.(data) ?? data;
};

/**
 * 按顺序从该目录下的 [index.md, index.MD, 目录名.md] 文件获取标题，一旦获取到第一个则不再继续遍历
 * @param root 目录绝对路径
 * @param dirOrFilename 文件夹名
 */
const tryGetMarkdownTitle = (root: string, dirOrFilename: string) => {
  const filePaths = [
    join(root, dirOrFilename, "index.md"),
    join(root, dirOrFilename, "index.MD"),
    join(root, dirOrFilename, dirOrFilename + ".md"),
  ];

  for (const filePath of filePaths) {
    if (!existsSync(filePath)) continue;

    const content = readFileSync(filePath, "utf-8");
    const { data: { title } = {}, content: mdContent } = matter(content, {});
    const t = title || getTitleFromMarkdown(mdContent);

    if (t) return t;
  }

  return "";
};

/**
 * 解析文件名，返回文件序号、文件标题、文件类型
 * @param filename 文件名
 * @param filePath 文件绝对路径
 */
const resolveFileName = (filename: string, filePath: string, separator: string = ".") => {
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
