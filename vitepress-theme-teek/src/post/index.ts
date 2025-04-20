import type { FileContentLoaderData } from "vitepress-plugin-file-content-loader";
import type { TkContentData, PostData } from "./types";
import { SiteConfig } from "vitepress";
import { getTitleFromMd } from "vitepress-plugin-sidebar-resolve";
import { basename, join } from "node:path";
import { statSync } from "node:fs";
import { formatDate } from "../helper";
import {
  filterPosts,
  getSortPostsByDateAndSticky,
  getSortPostsByDate,
  getGroupPosts,
  getGroupCards,
  groupByYear,
  groupByYearMonth,
} from "./helper";
import matter from "gray-matter";

export type * from "./types";

// ! 该文件只在 node 环境运行，无法直接在浏览器环境运行，因此浏览器环境的代码不要引入该文件

/**
 * 转换为文章数据
 */
export const transformData = (data: FileContentLoaderData): TkContentData => {
  const siteConfig: SiteConfig = (globalThis as any).VITEPRESS_CONFIG;
  const { themeConfig } = siteConfig.userConfig;
  const { frontmatter, url, excerpt } = data;

  if (frontmatter.date) frontmatter.date = formatDate(frontmatter.date);

  return {
    url: url,
    frontmatter: frontmatter,
    author: themeConfig.author,
    title: getTitle(data),
    date: getDate(data, siteConfig.srcDir),
    excerpt,
    capture: getCaptureText(data),
  };
};

/**
 * 转换为各个文章不同类型的数据
 */
export const transformRaw = (posts: TkContentData[]): PostData => {
  const siteConfig: SiteConfig = (globalThis as any).VITEPRESS_CONFIG;
  const { locales = {} } = siteConfig.userConfig;

  const postsData = resolvePosts(posts);

  const localesKeys = Object.keys(locales);
  // 没有配置国际化，则返回所有 posts 数据
  if (!localesKeys.length) return postsData;

  // 国际化处理，计算每个语言目录下的 posts 数据
  const postsLocale: Record<string, PostData> = {};
  localesKeys
    .filter(localesKey => localesKey !== "root")
    .forEach(localesKey => {
      const localePosts = posts.filter(post => post.url.startsWith(`/${localesKey}`));
      postsLocale[localesKey] = resolvePosts(localePosts);
    });

  // root 处理
  const rootPosts = posts.filter(post => !localesKeys.some(localesKey => post.url.startsWith(`/${localesKey}`)));
  postsLocale["root"] = resolvePosts(rootPosts);

  return { ...postsData, locales: postsLocale };
};

const resolvePosts = (posts: TkContentData[]): PostData => {
  const originPosts = filterPosts(posts);
  const sortPostsByDateAndSticky = getSortPostsByDateAndSticky(originPosts);
  const sortPostsByDate = getSortPostsByDate(originPosts);
  const groupPostsByYear = groupByYear(sortPostsByDate);
  const groupPostsByYearMonth = groupByYearMonth(sortPostsByDate);
  const groupPosts = getGroupPosts(sortPostsByDateAndSticky);
  const groupCards = getGroupCards(groupPosts);

  return {
    originPosts,
    sortPostsByDateAndSticky,
    sortPostsByDate,
    groupPostsByYear,
    groupPostsByYearMonth,
    groupPosts,
    groupCards,
  };
};

/**
 * 获取文章标题，获取顺序：frontmatter.title > md 文件开头的一级标题 > 文件名
 *
 * @param post 文章数据
 */
export function getTitle(post: RequiredKeyPartialOther<TkContentData, "frontmatter" | "url">) {
  if (post.frontmatter.title) return post.frontmatter.title;

  const { content = "" } = matter(post.src || "", {});
  const splitName = basename(post.url).split(".");
  // 如果目录下有 index.md 且没有一级标题，则使用目录名作为文章标题
  const name = splitName.length > 1 ? splitName[1] : splitName[0];
  return getTitleFromMd(content) || name || "";
}

/**
 * 获取文章时间，获取顺序：frontmatter.date > 文件创建时间 > 当前时间
 *
 * @param post 文章数据
 * @param srcDir 项目绝对路径
 */
export function getDate(post: RequiredKeyPartialOther<TkContentData, "frontmatter" | "url">, srcDir: string) {
  const { frontmatter, url } = post;

  if (frontmatter.date) return frontmatter.date;

  // 如果目录下面有 index.md，则 url 不是目录名/index，而是目录名/，因此通过后面的 / 来补 index.md
  const filePath = join(srcDir, `${url.endsWith("/") ? `${url}/index` : url.replace(/\.html$/, "")}.md`);
  const stat = statSync(filePath);
  return formatDate(stat.birthtime || stat.atime);
}

/**
 * 截取 markdown 文件前 count 数的内容
 */
export const getCaptureText = (post: TkContentData, count = 400) => {
  const { content = "" } = matter(post.src || "", {});
  return (
    content
      // 首个标题
      ?.replace(/^#+\s+.*/, "")
      // 除去标题
      ?.replace(/#/g, "")
      // 除去图片
      ?.replace(/!\[.*?\]\(.*?\)/g, "")
      // 除去链接
      ?.replace(/\[(.*?)\]\(.*?\)/g, "$1")
      // 除去加粗
      ?.replace(/\*\*(.*?)\*\*/g, "$1")
      // 除去 [[TOC]]
      ?.replace(/\[\[TOC\]\]/g, "")
      // 去除 ::: 及其后面的内容
      ?.replace(/:::.*?(\n|$)/g, "")
      ?.replace(/<!-- more -->/g, "")
      ?.split("\n")
      ?.filter(v => !!v)
      ?.join("\n")
      ?.replace(/>(.*)/, "")
      ?.replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      ?.trim()
      ?.slice(0, count)
  );
};
