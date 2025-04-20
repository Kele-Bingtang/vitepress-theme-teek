import type { GroupCardItem, TkContentData, PostData } from "./types";

/**
 * Post 空数据，方便定义空对象
 */
export const emptyPost: PostData = {
  originPosts: [],
  sortPostsByDateAndSticky: [],
  sortPostsByDate: [],
  groupPostsByYear: {},
  groupPostsByYearMonth: {},
  groupPosts: { categories: {}, tags: {} },
  groupCards: { categories: [], tags: [] },
  locales: {},
};

/**
 * 过滤非文章页
 * @param posts 所有文章数据
 */
export const filterPosts = (posts: TkContentData[]): TkContentData[] => {
  return posts.filter(({ frontmatter: { article, layout } }) => article !== false && layout !== "home");
};

/**
 * 按置顶和时间排序
 * @param posts 过滤非文章页之后的文章数据
 */
export const getSortPostsByDateAndSticky = (posts: TkContentData[]): TkContentData[] => {
  // sort 会改变原数组，因此确保参数不被修改，复杂一份
  const p = [...posts];
  return p.sort((prev, next) => {
    // 先根据 sticky 排序，sticky 值越大越靠前，如果 sticky 相同，则按时间排序
    const prevSticky = prev.frontmatter.sticky;
    const nextSticky = next.frontmatter.sticky;

    if (prevSticky && nextSticky) return prevSticky === nextSticky ? compareDate(prev, next) : prevSticky - nextSticky;
    if (prevSticky) return -1;
    if (nextSticky) return 1;

    return compareDate(prev, next);
  });
};

/**
 * 按时间排序
 * @param posts 过滤非文章页之后的文章数据
 */
export const getSortPostsByDate = (posts: TkContentData[]): TkContentData[] => {
  // sort 会改变原数组，因此确保参数不被修改，复杂一份
  const p = [...posts];
  return p.sort((prev, next) => compareDate(prev, next));
};

/**
 * 按分类和标签分组
 * @param  posts 按时间排序之后的文章数据
 */
export const getGroupPosts = (posts: TkContentData[]): PostData["groupPosts"] => {
  const categoriesObj: Record<string, TkContentData[]> = {};
  const tagsObj: Record<string, TkContentData[]> = {};

  posts.forEach(post => {
    const { categories, tags } = post.frontmatter as { categories: string[]; tags: string[]; [key: string]: any };

    [categories || []].flat().forEach(category => {
      if (category) {
        if (!categoriesObj[category]) categoriesObj[category] = [];
        categoriesObj[category].push(post);
      }
    });

    [tags || []].flat().forEach(tag => {
      if (tag) {
        if (!tagsObj[tag]) tagsObj[tag] = [];
        tagsObj[tag].push(post);
      }
    });
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
export const getGroupCards = (groupPosts: PostData["groupPosts"]): PostData["groupCards"] => {
  const categoriesArr: GroupCardItem[] = [];
  const tagsArr: GroupCardItem[] = [];

  for (const key in groupPosts.categories) categoriesArr.push({ name: key, length: groupPosts.categories[key].length });

  for (const key in groupPosts.tags) tagsArr.push({ name: key, length: groupPosts.tags[key].length });

  return {
    categories: categoriesArr,
    tags: tagsArr,
  };
};

/**
 * 获取文章时间戳
 * @param post 文章数据
 */
export const getPostsTime = (post: TkContentData): number => {
  const dateStr = post.date;
  const date = dateStr ? new Date(dateStr) : new Date();
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
export const compareDate = (prev: TkContentData, next: TkContentData) => {
  return getPostsTime(next) - getPostsTime(prev);
};

/**
 * 根据年份分组，key 为年份，value 为该年份的文章列表，如 { 2025: [{}, {}], 2024: [{}, {}] }
 * @param posts 文章列表
 */
export const groupByYear = (posts: TkContentData[]) => {
  return posts.reduce(
    (pre, cur) => {
      // 加个空格转为字符串，避免生产的对象自动根据数字排序（字符串数字也会自定义排序，因此加个空格）
      const year = new Date(cur.date || cur.frontmatter.date).getFullYear() + " ";
      if (!pre[year]) pre[year] = [];

      pre[year].push(cur);
      return pre;
    },
    {} as PostData["groupPostsByYear"]
  );
};
/**
 * 根据年份和月份分组，key 为年份，value 为该年份的月份分组，如：{ 2025: { 01: [{}, {}], 02: [{}, {}] }, 2024: { 01: [], 02: [{}, {}] } }
 * @param posts 文章列表
 */
export const groupByYearMonth = (posts: TkContentData[]) => {
  return posts.reduce(
    (pre, cur) => {
      const date = new Date(cur.date || cur.frontmatter.date);
      // 加个空格转字符串，避免生成的对象自动根据数字排序（字符串数字也会自定义排序，因此加个空格）
      const year = date.getFullYear() + " ";
      const month = String(date.getMonth() + 1).padStart(2, "0");
      if (!pre[year]) pre[year] = {};
      if (!pre[year][month]) pre[year][month] = [];

      pre[year][month].push(cur);
      return pre;
    },
    {} as PostData["groupPostsByYearMonth"]
  );
};
