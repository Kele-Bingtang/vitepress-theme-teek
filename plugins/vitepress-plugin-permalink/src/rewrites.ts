import type { PermalinkOption } from "./types";
import createPermalinks from "./helper";
import { join } from "node:path";
import logger from "./log";

/**
 * 创建 rewrites，使用该函数创建的 rewrites 后，将不再加载 vitepress-plugin-permalink 插件拦截逻辑
 */
export const createRewrites = (
  options: PermalinkOption & { srcDir?: string; locales?: Record<string, any> } = {}
): Record<string, string> => {
  const { path, srcDir = ".", locales = {} } = options;
  const baseDir = path ? join(srcDir, path) : srcDir;
  const permalinks = createPermalinks({ ...options, path: baseDir }, true);

  // 将 permalinks 的 key 和 value 都处理成 .md 结尾
  const normalizedPermalinks: Record<string, string> = {};

  for (const [key, value] of Object.entries(permalinks)) {
    const normalizedKey = key + ".md";
    // value: /a/b.html 或 /a/b -> a/b.md（去除原有扩展名，统一加 .md）
    const normalizedValue = value.replace(/^\//, "").replace(/\.[^/.]+$/, "") + ".md";
    normalizedPermalinks[normalizedKey] = normalizedValue;
  }

  // Key 为 path，Value 为 permalink
  const pathToPermalink: Record<string, string> = {};
  // Key 为 permalink，Value 为 path
  const permalinkToPath: Record<string, string> = {};
  // 国际化多语言 key 数组
  const localesKeys = Object.keys(locales || {});

  for (const [key, value] of Object.entries(normalizedPermalinks)) {
    // 如果设置了多语言，则 permalink 添加语言前缀
    const newValue = getLocalePermalink(localesKeys, key, value);

    if (permalinkToPath[newValue]) {
      logger.warn(`永久链接 '${newValue}' 已存在，其对应的 '${permalinkToPath[newValue]}' 将会被 '${key}' 覆盖`);
    }

    pathToPermalink[key] = newValue;
    permalinkToPath[newValue] = key;
  }

  logger.info("Injected Permalinks Rewrites Data Successfully. 注入永久链接 Rewrites 数据成功!");

  return { __create__: "vitepress-plugin-permalink", ...pathToPermalink };
};

/**
 * 给 permalink 添加多语言前缀
 *
 * @param localesKeys 多语言 key 数组，排除 root 根目录
 * @param path 文件路径
 * @param permalink 永久链接
 */
export const getLocalePermalink = (localesKeys: string[] = [], path = "", permalink = "") => {
  // 过滤掉 root 根目录
  const localesKey = localesKeys.filter(key => key !== "root").find(key => path.startsWith(key));
  if (localesKey) return `/${localesKey}${permalink.startsWith("/") ? permalink : `/${permalink}`}`;

  return permalink;
};
