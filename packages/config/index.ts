import type { DefaultTheme, HeadConfig, UserConfig } from "vitepress";
import type { TeekConfig } from "./types";
import {
  todoPlugin,
  shareCardPlugin,
  imgCardPlugin,
  navCardPlugin,
  demoPlugin,
  videoPlugin,
  containerPlugin,
  createContainersThenUse,
} from "../markdown";
import { registerPluginAndGet } from "./vitePlugins";

export { createRewrites } from "vitepress-plugin-permalink";
export { ThemeColorName, LayoutMode, SpotlightStyle } from "../components/theme/ThemeEnhance/src/themeEnhance";
export type * from "./types";

export const defineTeekConfig = (config: TeekConfig & UserConfig<DefaultTheme.Config> = {}): UserConfig => {
  const { vitePlugins, markdown = {}, ...teekConfig } = config;

  const plugins = registerPluginAndGet(vitePlugins, teekConfig.teekTheme);

  const head: HeadConfig[] = [];

  if (teekConfig.docAnalysis?.statistics?.provider === "busuanzi") {
    // 不蒜子 API 统计需要
    head.push(["meta", { name: "referrer", content: "no-referrer-when-downgrade" }]);
  }

  return {
    // 使用永久链接插件需要忽略死链提醒
    ignoreDeadLinks: true,
    metaChunk: true,
    head,
    vite: {
      plugins: plugins,
      ssr: { noExternal: ["vitepress-theme-teek"] },
      // 解决项目启动后终端打印 Scss 的废弃警告：The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
      css: { preprocessorOptions: { scss: { api: "modern" } } },
    },
    markdown: {
      config: md => {
        [todoPlugin, shareCardPlugin, imgCardPlugin, navCardPlugin, videoPlugin].forEach(plugin => md.use(plugin));

        const { container = {}, demo, config } = markdown;
        if (!demo?.disabled) md.use(demoPlugin, demo).use(containerPlugin, container.label);
        // 创建用户配置的自定义容器
        createContainersThenUse(md, container.config?.() || []);

        // 用户自定义 markdown 插件
        config?.(md);
      },
    },
    themeConfig: teekConfig,
  };
};
