import type { EnhanceAppContext } from "vitepress";
import type { TeekConfig } from "@teek/config";
import type { BaiduAnalyticsOptions, GoogleAnalyticsOptions, UmamiAnalytics } from "@teek/helper";
import DefaultTheme from "vitepress/theme";
import { isClient, baiduAnalytics, trackPageview, googleAnalytics, umamiAnalytics } from "@teek/helper";
import {
  TeekConfigProvider,
  TkLayout,
  TkCataloguePage,
  TkArchivesPage,
  TkDemoCode,
  TkArticleOverviewPage,
  TkTitleTag,
  TkIcon,
  TkLoginPage,
  TkRiskLinkPage,
} from "@teek/components";

import "../theme-chalk/src/index.scss";

// 引入社交图标库
import "@teek/static/iconfont/social/iconfont.js";
import "@teek/static/iconfont/social/iconfont.css";

export type DefaultThemeType = typeof DefaultTheme;
export type * from "@teek/config";

export * from "@teek/static";
export * from "@teek/components";
export * from "@teek/helper";
export * from "@teek/composables";
export * from "@teek/locale";
export * from "@teek/markdown/helper";
export * from "./version";

export default {
  extends: DefaultTheme,
  Layout: TeekConfigProvider(TkLayout),
  async enhanceApp({ app, siteData, router }) {
    app.component("TkCataloguePage", TkCataloguePage);
    app.component("TkArchivesPage", TkArchivesPage);
    app.component("TkArticleOverviewPage", TkArticleOverviewPage);
    app.component("TkLoginPage", TkLoginPage);
    app.component("TkRiskLinkPage", TkRiskLinkPage);
    app.component("TkDemoCode", TkDemoCode);
    app.component("TkTitleTag", TkTitleTag);
    app.component("TkIcon", TkIcon);

    if (!isClient) return;
    const { themeConfig } = siteData.value;

    // 处理站点分析
    processSiteAnalytics(themeConfig);
    // 处理永久链接导致 404 问题
    if (themeConfig.permalinks) await processPermalinkNotFoundWhenFirstLoaded({ siteData, router });
  },
} as Omit<DefaultThemeType, "enhanceApp"> & {
  extends: DefaultThemeType;
  enhanceApp: (options: EnhanceAppContext) => Promise<void>;
};

/**
 * 处理站点分析
 */
const processSiteAnalytics = (themeConfig: any) => {
  // 站点分析
  const siteAnalytics = (themeConfig.siteAnalytics as TeekConfig["siteAnalytics"]) || [];
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
};

/**
 * 第一次访问页面时，处理永久链接导致 404 问题
 */
const processPermalinkNotFoundWhenFirstLoaded = async ({ siteData, router }: any) => {
  const { base, cleanUrls, themeConfig } = siteData.value;
  // 404 页面处理永久链接 404 问题（仅针对首次页面刷新）
  if (router.route.path === base && router.route.data.isNotFound) {
    const { pathname, search, hash } = new URL(location.href);
    const decodePath =
      "/" +
      decodeURIComponent(pathname.slice(base.length))
        .replace(/\/$/, "")
        .replace(/\.html/, "");

    const link = cleanUrls ? decodePath : decodePath + ".html";
    const filePath = themeConfig.permalinks.inv[link];

    // 通过永久链接获取的文件路径存在，则跳转
    if (filePath) {
      const targetUrl = base + filePath + search + hash;
      await router.go(targetUrl);
    }
  }
};
