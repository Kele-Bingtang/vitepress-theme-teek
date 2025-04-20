export interface BodyBgImg {
  /**
   * body 背景图片链接。单张图片 string | 多张图片 string[], 多张图片时每隔 imgInterval 秒换一张
   */
  imgSrc?: string | string[];
  /**
   * body 背景图透明度，选值 0.1 ~ 1.0
   *
   * @default 1
   */
  imgOpacity?: 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
  /**
   * body 当多张背景图时（imgSrc 为数组），设置切换时间，单位：毫秒
   *
   * @default 15000 (15秒)
   */
  imgInterval?: number;
  /**
   * body 背景图是否随机切换，为 false 时按顺序切换
   *
   * @default false
   */
  imgShuffle?: boolean;
  /**
   * body 背景图遮罩
   *
   * @default false
   */
  mask?: boolean;
  /**
   * body 背景图遮罩颜色，如果为数字，则是 rgba(0, 0, 0, ${maskBg})，如果为字符串，则作为背景色。mask 为 true 时生效
   *
   * @default 'rgba(0, 0, 0, 0.2)'
   */
  maskBg?: string | number;
  /**
   * Banner 风格，part 为局部 Banner，显示 feature；full 为全屏 Banner，不显示 feature
   *
   * @default 'full'
   */
  bannerStyle?: "part" | "full";
}
