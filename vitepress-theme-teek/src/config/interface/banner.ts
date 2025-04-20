export interface Banner {
  /**
   * 是否启用 Banner
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * Banner 标题
   *
   * @default 'vitepress 的 title 属性'
   */
  name?: string;
  /**
   * Banner 背景风格：pure 为纯色背景，partImg 为局部图片背景，fullImg 为全屏图片背景
   *
   * @default 'default'
   */
  bgStyle?: "pure" | "partImg" | "fullImg";
  /**
   * Banner 背景色。bgStyle 为 pure 时生效
   *
   * @default '#28282d'
   */
  pureBgColor?: string;
  /**
   * Banner 图片链接。bgStyle 为 partImg 或 fullImg 时生效
   *
   * @default []
   */
  imgSrc?: string | string[];
  /**
   * 当多张图片时（imgSrc 为数组），设置切换时间，单位：毫秒，bgStyle 为 partImg 或 fullImg 时生效
   *
   * @default 15000 (15秒)
   */
  imgInterval?: number;
  /**
   * 图片是否随机切换，为 false 时按顺序切换，bgStyle 为 partImg 或 fullImg 时生效
   *
   * @default false
   */
  imgShuffle?: boolean;
  /**
   * 是否开启 Banner 图片波浪纹，bgStyle 为 fullImg 时生效
   *
   * @default true
   */
  imgWaves?: boolean;
  /**
   * Banner 图片遮罩，bgStyle 为 partImg 或 fullImg 时生效
   *
   * @default true
   */
  mask?: boolean;
  /**
   * Banner 遮罩颜色，如果为数字，则是 rgba(0, 0, 0, ${maskBg})，如果为字符串，则作为背景色。bgStyle 为 partImg 或 fullImg 且 mask 为 true 时生效
   *
   * @default 'rgba(0, 0, 0, 0.4)'
   */
  maskBg?: string | number;
  /**
   * Banner 字体颜色
   *
   * @default '#ffffff'
   */
  textColor?: string;
  /**
   * 标题字体大小
   *
   * @default '3.2rem'
   */
  titleFontSize?: string;
  /**
   * 描述字体大小
   *
   * @default '1.4rem'
   */
  descFontSize?: string;
  /**
   * 描述信息风格：default 为纯文字渲染风格（如果 description 为数组，则取第一个），types 为文字打印风格，switch 为文字切换风格
   *
   * @default 'default'
   */
  descStyle?: "default" | "types" | "switch";
  /**
   * 描述信息，在首页 index.md 的 frontmatter 中，除了 tk.banner.description 设置，也可以使用 tk.description 设置
   *
   * @default ''
   */
  description?: string | string[];
  /**
   * 描述信息切换间隔时间，单位：毫秒。descStyle 为 switch 时生效
   *
   * @default 4000 (4秒)
   */
  switchTime?: number;
  /**
   * 描述信息是否随机切换，为 false 时按顺序切换。descStyle 为 switch 时生效
   *
   * @default false
   */
  switchShuffle?: boolean;
  /**
   * 输出一个文字的时间，单位：毫秒。descStyle 为 types 时生效
   *
   * @default 200 (0.2秒)
   */
  typesInTime?: number;
  /**
   * 删除一个文字的时间，单位：毫秒。descStyle 为 types 时生效
   *
   * @default 100 (0.1秒)
   */
  typesOutTime?: number;
  /**
   * 打字与删字的间隔时间，单位：毫秒。descStyle 为 types 时生效
   *
   * @default 800 (0.8秒)
   */
  typesNextTime?: number;
  /**
   * 描述信息是否随机打字，为 false 时按顺序打字，descStyle 为 types 时生效
   *
   * @default false
   */
  typesShuffle?: boolean;
  /**
   * Banner 新特性列表
   */
  features?: { title: string; description?: string; link?: string; imgUrl?: string }[];
  /**
   * feature 轮播间隔时间，单位：毫秒。仅在移动端生效（屏幕小于 719px）
   *
   * @default 4000
   */
  featureCarousel?: number;
}
