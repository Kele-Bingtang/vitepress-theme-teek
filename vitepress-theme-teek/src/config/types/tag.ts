export interface Tag {
  /**
   * 是否启用标签卡片
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * 标签页访问地址
   *
   * @default '/tags'
   */
  path?: string;
  /**
   * 标签页页卡片标题
   *
   * @default '${svg}全部标签'
   */
  pageTitle?: string | ((svg: string) => string);
  /**
   * 首页卡片标题
   *
   * @default '${svg}热门标签'
   */
  homeTitle?: string | ((svg: string) => string);
  /**
   * 标签为空时的标签
   *
   * @default '暂无热门标签'
   */
  emptyLabel?: string;
  /**
   * 一页显示的数量
   *
   * @default 21
   */
  limit?: number;
  /**
   * 是否自动翻页
   *
   * @default false
   */
  autoPage?: boolean;
  /**
   * 翻页间隔时间，单位：毫秒。autoPage 为 true 时生效
   *
   * @default 4000 (4秒)
   */
  pageSpeed?: number;
  /**
   * 自定义 tag 的背景颜色，默认取 theme.bgColor
   */
  bgColor?: string[];
}
