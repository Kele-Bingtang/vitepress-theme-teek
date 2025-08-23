import type { DefaultTheme } from "vitepress";
import type { SidebarOption } from "./types";
import { readdirSync, statSync, readFileSync, existsSync } from "node:fs";
import { basename, resolve } from "node:path";
import matter from "gray-matter";
import { getTitleFromMarkdown, isIllegalIndex, isSome } from "./utils";
import logger from "./log";
import { getInfoFromMarkdownDir, resolveFileName } from "./nodeHelper";

// 默认忽略的文件夹列表
export const DEFAULT_IGNORE_DIR = ["node_modules", "dist", ".vitepress", "public"];

/**
 * 基于文件路径生成侧边栏数据
 * @param  option Sidebar 配置选项
 * @param prefix 指定前缀，在生成侧边栏的 link 时，会自动加上前缀
 */
export default (option: SidebarOption = {}, prefix = "/") => {
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
    indexSeparator,
    prefixTransform,
    suffixTransform,
    type = "object",
    rootTitle = "Root",
  } = option;
  const isSidebarObject = type === "object";
  if (!path) return isSidebarObject ? {} : [];

  // 确保 prefix 始终都有 / 结尾
  prefix = prefix.replace(/\/$/, "") + "/";

  const sidebarObj: DefaultTheme.SidebarMulti = {};
  const sidebarArray: DefaultTheme.SidebarItem[] = [];

  // 只扫描根目录的 md 文件，且不扫描 index.md（首页文档）
  const key = prefix === "/" ? prefix : `/${prefix}`;
  if (scannerRootMd) {
    const rootSidebarItems = createSidebarItems(path, { ...option, ignoreIndexMd: true }, key, scannerRootMd);
    if (rootSidebarItems?.length) {
      if (isSidebarObject) sidebarObj[key] = rootSidebarItems;
      else sidebarArray.push({ text: rootTitle, items: rootSidebarItems });
    }
  }

  // 获取指定根目录下的所有目录绝对路径
  const dirPaths = readDirPaths(path, ignoreList);

  // 遍历根目录下的每个子目录，生成对应的侧边栏数据
  dirPaths.forEach(dirPath => {
    // dirPath 是每个目录的绝对路径
    const fileName = basename(dirPath);

    // 创建 SidebarItems
    const sidebarItems = createSidebarItems(dirPath, option, `${key}${fileName}/`);

    if (!ignoreWarn && !sidebarItems.length) {
      return logger.warn(`该目录 '${dirPath}' 内部没有任何文件或文件序号出错，将忽略生成对应侧边栏`);
    }

    const { name, title } = resolveFileName(fileName, dirPath, indexSeparator);
    const info = getInfoFromMarkdownDir(dirPath, fileName);
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

    // 数组类型侧边栏
    if (isSidebarObject) {
      // 对象类型侧边栏
      sidebarObj[`${key}${fileName}/`] = initItems
        ? [{ ...sidebarItem, text: initItemsText ? text : "" }]
        : sidebarItems;
    } else sidebarArray.push(sidebarItem);
  });

  const finalSidebar = isSidebarObject ? sidebarObj : sidebarArray;

  return sidebarResolved?.(finalSidebar) ?? finalSidebar;
};

/**
 * 指定根目录下的所有目录绝对路径，win 如 ['D:\docs\01.guide', 'D:\docs\02.design']，linux 如 ['/usr/local/docs/01.guide', '/usr/local/docs/02.design']
 * @param sourceDir 指定文件/文件夹的根目录
 */
const readDirPaths = (sourceDir: string, ignoreList: SidebarOption["ignoreList"] = []) => {
  const dirPaths: string[] = [];
  // 检查目录是否存在
  if (!existsSync(sourceDir)) return dirPaths;

  const ignoreListAll = [...DEFAULT_IGNORE_DIR, ...ignoreList];
  // 读取目录，返回数组，成员是 root 下所有的目录名（包含文件夹和文件，不递归）
  const dirOrFilenames = readdirSync(sourceDir);

  dirOrFilenames.forEach(dirOrFilename => {
    // 将路径或路径片段的序列解析为绝对路径，等于使用 cd 命令
    const secondDirPath = resolve(sourceDir, dirOrFilename);
    if (!existsSync(secondDirPath)) return;

    // 是否为文件夹目录，并排除指定文件夹
    if (!isSome(ignoreListAll, dirOrFilename) && statSync(secondDirPath).isDirectory()) {
      dirPaths.push(secondDirPath);
    }
  });

  return dirPaths;
};

