import { nextTick, readonly, ref } from "vue";
import { isClient } from "@teek/helper";
import { useScopeDispose } from "./useScopeDispose";

export type UvPvProvider = "" | "busuanzi" | "vercount";

export interface UvPvData {
  /** 网站访问量 */
  site_pv?: number;
  /** 单页面访问量 */
  page_pv?: number;
  /** 网站访客数 */
  site_uv?: number;
  /** 单页面访客数 */
  page_uv?: number;
  /** 今日数据 */
  today?: {
    site_pv: number;
    site_uv: number;
    page_pv: number;
    page_uv: number;
  };
  /** 昨日数据 */
  yesterday?: {
    site_pv: number;
    site_uv: number;
    page_pv: number;
    page_uv: number;
  };
}

export interface UseUvPvOptions {
  /**
   * 统计接口地址
   */
  url?: string;
  /**
   * 网站流量统计提供商
   */
  provider?: UvPvProvider;
  /**
   * 如果请求接口失败，是否重试，类型 boolean
   *
   * @default false
   */
  tryRequest?: boolean;
  /**
   * 重试次数，仅当 tryRequest 为 true 时有效
   *
   * @default 5
   */
  tryCount?: number;
  /**
   * 重试间隔时间，单位毫秒，仅当 tryRequest 为 true 时有效
   *
   * @default 2000
   */
  tryIterationTime?: number;
  /**
   * 自定义请求函数，返回 UvPvData 数据
   *
   * @param url 统计接口地址
   * @param createScriptFn 创建一个 script 标签的函数
   */
  requestFn?: (url: string | undefined, createScriptFn: typeof createScript) => UvPvData | Promise<UvPvData>;
}

const DEFAULT_SITE_PV = 9999;
const DEFAULT_SITE_UV = 9999;
const DEFAULT_PAGE_PV = 9999;
const DEFAULT_PAGE_UV = 9999;
const DEFAULT_TODAY_DATA = {
  site_pv: 9999,
  site_uv: 9999,
  page_pv: 9999,
  page_uv: 9999,
};
const DEFAULT_YESTERDAY_DATA = {
  site_pv: 9999,
  site_uv: 9999,
  page_pv: 9999,
  page_uv: 9999,
};

/**
 * 统计网站访问量（busuanzi、vercount）
 *
 * @param immediate 是否初始化请求，即自动执行一次 request
 * @param options 配置项
 */
export const useUvPv = (immediate = false, options: UseUvPvOptions = {}) => {
  const { url, provider = "busuanzi", tryRequest = false, tryCount = 5, tryIterationTime = 2000, requestFn } = options;
  const sitePv = ref(0);
  const siteUv = ref(0);
  const pagePv = ref(0);
  const pageUv = ref(0);
  const today = ref({ site_pv: 0, site_uv: 0, page_pv: 0, page_uv: 0 });
  const yesterday = ref({ site_pv: 0, site_uv: 0, page_pv: 0, page_uv: 0 });
  const isGet = ref(true);

  const request = () => {
    if (!isClient) return;
    // 防止重复调用
    if (isGet.value === false) return;
    isGet.value = false;

    const call = async (url?: string): Promise<UvPvData> => {
      // 如果存在自定义请求函数，则使用自定义请求函数
      if (requestFn) {
        const response = await requestFn(url, createScript);
        // 触发自定义事件
        window.dispatchEvent(new CustomEvent("views", { detail: response }));

        return Promise.resolve(response);
      }

      // 可以在这里拓展更多的网站浏览统计提供商
      switch (provider) {
        case "busuanzi":
          return callBusuanzi(url);
        case "vercount":
          return callVercount(url);
        default:
          return callBusuanzi(url); // 默认 busuanzi 流量计时器
      }
    };

    // 调用网站流量统计器接口
    call(url || undefined).then(data => {
      sitePv.value = data.site_pv || DEFAULT_SITE_PV;
      siteUv.value = data.site_uv || DEFAULT_SITE_UV;
      pagePv.value = data.page_pv || DEFAULT_PAGE_PV;
      pageUv.value = data.page_uv || DEFAULT_PAGE_UV;
      today.value = data.today || DEFAULT_TODAY_DATA;
      yesterday.value = data.yesterday || DEFAULT_YESTERDAY_DATA;
      isGet.value = true;

      // 触发自定义事件
      window.dispatchEvent(new CustomEvent("views", { detail: data }));
    });
  };

  // 第一次调用
  immediate && nextTick(request);

  if (tryRequest) {
    let i = 0;

    const clearTimer = (timer: ReturnType<typeof setInterval> | null) => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    // 重试
    const timer = setInterval(() => {
      if (isGet.value) return clearTimer(timer);

      request();

      i += tryIterationTime;
      if (i > tryIterationTime * tryCount) clearTimer(timer);
    }, tryIterationTime);

    useScopeDispose(() => clearTimer(timer));
  }

  return {
    sitePv: readonly(sitePv),
    siteUv: readonly(siteUv),
    pagePv: readonly(pagePv),
    pageUv: readonly(pageUv),
    today: readonly(today),
    yesterday: readonly(yesterday),
    isGet: readonly(isGet),
    request,
  };
};

