import { readFileSync } from "node:fs";
import { normalizePath, type Plugin } from "vite";
import matter from "gray-matter";
import { glob } from "tinyglobby";
import { createMarkdownRenderer } from "vitepress";
import { join, relative } from "node:path";
import { FileContentLoaderData, FileContentLoaderOptions } from "./types";
import log, { logger } from "./log";

export * from "./types";

// 默认忽略的文件夹列表
export const DEFAULT_IGNORE_DIR = ["**/node_modules/**", "**/dist/**"];

export default function VitePluginVitePressFileContentLoader<T = FileContentLoaderData, R = FileContentLoaderData[]>(
  option: FileContentLoaderOptions<T, R>
): Plugin & { name: string } {
  let isExecute = false;

  return {
    name: "vite-plugin-vitepress-file-content-loader",
    async config(config: any) {
      // 防止 vitepress build 时重复执行
      if (isExecute) return;
      isExecute = true;

      let { pattern } = option;
      if (!pattern) return;

      const {
        includeSrc = false,
        render = false,
        excerpt: renderExcerpt,
        transformData,
        transformRaw,
        globOptions,
        themeConfigKey = "contentLoader",
      } = option;

      const {
        site: { themeConfig = {}, base },
        srcDir,
        cleanUrls,
        markdown,
        rewrites,
      } = config.vitepress;

      if (typeof pattern === "string") pattern = [pattern];
      // 基于文档源目录 srcDir 匹配
      pattern = pattern.map(p => normalizePath(join(srcDir, p)));

      const mdFiles = (
        await glob(pattern, {
          expandDirectories: false,
          ...globOptions,
          ignore: ["**/node_modules/**", "**/dist/**", ...(globOptions?.ignore || [])],
        })
      ).sort();

      const md = await createMarkdownRenderer(srcDir, markdown, base, logger);
      const raw: (FileContentLoaderData | Awaited<T>)[] = [];

      for (const file of mdFiles) {
        if (!file.endsWith(".md")) continue;

        const src = readFileSync(file, "utf-8");
        const { data: frontmatter, excerpt } = matter(
          src,
          // @ts-expect-error gray-matter types are wrong
          typeof renderExcerpt === "string" ? { excerpt_separator: renderExcerpt } : { excerpt: renderExcerpt }
        );

        const path = normalizePath(relative(srcDir, file)).replace(/(^|\/)index\.md$/, "$1");
        const relativePath = "/" + path.replace(/\.md$/, cleanUrls ? "" : ".html");
        const url = "/" + (rewrites.map[path] || path).replace(/\.md$/, cleanUrls ? "" : ".html");

        const html = render ? md.render(src) : undefined;
        const renderedExcerpt = renderExcerpt && excerpt?.endsWith("\n") ? md.render(excerpt) : undefined;

        const data: FileContentLoaderData = {
          src: includeSrc ? src : undefined,
          html,
          frontmatter,
          excerpt: renderedExcerpt,
          relativePath,
          url,
        };

        raw.push(transformData ? await transformData(data) : data);
      }

      themeConfig[themeConfigKey] = transformRaw ? await transformRaw(raw) : raw;

      const logName = themeConfigKey.charAt(0).toUpperCase() + themeConfigKey.slice(1);
      log.info(`Injected ${logName} Data Successfully. 注入 ${logName} 数据成功!`);
    },
  };
}
