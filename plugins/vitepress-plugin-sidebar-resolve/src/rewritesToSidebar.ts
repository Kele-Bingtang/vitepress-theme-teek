import type { DefaultTheme } from "vitepress";
import type { DirectoryStructure, SidebarOption } from "./types";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { getTitleFromMarkdown, isIllegalIndex, isSome } from "./utils";
import { getInfoFromMarkdownDir, resolveFileName } from "./nodeHelper";
import logger from "./log";

/**
 * 生成基于 rewrites 生成侧边栏数据
 *
 * @param rewrites VitePress rewrites 配置
 * @param option Sidebar 配置选项
 * @param prefix 前缀路径
 */
export default function createRewritesSidebar(
  rewrites: Record<string, string> = {},
  option: SidebarOption = {},
  prefix = "/"
): DefaultTheme.SidebarMulti | DefaultTheme.SidebarItem[] {
  const {
    path,
    ignoreList = [],
    scannerRootMd = true,
    collapsed,
    titleFormMd = false,
    initItems = true,
    initItemsText = false,
    sidebarResolved,
    ignoreWarn = false,
    checkRewritesPrefix = false,
    indexSeparator,
    prefixTransform,
    suffixTransform,
    type = "object",
    rootTitle = "Root",
  } = option;

  const isSidebarObject = type === "object";
  if (!path) return isSidebarObject ? {} : [];

  prefix = prefix.replace(/\/$/, "") + "/";

  // 转换 rewrites 为目录结构
  const dirStructure = buildDirectoryStructure(rewrites);

  const sidebarObj: DefaultTheme.SidebarMulti = {};
  const sidebarArray: DefaultTheme.SidebarItem[] = [];

  // 处理根路径下的文件（非目录）
  if (scannerRootMd) {
    const key = prefix === "/" ? prefix : `/${prefix}`;
    const rootSidebarItems = createSidebarItems(
      dirStructure,
      path,
      { ...option, ignoreIndexMd: true },
      key,
      scannerRootMd
    );

    if (rootSidebarItems.length > 0) {
      if (isSidebarObject) sidebarObj[key] = rootSidebarItems;
      else sidebarArray.push({ text: rootTitle, items: rootSidebarItems });
    }
  }

  // 处理根目录下的一级子目录
  Object.entries(dirStructure).forEach(([dirName, dirOrFileInfo]) => {
    // 如果是文件（根路径下的文件），则不处理
    if (typeof dirOrFileInfo === "string") return;

    const dirPath = `${prefix}${dirName}/`;
    const dirRelativePath = join(path, dirPath);

    if (!existsSync(dirRelativePath)) return;
    if (!isSome(ignoreList, dirName) && !statSync(dirRelativePath).isDirectory()) return;

    // 获取 rewrites 的 value 的第一个 / 前内容
    const key = Object.keys(rewrites).find(item => item.startsWith(dirName));
    if (!key) return;

    // 验证 rewrites 的同目录下的前缀是否一致
    !ignoreWarn && checkRewritesPrefix && validateRewritesPrefix(rewrites, dirName, ignoreList);

    const sidebarItems = createSidebarItems(dirOrFileInfo, dirRelativePath, option, dirPath);

    if (!ignoreWarn && sidebarItems.length === 0) {
      return logger.warn(`该目录 '${dirName}' 内部没有任何文件或文件序号出错，将忽略生成对应侧边栏`);
    }

    const { name, title } = resolveFileName(dirName, dirRelativePath, indexSeparator);
    const info = getInfoFromMarkdownDir(path, dirName);
    const mdTitle = titleFormMd ? info.title : "";
    // 标题添加前缀和后缀
    const sidebarPrefix = (info.prefix && (prefixTransform?.(info.prefix) ?? info.prefix)) ?? "";
    const sidebarSuffix = (info.suffix && (suffixTransform?.(info.suffix) ?? info.suffix)) ?? "";
    const text = sidebarPrefix + (mdTitle || title) + sidebarSuffix;

    const sidebarItem = {
      text,
      collapsed: typeof collapsed === "function" ? collapsed(prefix + name, text) : collapsed,
      items: sidebarItems,
    };

    if (isSidebarObject) {
      const path = rewrites[key].split("/")[0];
      sidebarObj[`/${path}/`] = initItems ? [{ ...sidebarItem, text: initItemsText ? text : "" }] : sidebarItems;
    } else sidebarArray.push(sidebarItem);
  });

  const finalSidebar = isSidebarObject ? sidebarObj : sidebarArray;
  return sidebarResolved?.(finalSidebar) ?? finalSidebar;
}

