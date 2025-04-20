import type { TkPaginationProps } from "../components/common/Pagination";
import type {
  Appreciation,
  Article,
  Author,
  Banner,
  Blogger,
  BodyBgImg,
  Breadcrumb,
  Category,
  CommentConfig,
  DocAnalysis,
  FooterInfo,
  FooterGroup,
  FriendLink,
  LayoutEnhance,
  Notice,
  Plugins,
  Post,
  ArticleShare,
  SiteAnalytics,
  Social,
  Tag,
  ThemeSetting,
  TopArticle,
  Wallpaper,
  Markdown,
} from "./interface";

export type * from "./interface";

export type {
  DocAnalysis as DocAnalysisData,
  DocAnalysisOption,
  FileInfo as DocDocAnalysisFileInfo,
  FilePathInfo,
} from "vitepress-plugin-doc-analysis";
export type { AutoFrontmatterOption, FileInfo as AutoFrontmatterFileInfo } from "vitepress-plugin-auto-frontmatter";
export type { Catalogue, CatalogueInfo, CatalogueItem, CatalogueOption } from "vitepress-plugin-catalogue";
export type { FileContentLoaderData, FileContentLoaderOptions } from "vitepress-plugin-file-content-loader";
export type { MdH1Option } from "vitepress-plugin-md-h1";
export type { NotFoundOption, Permalink, PermalinkOption } from "vitepress-plugin-permalink";
export type { SidebarOption } from "vitepress-plugin-sidebar-resolve";

export interface TeekConfig {
  /**
   * 是否启用主题，如果为 false，则不会主题的 99% 功能，只保留永久链接、锚点滚动、深色、浅色模式过渡动画这三个功能
   *
   * @default true
   */
  teekTheme?: boolean;
  /**
   * 是否启用主题的首页风格，如果 teekHome 为 false 且 vpHome 为 true，则首页还原到 vitepress 的默认首页，其他功能不变
   *
   * @default true
   */
  teekHome?: boolean;
  /**
   * 是否启用 VitePress 首页风格，支持 teekHome 和 vpHome 同时存在
   *
   * @default true
   */
  vpHome?: boolean;
  /**
   * 是否启用锚点滚动功能，即阅读文章时，自动将 h1 ~ h6 标题添加到地址栏 # 后面
   *
   * @default true
   */
  anchorScroll?: boolean;
  /**
   * 深色、浅色模式切换时是否开启过渡动画
   *
   * @default true
   */
  viewTransition?: boolean;
  /**
   * 是否使用新版代码块样式，如果为 false 则使用官方默认样式。新版代码块支持折叠
   *
   * @default true
   */
  codeBlock?: boolean;
  /**
   * 首页卡片的位置排序，当设置了 `homeCardSort` 但没有全部补全，则剩余内容默认按照 `homeCardSort` 的顺序进行排序
   *
   * @default '["topArticle", "category", "tag", "friendLink", "docAnalysis"]'
   */
  homeCardSort?: ("topArticle" | "category" | "tag" | "friendLink" | "docAnalysis")[];
  /**
   * 主题背景色，用于精选文章卡片的 top + sticky 功能和标签卡片的背景色，支持在首页 index.md 的 frontmatter 配置 tk.bgColor
   *
   * @default '["#e74c3c", "#409EFF", "#DAA96E", "#0C819F", "#27ae60", "#ff5c93", "#fd726d", "#f39c12", "#9b59b6"]'
   */
  bgColor?: string[];
  /**
   * 文章页的样式风格，default 为 VitePress 原生风格，card 为单卡片风格，segment 为片段卡片风格，card-nav 和 segment-nav 会额外修改导航栏样式
   *
   * @default 'default'
   */
  pageStyle?: "default" | "card" | "segment" | "card-nav" | "segment-nav";
  /**
   *  body 背景图片配置
   */
  bodyBgImg?: BodyBgImg;
  /**
   * 右下角的主题设置配置
   *
   * @deprecated Use `layoutEnhance` instead
   */
  themeSetting?: ThemeSetting;
  /**
   * 布局增强配置
   */
  layoutEnhance?: LayoutEnhance;
  /**
   * 文章默认的作者信息
   */
  author?: Author;
  /**
   * 首页 Banner 配置
   */
  banner?: Banner;
  /**
   * 壁纸模式，在首页最顶部进入全屏后开启，仅当 banner.bgStyle = 'fullImg' 或 bodyBgImg.imgSrc 存在才生效
   */
  wallpaper?: Wallpaper;
  /**
   * 文章列表配置
   */
  post?: Post;
  /**
   * 首页 Post 文章列表的分页配置
   */
  page?: Partial<TkPaginationProps> & { pageSize?: number };
  /**
   * 博主信息，显示在首页左边第一个卡片
   */
  blogger?: Blogger;
  /**
   * 精选文章卡片配置
   */
  topArticle?: TopArticle;
  /**
   * 分类卡片配置
   */
  category?: Category;
  /**
   * 标签卡片配置
   */
  tag?: Tag;
  /**
   * 友情链接卡片配置
   */
  friendLink?: FriendLink;
  /**
   * 站点信息卡片配置
   */
  docAnalysis?: DocAnalysis;
  /**
   * 社交信息配置
   */
  social?: Social[];
  /**
   * 页脚信息组配置
   */
  footerGroup?: FooterGroup[];
  /**
   * 页脚配置
   */
  footerInfo?: FooterInfo;
  /**
   * 文章信息配置
   */
  article?: Article;
  /**
   * 文章分享配置
   */
  articleShare?: ArticleShare;
  /**
   * 赞赏功能配置
   */
  appreciation?: Appreciation<""> | Appreciation<"doc-after"> | Appreciation<"aside-bottom">;
  /**
   * 面包屑配置
   */
  breadcrumb?: Breadcrumb;
  /**
   * 公告配置
   */
  notice?: Notice;
  /**
   * 评论配置
   */
  comment?:
    | CommentConfig<"">
    | CommentConfig<"twikoo">
    | CommentConfig<"waline">
    | CommentConfig<"giscus">
    | CommentConfig<"artalk">
    | CommentConfig<"render">
    | boolean;
  /**
   * 内置 Vite 插件配置
   */
  vitePlugins?: Plugins;
  /**
   * Markdown 插件配置
   */
  markdown?: Markdown;
  /**
   * 站点分析配置
   */
  siteAnalytics?: (SiteAnalytics<""> | SiteAnalytics<"baidu"> | SiteAnalytics<"google"> | SiteAnalytics<"umami">)[];
}
