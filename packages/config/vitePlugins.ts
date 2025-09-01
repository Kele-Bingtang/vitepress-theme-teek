import type { Plugins } from "./interface";
import type { PostData, TkContentData } from "./post/types";
import Sidebar from "vitepress-plugin-sidebar-resolve";
import Permalink from "vitepress-plugin-permalink";
import MdH1 from "vitepress-plugin-md-h1";
import Catalogue from "vitepress-plugin-catalogue";
import DocAnalysis from "vitepress-plugin-doc-analysis";
import FileContentLoader, { FileContentLoaderOptions } from "vitepress-plugin-file-content-loader";
import AutoFrontmatter, { FileInfo } from "vitepress-plugin-auto-frontmatter";
import { createCategory, handleCoverImg, handleTransformByRules, isRecordOrUndefined } from "./util/addFrontmatter";
import { transformData, transformRaw } from "./post";
import { TeekAutoFrontmatterOption, TransformRule } from "./interface/teekAutoFrontmatterOption";

export const registerPluginAndGet = (vitePlugins: Plugins = {}, teekTheme = true) => {
  const plugins: any[] = [];

  // 定义各插件扫描时忽略的目录
  const ignoreDir = {
    autoFrontmatter: ["**/@pages/**", "**/.scripts/**"],
    sidebar: ["@pages", "@fragment", "examples", ".scripts"],
    mdH1: ["@pages", ".scripts"],
    docAnalysis: ["@pages", /目录页/, ".scripts"],
    fileContentLoader: ["**/components/**", "**/.vitepress/**", "**/public/**", "**/*目录页*/**", "**/.scripts/**"],
  };

  plugins.push(...registerLoosePlugins(vitePlugins, ignoreDir));

  // 主题强内置插件
  if (teekTheme !== false) plugins.push(...registerTightPlugins(vitePlugins, ignoreDir));

  return plugins;
};

/**
 * 注册弱依赖插件（可通过配置项进行关闭）
 */
const registerLoosePlugins = (vitePlugins: Plugins, ignoreDir: Record<string, any[]>) => {
  const plugins: any[] = [];

  const {
    sidebar = true,
    sidebarOption = {},
    permalink = true,
    permalinkOption = {},
    mdH1 = true,
    mdH1Option = {},
    docAnalysis = true,
    docAnalysisOption = {},
    autoFrontmatter = false,
    autoFrontmatterOption = {},
  } = vitePlugins || {};

  // 自动生成 frontmatter 插件，必须放在第一位
  if (autoFrontmatter) {
    const {
      pattern,
      globOptions = {},
      transform,
      // 是否开启自动生成 categories
      categories = true,
      // 是否开启添加文档封面图
      enableCoverImg = false,
      // 是否开启强制覆盖封面图
      enableForceCoverImg = false,
      // 封面图列表
      coverImgList = [],
      // 是否开启生成永久链接
      enablePermalink = true,
      // 处理永久链接的规则
      permalinkRules = [],
    }: TeekAutoFrontmatterOption = autoFrontmatterOption;

    // 默认扫描全部 MD 文件
    if (!pattern) autoFrontmatterOption.pattern = "**/*.md";

    autoFrontmatterOption.globOptions = {
      ...autoFrontmatterOption.globOptions,
      ignore: [...ignoreDir.autoFrontmatter, ...(globOptions.ignore || [])],
    };

    // 自定义 frontmatter 内容，添加永久链接和分类
    autoFrontmatterOption.transform = (frontmatter: Record<string, any>, fileInfo: FileInfo) => {
      let transformResult = {};

      // 启用生成永久连接，并根据规则进行处理(跳过目录页)
      if (enablePermalink && frontmatter.catalogue !== true) {
        let finalPermalinkRules: TransformRule[] = permalinkRules;
        // 开启 permalink 功能但未提供规则时，添加默认规则
        if (permalinkRules?.length <= 0) {
          finalPermalinkRules = [{ folderName: "*", prefix: "/$path/$uuid5" }];
        }

        transformResult = {
          ...transformResult,
          ...handleTransformByRules(frontmatter.permalink, fileInfo, finalPermalinkRules),
        };
      }

      // 开启封面图并且封面图列表不为空
      if (enableCoverImg && coverImgList?.length > 0) {
        // 处理封面图
        transformResult = {
          ...transformResult,
          ...handleCoverImg(frontmatter.coverImg, coverImgList, enableForceCoverImg),
        };
      }

      // 开启分类功能
      if (categories && !frontmatter.categories) {
        transformResult = { ...transformResult, ...createCategory(fileInfo, ["@fragment"]) };
      }

      // 调用自定义 transform 方法的逻辑(可选)
      transformResult = transform?.({ ...frontmatter, ...transformResult }, fileInfo) || transformResult;
      // 确保 transform 方法返回结果为 Record<string, any> 或 undefined，否则无视其结果
      if (!isRecordOrUndefined(transformResult)) {
        transformResult = {};
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
    plugins.push(...Permalink(permalinkOption));
  }
  // 自动给 MD 添加一级标题插件
  if (mdH1) {
    const selfBeforeInject = mdH1Option.beforeInject;
    mdH1Option.beforeInject = (frontmatter, id, title) => {
      if (["cataloguePage", "TkCataloguePage"].includes(frontmatter.layout) || frontmatter.catalogue) return false;
      if (["archivesPage", "TkArchivesPage"].includes(frontmatter.layout) || frontmatter.archivesPage) return false;
      if (frontmatter.titleTag) {
        return `${title} <TkTitleTag size="large">${frontmatter.titleTag}</TkTitleTag>`;
      }

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

  return plugins;
};

/**
 * 注册强依赖插件（与 Teek 主题强绑定，无法关闭）
 */
export const registerTightPlugins = (vitePlugins: Plugins, ignoreDir: Record<string, any[]>) => {
  const plugins: any[] = [];

  const { catalogueOption = {}, fileContentLoaderIgnore = [] } = vitePlugins || {};

  // 目录页插件
  plugins.push(Catalogue(catalogueOption));

  const fileContentLoaderOptions: FileContentLoaderOptions<TkContentData, PostData> = {
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
  plugins.push(FileContentLoader<TkContentData, PostData>(fileContentLoaderOptions));

  return plugins;
};
