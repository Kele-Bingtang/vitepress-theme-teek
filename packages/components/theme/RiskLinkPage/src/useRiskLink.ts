import { useEventListener, useScopeDispose } from "@teek/composables";
import { usePagePath } from "@teek/components/theme/ConfigProvider";
import { isClient, isString } from "@teek/helper";
import { withBase } from "vitepress";
import { nextTick } from "vue";

export interface UseRiskLinkOptions {
  /**
   * 白名单，支持正则表达式
   */
  whitelist?: Array<RegExp | string>;
  /**
   * 黑名单，支持正则表达式
   *
   * @remark 如果设置了黑名单，则只拦截黑名单的链接
   */
  blacklist?: Array<RegExp | string>;
}

export const useRiskLink = (options: UseRiskLinkOptions = {}) => {
  // 缓存已注册的链接，避免下次重新注册
  const riskLinks = new Set<HTMLAnchorElement>();
  // 缓存已注册的清理函数，在组件卸载时，依次调用
  const cleanups: Function[] = [];
  const { riskLinkPath } = usePagePath();

  const { whitelist = [], blacklist = [] } = options;

  /**
   * 判断数组中是否存在某个元素，支持正则表达式
   */
  const isSome = (arr: Array<string | RegExp>, name: string) => {
    return arr.some(
      item => item === name || (isString(item) && name.startsWith(item)) || (item instanceof RegExp && item.test(name))
    );
  };

  /**
   * 是否为风险链接
   */
  const isRiskLink = (url: string, currentDomain: string) => {
    const link = new URL(url, window.location.origin);
    return link.hostname !== currentDomain && !isSome(whitelist, url);
  };

  const start = async () => {
    await nextTick();
    if (!isClient) return;

    document.querySelectorAll("a").forEach(link => {
      const href = link.getAttribute("href");
      const currentDomain = window.location.hostname;

      if (!href || riskLinks.has(link)) return;
      // 如果设置了黑名单，则只拦截黑名单的链接
      if (blacklist.length && !isSome(blacklist, href)) return;
      // 判断是否为外链
      if (!isRiskLink(href, currentDomain)) return;

      riskLinks.add(link);
      const stop = useEventListener(link, "click", e => {
        e.preventDefault(); // 阻止默认跳转

        // 跳转到风险提示页面，并将目标 URL 作为参数传递
        const encodedUrl = encodeURIComponent(href);
        window.open(`${withBase(riskLinkPath.value)}?target=${encodedUrl}`);
      });

      cleanups.push(stop);
    });
  };

  const stop = () => {
    cleanups.forEach(fn => fn());
    cleanups.length = 0;
    riskLinks.clear();
  };

  const restart = () => {
    stop();
    start();
  };

  useScopeDispose(stop);

  return { start, stop, restart };
};
