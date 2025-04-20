import type { IconProps } from "../../components/common/Icon/src/icon";

export type Appreciation<T extends keyof AppreciationPosition = ""> = {
  /**
   * 赞赏位置
   */
  position: T;
  /**
   * 赞赏配置
   */
  options?: AppreciationPosition[T];
};

export type AppreciationPosition = {
  "": object;
  "doc-after": {
    /**
     * 自定义按钮 HTML
     */
    buttonHtml?: string;
    /**
     * 赞赏图标，内置 weChatPay 和 alipay
     */
    icon?: IconProps["icon"] | "weChatPay" | "alipay";
    /**
     * 展开标题，支持 HTML
     */
    expandTitle?: string;
    /**
     * 折叠标题，支持 HTML
     */
    collapseTitle?: string;
    /**
     * 赞赏内容，支持 HTML
     */
    content?: string;
    /**
     * 是否默认展开
     *
     * @default false
     */
    expand?: boolean;
  };
  "aside-bottom": {
    /**
     * 赞赏标题，支持 HTML
     */
    title?: string;
    /**
     * 赞赏内容，支持 HTML
     */
    content?: string;
  };
};
