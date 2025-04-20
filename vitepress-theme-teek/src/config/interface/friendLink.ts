import type { ImageViewerProps } from "../../components/common/ImageViewer/src/imageViewer";

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
  list?: {
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
  }[];
  /**
   * 首页卡片标题
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
   * 友情链接头像查看器配置
   */
  imageViewer?: Omit<ImageViewerProps, "urlList">;
}
