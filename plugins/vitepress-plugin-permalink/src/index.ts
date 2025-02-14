import type { Plugin, ViteDevServer } from "vite";
import createPermalinks, { standardLink } from "./helper";
import type { PermalinkOption } from "./types";
import chalk from "chalk";
import { join } from "node:path";

export * from "./types";

export const log = (message: string, type = "yellow") => {
  console.log((chalk as any)[type](message));
};

export default function VitePluginVitePressPermalink(option: PermalinkOption = {}): Plugin & { name: string } {
  let vitepressConfig: any = {};

  return {
    name: "vite-plugin-vitepress-sidebar-permalink",
    config(config: any) {
      const {
        site: { themeConfig, cleanUrls, locales },
        srcDir,
      } = config.vitepress;

      option.base = option.base ? join(process.cwd(), option.base) : srcDir;

      const permalinks = createPermalinks(option, cleanUrls);

      // Key 为 path，Value 为 permalink
      const pathToPermalink: Record<string, string> = {};
      // Key 为 permalink，Value 为 path
      const permalinkToPath: Record<string, string> = {};
      // 多语言 key 数组，排除 root 根目录
      const localesKeys = Object.keys(locales || {});

      for (const [key, value] of Object.entries(permalinks)) {
        // 如果设置了多语言，则 permalink 添加语言前缀
        let newValue = getLocalePermalink(localesKeys, key, value);

        pathToPermalink[key] = newValue;

        if (permalinkToPath[newValue]) {
          log(`Permalink「${newValue}」已存在，其对应的「${permalinkToPath[newValue]}」将会被 ${key} 覆盖`);
        }

        permalinkToPath[newValue] = key;
      }

      themeConfig.permalinks = { map: pathToPermalink, inv: permalinkToPath };

      vitepressConfig = config.vitepress;

      if (!localesKeys.length) return setDefaultActiveMatch(themeConfig.nav, permalinkToPath, cleanUrls);

      localesKeys.forEach(localeKey => {
        setDefaultActiveMatch(locales[localeKey].themeConfig?.nav, permalinkToPath, cleanUrls);
      });
    },
    configureServer(server: ViteDevServer) {
      const {
        base,
        themeConfig: { permalinks, cleanUrls },
      } = vitepressConfig.site;
      // 重写 URL，这是在服务器环境中执行，此时还未到浏览器环境，因此在浏览器地址栏变化之前执行，即浏览器地址栏无延迟变化
      server.middlewares.use((req, _res, next) => {
        // req.url 为实际的文件资源地址，如 /guide/index.md，而不是浏览器的请求地址 /guide/index.html
        if (req.url) {
          const reqUrl = decodeURI(req.url)
            .replace(/[?#].*$/, "")
            .replace(/\.md$/, "")
            .slice(base.length);

          const finalReqUrl = reqUrl.startsWith("/") ? reqUrl : `/${reqUrl}`;
          // 如果访问链接 reqUrl 为 permalink，则找到对应的文档路由。当开启 cleanUrls 后，permalinks 内容都是 .html 结尾
          const pageUrl = permalinks.inv[cleanUrls ? finalReqUrl : `${finalReqUrl}.html`];

          // 如果找到文档路由，则跳转，防止页面 404。当开启 cleanUrls 后，得到的文档地址为 .html 结尾，因此需要替换为空
          if (pageUrl) req.url = req.url.replace(encodeURI(reqUrl), encodeURI(pageUrl));
        }

        next();
      });
    },
  };
}

/**
 * 给 permalink 添加多语言前缀
 * @param localesKeys 多语言 key 数组，排除 root 根目录
 * @param path 文件路径
 * @param permalink 永久链接
 */
const getLocalePermalink = (localesKeys: string[] = [], path = "", permalink = "") => {
  // 过滤掉 root 根目录
  const localesKey = localesKeys.filter(key => key !== "root").find(key => path.startsWith(key));
  if (localesKey) return `/${localesKey}${permalink.startsWith("/") ? permalink : `/${permalink}`}`;

  return permalink;
};

const setDefaultActiveMatch = (nav: any[] = [], permalinkToPath: Record<string, string>, cleanUrls = false) => {
  if (!nav.length) return;

  nav.forEach(item => {
    if (!item.link || item.link === "/") return;

    const link = standardLink(item.link);
    // cleanUrls 为 false 时，permalinkToPath 的 key 都会带上 .html
    const path = permalinkToPath[cleanUrls ? link : `${link.replace(/\.html/, "")}.html`];

    // 官方归档 activeMatch 是一个正则表达式字符串
    if (path && !item.activeMatch) item.activeMatch = path;
    if (item.items) setDefaultActiveMatch(item.items, permalinkToPath);
  });
};