/**
 * 将目录映射为对应的侧边栏配置数据，处理成 VitePress 格式
 *
 * @param structure 目录结构树
 * @param root 文件/文件夹的根目录绝对路径
 * @param option 配置项
 * @param prefix 记录的文件/文件夹路径（包含刚进入方法时的 root 目录），确保 prefix 始终都有 / 结尾
 * @param onlyScannerRootMd 是否只扫描根目录下的 md 文件，如果为 false，则只递归扫描根目录下的所有子目录文件（不包含根目录文件），如果为 true，则只扫描根目录的文件
 */
const createSidebarItems = (
  structure: DirectoryStructure,
  root: string,
  option: SidebarOption,
  prefix = "/",
  onlyScannerRootMd = false
): DefaultTheme.SidebarItem[] => {
  const {
    collapsed,
    ignoreList = [],
    ignoreIndexMd = false,
    fileIndexPrefix = false,
    sidebarItemsResolved,
    beforeCreateSidebarItems,
    titleFormMd = false,
    ignoreWarn = false,
    sort = true,
    defaultSortNum = 9999,
    sortNumFromFileName = false,
    indexSeparator,
    prefixTransform,
    suffixTransform,
  } = option;

  const ignoreListAll = [...ignoreList];
  // 结构化文章侧边栏数据，以文件夹的序号为数字下标
  let sidebarItems: DefaultTheme.SidebarItem[] = [];
  // 存储没有序号的文件，最终生成 sidebarItems 的时候，将这些文件放到最后面
  const sidebarItemsNoIndex: DefaultTheme.SidebarItem[] = [];
  const entries = Object.entries(beforeCreateSidebarItems?.(structure) || structure);

  entries.forEach(([dirOrFilename, dirOrFileInfo]) => {
    if (isSome(ignoreListAll, dirOrFilename)) return;

    const filePath = join(root, dirOrFilename);
    if (!existsSync(filePath)) return;

    const { index: indexStr, title, type, name } = resolveFileName(dirOrFilename, filePath, indexSeparator);
    const index = parseInt(indexStr as string, 10);

    if (!ignoreWarn && fileIndexPrefix && isIllegalIndex(index)) {
      logger.warn(`该文件 '${dirOrFilename}' 序号出错，请填写正确的序号`);
      return;
    }

    if (!onlyScannerRootMd && statSync(filePath).isDirectory() && typeof dirOrFileInfo === "object") {
      // 是文件夹目录
      const info = getInfoFromMarkdownDir(root, dirOrFilename);
      const mdTitle = titleFormMd ? info.title : "";
      // 标题添加前缀和后缀
      const sidebarPrefix = (info.prefix && (prefixTransform?.(info.prefix) ?? info.prefix)) ?? "";
      const sidebarSuffix = (info.suffix && (suffixTransform?.(info.suffix) ?? info.suffix)) ?? "";
      const text = sidebarPrefix + (mdTitle || title) + sidebarSuffix;
      const childSidebarItems = createSidebarItems(dirOrFileInfo, filePath, option, `${prefix}${dirOrFilename}/`);

      let sidebarItem: Record<string, any> = {
        text,
        collapsed: typeof collapsed === "function" ? collapsed(prefix + name, text) : collapsed,
        items: childSidebarItems,
      };

      if (sort) {
        sidebarItem = {
          ...sidebarItem,
          // 对子侧边栏进行排序
          items: childSidebarItems
            .sort((a: any, b: any) => (a.sort || defaultSortNum) - (b.sort || defaultSortNum))
            .map(item => {
              // 排完序后删除排序属性
              delete (item as any).sort;
              return item;
            }),
          sort: sortNumFromFileName ? index : info.sort,
        };
      }

      if (isIllegalIndex(index)) sidebarItemsNoIndex.push(sidebarItem);
      else sidebarItems[index] = sidebarItem;
    } else {
      // 是文件
      // 开启只扫描根目录 md 文件时，不扫描 index.md（首页文档）
      if (onlyScannerRootMd && dirOrFilename === "index.md") return [];
      if (ignoreIndexMd && ["index.md", "index.MD"].includes(dirOrFilename)) return [];

      if (!["md", "MD"].includes(type)) {
        // 开启扫描根目录时，则不添加提示功能，因为根目录有大量的文件/文件夹不是 md 文件，这里不应该打印
        if (!ignoreWarn && !onlyScannerRootMd) logger.warn(`该文件 '${filePath}' 非 .md 格式文件，不支持该文件类型`);
        return [];
      }

      const content = readFileSync(filePath, "utf-8");
      // 解析出 frontmatter 数据
      const {
        data: { title: frontmatterTitle, sidebar = true, sidebarSort, sidebarPrefix, sidebarSuffix } = {},
        content: mdContent,
      } = matter(content, {});

      if (!sidebar) return [];
      // title 获取顺序：md 文件 frontmatter.title > md 文件一级标题 > md 文件名
      const mdTitle = titleFormMd ? getTitleFromMarkdown(mdContent) : "";
      // 标题添加前缀和后缀
      const finalSidebarPrefix = (sidebarPrefix && (prefixTransform?.(sidebarPrefix) ?? sidebarPrefix)) ?? "";
      const finalSidebarSuffix = (sidebarSuffix && (suffixTransform?.(sidebarSuffix) ?? sidebarSuffix)) ?? "";
      const text = finalSidebarPrefix + (frontmatterTitle || mdTitle || title) + finalSidebarSuffix;

      let sidebarItem: Record<string, any> = {
        text,
        collapsed: typeof collapsed === "function" ? collapsed(prefix + name, text) : collapsed,
        link: `/${dirOrFileInfo}`, // 此时是 rewrites 的文件路径
      };

      if (sort) sidebarItem = { ...sidebarItem, sort: sortNumFromFileName ? index : sidebarSort };

      if (isIllegalIndex(index)) sidebarItemsNoIndex.push(sidebarItem);
      else sidebarItems[index] = sidebarItem;
    }
  });

  // 合并有索引和无索引的项目
  sidebarItems = [...sidebarItems.filter(Boolean), ...sidebarItemsNoIndex];

  if (sort) {
    sidebarItems = sidebarItems
      .sort((a: any, b: any) => (a.sort || defaultSortNum) - (b.sort || defaultSortNum))
      .map(item => {
        delete (item as any).sort;
        return item;
      });
  }

  return sidebarItemsResolved?.(sidebarItems) ?? sidebarItems;
};

