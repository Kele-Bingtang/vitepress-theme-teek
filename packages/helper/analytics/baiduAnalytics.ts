import { isClient, isString } from "../is";

export {};

declare global {
  interface Window {
    _hmt: any[]; // 百度统计
  }
}

export interface BaiduAnalyticsOptions {
  /**
   * 百度统计 ID
   */
  id: string;
  /**
   * 是否仅在生产环境下上报
   */
  production?: boolean;
}

/** 注册百度统计 */
export const baiduAnalytics = (options: BaiduAnalyticsOptions) => {
  // 确保在浏览器环境下执行
  if (!isClient) return;

  const { id, production = true } = options || {};
  // 确保在生产环境下执行
  if (production && process.env.NODE_ENV !== "production") return;
  if (!id) return console.warn("[Teek Warning] Baidu analytics id is empty");

  // 如果百度统计脚本未加载，则注入脚本
  if (!document.querySelector(`#baidu-analytics-${id}`)) {
    window._hmt = window._hmt || [];

    const script = document.createElement("script");
    script.id = `baidu-analytics-${id}`;
    script.async = true;
    script.src = `https://hm.baidu.com/hm.js?${id}`;
    document.querySelector("head")?.appendChild(script);
  }
};

/**
 * 上报页面视图
 *
 * @param baiduId - 百度统计 ID
 * @param pageUrl - 页面 URL
 */
export const trackPageview = (options: BaiduAnalyticsOptions, pageUrl: string) => {
  // 确保在浏览器环境下执行
  if (!isClient) return;

  const { id, production = true } = options || {};
  // 确保在生产环境下执行
  if (production && process.env.NODE_ENV !== "production") return;
  if (!id) return;
  if (!pageUrl || !isString(pageUrl)) pageUrl = "/";

  // 去除 URL 中的域名部分，只保留路径
  if (pageUrl.startsWith("http")) {
    const urlFragment = pageUrl.split("/");
    const origin = `${urlFragment[0]}//${urlFragment[2]}`;
    pageUrl = pageUrl.replace(origin, "");
  }

  // 上报 PV 数据
  if (window._hmt) {
    window._hmt.push(["_setAccount", id]);
    window._hmt.push(["_trackPageview", pageUrl]);
  }
};
