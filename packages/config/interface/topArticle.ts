import type { VpRouter } from "@teek/composables";

export interface TopArticle {
  /**
   * 是否启用精选文章卡片
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * 卡片标题
   *
   * @default '${icon}精选文章'
   */
  title?: string | ((icon: string) => string);
  /**
   * 精选文章为空时的标签
   *
   * @default '暂无精选文章'
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
  /**
   * 精选文章的日期格式
   *
   * @default 'yyyy-MM-dd hh:mm:ss'
   */
  dateFormat?: "yyyy-MM-dd" | "yyyy-MM-dd hh:mm:ss" | ((date: number | string) => string);
  /**
   * 点击标题时触发，可以通过 router.go 跳转到其他页面，也可以通过 window.open 打开新窗口
   *
   * @since v1.1.2
   */
  titleClick?: (router: VpRouter) => void;
}
