import type { BaiduAnalyticsOptions, GoogleAnalyticsOptions, UmamiAnalyticsOptions } from "../../helper";

export type SiteAnalytics<T extends keyof SiteAnalyticsProvider = ""> = {
  /**
   * 赞赏位置
   */
  provider: T;
  /**
   * 赞赏配置
   */
  options?: SiteAnalyticsProvider[T];
};

export type SiteAnalyticsProvider = {
  "": object;
  baidu: BaiduAnalyticsOptions;
  google: GoogleAnalyticsOptions;
  umami: UmamiAnalyticsOptions;
};
