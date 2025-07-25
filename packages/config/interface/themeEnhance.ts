import type {
  ThemeColor,
  LayoutMode,
  SpotlightStyle,
  LayoutModeVal,
} from "../../components/theme/ThemeEnhance/src/themeEnhance";
import type { SegmentedOption } from "../../components/common/Segmented/src/segmented";

export interface ThemeEnhance {
  /**
   * 位置，top 为导航栏右侧，bottom 为右下角
   *
   * @default 'top'
   */
  position?: "top" | "bottom";
  /**
   * 布局切换配置
   */
  layoutSwitch?: {
    /**
     * 禁用布局切换
     */
    disabled?: boolean;
    /**
     * 布局切换的默认模式
     *
     * @default LayoutMode.Original
     */
    defaultMode?: LayoutMode | LayoutModeVal;
    /**
     * 切换布局成功后的回调
     *
     * @since 1.3.2
     */
    switchModeDone?: (mode: LayoutMode | LayoutModeVal) => void;
    /**
     * 禁用帮助提示
     *
     * @default false
     */
    disableHelp?: boolean;
    /**
     * 禁用布局切换动画
     */
    disableAnimation?: boolean;
    /**
     * 内容布局最大宽度的默认百分比，仅限 0-100
     *
     * @default 90 (90%)
     */
    defaultDocMaxWidth?: number;
    /**
     * 禁用帮助提示
     *
     * @default false
     */
    disableDocMaxWidthHelp?: boolean;
    /**
     * 页面布局最大宽度的默认百分比，仅限 0-100
     *
     * @default 95 (95%)
     */
    defaultPageMaxWidth?: number;
    /**
     * 禁用帮助提示
     *
     * @default false
     */
    disablePageMaxWidthHelp?: boolean;
  };
  /**
   * 布局主题色配置
   */
  themeColor?: {
    /**
     * 禁用布局主题色切换
     *
     * @default false
     */
    disabled?: boolean;
    /**
     * 布局默认主题色
     *
     * @default ThemeColor.vpDefault
     */
    defaultColor?:
      | ThemeColor
      | "vp-default"
      | "vp-green"
      | "vp-yellow"
      | "vp-red"
      | "ep-blue"
      | "ep-green"
      | "ep-yellow"
      | "ep-red";
    /**
     * 切换布局成功后的回调
     *
     * @since 1.3.2
     */
    switchColorDone?: (color: string) => void;
    /**
     * 是否将主题色扩散到其他元素（根据主题色计算其他元素需要的颜色）
     *
     * @default false
     */
    defaultSpread?: boolean;
    /**
     * 禁用帮助提示
     *
     * @default false
     */
    disableHelp?: boolean;
    /**
     * 是否在移动端禁用
     *
     * @default false
     */
    disabledInMobile?: boolean;
    /**
     * 自定义主题色，将会追加到内置主题色后面
     */
    append?: {
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
      options: SegmentedOption[];
    }[];
  };
  /**
   * 聚光灯配置
   */
  spotlight?: {
    /**
     * 禁用聚光灯
     *
     * @default false
     */
    disabled?: boolean;
    /**
     * 聚光灯默认样式
     *
     * @default SpotlightStyle.Aside
     */
    defaultStyle?: SpotlightStyle | "aside" | "under";
    /**
     * 禁用帮助提示
     *
     * @default false
     */
    disableHelp?: boolean;
    /**
     * 聚光灯默认开关状态
     *
     * @default true
     */
    defaultValue?: boolean;
  };
}
