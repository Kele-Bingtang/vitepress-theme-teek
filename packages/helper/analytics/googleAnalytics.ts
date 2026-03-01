import { isClient } from "../is";

declare const dataLayer: any[];
declare const gtag: (...args: any[]) => void;

export {};

declare global {
  interface Window {
    dataLayer?: typeof dataLayer;
    gtag?: typeof gtag;
  }
}

export interface GoogleAnalyticsOptions {
  /**
   * 谷歌分析 ID
   */
  id: string;
  /**
   * 是否仅在生产环境下上报
   */
  production?: boolean;
}

export const googleAnalytics = (options: GoogleAnalyticsOptions) => {
  // 确保在浏览器环境下执行
  if (!isClient) return;
  if (window.dataLayer && window.gtag) return;

  const { id, production = true } = options || {};
  // 确保在生产环境下执行
  if (production && process.env.NODE_ENV !== "production") return;
  if (!id) return console.warn("[Teek Warning] Google analytics id is empty");

  if (!document.querySelector(`#google-analytics-${id}`)) {
    const gtagScript = document.createElement("script");
    gtagScript.id = `google-analytics-${id}`;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    gtagScript.async = true;
    document.head.appendChild(gtagScript);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      dataLayer.push(arguments);
    };

    gtag("js", new Date());
    gtag("config", id);
  }
};
