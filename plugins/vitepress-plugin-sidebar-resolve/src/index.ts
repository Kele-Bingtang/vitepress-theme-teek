import type { Plugin, ViteDevServer } from "vite";
import type { SidebarOption } from "./types";
import { DefaultTheme } from "vitepress";
import { join } from "node:path";
import createFilePathSidebar from "./filePathToSidebar";
import createRewritesSidebar from "./rewritesToSidebar";
import logger from "./log";

export * from "./types";
export * from "./utils";

export default function VitePluginVitePressSidebarResolve(option: SidebarOption = {}): Plugin & { name: string } {
  let isExecute = false;

  return {
    name: "vite-plugin-vitepress-sidebar-resolve",
    configureServer({ watcher, restart }: ViteDevServer) {
      if (!option.restart) return;

      watcher.add("*.md");
      // 监听文件系统事件
      watcher
        .on("add", async path => {
          // 过滤非 .md 文件
          if (!path.endsWith(".md")) return;
          // 重启服务器来更新侧边栏
          await restart();
        })
        .on("unlink", async path => {
          // 过滤非 .md 文件
          if (!path.endsWith(".md")) return;
          // 重启服务器来更新侧边栏
          await restart();
        });
    },
    config(config: any) {
      // 防止 vitepress build 时重复执行
      if (isExecute) return;
      isExecute = true;

      const {
        site: { themeConfig = {}, locales = {} },
        srcDir,
        rewrites: rewritesObj,
      } = config.vitepress;

      const { path, ignoreList, localeRootDir, type = "object", resolveRule = "filePath" } = option;
      const baseDir = path ? join(srcDir, path) : srcDir;
      const rewrites = rewritesObj.map || {};
      const rewritesLength = Object.keys(rewrites).length;

      // 如果 指定 rewrites 规则，但是 rewrites 不存在，则走 filePath 逻辑
      const isFilePathRule = resolveRule === "filePath" || (resolveRule === "rewrites" && !rewritesLength);

      const isRewritesRule = resolveRule === "rewrites" && rewritesLength;

      // 国际化多语言 key 数组
      const localesKeys = Object.keys(locales).filter(key => key !== "root");

      //  filePath 规则
      if (isFilePathRule) {
        // 如果不是多语言，直接自动生成结构化侧边栏
        if (!localesKeys.length) {
          return setSideBar(themeConfig, createFilePathSidebar({ ...option, path: baseDir }), type);
        }

        // 国际化处理，针对每个语言的目录进行单独的扫描（除了 root）
        localesKeys.forEach(localesKey => {
          const sidebar = createFilePathSidebar({ ...option, path: `${baseDir}/${localesKey}` }, localesKey);
          setSideBar(locales[localesKey].themeConfig, sidebar, type);
        });

        // 如果指定了 root 的目录，则扫描指定目录
        const rootDir = localeRootDir ? `/${localeRootDir}` : "";
        // 对 root 根目录的 sidebar 进行单独的扫描，且不扫描其他语言目录
        const rootSideBar = createFilePathSidebar({
          ...option,
          path: `${baseDir}${rootDir}`,
          ignoreList: [...(ignoreList || []), ...localesKeys],
        });
        setSideBar(locales["root"].themeConfig, rootSideBar, type);
      }
      // rewrites 规则
      else if (isRewritesRule) {
        // 如果不是多语言，直接自动生成结构化侧边栏
        if (!localesKeys.length) {
          return setSideBar(themeConfig, createRewritesSidebar(rewrites, { ...option, path: baseDir }), type);
        }

        // 国际化处理，针对每个语言的目录进行单独的扫描（除了 root）
        localesKeys.forEach(localesKey => {
          const sidebar = createRewritesSidebar(rewrites, { ...option, path: `${baseDir}/${localesKey}` }, localesKey);
          setSideBar(locales[localesKey].themeConfig, sidebar, type);
        });

        // 如果指定了 root 的目录，则扫描指定目录
        const rootDir = localeRootDir ? `/${localeRootDir}` : "";
        // 对 root 根目录的 sidebar 进行单独的扫描，且不扫描其他语言目录
        const rootSideBar = createRewritesSidebar(rewrites, {
          ...option,
          path: `${baseDir}${rootDir}`,
          ignoreList: [...(ignoreList || []), ...localesKeys],
        });
        setSideBar(locales["root"].themeConfig, rootSideBar, type);
      }
    },
  };
}

const setSideBar = (
  themeConfig: any,
  sidebar: DefaultTheme.SidebarMulti | DefaultTheme.SidebarItem[],
  type: SidebarOption["type"]
) => {
  // 防止 themeConfig 为 undefined
  themeConfig = themeConfig || {};

  if (type === "object") {
    themeConfig.sidebar = {
      ...sidebar,
      ...(Array.isArray(themeConfig.sidebar) ? logger.warn("自定义 Sidebar 必须是对象形式") : themeConfig.sidebar),
    };
  } else {
    themeConfig.sidebar = [
      ...(sidebar as DefaultTheme.SidebarItem[]),
      ...(Object.prototype.toString.call(themeConfig.sidebar) === "[object Object]"
        ? logger.warn("自定义 Sidebar 必须是数组形式")
        : themeConfig.sidebar || []),
    ];
  }

  logger.info("Injected Sidebar Data Successfully. 注入侧边栏数据成功!");
};
