import { readFileSync, statSync } from "node:fs";
import matter from "gray-matter";
import { FilePathInfo, FileInfo } from "./types";
import { exec } from "child_process";

/**
 * 获取本站的文章总字数
 */
export function getTotalFileWords(filePathList: string[]) {
  let wordCount = 0;
  filePathList.forEach((item: any) => {
    const fileContent = readFileSync(item, "utf8");
    const { content } = matter(fileContent, {});
    // 使用 content 而不是 fileContent 是因为 fileContent 有 frontmatter，影响字数
    const len = getCounter(content);
    wordCount += len[0] + len[1];
  });

  return wordCount;
}
/**
 * 获取每一个文章的字数
 */
export function getEachFileWords(fileList: FilePathInfo[], cn: number = 300, en: number = 160) {
  const filePathListWords: FileInfo[] = [];

  fileList.forEach(item => {
    const fileContent = readFileSync(item.filePath, "utf8");
    const { data, content } = matter(fileContent, {});
    // 使用 content 而不是 fileContent 是因为 fileContent 有 frontmatter，影响字数
    const len = getCounter(content);
    // 计算预计的阅读时间
    const readingTime = getReadTime(len, cn, en);
    const wordCount = len[0] + len[1];

    filePathListWords.push({ fileInfo: item, wordCount, readingTime, frontmatter: data });
  });

  return filePathListWords;
}

/**
 * 计算预计的阅读时间
 */
export function getReadTime(len: number[], cn: number = 300, en: number = 160) {
  const readingTime = len[0] / cn + len[1] / en;
  if (readingTime > 60 && readingTime < 60 * 24) {
    // 大于一个小时，小于一天
    const hour = Math.trunc(readingTime / 60);
    const minute = Math.trunc(readingTime - hour * 60);

    if (minute === 0) return hour + "h";
    return hour + "h" + minute + "m";
  } else if (readingTime > 60 * 24) {
    // 大于一天
    const day = Math.trunc(readingTime / (60 * 24));
    const hour = Math.trunc((readingTime - day * 24 * 60) / 60);

    if (hour === 0) return day + "d";
    return day + "d" + hour + "h";
  }
  return (readingTime < 1 ? "1" : Math.trunc(readingTime * 10) / 10) + "m"; // 取一位小数
}

/**
 * 获取文件内容的字数
 * cn：中文
 * en：一整句英文（没有空格隔开的英文为 1 个）
 */
export function getCounter(content: string) {
  const cn = (content.match(/[\u4E00-\u9FA5]/g) || []).length;
  const en = (
    content
      .replace(/[\u4E00-\u9FA5]/g, "")
      .match(
        /[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+|\w+/g
      ) || []
  ).length;

  return [cn, en];
}

/**
 * 获取文件的最后一次修改时间
 */
export function getLastUpdateTime(fileList: string[]) {
  const updateTime: string[] = [];

  fileList.forEach(item => {
    updateTime.push(statSync(item).mtime.toLocaleString());
  });

  return updateTime.sort((a, b) => getTimeNum(b) - getTimeNum(a))[0];
}

/**
 * 获取时间的时间戳
 */
function getTimeNum(dateStr: string) {
  let date: any = new Date(dateStr);

  if (date === "Invalid Date" && dateStr) date = new Date(dateStr.replace(/-/g, "/"));

  return date.getTime();
}

/**
 * 获取最后一次 git commit 提交时间
 */
export function getGitLastCommitTime() {
  return new Promise(resolve => {
    exec('git log -1 --format=%cd --date=format:"%Y-%m-%d %H:%M:%S"', (error, stdout, stderr) => {
      if (error || stderr) return resolve(0);
      resolve(stdout.trim());
    });
  });
}
