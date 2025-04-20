export type ImageViewerAction = "zoomIn" | "zoomOut" | "clockwise" | "anticlockwise";

export interface ImageViewerProps {
  /**
   * 用于预览的图片链接列表
   *
   * @default []
   */
  urlList?: string[];
  /**
   * 预览时遮罩层的 z-index
   */
  zIndex?: number;
  /**
   * 初始预览图像索引，小于 url-list 的长度
   *
   * @default 0
   */
  initialIndex?: number;
  /**
   * 是否可以无限循环预览
   *
   * @default true
   */
  infinite?: boolean;
  /**
   * 是否可以通过点击遮罩层关闭预览
   *
   * @default false
   */
  hideOnClickModal?: boolean;
  /**
   * image 自身是否插入至 body 元素上。 嵌套的父元素属性会发生修改时应该将此属性设置为 true
   *
   * @default false
   */
  teleported?: boolean;
  /**
   * 是否可以通过按下 ESC 关闭 Image Viewer
   *
   * @default true
   */
  closeOnPressEscape?: boolean;
  /**
   * 图像查看器缩放事件的缩放速率
   *
   * @default 1.2
   */
  zoomRate?: number;
  /**
   * 图像查看器缩放事件的最小缩放比例
   *
   * @default 0.2
   */
  minScale?: number;
  /**
   * 图像查看器缩放事件的最大缩放比例
   *
   * @default 7
   */
  maxScale?: number;
  /**
   * 是否显示预览图片的进度条内容
   *
   * @default false
   */
  showProgress?: boolean;
  /**
   * 原生属性 crossorigin
   */
  crossorigin?: "anonymous" | "use-credentials" | "";
}

export interface ImageViewerEmits {
  close: [];
  switch: [index: number];
  rotate: [deg: number];
}

export interface ImageViewerMode {
  name: string;
  icon: string;
}