/**
 * 创建一个 script 标签
 */
export const createScript = (url: string, immediate = true) => {
  const scriptDom = document.createElement("script") as HTMLScriptElement;
  scriptDom.type = "text/javascript";
  scriptDom.defer = true;
  scriptDom.src = url;
  immediate && document.body.appendChild(scriptDom);

  return scriptDom;
};

/**
 * 请求 busuanzi 计时器数据
 *
 * @param url 请求链接，默认为官方提供的链接，自建的需要手动传入
 */
export const callBusuanzi = (
  url = "//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback"
): Promise<UvPvData> => {
  const jsonpCallback = "BusuanziCallback_" + Math.floor(1099511627776 * Math.random());
  url = url.replace("=BusuanziCallback", "=" + jsonpCallback);

  const scriptDom = createScript(url);
  scriptDom.referrerPolicy = "no-referrer-when-downgrade";

  let response: UvPvData;

  // busuanzi 请求成功后，自动触发该函数进行数据赋值（busuanzi 返回值是一个 jsonpCallback 函数，因此浏览器自动触发该函数）
  (window as any)[jsonpCallback] = (data: UvPvData) => (response = data);

  return new Promise((resolve, reject) => {
    scriptDom.onload = () => {
      resolve(response);

      // 清除 script 元素
      setTimeout(() => {
        document.body.removeChild(scriptDom);
      }, 10);
    };
    scriptDom.onerror = () => reject("Error Loading " + url);
  });
};

/**
 * 请求 vercount 计时器数据
 *
 * @param url 请求链接，默认为官方提供的链接，自建的需要手动传入
 * @param timeout 请求超时时间，5000 是 vercount 默认的超时时间
 */
export const callVercount = async (url = "//events.vercount.one/js", timeout = 5000): Promise<UvPvData> => {
  // 先清除旧数据
  localStorage.removeItem("visitorCountData");

  const scriptDom = createScript(url);

  return new Promise((resolve, reject) => {
    scriptDom.onload = () => {
      const intervalTime = 500;
      let count = timeout / intervalTime;

      // vercount 请求数据成功后，会存入 localStorage 里，但是因为请求有网络延迟，所以需要不断尝试去获取数据，尝试成功或者尝试 count 次后，不再尝试
      const timer = setInterval(() => {
        count--;
        if (count <= 0) {
          clearInterval(timer);
          resolve({});
        }

        const visitorCountData = localStorage.getItem("visitorCountData");
        if (visitorCountData) {
          clearInterval(timer);
          resolve(JSON.parse(visitorCountData));
        }
      }, intervalTime);

      // 清除 script 元素
      setTimeout(() => {
        document.body.removeChild(scriptDom);
      }, 10);
    };
    scriptDom.onerror = () => reject("Error Loading " + url);
  });
};

export type UseUvPvReturn = ReturnType<typeof useUvPv>;
