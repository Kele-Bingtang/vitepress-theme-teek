import { isClient } from "../is";

export {};

declare global {
  interface Window {
    umami: Function;
  }
}

export interface UmamiAnalytics {
  id: string;
  src: string;
}

export type UmamiAnalyticsOptions = UmamiAnalytics | UmamiAnalytics[];

export const umamiAnalytics = (options: UmamiAnalyticsOptions, production = true) => {
  // 确保在浏览器环境下执行
  if (!isClient) return;
  // 确保在生产环境下执行
  if (production && process.env.NODE_ENV !== "production") return;

  let properties: UmamiAnalytics[] = [];

  // 如果是数组，展开并处理
  if (Array.isArray(options)) properties.push(...options);
  else properties.push(options);

  // 过滤掉没有 id 的属性
  properties = properties.filter(property => Boolean(property.id));

  // 如果没有有效的 Umami 配置，直接返回
  if (!properties.length) return;

  // 创建并插入 script 标签
  for (const property of properties) {
    const { id, src } = property;
    if (!document.querySelector(`#umami-analytics-${id}`)) {
      const script = document.createElement("script");
      script.id = `umami-analytics-${id}`;
      script.async = true;
      script.defer = true;
      script.setAttribute("data-website-id", id);
      script.src = src;
      document.head.appendChild(script);
    }
  }
};
