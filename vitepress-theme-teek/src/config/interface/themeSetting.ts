import type { Message } from "../../components/common/Message/src/message";

export interface ThemeSetting {
  /**
   * 是否启用主题风格，如果为 false，则不会显示切换按钮
   *
   * @default true
   */
  useThemeStyle?: boolean;
  /**
   * 设置当前主题风格
   *
   * @default 'vp-default'
   */
  themeStyle?:
    | "vp-default"
    | "vp-green"
    | "vp-yellow"
    | "vp-red"
    | "el-blue"
    | "el-green"
    | "el-yellow"
    | "el-red"
    | string;
  /**
   * 自定义主题风格，将会追加到内置主题风格后面
   */
  themeStyleAppend?: {
    /**
     * 主题组名称
     */
    label: string;
    /**
     * 主题组提示信息，鼠标悬停时显示
     */
    tip?: string;
    /**
     * 主题组内容
     */
    options: {
      /**
       * 主题名称，用于页面文字渲染
       */
      name: string;
      /**
       * 主题标识，在 html 标签的 theme 属性添加该标识
       */
      style: string;
    }[];
  }[];
  /**
   * 主题样式的名称修改
   */
  themeStyleLabel?: {
    /**
     * @default 'VP 主题'
     */
    vpLabel?: string;
    /**
     * @default 'VitePress 主题'
     */
    vpTip?: string;
    /**
     * @default '默认'
     */
    default?: string;
    /**
     * @default '绿色'
     */
    vpGreen?: string;
    /**
     * @default '黄色'
     */
    vpYellow?: string;
    /**
     * @default '红色'
     */
    vpRed?: string;
    /**
     * @default 'EP 主题'
     */
    epLabel?: string;
    /**
     * @default 'Element Plus 主题'
     */
    epTip?: string;
    /**
     * @default '蓝色'
     */
    epBlue?: string;
    /**
     * @default '绿色'
     */
    epGreen?: string;
    /**
     * @default '黄色'
     */
    epYellow?: string;
    /**
     * @default '红色'
     */
    epRed?: string;
  };
  /**
   * 是否使用主题尺寸切换功能
   *
   * @default true
   */
  useThemeSize?: boolean;
  /**
   * 设置当前主题尺寸
   *
   * @default 'default'
   */
  themeSize?: "small" | "default" | "large" | string;
  /**
   * 自定义主题尺寸，将会追加到内置主题尺寸后面
   */
  themeSizeAppend?: {
    /**
     * 主题尺寸名称，用于页面文字渲染
     */
    name: string;
    /**
     * 主题尺寸标识，在 html 标签的 size 属性添加该标识
     */
    size: string;
  }[];
  /**
   * 主题尺寸的名称修改
   */
  themeSizeLabel?: {
    /**
     * @default 'Wide'
     */
    wide?: string;
    /**
     * @default 'Large'
     */
    large?: string;
    /**
     * @default 'Default'
     */
    default?: string;
    /**
     * @default 'Small'
     */
    small?: string;
  };
  /**
   * 回到顶部后的回调
   */
  backTopDone?: (TkMessage: Message) => void;
  /**
   * 滚动到评论后的回调
   */
  toCommentDone?: (TkMessage: Message) => void;
  /**
   * 鼠标悬停时标题提示文案
   */
  titleTip?: {
    /**
     * @default '回到顶部'
     */
    backTop?: string;
    /**
     * @default '前往评论'
     */
    toComment?: string;
    /**
     * @default '主题尺寸'
     */
    themeSize?: string;
    /**
     * @default '主题样式'
     */
    themeStyle?: string;
  };
}
