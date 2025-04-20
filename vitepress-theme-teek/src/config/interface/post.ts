import type { ImageViewerProps } from "../../components/common/ImageViewer/src/imageViewer";

export interface Post {
  /**
   * 文章摘要位置
   *
   * @default bottom
   */
  excerptPosition?: "top" | "bottom";
  /**
   * 是否显示更多按钮
   *
   * @default true
   */
  showMore?: boolean;
  /**
   * 更多按钮文字
   *
   * @default '阅读全文 >'
   */
  moreLabel?: string;
  /**
   * 文章列表为空时的标签
   *
   * @default '暂无文章'
   */
  emptyLabel?: string;
  /**
   * 文章封面图模式
   *
   * @default 'default'
   */
  coverImgMode?: "default" | "full";
  /**
   * 是否在摘要位置显示文章部分文字，当为 true 且不使用 frontmatter.describe 和 <!-- more --> 时，会自动截取前 400 个字符作为摘要
   *
   * @default false
   */
  showCapture?: boolean;
  /**
   * 文章信息（作者、创建时间、分类、标签等信息）是否添加 | 分隔符
   *
   * @default false
   */
  splitSeparator?: boolean;
  /**
   * 封面图查看器配置
   */
  imageViewer?: Omit<ImageViewerProps, "urlList">;
}
