export const getTitleFromMarkdown = (mdContent: string) => {
  // 切割换行符 \r\n 或 \n
  const lines = mdContent.trimStart().split(/\r?\n/);

  for (const line of lines) {
    if (line.startsWith("# ")) {
      return line.substring(2).trim();
    }
  }

  return undefined;
};

/**
 * 判断是否非法的序号
 *
 * @param index 序号
 */
export const isIllegalIndex = (index: number) => {
  return isNaN(index) || index < 0;
};

/**
 * 判断是否为 md 文件
 *
 * @param filePath 文件绝对路径
 */
export const isMarkdownFile = (filePath: string) => {
  return filePath.includes("md") || filePath.includes("MD");
};

/**
 * 判断数组中是否存在某个元素，支持正则表达式
 *
 * @param arr 数组
 * @param name 元素
 */
export const isSome = (arr: Array<string | RegExp>, name: string) => {
  return arr.some(item => item === name || (item instanceof RegExp && item.test(name)));
};

/**
 * 删除 .md 后缀
 */
export const removeMarkdownExt = (filePath: string) => {
  if (!filePath) return "";

  return filePath.replace(/\.md$/, "");
};
