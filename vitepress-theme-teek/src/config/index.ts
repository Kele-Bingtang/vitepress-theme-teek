import type { DefaultTheme, HeadConfig, UserConfig } from "vitepress";
import type { TeekConfig } from "./types";
import type { Post, TkContentData } from "../post/types";
import { fileURLToPath } from "node:url";
import Sidebar from "vitepress-plugin-sidebar-resolve";
import Permalink from "vitepress-plugin-permalink";
import MdH1 from "vitepress-plugin-md-h1";
import Catalogue from "vitepress-plugin-catalogue";
import DocAnalysis from "vitepress-plugin-doc-analysis";
import FileContentLoader, { FileContentLoaderOptions } from "vitepress-plugin-file-content-loader";
import AutoFrontmatter from "vitepress-plugin-auto-frontmatter";
import { transformData, transformRaw } from "../post";
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
import { createCategory, createPermalink } from "./addFrontmatter";

export { LayoutThemeColor, LayoutMode, SpotlightStyle } from "../components/theme/LayoutEnhance/src/layoutEnhance";
export * from "./types";

export const defineTeekConfig = (config: TeekConfig & UserConfig<DefaultTheme.Config> = {}): UserConfig => {
  const { vitePlugins, markdown = {}, ...teekConfig } = config;
  const {
    sidebar = true,
    sidebarOption = {},
    permalink = true,
    permalinkOption = {},
    mdH1 = true,
    mdH1Option = {},
    catalogueOption = {},
    docAnalysis = true,
    docAnalysisOption = {},
    fileContentLoaderIgnore = [],
    autoFrontmatter = false,
    autoFrontmatterOption = {},
  } = vitePlugins || {};

  const plugins: any[] = [];

  // 定义各插件扫描时忽略的目录
  const ignoreDir = {
    autoFrontmatter: ["**/@pages/**", "**/.scripts/**"],
    sidebar: ["@pages", "@fragment", "examples", ".scripts"],
    mdH1: ["@pages", ".scripts"],
    docAnalysis: ["@pages", /目录页/, ".scripts"],
    fileContentLoader: ["**/components/**", "**/.vitepress/**", "**/public/**", "**/*目录页*/**", "**/.scripts/**"],
  };

  // 自动生成 frontmatter 插件，必须放在第一位
  if (autoFrontmatter) {
    const {
      pattern,
      globOptions = {},
      transform,
      permalinkPrefix = "pages",
      categories = true,
    } = autoFrontmatterOption;

    // 默认扫描全部 MD 文件
    if (!pattern) autoFrontmatterOption.pattern = "**/*.md";

    autoFrontmatterOption.globOptions = {
      ...autoFrontmatterOption.globOptions,
      ignore: [...ignoreDir.autoFrontmatter, ...(globOptions.ignore || [])],
    };

    // 自定义 frontmatter 内容，添加永久链接和分类
    autoFrontmatterOption.transform = (frontmatter, fileInfo) => {
      let transformResult = transform?.(frontmatter, fileInfo) || {};

      if (permalink && !frontmatter.permalink) {
        transformResult = { ...transformResult, ...createPermalink(permalinkPrefix) };
      }
      if (categories && !frontmatter.categories) {
        transformResult = { ...transformResult, ...createCategory(fileInfo, ["@fragment"]) };
      }

      return Object.keys(transformResult).length ? { ...frontmatter, ...transformResult } : undefined;
    };

    plugins.push(AutoFrontmatter(autoFrontmatterOption));
  }

  // 自动添加侧边栏插件
  if (sidebar) {
    sidebarOption.ignoreList = [...(sidebarOption?.ignoreList || []), ...ignoreDir.sidebar];
    plugins.push(Sidebar(sidebarOption));
  }
  // 自动生成永久链接插件
  if (permalink) {
    plugins.push(...Permalink({ permalinkOption: permalinkOption, notFoundOption: permalinkOption }));
  }
  // 自动给 MD 添加一级标题插件
  if (mdH1) {
    const selfBeforeInject = mdH1Option.beforeInject;
    mdH1Option.beforeInject = (frontmatter, id, title) => {
      if (frontmatter.layout === "cataloguePage" || frontmatter.catalogue) return false;
      if (frontmatter.layout === "archivesPage" || frontmatter.archivesPage) return false;

      return selfBeforeInject?.(frontmatter, id, title);
    };
    mdH1Option.ignoreList = [...(mdH1Option?.ignoreList || []), ...ignoreDir.mdH1];

    plugins.push(MdH1(mdH1Option));
  }
  // 文档内容分析插件
  if (docAnalysis) {
    docAnalysisOption.ignoreList = [...(sidebarOption?.ignoreList || []), ...ignoreDir.docAnalysis];
    plugins.push(DocAnalysis(docAnalysisOption));
  }

  // 主题强内置插件
  if (config.teekTheme !== false) {
    // 目录页插件
    plugins.push(Catalogue(catalogueOption));

    const fileContentLoaderOptions: FileContentLoaderOptions<TkContentData, Post> = {
      pattern: ["**/*.md"],
      // 指定摘录格式
      excerpt: "<!-- more -->",
      includeSrc: true,
      transformData,
      transformRaw,
      themeConfigKey: "posts",
      globOptions: {
        ignore: [...ignoreDir.fileContentLoader, ...fileContentLoaderIgnore],
      },
    };

    // Post 数据处理插件
    plugins.push(FileContentLoader<TkContentData, Post>(fileContentLoaderOptions));
  }

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
      resolve: {
        alias: {
          "@teek": fileURLToPath(new URL("..", import.meta.url)), // alias 为 src 目录
        },
      },
    },
    markdown: {
      config: md => {
        [todoPlugin, shareCardPlugin, imgCardPlugin, navCardPlugin, videoPlugin].forEach(plugin => md.use(plugin));

        const { container = {}, demo, config } = markdown;
        md.use(demoPlugin, demo).use(containerPlugin, container.label);
        // 创建用户配置的自定义容器
        createContainersThenUse(md, container.config?.() || []);

        // 用户自定义 markdown 插件
        config?.(md);
      },
    },
    themeConfig: teekConfig,
  };
};
