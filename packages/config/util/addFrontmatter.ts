import type { SiteConfig } from "vitepress";
import type { FileInfo } from "vitepress-plugin-auto-frontmatter";
import type { TransformRule } from "../interface/plugins";
import crypto from "crypto";

/**
 * 创建 permalink 永久链接
 *
 * @param permalinkPrefix permalink 前缀
 */
export const createSimplePermalink = (permalinkPrefix = "") => {
  let finalPermalinkPrefix = permalinkPrefix;
  if (!finalPermalinkPrefix.startsWith("/")) finalPermalinkPrefix = "/" + finalPermalinkPrefix;
  if (!finalPermalinkPrefix.endsWith("/")) finalPermalinkPrefix = finalPermalinkPrefix + "/";

  return {
    permalink: `${finalPermalinkPrefix}${(Math.random() + Math.random()).toString(16).slice(2, 8)}`,
  };
};

/**
 * 根据规则转换 permalink
 *
 * @param permalink 原始 permalink
 * @param fileInfo 文件信息
 * @param rules 规则数组
 */
export const createComplexPermalink = (permalink: string, fileInfo: FileInfo, rules: TransformRule[]) => {
  // 转换函数：支持移除指定层级前缀后再添加新前缀，新增clear清空逻辑 + UUID占位符替换
  for (const rule of rules) {
    const { folderName, prefix = "", removeLevel, clear = false } = rule; // 解构时给clear默认值false

    // 检查文件路径是否匹配文件夹规则（精确匹配单个文件时，需完全一致）
    if (!fileInfo.relativePath.startsWith(folderName) && folderName !== "*") {
      continue;
    }

    // 如果clear为true，直接清空permalink并返回（优先级最高）
    if (clear || permalink === undefined) {
      return { permalink: "" };
    }

    // 兼容null和undefined，避免空字符串替换报错
    let originalPermalink = permalink;
    if (originalPermalink === null || originalPermalink === undefined) {
      originalPermalink = "";
    }

    let normalizedPrefix = "";
    const finalPrefix = cleanPathSpaces(prefix);
    // 前缀不为空的情况才需要处理
    if (finalPrefix !== "") {
      // 替换prefix中的$UUID/$UUID10占位符，'/test/$UUID10' → '/test/a3k9m2x8p1'
      normalizedPrefix = replacePlaceholder(finalPrefix, fileInfo.relativePath);
      // 原有：标准化前缀（确保以 / 开头）
      normalizedPrefix = normalizedPrefix.startsWith("/") ? normalizedPrefix : `/${normalizedPrefix}`;

      // 核心调整：按 / 分组，比较第一个前缀是否一致
      // 获取目标前缀的第一个分组（如 "/test/12345" → "test"）
      const targetFirstSegment = getFirstPathSegment(normalizedPrefix);
      // 获取当前 permalink 的第一个分组（如 "/old/path" → "old"）
      const currentFirstSegment = getFirstPathSegment(originalPermalink);

      // 若第一个分组相同，说明已包含目标前缀，无需处理
      if (currentFirstSegment === targetFirstSegment) {
        continue;
      }
    }

    // 处理 permalink：先移除指定层级，再添加新前缀
    if (removeLevel !== undefined && removeLevel > 0) {
      // 分割permalink（处理空字符串和开头的 /）
      const parts = originalPermalink.split("/").filter(part => part);
      // 确保移除的层级不超过实际存在的层级（removeLevel=99时，会移除所有层级，只剩根路径）
      const actualRemoveLevel = Math.min(removeLevel, parts.length);
      // 移除前N个层级，再重新拼接
      const remainingParts = parts.slice(actualRemoveLevel);
      originalPermalink = remainingParts.length > 0 ? `/${remainingParts.join("/")}` : ""; // 移除所有层级后，originalPermalink为 ""
    }

    // 拼接新 permalink 并返回结果（此时prefix已替换占位符）
    const newPermalink = `${normalizedPrefix}${originalPermalink}`;

    return { permalink: newPermalink };
  }
  return {};
};

/**
 * 创建 categories 分类列表
 *
 * @param fileInfo 文件信息
 * @param ignore 需要忽略的文件名或目录名
 */
export const createCategory = (fileInfo: FileInfo, ignore: string[] = []) => {
  const siteConfig: SiteConfig = (globalThis as any).VITEPRESS_CONFIG;
  const { locales = {} } = siteConfig.userConfig;

  const relativePathArr = fileInfo.relativePath.split("/");

  const categories: string[] = [];
  relativePathArr.forEach((item, index) => {
    // 去除「序号.」的前缀，并获取文件名
    const filename = item.replace(/^\d+\./, "").split(".")?.[0] || "";

    // 兼容国际化功能，如果配置多语言，则不添加多语言根目录名
    if (index !== relativePathArr.length - 1 && !locales[filename] && !ignore.includes(filename))
      categories.push(filename);
  });

  // [""] 表示添加一个为空的 categories
  return { categories: categories.length ? categories : [""] };
};

