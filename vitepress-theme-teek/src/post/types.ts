import type { FileContentLoaderData } from "vitepress-plugin-file-content-loader";
import type { TeekConfig } from "../config/types";

export type TkContentData = FileContentLoaderData & {
  /**
   * 文章作者信息
   */
  author?: TeekConfig["author"];
  /**
   * 文章标题
   */
  title?: string;
  /**
   * 文章创建时间
   */
  date?: string;
  /**
   * 截取文章开头文字
   * @default '文章开头前 400 文字'
   */
  capture?: string;
};

export interface PostData {
  /**
   * 文章列表
   */
  originPosts: TkContentData[];
  /**
   * 根据日期和 sticky 排序的文章列表
   */
  sortPostsByDateAndSticky: TkContentData[];
  /**
   * 根据日期排序的文章列表
   */
  sortPostsByDate: TkContentData[];
  /**
   * 根据年份分组，key 为年份，value 为该年份的文章列表，如 { 2025: [{}, {}], 2024: [{}, {}] }
   */
  groupPostsByYear: Record<string, TkContentData[]>;
  /**
   * 根据年份和月份分组，key 为年份，value 为该年份的月份分组，如：{ 2025: { 01: [{}, {}], 02: [{}, {}] }, 2024: { 01: [], 02: [{}, {}] } }
   */
  groupPostsByYearMonth: Record<string, Record<string, TkContentData[]>>;
  /**
   * 分组的文章列表
   */
  groupPosts: {
    /**
     * 分类信息，格式：{ 分类名: 文章列表 }[]
     */
    categories: Record<string, TkContentData[]>;
    /**
     * 标签信息，格式：{ 标签名: 文章列表 }[]
     */
    tags: Record<string, TkContentData[]>;
  };
  /**
   * 分组卡片信息，用于首页右侧渲染分类和标签卡片
   */
  groupCards: {
    /**
     * 分类信息，格式：{ name: 分类名, length: 文章数量 }[]
     */
    categories: GroupCardItem[];
    /**
     * 标签信息，格式：{ name: 标签名, length: 文章数量 }[]
     */
    tags: GroupCardItem[];
  };
  /**
   * 国际化启用后，key 为语言，value 为该语言目录下的 Posts。如果没有开启国际化，则没有 locales
   */
  locales?: Record<string, PostData>;
}

export interface GroupCardItem {
  /**
   * 分类名
   */
  name: string;
  /**
   * 文章数量
   */
  length: number;
}

export interface FrontMatter {
  /**
   * 文章标题
   */
  title: string;
  /**
   * 文章创建时间
   */
  date: string;
  /**
   * 文章永久链接
   */
  permalink: string;
  /**
   * 文章作者
   */
  author?: string;
  /**
   * 文章标签
   */
  tags?: string[];
  /**
   * 文章分类
   */
  categories?: string[];
  /**
   * 文章是否显示在侧边栏
   */
  sidebar: boolean;
  /**
   * 是否问文章页
   */
  article: boolean;
  /**
   * 是否在首页置顶，数字越小，排名越靠前
   */
  sticky: number;
  /**
   * 是否为目录页
   */
  catalogue: boolean;

  /**
   * 目录页所在路径，将扫描 path 下的所有文章
   */
  path: string;
  /**
   * 目录页描述
   */
  description: string;
}
