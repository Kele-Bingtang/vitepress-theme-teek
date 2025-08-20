import type { Plugin, ViteDevServer } from "vite";
import type { DefaultTheme } from "vitepress";
import type { Permalink, PermalinkOption } from "./types";
import createPermalinks, { standardLink } from "./helper";
import { dirname, join } from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { getLocalePermalink } from "./rewrites";
import logger from "./log";

export * from "./types";
export { createRewrites } from "./rewrites";

/**
 * 默认暴露 2 个插件集
 */
export default function VitePluginVitePressPermalink(option: PermalinkOption = {}) {
  return [VitePluginVitePressAutoPermalink(option), VitePluginVitePressUsePermalink(option)];
}

/**
 * 扫描项目目录，生成 permalink
 */
export function VitePluginVitePressAutoPermalink(option: PermalinkOption = {}): Plugin & { name: string } {
  let isExecute = false;
  let vitepressConfig: any = {};

  return {
    name: "vite-plugin-vitepress-auto-permalink",
    config(config: any) {
      // 防止 vitepress build 时重复执行
      if (isExecute) return;
      isExecute = true;

      const {
        site: { themeConfig, cleanUrls, locales },
        srcDir,
        rewrites,
        userConfig,
      } = config.vitepress;
      vitepressConfig = config.vitepress;

      // 如果使用 ./rewrites.ts 的 createRewrites 创建的 rewrites，则不走当前逻辑
      if (userConfig?.rewrites?.__create__ === "vitepress-plugin-permalink") return;

      const baseDir = option.path ? join(srcDir, option.path) : srcDir;
      const permalinks = createPermalinks({ ...option, path: baseDir }, cleanUrls);

      // Key 为 path，Value 为 permalink
      const pathToPermalink: Record<string, string> = {};
      // Key 为 permalink，Value 为 path
      const permalinkToPath: Record<string, string> = {};
      // 国际化多语言 key 数组
      const localesKeys = Object.keys(locales || {});

      for (const [key, value] of Object.entries(permalinks)) {
        // 如果设置了 rewrites，则取 rewrites 后的文件路径
        const rewriteFilePath = rewrites.map[`${key}.md`]?.replace(/\.md/, "") || key;
        // 如果设置了多语言，则 permalink 添加语言前缀
        const newValue = getLocalePermalink(localesKeys, key, value);

        if (permalinkToPath[newValue]) {
          logger.warn(`永久链接 '${newValue}' 已存在，其对应的 '${permalinkToPath[newValue]}' 将会被 '${key}' 覆盖`);
        }

        pathToPermalink[rewriteFilePath] = newValue;
        permalinkToPath[newValue] = rewriteFilePath;
      }

      themeConfig.permalinks = { map: pathToPermalink, inv: permalinkToPath } as Permalink;

      logger.info("Injected Permalinks Data Successfully. 注入永久链接数据成功!");

      // 导航栏高亮适配 permalink
      if (!localesKeys.length) {
        return setActiveMatchWhenUsePermalink({
          nav: themeConfig.nav,
          permalinkToPath,
          rewrites,
          cleanUrls,
        });
      }

      localesKeys.forEach(localeKey => {
        setActiveMatchWhenUsePermalink({
          nav: locales[localeKey].themeConfig?.nav,
          permalinkToPath,
          rewrites,
          cleanUrls,
        });
      });
    },
    // 仅限 dev 环境生效
    configureServer(server: ViteDevServer) {
      const {
        site: {
          base,
          themeConfig: { permalinks },
        },
        rewrites,
      } = vitepressConfig;
      if (!permalinks) return;

      // 将 permalink 重写实际文件路径
      server.middlewares.use((req, _res, next) => {
        if (req.url && req.url.includes(".md")) {
          const reqUrl = decodeURI(req.url)
            .replace(/[?#].*$/, "")
            .replace(/\.md$/, "")
            .slice(base.length);

          // 确保 path 以 / 开头
          const path = "/" + reqUrl.replace(/^\//, "");
          // 如果访问链接 reqUrl 为 permalink，则找到对应的文档路由。当开启 cleanUrls 后，permalinks 内容都是 .html 结尾
          const filePath = permalinks.inv[path] || permalinks.inv[`${path}.html`];
          // 如果设置了 rewrites，则取没有 rewrites 前的实际文件地址
          const realFilePath = rewrites.inv[`${filePath}.md`]?.replace(/\.md/, "") || filePath;

          // 如果文档路由 realFilePath 存在，则替换 URL 实现跳转，防止页面 404
          if (realFilePath) req.url = req.url.replace(encodeURI(reqUrl), encodeURI(realFilePath));
        }
        next();
      });
    },
  };
}

interface SetActiveMatchWhenUsePermalinkOption {
  /**
   * 导航栏
   */
  nav: (DefaultTheme.NavItemWithLink & { items: any })[];
  /**
   * permalink 和文件路径的映射关系
   */
  permalinkToPath: Record<string, string>;
  /**
   * 如果设置了 rewrites，则取 rewrites 后的文件路径
   */
  rewrites?: Record<string, any>;
  /**
   * vitepress 配置项，true 关闭 .html 后缀，false 开启 .html 后缀
   */
  cleanUrls?: boolean;
}

/**
 * 如果 nav 有 link 且 link 为 permalink，则添加 activeMatch 为 permalink 对应的文件路径，如果没有 link，则代表是下拉组，activeMatch 为子级的上一层目录
 * 这里的处理是导航栏兼容 permalink 的高亮功能，默认访问 permalink 后，导航栏不会高亮，因为导航栏是根据实际的文件路径进行匹配
 *
 * @param option 配置项
 * @param parentNav 父级导航
 */
const setActiveMatchWhenUsePermalink = (
  option: SetActiveMatchWhenUsePermalinkOption,
  parentNav?: DefaultTheme.NavItemWithLink
) => {
  const { nav = [], permalinkToPath, rewrites = {}, cleanUrls = false } = option;

  if (!nav.length) return;

  nav.forEach(item => {
    if (item.link === "/" || item.activeMatch) return;

    const link = standardLink(item.link);
    // cleanUrls 为 false 时，permalinkToPath 的 key 都会带上 .html
    const path = permalinkToPath[cleanUrls ? link : `${link.replace(/\.html/, "")}.html`];

    if (path) {
      // 如果设置了 rewrites，则取 rewrites 后的文件路径
      const finalPath = rewrites.map[`${path}.md`]?.replace(/\.md/, "") || path;

      item.activeMatch = finalPath;
      // 父级的 activeMatch 为子级的上一层目录，这样访问任意子级 Markdown 链接，父级导航会高亮
      if (parentNav) parentNav.activeMatch = finalPath.slice(0, finalPath.lastIndexOf("/"));
    }

    if (item.items?.length) {
      setActiveMatchWhenUsePermalink({ nav: item.items, permalinkToPath, rewrites, cleanUrls }, item);
    }
  });
};
const isESM = () => {
  return typeof __filename === "undefined" || typeof __dirname === "undefined";
};

const getDirname = () => {
  return isESM() ? dirname(fileURLToPath(import.meta.url)) : __dirname;
};

/**
 * 1、将 UsePermalink 组件传入 VitePress 的 layout-bottom 插槽
 * 2、将 NotFoundDelay 组件传入 VitePress 的 not-found 插槽
 */
export function VitePluginVitePressUsePermalink(option: PermalinkOption = {}): Plugin & { name: string } {
  const usePermalinkFile = `usePermalink`;
  const aliasUsePermalinkFile = `${getDirname()}/${usePermalinkFile}`;

  const NotFoundDelayComponentName = "NotFoundDelay";
  const NotFoundDelayComponentFile = `${NotFoundDelayComponentName}.vue`;
  const aliasNotFoundDelayComponentFile = `${getDirname()}/components/${NotFoundDelayComponentFile}`;
  const virtualModuleId = "virtual:not-found-option";
  const resolvedVirtualModuleId = `\0${virtualModuleId}`;

  let disabledPlugin = false;

  return {
    name: "vite-plugin-vitepress-use-permalink",
    config(config: any) {
      const { userConfig } = config.vitepress;

      // 如果使用 ./rewrites.ts 的 createRewrites 创建的 rewrites，则不走当前逻辑
      if (userConfig?.rewrites?.__create__ === "vitepress-plugin-permalink") disabledPlugin = true;
      else {
        return {
          resolve: {
            alias: {
              [`./${usePermalinkFile}`]: aliasUsePermalinkFile,
              [`./${NotFoundDelayComponentFile}`]: aliasNotFoundDelayComponentFile,
            },
          },
        };
      }
    },
    resolveId(id: string) {
      if (disabledPlugin) return;

      if (id === virtualModuleId) return resolvedVirtualModuleId;
    },
    load(id: string) {
      if (disabledPlugin) return;

      // 使用虚拟模块将 option 传入组件里
      if (id === resolvedVirtualModuleId) return `export default ${JSON.stringify(option)}`;

      // 在 Layout.vue 插槽插入自定义组件
      if (id.endsWith("vitepress/dist/client/theme-default/Layout.vue")) {
        // 读取原始的 Vue 文件内容
        const code = readFileSync(id, "utf-8");

        const slotName = "not-found";
        const notFoundSlotPosition = `<slot name="${slotName}" />`;
        const setupPosition = '<script setup lang="ts">';

        // 插入自定义组件
        return code
          .replace(
            notFoundSlotPosition,
            `<${NotFoundDelayComponentName}><template #${slotName}>${notFoundSlotPosition}</template></${NotFoundDelayComponentName}>`
          )
          .replace(
            setupPosition,
            `${setupPosition}\nimport ${usePermalinkFile} from './${usePermalinkFile}'\nimport ${NotFoundDelayComponentName} from './${NotFoundDelayComponentFile}'`
          )
          .replace("</script>", `${usePermalinkFile}().startWatch() </script>`);
      }
    },
  };
}