/**
 * 构建目录结构树
 *
 * 如：
 * {
    '01.指南/01.简介/01.简介.md': 'guide/intro.md',
    '01.指南/01.简介/10.快速开始.md': 'guide/quickstart.md',
    '01.指南/01.简介/20.结构化目录.md': 'guide/directory-structure.md',
    '01.指南/10.使用/05.Markdown 拓展.md': 'guide/markdown.md',
    '01.指南/10.使用/10.摘要与封面.md': 'guide/summary.md',
    '01.指南/10.使用/15.主题增强.md': 'guide/theme-enhance.md',
    '01.指南/10.使用/20.样式增强.md': 'guide/styles-plus.md',
    '01.指南/10.使用/25.国际化.md': 'guide/i18n.md',
    '01.指南/10.使用/30.Vite 插件.md': 'guide/plugins.md',
    '01.指南/10.使用/35.站点统计.md': 'guide/statistics.md',
    '01.指南/10.使用/40.图标使用.md': 'guide/icon-use.md',
    '01.指南/10.使用/45.私密文章.md': 'guide/private.md',
    '01.指南/20.相关/02.插槽布局.md': 'guide/slot.md',
    '01.指南/20.相关/05.路由钩子.md': 'guide/router-hook.md',
    '01.指南/20.相关/10.写作排版.md': 'guide/typesetting.md',
    '01.指南/20.相关/15.笔记技巧.md': 'guide/skill.md',
    '01.指南/20.相关/99.鸣谢.md': 'thank-they.md',
  }
 * 最终生成如下：
 * {
    "01.指南": {
      "01.简介": {
        "01.简介.md": "guide/intro.md",
        "10.快速开始.md": "guide/quickstart.md",
        "20.结构化目录.md": "guide/directory-structure.md"
      },
      "10.使用": {
        "05.Markdown 拓展.md": "guide/markdown.md",
        "10.摘要与封面.md": "guide/summary.md",
        "15.主题增强.md": "guide/theme-enhance.md",
        "20.样式增强.md": "guide/styles-plus.md",
        "25.国际化.md": "guide/i18n.md",
        "30.Vite 插件.md": "guide/plugins.md",
        "35.站点统计.md": "guide/statistics.md",
        "40.图标使用.md": "guide/icon-use.md",
        "45.私密文章.md": "guide/private.md"
      },
      "20.相关": {
        "02.插槽布局.md": "guide/slot.md",
        "05.路由钩子.md": "guide/router-hook.md",
        "10.写作排版.md": "guide/typesetting.md",
        "15.笔记技巧.md": "guide/skill.md",
        "99.鸣谢.md": "thank-they.md"
      }
    }
  }
 */
