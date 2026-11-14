# vitepress-plugin-auto-frontmatter

这是一个适用于 `vitepress` 的 Vite 插件，`vitepress` 启动时，插件会给指定的 Markdown 自动生成 `frontmatter`。

## ✨ Feature

- 🚀 自动生成 `frontmatter`
- 🚀 支持自定义新的 `frontmatter`

## 🕯️ Install

安装 `vitepress-plugin-auto-frontmatter` 插件

```bash
# 推荐使用 pnpm
pnpm i vitepress-plugin-auto-frontmatter
# or yarn
yarn add vitepress-plugin-auto-frontmatter
# or npm
npm install vitepress-plugin-auto-frontmatter
```

添加 `vitepress-plugin-auto-frontmatter` 插件到 `.vitepress/config.ts`

```typescript
import { defineConfig } from "vitepress";
import AutoFrontmatter from "vitepress-plugin-auto-frontmatter";

export default defineConfig({
  vite: {
    plugins: [AutoFrontmatter(/* options */)],
  },
});
```

> 说明：该插件仅限项目启动时生效。

插件默认忽略 `frontmatter` 中 `layout: home` 和 `["node_modules", "dist"]` 目录下的文件，且只扫描 Markdown 文档。

插件默认给 Markdown 文件生成 `title` 和 `date` 两个属性，其中 `title` 为文件名（支持带序号的文件名，如 `01.xx.md`），`date` 为文件的创建日期。

```yaml
---
title: 文件名
date: yyyy-MM-dd hh:mm:ss
---
```

如果想要拓展新的 `frontmatter`，往下看 `Example 2` 和 `Example 3`。

## 📖 Usage

如果想拓展 `frontmatter` 的内容，则使用 `transform` 函数。

### Example 1

假设一个文件名为 `guide.md`，`frontmatter` 如下：

```yaml
---
tag: true
---
```

使用 `exclude` 排除该 `frontmatter` 来生成新的 `frontmatter`：

```typescript
const excludeFile = () => {
  const plugins: PluginOption[] = [];
  const autoFrontmatterOption = {
    pattern: "**/*.md",
    exclude: { tag: true }, // 排除 tag: true 的 MD 文件，支持多个配置
  };

  plugins.push(AutoFrontmatter(autoFrontmatterOption));

  return {
    vite: {
      plugins,
    },
  };
};
```

使用 `include` 只对该 `frontmatter` 生成新的 `frontmatter`。

```typescript
const excludeFile = () => {
  const plugins: PluginOption[] = [];
  const autoFrontmatterOption = {
    pattern: "**/*.md",
    include: { tag: true }, // 支持多个配置
  };

  plugins.push(AutoFrontmatter(autoFrontmatterOption));

  return {
    vite: {
      plugins,
    },
  };
};
```

最终生成如下：

```yaml
---
title: guide
date: 2025-03-04
---
```

### Example 2

通过 `transform` 函数来添加一个唯一的永久链接:

```typescript
const addPermalink = () => {
  const plugins: PluginOption[] = [];
  const autoFrontmatterOption = { pattern: "**/*.md" };

  autoFrontmatterOption.transform = frontmatter => {
    // 如果文件本身存在了 permalink，则不生成
    if (frontmatter.permalink) return;

    const transformResult = { ...frontmatter, ...createPermalink() };

    // 确保返回值存在，如果返回 {} 将会清空文件本身的 frontmatter，返回 undefined 则告诉插件不使用 transform 返回的数据
    return Object.keys(transformResult).length ? transformResult : undefined;
  };

  plugins.push(AutoFrontmatter(autoFrontmatterOption));

  return {
    vite: {
      plugins,
    },
  };
};

/**
 * 创建 permalink 永久链接
 */
export const createPermalink = () => {
  return {
    permalink: `/pages/${(Math.random() + Math.random()).toString(16).slice(2, 8)}`,
  };
};
```

效果如下：

```yaml
---
date: 2025-03-03 00:45:16
title: 插件测试
permalink: /pages/eb8f2f
---
```

### Example 3

通过 `transform` 函数来基于文件路径添加目录，如：

```
.
├─ docs                # 项目根目录
│  ├─ guide
│  │  ├─ vue
│  │  │  └─ getting.md
```

`getting.md` 文件的 `frontmatter` 将会生成：

```yaml
---
categories:
  - guide
  - vue
---
```

需要使用 `transform` 的第二个参数，代码如下：

