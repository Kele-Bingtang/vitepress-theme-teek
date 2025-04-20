export interface PopoverProps {
  /**
   * 宽度，如果不指定，则会根据内容自动计算
   */
  width?: string | number;
  /**
   * 高度，如果不指定，则会根据内容自动计算
   */
  height?: string | number;
  /**
   * 偏移量，等价于 `xOffset` 和 `yOffset`
   */
  offset?: number;
  /**
   * x 偏移量
   */
  xOffset?: number;
  /**
   * y 偏移量
   */
  yOffset?: number;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否开启过渡动画
   */
  transition?: boolean;
  /**
   * 虚拟元素，弹框将在虚拟元素上显示
   */
  virtualEl?: HTMLDivElement;
  /**
   * 弹框弹出前的回调，支持返回新的 `left` 和 `top` 位置
   */
  beforePopup?: (options: PopoverTransformOptions) => { left?: number; top?: number } | undefined;
}

export interface PopoverTransformOptions {
  /**
   * 弹框的 left 位置
   */
  popupLeft: number;
  /**
   * 弹框的 top 位置
   */
  popupTop: number;
  /**
   * 弹框组件根 DOM 元素，如果传入 virtualEl 则是 virtualEl 元素
   */
  popoverElement: HTMLDivElement;
  /**
   * 弹框的 DOM 元素
   */
  popupElement: HTMLDivElement;
}
