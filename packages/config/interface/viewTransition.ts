export interface ViewTransition {
  /**
   * 是否启用深浅色切换动画效果
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * 动画模式，out 始终从点击处往全屏扩散，out-in 第一次从点击处往全屏扩散，再次点击从全屏回到点击处
   *
   * @default 'out-in'
   */
  mode?: "out" | "out-in";
  /**
   * 动画持续时间，当 mode 为 out 时，默认为 300ms，mode 为 out-in 时，默认为 600ms
   *
   * @default 'out-in: 300ms, out-in: 600ms'
   */
  duration?: number;
  /**
   * 缓动函数
   *
   * @default 'ease-in'
   */
  easing?: string;
}
