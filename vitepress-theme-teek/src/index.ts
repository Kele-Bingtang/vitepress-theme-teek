import type { TeekConfig } from "./config/types";
import DefaultTheme from "vitepress/theme";
import { defineClientComponent, inBrowser } from "vitepress";
import { configProvider } from "./configProvider";
import {
  baiduAnalytics,
  trackPageview,
  googleAnalytics,
  umamiAnalytics,
  type BaiduAnalyticsOptions,
  type GoogleAnalyticsOptions,
  type UmamiAnalytics,
} from "./helper";
import "./styles/index.scss";
import { TkCataloguePage, TkArchivesPage, TkDemoCode } from "./components";
import Layout from "./layout/index.vue";

export type { TkContentData, Post, GroupCardItem, FrontMatter } from "./post/types";
export type * from "./config/types";
export type DefaultThemeType = typeof DefaultTheme;

export * from "./assets/icons";
export * from "./configProvider";
export * from "./components";
export * from "./helper";
export * from "./hooks";
export * from "./locale";
export * from "./markdown/helper";
export * from "./version";

export default {
  extends: DefaultTheme,
  Layout: configProvider(Layout),
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
        if (inBrowser) trackPageview(options, window.location.href);
      },
      google: (options: GoogleAnalyticsOptions) => googleAnalytics(options),
      umami: (options: UmamiAnalytics) => umamiAnalytics(options),
    };

    siteAnalytics.forEach(item => {
      siteAnalysis[item.provider]?.(item.options);
    });
  },
} as DefaultThemeType & { extends: DefaultThemeType };
