export interface WindowTransition {
  /**
   * 是否开启首页文章列表过渡效果
   *
   * @default false
   */
  post?: boolean;
  /**
   * 是否开启首页卡片列表过渡效果
   *
   * @default false
   */
  card?: boolean;
  /**
   * 是否开启归档页过渡效果
   *
   * @default false
   */
  archives?: boolean;
  /**
   * 是否开启首页 Feature 过渡效果
   *
   * @default false
   */
  feature?: boolean;
}
