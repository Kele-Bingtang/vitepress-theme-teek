export interface Wallpaper {
  /**
   * 是否启用壁纸模式
   *
   * @default false
   */
  enabled?: boolean;
  /**
   * 开启壁纸模式后，是否隐藏 Banner 文字
   *
   * @default false
   */
  hideBanner?: boolean;
  /**
   * 开启壁纸模式后，是否隐藏 Banner 或 bodyBgImage 的遮罩层，则确保 banner.mask 和 bodyBgImage.mask 为 true 才生效
   *
   * @default false
   */
  hideMask?: boolean;
  /**
   * 开启壁纸模式后，是否隐藏 Banner 波浪组件，仅 banner.bgStyle = 'fullImg' 生效
   *
   * @default false
   */
  hideWaves?: boolean;
}
