import { normalizePath, Plugin } from "vite";
import { AutoFrontmatterOption } from "./types";
import { basename, join, relative, resolve } from "node:path";
import { glob } from "tinyglobby";
import matter from "gray-matter";
import { readFileSync, statSync, writeFileSync } from "node:fs";
import { formatDate } from "./util";
import logger from "./log";

export * from "./types";

export default function VitePluginVitePressAutoFrontmatter(
  option: AutoFrontmatterOption = {}
): Plugin & { name: string } {
  let isExecute = false;

  return {
    name: "vitepress-plugin-auto-frontmatter",
    async config(config: any) {
      // 防止 vitepress build 时重复执行
      if (isExecute) return;
      isExecute = true;

      let { pattern } = option;
      if (!pattern) return;

      const { globOptions } = option;
      const { srcDir } = config.vitepress;

      if (typeof pattern === "string") pattern = [pattern];
      // 基于文档源目录 srcDir 匹配
      pattern = pattern.map(p => normalizePath(join(srcDir, p)));

      const filePaths = await glob(pattern, {
        expandDirectories: false,
        ...globOptions,
        absolute: true,
        ignore: ["**/node_modules/**", "**/dist/**", ...(globOptions?.ignore || [])],
      });

      writeFrontmatterToFile(filePaths, option, srcDir);
    },
  };
}

/**
 * 自动生成 frontmatter 并写入到 Markdown 文件
 *
 * @param filePaths 文件路径列表
 * @param option 插件配置项
 * @param srcDir vitepress 配置项的 srcDir
 */
const writeFrontmatterToFile = (filePaths: string[], option: AutoFrontmatterOption, srcDir: string) => {
  const { include, exclude, transform, recoverTransform = false } = option;

  for (const filePath of filePaths) {
    if (!filePath.endsWith(".md")) continue;

    // 同步读取文件内容
    const fileContent = readFileSync(filePath, "utf-8");
    // 用 gray-matter 解析 frontmatter
    const { data: frontmatter, content } = matter(fileContent);

    // layout为home或者false的不处理
    if (frontmatter.layout === "home" || frontmatter.layout === false) continue;

    // 根据配置的 include（白名单）和 exclude（黑名单）筛选文件，只处理符合条件的文件
    const isPass = checkExcludeAndInclude(frontmatter, { exclude, include });
    if (!isPass) continue;

    let tempFrontmatter = { ...frontmatter };
    let hasChange = false;

    const stat = statSync(filePath);

    const addInfo: Record<string, any> = {
      title: getMdFileTitle(basename(filePath)),
      date: stat.birthtime || stat.atime,
    };

    for (const [key, value] of Object.entries(addInfo)) {
      if (frontmatter[key] === undefined) {
        // 放到最前面
        tempFrontmatter = { [key]: value, ...tempFrontmatter };
        hasChange = true;
      }
    }

    const transformResult = transform?.(tempFrontmatter, getFileInfo(srcDir, filePath));
    // 如果 frontmatter 没有修改过，且 transform 不存在或者返回 undefined，则不需要修改文件
    if (!hasChange && !transformResult) continue;

    const finalFrontmatter = transformResult || tempFrontmatter;
    // 确保日期格式为 yyyy-MM-dd hh:mm:ss
    finalFrontmatter.date = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(tempFrontmatter.date)
      ? tempFrontmatter.date
      : formatDate(tempFrontmatter.date, "yyyy-MM-dd hh:mm:ss");

    // 如果没有开启同名 key 覆盖且源文件的 frontmatter 已经全部包含处理后的 frontmatter，则不需要修改
    if (!recoverTransform && Object.keys(finalFrontmatter).every(key => frontmatter[key] !== undefined)) continue;

    // 转换为 --- xxx --- 字符串
    const frontmatterStr = Object.keys(finalFrontmatter).length
      ? matter
          .stringify("", finalFrontmatter)
          .replace(/'/g, "")
          .replace(/(?:\r?\n)$/, "") // 清除尾部的一次换行符
      : "";

    // 将修改后的内容写入文件
    writeFileSync(filePath, `${frontmatterStr}${content}`);

    logger.info(`'${filePath}' has been successfully written to frontmatter. (成功写入 frontmatter)`);
  }
};

export const checkExcludeAndInclude = (
  frontmatter: Record<string, any>,
  { exclude, include }: AutoFrontmatterOption
) => {
  // 存在 include 但是不存在 frontmatter，则代表该文件不符合 include 要求
  if (include && !Object.keys(frontmatter).length) return false;

  if (exclude || include) {
    for (const [key, value] of Object.entries(frontmatter)) {
      // 如果设置了 exclude，则不匹配 exclude
      if (exclude?.[key] === value) return false;
      // 如果设置了 include，则只匹配 include
      if (include?.[key] !== value) return false;
    }
  }

  return true;
};

/**
 * 获取实际的文件名
 *
 * @param filename 文件名
 */
export const getMdFileTitle = (filename: string) => {
  let title = "";
  // 如果文件名带序号，如【1.xx.md】，则取 xx
  const fileNameArr = filename.split(".");

  if (fileNameArr.length === 2) title = fileNameArr[0];
  else {
    // 处理多个 . 如 01.guile.md 的情况
    const firstDotIndex = filename.indexOf(".");
    const lastDotIndex = filename.lastIndexOf(".");
    title = filename.substring(firstDotIndex + 1, lastDotIndex);
  }

  return title;
};

/**
 * 获取文件信息
 *
 * @param srcDir vitepress 配置项的 srcDir
 * @param filePath  文件路径
 */
export const getFileInfo = (srcDir: string, filePath: string) => {
  // 确保路径是绝对路径
  const workingDir = resolve(srcDir);
  const absoluteFilePath = resolve(filePath);
  // 计算相对路径
  const relativePath = relative(workingDir, absoluteFilePath).replace(/\\/g, "/");

  return { filePath, relativePath };
};
