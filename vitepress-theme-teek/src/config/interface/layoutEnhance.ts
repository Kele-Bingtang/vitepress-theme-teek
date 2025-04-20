import { LayoutThemeColor, LayoutMode, SpotlightStyle } from "../../components/theme/LayoutEnhance/src/layoutEnhance";

export interface LayoutEnhance {
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
    defaultMode?: LayoutMode | "fullWidth" | "sidebarWidthAdjustableOnly" | "bothWidthAdjustable" | "original";
    /**
     * 禁用布局切换帮助提示
     *
     * @default false
     */
    disableHelp?: boolean;
    /**
     * 内容布局最大宽度滑块配置
     */
    docLayoutMaxWidth?: {
      /**
       * 内容布局最大宽度的默认百分比
       *
       * @default 80 (80%)
       */
      defaultMaxWidth?: number;
      /**
       * 禁用内容布局最大宽度帮助提示
       *
       * @default false
       */
      disableHelp?: boolean;
    };
    /**
     * 页面布局最大宽度滑块配置
     */
    pageLayoutMaxWidth?: {
      /**
       * 页面布局最大宽度的默认百分比
       *
       * @default 100 (100%)
       */
      defaultMaxWidth?: number;
      /**
       * 禁用页面布局最大宽度帮助提示
       *
       * @default false
       */
      disableHelp?: boolean;
      /**
       * 禁用布局最大宽度动画
       */
      disableAnimation?: boolean;
    };
  };
  /**
   * 布局主题色配置
   */
  layoutThemeColor?: {
    /**
     * 禁用布局主题色切换
     */
    disabled?: boolean;
    /**
     * 布局默认主题色
     *
     * @default LayoutThemeColor.vpDefault
     */
    defaultColor?:
      | LayoutThemeColor
      | "vp-default"
      | "vp-green"
      | "vp-yellow"
      | "vp-red"
      | "el-blue"
      | "el-green"
      | "el-yellow"
      | "el-red";
    /**
     * 禁用聚光灯帮助提示
     *
     * @default false
     */
    disableHelp?: boolean;
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
     * 禁用聚光灯帮助提示
     *
     * @default false
     */
    disableHelp?: boolean;
    /**
     * 聚光灯默认开关状态
     *
     * @default false
     */
    defaultToggle?: boolean;
  };
}
