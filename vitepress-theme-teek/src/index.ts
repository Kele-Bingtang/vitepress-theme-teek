import type { TeekConfig } from "./config/types";
import type { BaiduAnalyticsOptions, GoogleAnalyticsOptions, UmamiAnalytics } from "./helper";
import DefaultTheme from "vitepress/theme";
import { defineClientComponent } from "vitepress";
import { TeekConfigProvider } from "./configProvider";
import { isClient, baiduAnalytics, trackPageview, googleAnalytics, umamiAnalytics } from "./helper";
import { TkLayout, TkCataloguePage, TkArchivesPage, TkDemoCode } from "./components";

import "./styles/index.scss";

export type { TkContentData, Post, GroupCardItem, FrontMatter } from "./post/types";
export type * from "./config/types";
export type DefaultThemeType = typeof DefaultTheme;

export * from "./assets";
export * from "./configProvider";
export * from "./components";
export * from "./helper";
export * from "./hooks";
export * from "./locale";
export * from "./markdown/helper";
export * from "./version";

export default {
  extends: DefaultTheme,
  Layout: TeekConfigProvider(TkLayout),
  enhanceApp({ app, siteData }) {
    app.component("TkCataloguePage", TkCataloguePage);
    app.component("TkArchivesPage", TkArchivesPage);

    // TkDemoCode 组件用到 DOM API，因此需要防止 SSR 构建报错
    const ClientTkDemoCode = defineClientComponent(async () => TkDemoCode);
    app.component("TkDemoCode", ClientTkDemoCode);

    // 站点分析
    const siteAnalytics = (siteData.value.themeConfig.siteAnalytics as TeekConfig["siteAnalytics"]) || [];
    const siteAnalysis: Record<string, (options: any) => void> = {
      baidu: (options: BaiduAnalyticsOptions) => {
        baiduAnalytics(options);
        if (isClient) trackPageview(options, window.location.href);
      },
      google: (options: GoogleAnalyticsOptions) => googleAnalytics(options),
      umami: (options: UmamiAnalytics) => umamiAnalytics(options),
    };

    siteAnalytics.forEach(item => {
      siteAnalysis[item.provider]?.(item.options);
    });
  },
} as DefaultThemeType & { extends: DefaultThemeType };
