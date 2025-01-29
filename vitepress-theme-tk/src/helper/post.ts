import type { GroupCardItem, KtContentData, Post } from "../data/post";
import { isArray } from "./is";

/**
 * 过滤非文章页
 * @param posts 所有文章数据
 */
export const filterPosts = (posts: KtContentData[]): KtContentData[] => {
  return posts.filter(
    ({ frontmatter: { pageComponent, article, layout } }) => !pageComponent && article !== false && layout !== "home"
  );
};

/**
 * 按置顶和时间排序
 * @param posts 过滤非文章页之后的文章数据
 */
export const getSortPostsByDateAndSticky = (posts: KtContentData[]): KtContentData[] => {
  return posts.sort((prev, next) => {
    // 先根据 sticky 排序，sticky 值越大越靠前，如果 sticky 相同，则按时间排序
    const prevSticky = prev.frontmatter.sticky;
    const nextSticky = next.frontmatter.sticky;
    if (prevSticky && nextSticky) {
      return nextSticky === prevSticky ? compareDate(prev, next) : nextSticky - prevSticky;
    } else if (prevSticky) return -1;
    else if (nextSticky) return 1;

    return compareDate(prev, next);
  });
};

/**
 * 按时间排序
 * @param posts 过滤非文章页之后的文章数据
 */
export const getSortPostsByDate = (posts: KtContentData[]): KtContentData[] => {
  return posts.sort((prev, next) => compareDate(prev, next));
};

/**
 * 按分类和标签分组
 * @param  posts 按时间排序之后的文章数据
 */
export const getGroupPosts = (posts: KtContentData[]): Post["groupPosts"] => {
  const categoriesObj: Record<string, KtContentData[]> = {};
  const tagsObj: Record<string, KtContentData[]> = {};

  posts.forEach(post => {
    const { categories, tags } = post.frontmatter as { categories: string[]; tags: string[]; [key: string]: any };

    if (isArray(categories)) {
      categories.forEach(category => {
        if (category) {
          if (!categoriesObj[category]) categoriesObj[category] = [];
          categoriesObj[category].push(post);
        }
      });
    }

    if (isArray(tags)) {
      tags.forEach(tag => {
        if (tag) {
          if (!tagsObj[tag]) tagsObj[tag] = [];
          tagsObj[tag].push(post);
        }
      });
    }
  });

  return {
    categories: categoriesObj,
    tags: tagsObj,
  };
};

/**
 * 获取所有分类和标签
 * @param  groupPosts 按分类和标签分组之后的文章数据
 */
export const getGroupCards = (groupPosts: Post["groupPosts"]): Post["groupCards"] => {
  const categoriesArr: GroupCardItem[] = [];
  const tagsArr: GroupCardItem[] = [];

  for (let key in groupPosts.categories) categoriesArr.push({ name: key, length: groupPosts.categories[key].length });

  for (let key in groupPosts.tags) tagsArr.push({ name: key, length: groupPosts.tags[key].length });

  return {
    categories: categoriesArr,
    tags: tagsArr,
  };
};

/**
 * 获取文章时间戳
 * @param post 文章数据
 */
export const getPostsTime = (post: KtContentData): number => {
  const dateStr = post.date;
  let date = dateStr ? new Date(dateStr) : new Date();
  if ((date as unknown as string) === "Invalid Date" && dateStr) {
    return new Date(dateStr.replace(/-/g, "/")).getTime();
  }
  return date.getTime();
};

/**
 * 文章时间排序
 * @param prev 文章 1
 * @param next 文章 2
 */
export const compareDate = (prev: KtContentData, next: KtContentData) => {
  return getPostsTime(next) - getPostsTime(prev);
};

/**
 * 根据年份分组，key 为年份，value 为该年份的文章列表，如 { 2025: [{}, {}], 2024: [{}, {}] }
 * @param posts 文章列表
 */
export const groupByYear = (posts: KtContentData[]) => {
  return posts.reduce(
    (pre, cur) => {
      const year = new Date(cur.frontmatter.date).getFullYear();
      if (!pre[year]) pre[year] = [];

      pre[year].push(cur);
      return pre;
    },
    {} as Record<number, KtContentData[]>
  );
};
/**
 * 根据年份和月份分组，key 为年份，value 为该年份的月份分组，如：{ 2025: { 01: [{}, {}], 02: [{}, {}] }, 2024: { 01: [], 02: [{}, {}] } }
 * @param posts 文章列表
 */
export const groupByYearMonth = (posts: KtContentData[]) => {
  return posts.reduce(
    (pre, cur) => {
      const date = new Date(cur.frontmatter.date);
      const year = date.getFullYear();
      const month = Number(String(date.getMonth() + 1).padStart(2, "0"));
      if (!pre[year]) pre[year] = {};
      if (!pre[year][month]) pre[year][month] = [];

      pre[year][month].push(cur);
      return pre;
    },
    {} as Record<number, Record<number, KtContentData[]>>
  );
};
