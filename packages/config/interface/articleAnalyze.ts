import type { ImageViewerProps } from "@teek/components/common/ImageViewer/src/imageViewer";

export type ArticlePosition = "article" | "article-banner";
export type ArticleInfoPosition = "post" | ArticlePosition;

export interface ArticleAnalyze {
  /**
   * 作者、日期、分类、标签、字数、阅读时长、浏览量等文章信息的图标是否显示
   *
   * @default true
   */
  showIcon?: boolean;
  /**
   * 文章日期格式，首页和文章页解析日期时使用
   *
   * @default 'yyyy-MM-dd'
   */
  dateFormat?: "yyyy-MM-dd" | "yyyy-MM-dd hh:mm:ss" | ((date: number | string) => string);
  /**
   * 是否使用 UTC 时间
   *
   * @default true
   */
  dateUTC?: boolean;
  /**
   * 是否展示作者、日期、分类、标签、字数、阅读时长、浏览量等文章信息，分别作用于首页和文章页
   * 如果 showInfo 为数组，则控制在哪里显示，如 ["post"] 只在首页的 Post 列表显示基本信息；如果为 boolean 值，则控制基本信息是否展示，如 false 则在首页和文章页都不显示基本信息
   *
   * @default true
   */
  showInfo?: boolean | ArticleInfoPosition[];
  /**
   * 是否展示作者
   *
   * @default true
   */
  showAuthor?: boolean | ArticleInfoPosition[];
  /**
   * 是否展示创建日期
   *
   * @default true
   */
  showCreateDate?: boolean | ArticleInfoPosition[];
  /**
   * 是否展示更新日期，仅在文章页显示
   *
   * @default false
   */
  showUpdateDate?: boolean;
  /**
   * 是否展示分类
   *
   * @default false
   */
  showCategory?: boolean | ArticleInfoPosition[];
  /**
   * 是否展示标签
   *
   * @default false
   */
  showTag?: boolean | ArticleInfoPosition[];
  /**
   * 指定文章信息的传送位置，仅限在文章页生效，默认在文章页顶部
   */
  teleport?: {
    /**
     * 指定需要传送的元素选择器
     */
    selector?: string;
    /**
     * 指定传送到元素的位置，before 在元素前，after 在元素后
     *
     * @default 'after'
     */
    position?: "before" | "after";
    /**
     * 指定一个 class 名，如果传送的位置和其他元素太接近，可以利用 class 来修改 margin
     *
     * @default teleport
     */
    className?: string;
  };
  /**
   * 文章页图片查看器配置
   */
  imageViewer?: Omit<ImageViewerProps, "urlList" | "initialIndex" | "infinite">;
}
