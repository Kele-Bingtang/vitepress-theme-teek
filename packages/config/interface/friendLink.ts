import type { VpRouter } from "@teek/composables";

export interface FriendLink {
  /**
   * 是否启用友情链接卡片
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * 友情链接数据列表
   */
  list?: FriendLinkItem[];
  /**
   * 卡片标题
   *
   * @default '${icon}友情链接'
   */
  title?: string | ((icon: string) => string);
  /**
   * 友情链接为空时的标签
   *
   * @default '暂无友情链接'
   */
  emptyLabel?: string;
  /**
   * 一页显示的数量
   *
   * @default 5
   */
  limit?: number;
  /**
   * 是否自动滚动
   *
   * @default false
   */
  autoScroll?: boolean;
  /**
   * 滚动间隔时间，单位：毫秒。autoScroll 为 true 时生效
   *
   * @default 2500 (2.5秒)
   */
  scrollSpeed?: number;
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
   * 点击标题时触发，可以通过 router.go 跳转到其他页面，也可以通过 window.open 打开新窗口
   *
   * @since v1.1.2
   */
  titleClick?: (router: VpRouter) => void;
}

export interface FriendLinkItem {
  /**
   * 友链名称
   */
  name: string;
  /**
   * 友链头像
   */
  avatar?: string;
  /**
   * 友链描述
   */
  desc?: string;
  /**
   * 友链链接
   */
  link?: string;
  /**
   * img 标签的 alt
   *
   * @default name
   */
  alt?: string;
}
