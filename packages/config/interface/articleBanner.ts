export interface ArticleBanner {
  /**
   * 是否启用单文章页 Banner
   *
   * @default false
   */
  enabled?: boolean;
  /**
   * 是否展示分类
   *
   * @default true
   */
  showCategory?: boolean;
  /**
   * 是否展示标签
   *
   * @default true
   */
  showTag?: boolean;
  /**
   * 默认封面图
   */
  defaultCoverImg?: string;
  /**
   * 默认封面背景色，优先级低于 defaultCoverImg
   */
  defaultCoverBgColor?: string;
}
