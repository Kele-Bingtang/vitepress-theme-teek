# vitepress-plugin-doc-analysis

这是一个适用于 `vitepress` 的 Vite 插件，在 `vitepress` 启动后分析 Markdown 文档。

## ✨ Feature

- 🚀 自动分析 Markdown 文档信息，挂载到 `themeConfig.docAnalysisInfo`
- 🚀 支持 locales 国际化的文档分析，挂载到 `locales.[lang].themeConfig.docAnalysisInfo`

## 🕯️ Install

安装 `vitepress-plugin-doc-analysis` 插件

```bash
# 推荐使用 pnpm
pnpm i vitepress-plugin-doc-analysis
# or yarn
yarn add vitepress-plugin-doc-analysis
# or npm
npm install vitepress-plugin-doc-analysis
```

添加 `vitepress-plugin-doc-analysis` 插件到 `.vitepress/config.ts`

```typescript
import { defineConfig } from "vitepress";
import DocAnalysis from "vitepress-plugin-doc-analysis";

export default defineConfig({
  vite: {
    plugins: [DocAnalysis(/* options */)],
  },
});
```

> 说明：该插件仅限项目启动时生效，已改动或新添加的 Markdown 需要重启项目才能生效。

插件默认忽略 `["node_modules", "dist", ".vitepress", "public"]` 目录下的文件，且只扫描 Markdown 文档。

## 📖 Usage

获取插件分析后的数据：

```vue
<script setup lang="ts">
import { useData } from "vitepress";
import type { DocAnalysis } from "vitepress-plugin-doc-analysis";

const { theme } = useData();
const { fileList, totalFileWords, eachFileWords, lastCommitTime }: DocAnalysis = theme.value;

// 如果处在国际化环境下，vitepress 会将当前语言的 themeConfig 放到 theme 里，与原先的 theme 进行合并
</script>

<template></template>
```

如果不希望某个 Markdown 文档被插件分析，请在该文档 `frontmatter` 配置：

```yaml
---
docAnalysis: false
---
```

## 📚 Example

### transformFile

通过 `transformFile` 配置项，可以自定义返回的文件信息。

```typescript
import type {} from "vitepress-plugin-doc-analysis";
import DocAnalysis from "vitepress-plugin-doc-analysis";
import { defineConfig } from "vitepress";
import { statSync } from "node:fs";

const docAnalysisOption = {
  transformFile: (fileInfo: FilePathInfo) => {
    // 获取文件的修改时间
    const mtime = statSync(fileInfo.relativePath).mtime.toLocaleString();
    return { mtime };
  },
};

export default defineConfig({
  vite: {
    plugins: [DocAnalysis(docAnalysisOption)],
  },
});
```

验证：

```vue
<script setup lang="ts">
import { useData } from "vitepress";
import type { DocAnalysis } from "vitepress-plugin-doc-analysis";

const { theme } = useData();
const { fileList }: DocAnalysis = theme.value;

// 此时多出了 mtime
console.log(fileList);
</script>

<template></template>
```

## 🛠️ Options

| name          | description                                            | type       | default                        |
| ------------- | ------------------------------------------------------ | ---------- | ------------------------------ |
| ignoreList    | 忽略的文件/文件夹列表，支持正则表达式                  | `string[]` | `[]`                           |
| path          | 指定扫描的根目录                                       | `string`   | `vitepress` 的 `srcDir` 配置项 |
| ignoreIndexMd | 是否忽略每个目录下的 `index.md` 文件                   | `boolean`  | `false`                        |
| cn            | 1 分钟内阅读的中文字数，阅读时间计算需要               | `number`   | 300                            |
| en            | 1 分钟内阅读的英文字数，阅读时间计算需要               | `number`   | 160                            |
| transformFile | 自定义函数来返回额外的文件信息，最终存放到 fileInfo 里 | `Function` | -                              |

## 📘 TypeScript

### 🛠️ Options

```typescript
export interface DocAnalysisOption {
  /**
   * 忽略的文件/文件夹列表，支持正则表达式
   *
   * @default []
   */
  ignoreList?: Array<RegExp | string>;
  /**
   * 文章所在的目录，基于 .vitepress 目录层级添加，开头不需要有 /
   *
   * @default 'vitepress 的 srcDir 配置项'
   */
  path?: string;
  /**
   * 是否忽略每个目录下的 index.md 文件
   *
   * @default false
   */
  ignoreIndexMd?: boolean;
  /**
   * 1 分钟内阅读的中文字数
   *
   * @default 300
   */
  cn?: number;
  /**
   * 1 分钟内阅读的英文字数
   *
   * @default 160
   */
  en?: number;
  /**
   * 自定义函数来返回额外的文件信息，最终存放到 fileInfo 里
   *
   * @param filePath 文件路径信息
   */
  transformFile?: (filePath: FilePathInfo) => Record<string, any> | undefined;
}
```

### 📖 Usage

```typescript
export interface DocAnalysis {
  /**
   * 文件路径列表
   */
  fileList: FilePathInfo[];
  /**
   * 文件总共字数
   */
  totalFileWords: string;
  /**
   * 文件信息列表
   */
  eachFileWords: FileInfo[];
  /**
   * git 上次 commit 时间
   */
  lastCommitTime: string;
}

export interface FileInfo {
  /**
   * 文件路径
   */
  fileInfo: FilePathInfo;
  /**
   * 字数
   */
  wordCount: number;
  /**
   * 阅读时间
   */
  readingTime: string;
  /**
   * 文件 frontmatter 数据
   */
  frontmatter: Record<string, any>;
}

export interface FilePathInfo {
  /**
   * 文件绝对路径
   */
  filePath: string;
  /**
   * 文件相对路径
   */
  relativePath: string;
  /**
   * 通过 transformFile 配置项得到的其他信息
   */
  [key: string]: any;
}
```

## 🉑 License

[MIT](../../LICENSE) License © 2025 [Teeker](https://github.com/Kele-Bingtang)