/**
 * 处理封面图
 *
 * @param coverImg 原始封面图
 * @param coverList 封面图列表
 * @param enableForceCoverImg 是否强制替换封面图
 */
export const createCoverImg = (coverList: string[]) => {
  return { coverImg: coverList[Math.floor(Math.random() * coverList.length)] };
};

/**
 * 获取路径按 / 分割后的第一个有效分组（忽略空字符串）
 * @param path
 */
const getFirstPathSegment = (path: string): string => {
  const segments = path.split("/").filter(segment => segment.trim() !== "");
  return segments.length > 0 ? segments[0] : "";
};

/**
 * 生成指定长度的随机字符串（数字 + 小写字母）
 *
 * @param length 字符串长度（最大为10）
 */
const generateRandomString = (length: number): string => {
  if (length <= 0) return "";
  const maxLen = 10;
  const actualLength = Math.min(length, maxLen); // 最大10位

  const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
  const charsLength = chars.length;
  let result = "";

  for (let i = 0; i < actualLength; i++) {
    result += chars[Math.floor(Math.random() * charsLength)];
  }

  return result;
};

const getHashByFirstPath = (path: string, length: number): string => {
  // 生成 SHA-256 哈希（十六进制）
  const hash = crypto.createHash("sha256").update(path, "utf8").digest("hex");

  // 截取前 N 位（确保不超过哈希长度）
  return hash.slice(0, Math.min(length, hash.length));
};

/**
 * 替换字符串中的 $UUID{n} 和 $PATH{n} 占位符
 * $UUID 支持 $UUID2, $UUID5, $UUID10 等格式
 * - n 默认5位
 * - n 取值[1 - 15]之间
 * - 不区分大小写
 *
 * $PATH 支持 $PATH, $PATH10 等格式， 代表一级目录并将其转为为hash值
 * - n 默认6位
 * - n 取值[6 - 10]之间，低于 6 按 6 处理（防止碰撞）
 * - 不区分大小写
 *
 * @param placeholderStr 原始字符串
 * @param path 文件相对路径
 * @example
 * replacePlaceholder('/test/$UUID10') → '/test/a3k9m2x8p1'
 * replacePlaceholder('/user/$UUID5/$UUID2') → '/user/abc12/de'
 * replacePlaceholder('/$path/abc') → '/0.1指南/abc' → '/264ca4/abc'
 * replacePlaceholder('/$path3/abc') → '/0.1指南/abc' → '/264ca4/abc' (自动调整为6位)
 * replacePlaceholder('/$path-$uuid2/teek/$uuid1/$uuid') → '/264ca4-ls/teek/c/4ccyr' (混搭)
 */
const replacePlaceholder = (placeholderStr: string, path: string): string => {
  // 处理 $UUID 占位符
  let result = placeholderStr.replace(/\$UUID(\d*)/gi, (match, numStr) => {
    // 如果指定了长度，则使用指定长度，否则默认为5位
    const length = numStr ? parseInt(numStr, 10) : 5;
    return generateRandomString(length);
  });

  // 处理 $PATH 占位符（支持 $PATH{n} 格式）
  result = result.replace(/\$PATH(\d*)/gi, (match, numStr) => {
    // 处理长度：默认6位，低于6位按6位处理，超过10位按10位处理
    let length = 6; // 默认5位
    if (numStr) {
      const parsed = parseInt(numStr, 10);
      length = Math.max(6, Math.min(parsed, 10)); // 确保在6-10之间
    }
    // 获取路径的一级目录
    const firstSegment = getFirstPathSegment(path);
    // 将一级目录转换为哈希值
    return getHashByFirstPath(firstSegment, length);
  });

  return result;
};

/**
 * 清理路径中的无效层级（纯空格、空字符串）
 * @param path 原始路径（如 "/    /testawe/a/$uuid1"）
 * @returns 清理后的路径（如 "/testawe/a/$uuid1"）
 */
const cleanPathSpaces = (path: string): string => {
  // 1. 按 / 分割路径
  const segments = path.split("/");
  // 2. 过滤无效层级：排除空字符串和纯空格（trim后为空）
  const validSegments = segments.filter(segment => segment.trim() !== "");
  // 3. 重新拼接路径（确保以 / 开头，结尾无多余 /）
  return validSegments.length > 0 ? `/${validSegments.join("/")}` : "";
};
