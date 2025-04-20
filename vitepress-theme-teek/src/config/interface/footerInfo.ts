import type { Social } from "./social";

export interface FooterInfo {
  /**
   * 页脚信息，支持 HTML 格式（位于主题版权上方）
   */
  topMessage?: string | string[];
  /**
   * 页脚信息，支持 HTML 格式（位于主题版权下方）
   */
  bottomMessage?: string | string[];
  /**
   * 主题版权配置
   */
  theme?: Social & {
    /**
     * 是否显示
     */
    show?: boolean;
  };
  /**
   * 博客版权配置
   */
  copyright?: Social & {
    /**
     * 是否显示
     */
    show?: boolean;
    /**
     * 创建年份
     */
    createYear?: number | string;
    /**
     * 后缀
     */
    suffix?: string;
  };
  /**
   * ICP 备案信息配置
   */
  icpRecord?: Social;
  /**
   * 网络安全备案信息配置
   */
  securityRecord?: Social;
  /**
   * 自定义 HTML 片段
   */
  customHtml?: string;
}