```typescript
const addCategories = () => {
  const plugins: PluginOption[] = [];
  const autoFrontmatterOption = { pattern: "**/*.md" };

  autoFrontmatterOption.transform = (frontmatter, fileInfo) => {
    // 如果文件本身存在了 categories，则不生成
    if (frontmatter.categories) return;

    const transformResult = { ...frontmatter, ...createCategories(fileInfo) };

    // 确保返回值存在，如果返回 {} 将会清空文件本身的 frontmatter，返回 undefined 则告诉插件不使用 transform 返回的数据
    return Object.keys(transformResult).length ? transformResult : undefined;
  };

  plugins.push(AutoFrontmatter(autoFrontmatterOption));

  return {
    vite: {
      plugins
    }
  }
}

/**
 * 创建 categories 分类列表
 *
 * @param fileInfo 文件信息
 */
export const createCategory = (fileInfo: FileInfo) => {
  // relativePath 为基于 vp srcDir 的相对路径，默认是基于项目根目录，如 guide/vue/getting.md
  const relativePathArr = fileInfo.relativePath.split("/");

  const categories: string[] = [];
  relativePathArr.forEach((item, index) => {
    // 忽略文件名
    if (index !== relativePathArr.length - 1))
      categories.push(filename);
  });

  // [""] 表示添加一个为空的 categories
  return { categories: categories.length ? categories : [""] };
};
```

效果如下：

```yaml
---
date: 2025-03-03 00:45:16
title: getting
categories:
  - guide
  - vue
---
```

> 如果 `transform` 函数返回的 `frontmatter` 已经在文件存在（只比较 Key 是否相同，不比较 Value），则忽略生成。

## 🛠️ Options

| name             | description                                                                                                                                               | type                                                                                    | default |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------- |
| pattern          | 扫描的文件路径表达式，为 global 表达式                                                                                                                    | `string` / `string[]`                                                                   |         |
| include          | include 指定的对象如果不在 markdown frontmatter 存在，则忽略该文件                                                                                        | `Record<string, any>`                                                                   |         |
| exclude          | exclude 指定的对象如果在 markdown frontmatter 存在，则忽略该文件。当 include 和 exclude 存在相同文件时，exclude 优先级高                                  | `Record<string, any>`                                                                   |         |
| transform        | 转换处理好的 frontmatter，该函数需要返回一个新的 frontmatter 或只返回 undefined，如果返回 {}，则清空 MD 文件本身存在的 frontmatter                        | `(frontmatter: Record<string, any>, fileInfo: FileInfo) => Record<string, any> \| void` |         |
| globOptions      | tinyglobby 的配置项，插件默认已经忽略 node_modules 和 dist 目录的所有文件                                                                                 | `GlobOptions`                                                                           |         |
| recoverTransform | 每次启动项目时，是否基于 transform 返回的数据重新生成新的 frontmatter，如果为 false，则只对不存在的 key 进行生成，如果为 true，则重新生成新的 frontmatter | `boolean`                                                                               | false   |

`globOptions` 是 `tinyglobby` 插件配置项，如果你需要忽略某些路径，可以使用该配置项 `globOptions.ignore`。更多用法请去 tinyglobby 官网查看。

## 📘 TypeScript

### 🛠️ Options

```typescript
import type { GlobOptions } from "tinyglobby";

export interface AutoFrontmatterOption {
  /**
   * 扫描的文件路径表达式，为 global 表达式
   */
  pattern?: string | string[];
  /**
   * include 指定的对象如果不在 Markdown frontmatter 存在，则忽略该文件
   */
  include?: Record<string, any>;
  /**
   * exclude 指定的对象如果在 Markdown frontmatter 存在，则忽略该文件。当 include 和 exclude 存在相同文件时，exclude 优先级高
   */
  exclude?: Record<string, any>;
  /**
   * 转换处理好的 frontmatter，该函数需要返回一个新的 frontmatter 或只返回 undefined，如果返回 {}，则清空 MD 文件本身存在的 frontmatter
   */
  transform?: (frontmatter: Record<string, any>, fileInfo: FileInfo) => Record<string, any> | void;
  /**
   * tinyglobby 的配置项
   * 插件默认已经忽略 node_modules 和 dist 目录的所有文件
   */
  globOptions?: GlobOptions;
  /**
   * 每次启动项目时，是否基于 transform 返回的数据重新生成新的 frontmatter，如果为 false，则只对不存在的 key 进行生成，如果为 true，则重新生成新的 frontmatter
   *
   * @default false
   */
  recoverTransform?: boolean;
}

export interface FileInfo {
  /**
   * 文件绝对路径
   */
  filePath: string;
  /**
   * 文件相对路径
   */
  relativePath: string;
}
```

## License

[MIT](../../LICENSE) License © 2025 [Teeker](https://github.com/teekhub)