/**
 * 将目录映射为对应的侧边栏配置数据，处理成 VitePress 格式
 *
 * @param root 文件/文件夹的根目录绝对路径
 * @param option 配置项
 * @param prefix 记录的文件/文件夹路径（包含刚进入方法时的 root 目录），确保 prefix 始终都有 / 结尾
 * @param onlyScannerRootMd 是否只扫描根目录下的 md 文件，如果为 false，则只递归扫描根目录下的所有子目录文件（不包含根目录文件），如果为 true，则只扫描根目录的文件
 */
const createSidebarItems = (
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
  const ignoreListAll = [...DEFAULT_IGNORE_DIR, ...ignoreList];

  // 结构化文章侧边栏数据，以文件夹的序号为数字下标
  let sidebarItems: DefaultTheme.SidebarItem[] = [];
  // 存储没有序号的文件，最终生成 sidebarItems 的时候，将这些文件放到最后面
  const sidebarItemsNoIndex: DefaultTheme.SidebarItem[] = [];
  // 读取目录名（文件和文件夹）
  let dirOrFilenames = readdirSync(root);

  dirOrFilenames = beforeCreateSidebarItems?.(dirOrFilenames) ?? dirOrFilenames;

  dirOrFilenames.forEach(dirOrFilename => {
    if (isSome(ignoreListAll, dirOrFilename)) return [];

    const filePath = resolve(root, dirOrFilename);
    if (!existsSync(filePath)) return;

    // 解析文件名
    const { index: indexStr, title, type, name } = resolveFileName(dirOrFilename, filePath, indexSeparator);
    // 十进制转换
    const index = parseInt(indexStr as string, 10);

    // 校验文件序号
    if (!ignoreWarn && fileIndexPrefix && isIllegalIndex(index)) {
      logger.warn(`该文件 '${filePath}' 序号出错，请填写正确的序号`);
      return [];
    }

    // 判断序号是否已经存在
    if (!ignoreWarn && sidebarItems[index]) logger.warn(`该文件 '${filePath}' 的序号在同一级别中重复出现，将会被覆盖`);

    if (!onlyScannerRootMd && statSync(filePath).isDirectory()) {
      // 是文件夹目录
      const info = getInfoFromMarkdownDir(root, dirOrFilename);
      const mdTitle = titleFormMd ? info.title : "";
      // 标题添加前缀和后缀
      const sidebarPrefix = (info.prefix && (prefixTransform?.(info.prefix) ?? info.prefix)) ?? "";
      const sidebarSuffix = (info.suffix && (suffixTransform?.(info.suffix) ?? info.suffix)) ?? "";
      const text = sidebarPrefix + (mdTitle || title) + sidebarSuffix;
      const childSidebarItems = createSidebarItems(filePath, option, `${prefix}${dirOrFilename}/`);

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
        link: prefix + name,
      };

      if (sort) sidebarItem = { ...sidebarItem, sort: sortNumFromFileName ? index : sidebarSort };

      if (isIllegalIndex(index)) sidebarItemsNoIndex.push(sidebarItem);
      else sidebarItems[index] = sidebarItem;
    }
  });

  // 将没有序号的 sidebarItemsNoIndex 放到最后面
  sidebarItems = [...sidebarItems, ...sidebarItemsNoIndex].filter(Boolean);

  if (sort) {
    // 对根侧边栏下的子侧边栏进行排序
    sidebarItems = sidebarItems
      .sort((a: any, b: any) => (a.sort || defaultSortNum) - (b.sort || defaultSortNum))
      .map(item => {
        // 排完序后删除排序属性
        delete (item as any).sort;
        return item;
      });
  }

  return sidebarItemsResolved?.(sidebarItems) ?? sidebarItems;
};
