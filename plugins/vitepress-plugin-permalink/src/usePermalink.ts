import { useRouter, useData } from "vitepress";
import { nextTick, onBeforeMount } from "vue";

/**
 * 监听永久链接跳转
 *
 * @param executeBeforeMountFn 是否执行 beforeMount 阶段，当只要获取 teyGetFilePathByPermalink 函数时，可以设置为 false，避免重复执行 beforeMount 阶段
 */
export default function usePermalink(executeBeforeMountFn = true) {
  const fakeHost = "http://a.com";
  const router = useRouter();
  const { site, theme, localeIndex } = useData();
  const { base, cleanUrls } = site.value;
  const { permalinks = {} } = theme.value;
  const permalinkKeys = Object.keys(permalinks);

  /**
   * 判断路由是否为文档路由，
   * 1、如果为文档路由，则替换为 permalink
   * 2、如果为 permalink，则跳转到文档路由，然后重新触发该方法的第 1 点，即将文档路由替换为 permalink（先加载 404 页面再瞬间跳转文档路由）
   *
   * @param href 访问的文档地址或 permalink
   */
  const replaceUrlWhenPermalinkExist = async (href: string) => {
    if (!permalinkKeys.length) return;

    const { pathname, search, hash } = new URL(href, fakeHost);
    // 解码，支持中文
    const decodePath = decodeURIComponent(pathname.slice(base.length));
    const permalink = permalinks.map[decodePath.replace(/\.html/, "")];

    // 如果当前 pathname 和 permalink 相同，则不需要处理
    if (permalink === "/" + decodePath) return;

    if (permalink) {
      // 存在 permalink 则在 URL 替换
      return nextTick(async () => {
        const to = base.replace(/\/$/, "") + permalink + search + hash;
        history.replaceState(history.state || null, "", to);

        await router.onAfterUrlLoad?.(to);
      });
    }

    // 不存在 permalink 则获取文档地址来跳转（router.onBeforeRouteChange 在跳转前已经执行了该逻辑，因此只要在 onBeforeMount 触发，用于兜底
    const filePath = teyGetFilePathByPermalink(pathname);
    if (filePath) {
      const targetUrl = base + filePath + search + hash;

      // router.go 前清除当前历史记录，防止 router.go 后浏览器返回时回到当前历史记录时，又重定向过去，如此反复循环
      history.replaceState(history.state || null, "", targetUrl);
      await router.go(targetUrl);
    } else await router.onAfterUrlLoad?.(href);
  };

  if (executeBeforeMountFn) {
    onBeforeMount(async () => {
      if (!router.state.permalinkPlugin) router.state = { ...router.state, permalinkPlugin: true };
      await replaceUrlWhenPermalinkExist(window.location.href);
    });
  }

  /**
   * 尝试通过路由地址获取文件地址（当路由地址为 permalink 时才有值返回，否则返回空）
   *
   * @param pathname 访问的文档地址或 permalink
   */
  const teyGetFilePathByPermalink = (pathname: string) => {
    const decodePath =
      "/" +
      decodeURIComponent(pathname.slice(base.length))
        .replace(/\/$/, "")
        .replace(/\.html/, "");

    const li = localeIndex.value;
    // 假设为 permalink
    const maybeIsPermalink = cleanUrls ? decodePath : decodePath + ".html";
    // 实际的文件路径
    let filePath = "";

    // 使用场景；当文档内通过 []() 来引入一个 permalink 且 permalink 为 /xx 时，该方法自动拼接多语言 如 /en/xx 来获取文件地址
    if (li !== "root" && !maybeIsPermalink.startsWith(`/${li}/`)) {
      filePath = permalinks.inv[`/${li}${maybeIsPermalink}`];
    } else filePath = permalinks.inv[maybeIsPermalink];

    // 如果获取的文件路径和访问的路由地址一致，则返回空，不需要重复跳转
    if (`/${filePath}` === decodePath) return "";
    return filePath;
  };

  /**
   * 监听路由变化（刷新页面不会触发），处理路由地址
   */
  const startWatch = () => {
    if (!permalinkKeys.length) return;

    const state = router.state || {};
    // 防止重复在 router 添加函数
    if (state.permalinkPlugin) return;

    const selfOnBeforeRouteChange = router.onBeforeRouteChange;
    router.onBeforeRouteChange = async (href: string) => {
      // 调用已有的 onBeforeRouteChange
      const selfResult = await selfOnBeforeRouteChange?.(href);
      if (selfResult === false) return false;
      if (href === base) return;

      const { pathname, search, hash } = new URL(href, fakeHost);
      // 尝试获取文件路径（当 pathname 为 permalink 时才获取成功）
      const filePath = teyGetFilePathByPermalink(pathname);

      if (filePath) {
        const targetUrl = base + filePath + search + hash;
        await router.go(targetUrl);

        // 阻止本次路由跳转
        return false;
      }
    };

    const selfOnAfterRouteChange = router.onAfterRouteChange;
    router.onAfterRouteChange = async (href: string) => {
      // 如果 permalink 存在，则替换掉 URL
      await replaceUrlWhenPermalinkExist(href);
      // 调用已有的 onAfterRouteChange
      await selfOnAfterRouteChange?.(href);
    };

    router.state = { ...router.state, permalinkPlugin: true };
  };

  return { startWatch, teyGetFilePathByPermalink };
}