const buildDirectoryStructure = (rewrites: Record<string, string>): DirectoryStructure => {
  const structure: DirectoryStructure = {};

  Object.entries(rewrites).forEach(([key, value]) => {
    const parts = key.split("/");
    let currentLevel = structure;

    // 遍历路径部分，构建嵌套结构
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;

      // 最后一部分是文件
      if (isLast) currentLevel[part] = value;
      else {
        // 中间部分是目录
        if (!currentLevel[part]) currentLevel[part] = {};
        currentLevel = currentLevel[part] as DirectoryStructure;
      }
    }
  });

  return structure;
};

/**
 * 校验指定前缀的重写规则是否具有相同的值前缀
 *
 * @param rewrites 重写规则对象
 * @param keyPrefix 键的前缀，如 '01.指南'
 */
const validateRewritesPrefix = (
  rewrites: Record<string, string>,
  keyPrefix: string,
  ignoreList: (string | RegExp)[] = []
) => {
  // 获取所有以指定前缀开头的键值对，并排除忽略列表中的项
  const filteredEntries = Object.entries(rewrites).filter(([key, value]) => {
    // 检查是否以指定前缀开头
    if (!key.startsWith(keyPrefix)) return false;

    // 检查是否在忽略列表中
    const isInIgnoreList = isSome(ignoreList, key);
    if (isInIgnoreList) return false;

    // 检查值是否包含路径分隔符
    return value.includes("/");
  });

  if (filteredEntries.length === 0) return;

  // 提取值的第一个路径段作为前缀进行比较
  const valuePrefixes = filteredEntries.map(([key, value]) => {
    const firstSegment = value.split("/")[0];
    return { key, value, prefix: firstSegment };
  });

  // 获取第一个值的前缀作为基准
  const basePrefix = valuePrefixes[0].prefix;
  const inconsistentEntries = valuePrefixes.filter(item => item.prefix !== basePrefix);

  // 如果存在不一致的文件，则打印出来
  if (inconsistentEntries.length > 0) {
    console.warn(
      `检测到 '${keyPrefix}' 路径下的部分文件 Rewrites 前缀不一致，要求的基准前缀 '/${basePrefix}'，不一致的文件如下:`
    );
    inconsistentEntries.forEach(item => console.warn(`  ${item.key}`));
  }
};
