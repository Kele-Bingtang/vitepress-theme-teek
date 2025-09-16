import type { PageData } from "vitepress";
import type { VpContainerProps } from "@teek/components/common/VpContainer/src/vpContainer";
import type { TkPaginationProps } from "../components/common/Pagination";
import type {
  Appreciation,
  ArticleAnalyze,
  ArticleShare,
  ArticleUpdate,
  Author,
  BackTop,
  Banner,
  Blogger,
  BodyBgImg,
  Breadcrumb,
  Category,
  CodeBlock,
  CommentConfig,
  DocAnalysis,
  FooterInfo,
  FooterGroup,
  FriendLink,
  ThemeEnhance,
  ToComment,
  Notice,
  Plugins,
  Post,
  SiteAnalytics,
  Social,
  Tag,
  TopArticle,
  Wallpaper,
  Markdown,
  Private,
  RiskLink,
  WindowTransition,
  Feature,
  ArticleBanner,
  ViewTransition,
} from "./interface";

export type * from "./interface";
export type * from "./post/types";

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
export type { Permalink, PermalinkOption } from "vitepress-plugin-permalink";
export type { SidebarOption } from "vitepress-plugin-sidebar-resolve";

export interface TeekConfig {
  /**
   * 是否启用 Teek 主题，如果为 false，则不会主题的 99% 功能，只保留永久链接、锚点滚动、深色、浅色模式过渡动画这三个功能
   *
   * @default true
   */
  teekTheme?: boolean;
  /**
   * 是否启用主题的首页风格（博客风格），如果 teekHome 为 false 且 vpHome 为 true，则首页还原到 vitepress 的默认首页，其他功能不变
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
   * 首页卡片栏列表位置
   *
   * @default 'right'
   */
  homeCardListPosition?: "left" | "right" | false;
  /**
   * 首页卡片的位置排序，当设置了 `homeCardSort` 但没有全部补全，则剩余内容默认按照 `homeCardSort` 的顺序进行排序
   *
   * @default '["topArticle", "category", "tag", "friendLink", "docAnalysis"]'
   */
  homeCardSort?: ("topArticle" | "category" | "tag" | "friendLink" | "docAnalysis")[];
  /**
   * 主题背景色，用于精选文章卡片的 top + sticky 功能和标签卡片的背景色，支持在首页 index.md 的 frontmatter 配置 tk.bgColor
   */
  tagColor?: { bg: string; text: string; border: string }[];
  /**
   * 文章页的样式风格，default 为 VitePress 原生风格，card 为单卡片风格，segment 为片段卡片风格，card-nav 和 segment-nav 会额外修改导航栏样式
   *
   * @default 'default'
   */
  pageStyle?: "default" | "card" | "segment" | "card-nav" | "segment-nav";
  /**
   * 设置当前主题尺寸（只影响 Teek 主题首页和功能页，不影响 VitePress 默认主题）
   *
   * @default ''
   */
  themeSize?: "small" | "default" | "large" | "wide";
  /**
   * 页面加载 Loading 动画，如果为 boolean，则控制是否启用，如果为字符串，则指定加载 Loading 动画的文案
   *
   * @default true
   */
  loading?: boolean | string;
  /**
   * 深色、浅色模式切换过渡动画配置
   *
   * @since v1.5.0
   */
  viewTransition?: ViewTransition;
  /**
   * 回到顶部按钮配置
   */
  backTop?: BackTop;
  /**
   * 滚动到评论区配置
   */
  toComment?: ToComment;
  /**
   * 文章页顶部使用 VitePress 容器添加提示
   *
   * @param frontmatter 文档 frontmatter
   * @param localeIndex 当前国际化语言
   * @param page 文章信息，即 useData().page 的信息
   */
  articleTopTip?:
    | boolean
    | ((frontmatter: PageData["frontmatter"], localeIndex: string, page: PageData) => VpContainerProps | undefined);
  /**
   * 文章页底部使用 VitePress 容器添加提示
   *
   * @param frontmatter 文档 frontmatter
   * @param localeIndex 当前国际化语言
   * @param page 文章信息，即 useData().page 的信息
   */
  articleBottomTip?: (
    frontmatter: PageData["frontmatter"],
    localeIndex: string,
    page: PageData
  ) => VpContainerProps | undefined;
  /**
   * 是否启用侧边栏展开/折叠触发器
   *
   * @default false
   */
  sidebarTrigger?: boolean;
  /**
   * 是否全局启用视图渐入过渡效果
   *
   * @default true
   */
  windowTransition?: boolean | WindowTransition;
  /**
   * 站点特性列表，在文档风格的首页展渲染
   */
  features?: Feature[];
  /**
   *  body 背景图片配置
   */
  bodyBgImg?: BodyBgImg;
  /**
   * 主题增强配置
   */
  themeEnhance?: ThemeEnhance;
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
   * 新版代码块配置
   */
  codeBlock?: CodeBlock;
  /**
   * 文章页顶部 Banner，仅在没有侧边栏的文章页生效
   *
   * @since 1.5.0
   */
  articleBanner?: ArticleBanner;
  /**
   * 文章信息配置
   */
  articleAnalyze?: ArticleAnalyze;
  /**
   * 文章分享配置
   */
  articleShare?: ArticleShare;
  /**
   * 文章页最近更新栏配置
   */
  articleUpdate?: ArticleUpdate;
  /**
   * 私密功能配置
   */
  private?: Private;
  /**
   * 风险链接提示功能配置
   */
  riskLink?: RiskLink;
  /**
   * 赞赏功能配置
   */
  appreciation?:
    | Appreciation<"">
    | Appreciation<"doc-after">
    | Appreciation<"aside-bottom">
    | Appreciation<"doc-after-popper">;
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
