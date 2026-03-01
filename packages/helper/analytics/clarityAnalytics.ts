import { isClient } from "../is";

declare const dataLayer: any[];
declare const clarity: (...args: any[]) => void;
declare global {
  interface Window {
    clarity?: typeof clarity & {
      q?: typeof dataLayer;
    };
  }
}

export interface ClarityAnalyticsOptions {
  /**
   * Microsoft Clarity 分析 ID
   */
  id: string;
  /**
   * 是否仅在生产环境下上报
   */
  production?: boolean;
}

export const clarityAnalytics = (options: ClarityAnalyticsOptions) => {
  // 确保在浏览器环境下执行
  if (!isClient) return;
  if (window.clarity && window.clarity.q) return;

  const { id, production = true } = options || {};
  // 确保在生产环境下执行
  if (production && process.env.NODE_ENV !== "production") return;
  if (!id) return console.warn("[Teek Warning] Microsoft Clarity analytics id is empty");

  if (!document.querySelector(`#clarity-analytics-${id}`)) {
    const clarityScript = document.createElement("script");
    clarityScript.id = `clarity-analytics-${id}`;
    clarityScript.async = true;
    clarityScript.src = `https://www.clarity.ms/tag/${id}`;
    document.head.appendChild(clarityScript);
    window.clarity ??= function () {
      (window.clarity!.q ??= []).push(arguments);
    };
  }
};
