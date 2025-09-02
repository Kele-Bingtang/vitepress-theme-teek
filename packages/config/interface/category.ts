export interface Category {
  /**
   * 是否启用分类卡片
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * 分类页访问地址
   *
   * @default '/categories'
   */
  path?: string;
  /**
   * 分类页卡片标题
   *
   * @default '${svg}全部分类'
   */
  pageTitle?: string | ((icon: string) => string);
  /**
   * 卡片标题
   *
   * @default '${svg}文章分类'
   */
  homeTitle?: string | ((icon: string) => string);
  /**
   * 查看更多分类标签
   *
   * @default '更多 ...'
   */
  moreLabel?: string;
  /**
   * 分类为空时的标签
   *
   * @default '暂无文章分类'
   */
  emptyLabel?: string;
  /**
   * 一页显示的数量
   *
   * @default 5
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
}
