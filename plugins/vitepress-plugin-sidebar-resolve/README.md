# vitepress-plugin-sidebar-resolve

这是一个适用于 `vitepress` 的 Vite 插件，在 `vitepress` 启动后扫描 Markdown 文档来自动生成侧边栏。

## ✨ Feature

- 🚀 扫描项目的目录，自动生成侧边栏数据，挂载到 `themeConfig.sidebar`
- 🚀 支持 `01.guide.md` 带有序号的文件格式，在侧边栏数据渲染时，带序号的文件位置比不带序号的文件高
- 🚀 支持指定 `frontmatter.sidebarSort`，在侧边栏数据加载时进行排序
- 🚀 支持 locales 国际化，挂载到 `locales.[lang].themeConfig.sidebar`
- 🚀 支持基于 `filePath` 和 `rewrites` 两个方式生成侧边栏

> 说明：在同层目录下，如果存在相同序号的文件时，后面的文件会覆盖前面的文件

侧边栏的 `text` 获取顺序：

- 如果为目录：按顺序从该目录下的 `index.md, index.MD, 目录名.md` 文件获取一级标题，如果获取不到，则以目录名为 `text`
- 如果为文件：`frontmatter.title` > Markdown 文件一级标题（`titleFormMd` 为 true 生效） > Markdown 文件名

## 🕯️ Install

安装 `vitepress-plugin-sidebar-resolve` 插件

```bash
# 推荐使用 pnpm
pnpm i vitepress-plugin-sidebar-resolve
# or yarn
yarn add vitepress-plugin-sidebar-resolve
# or npm
npm install vitepress-plugin-sidebar-resolve
```

添加 `vitepress-plugin-sidebar-resolve` 插件到 `.vitepress/config.ts`

```typescript
import { defineConfig } from "vitepress";
import Sidebar from "vitepress-plugin-sidebar-resolve";

export default defineConfig({
  vite: {
    plugins: [Sidebar(/* options */)],
  },
});
```

> 说明：该插件仅限项目启动时生效，已改动或新添加的 Markdown 需要重启项目才能生效。

插件默认忽略 `["node_modules", "dist", ".vitepress", "public"]` 目录下的文件，且只扫描 Markdown 文档。

## 📖 Usage

插件支持两种方式来生成侧边栏：

1. `filePath` 方式：扫描项目的目录和文件，生成侧边栏
2. `rewrites` 方式：基于 VitePress 的 `rewrites` 功能，将文件路径映射为侧边栏

`rewrites` 是什么？，请看 VitePress 的 [路由重写](https://vitepress.dev/zh/guide/routing#route-rewrites) 描述。

这里简单说下个人理解，`filePath` 称之为 **本地文件路径**，`rewrites` 称之为 **运行文件路径**。

本地文件路径通俗易懂，那什么是运行文件路径？

我们访问的 VitePress 文档的链接地址就是 **运行文件路径**。VitePress 启动后，默认会将本地文件路径当作运行文件路径，但是我们可以通过 `rewrites` 将本地文件路径重新为新的文件路径，新的文件路径就会取代本地文件路径成为运行文件路径。

假设文件 `quick-start.md` 在本地路径为 `guide/quick-start.md`，在 `rewrites` 中添加如下配置：

```typescript
import { defineConfig } from "vitepress";

export default defineConfig({
  rewrites: {
    "guide/quick-start.md": "config/quick.md",
  },
});
```

此时该文件的运行文件路径为 `/config/quick` 而不是 `/guide/quick-start`。

因此插件支持基于 `rewrites` 方式生成侧边栏。

### 侧边栏生成规则

通过 `resolveRule` 配置项来配置侧边栏生成规则。

- 当 `resolveRule` 为 `filePath`，则按照本地文件路径生成侧边栏
- 当 `resolveRule` 为 `rewrites`，则按照 `rewrites` 结果生成侧边栏

```typescript
import { defineConfig } from "vitepress";

export default defineConfig({
  vite: {
    plugins: [
      Sidebar({
        resolveRule: "filePath",
        // resolveRule: "rewrites",
      }),
    ],
  },
});
```

如果 `resolveRule` 为 `rewrites`，但是没有 `rewrites` 配置，则按照 `filePath` 配置生成侧边栏。

`rewrites` 方式推荐和 [vitepress-plugin-permalink](https://github.com/Kele-Bingtang/vitepress-theme-teek/tree/master/plugins/vitepress-plugin-permalink) 插件搭配使用，`vitepress-plugin-permalink` 插件可以在 Markdown 文件的 `frontmatter` 中添加 `permalink` 属性，用于指定该文件的永久链接，并生成 `rewrites`。

什么是永久链接？VitePress 默认按照运行文件路径访问，而通过配置 `permalink` 永久链接，则按照永久链接访问，这样不用因为 Markdown 文档路径移动而导致访问地址发生变化。

### 侧边栏忽略

如果不希望某个 Markdown 文档添加到侧边栏，可以在 `frontmatter` 配置：

```yaml
---
sidebar: false
---
```

### 侧边栏排序

侧边栏排序有 2 个方式：

1. 文件的命名直接使用 `序号 + 标题` 的格式，如 `01.a.md`、`02.b.md`、`03.c.md` 等，插件会自动将文件排序，并在生成侧边栏时将序号去掉
2. 使用 `frontmatter.sidebarSort` 配置文件排序，数值越小越靠前，如：

```yaml
---
sidebarSort: 10
---
```

如果不指定 `frontmatter.sidebarSort`，那么插件给每一个文件默认设置为 `9999`，因此如果给某一个文件的 `frontmatter.sidebarSort` 设置大于 `9999`，则排在侧边栏的最后面。

如果想自定义默认序号 9999 为其他序号，或者希望文件名本身有序号时，则替换 9999，则参考如下配置：

```typescript
import { defineConfig } from "vitepress";
import Sidebar from "vitepress-plugin-sidebar-resolve";

export default defineConfig({
  vite: {
    plugins: [
      Sidebar({
        sort: true, // 开启 frontmatter.sidebarSort 功能，默认已经开启，无需设置
        defaultSortNum: 9999, // 没有指定 frontmatter.sidebarSort 时的默认值，用于侧边栏排序
        sortNumFromFileName: false, // 是否用文件名的前缀序号作为其侧边栏 Item 的排序序号。如果为 true，当文件名存在序号前缀，则使用序号前缀，否则使用 defaultSortNum
      }),
    ],
  },
});
```

如果想关闭 `frontmatter.sidebarSort` 功能，则插件传入 `sort` 为 `false`，可以参考上方代码块。

### 侧边栏图标

如果希望侧边栏标题前新增图标，可以在 `frontmatter.title` 配置：

```yaml
---
title: <i class='iconfont icon-teek'></i> 我是标题
---
```

或者单独使用 `frontmatter.sidebarPrefix` 或 `frontmatter.sidebarSuffix` 配置， 插件会将图标并添加到标题前/后

```yaml
---
sidebarPrefix: <i class='iconfont icon-teek'></i>
sidebarSuffix: <i class='iconfont icon-teek'></i>
---
```

如果使用的是 `iconfont` 图标，每次使用都要加 ` <i class='iconfont icon-{xxx}'></i>` 比较麻烦，因此插件提供了 `prefixTransform` 和 `suffixTransform` 配置项，可以对所有的 `sidebarPrefix` 和 `sidebarSuffix` 进行二次处理，如：

```typescript
import { defineConfig } from "vitepress";
import Sidebar from "vitepress-plugin-sidebar-resolve";

export default defineConfig({
  vite: {
    plugins: [
      Sidebar({
        prefixTransform: prefix => {
          // 判断是否为 HTML 标签
          const htmlTagRegex = /^<([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/;
          if (htmlTagRegex.test(prefix)) return prefix;

          return `<i class="iconfont icon-${prefix}"></i>`;
        },
      }),
    ],
  },
});
```

此时在 `frontmatter.sidebarPrefix` 配置：

```yaml
---
sidebarPrefix: teek
---
```

## 🛠️ Options

### Parameters

| name                | description                                                                                                                                                | type                                                                          | default                        |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------ |
| ignoreList          | 忽略的文件/文件夹列表，支持正则表达式                                                                                                                      | `string[]`                                                                    | `[]`                           |
| path                | 指定扫描的根目录                                                                                                                                           | `string`                                                                      | `vitepress` 的 `srcDir` 配置项 |
| ignoreIndexMd       | 是否忽略每个目录下的 `index.md` 文件                                                                                                                       | `boolean`                                                                     | `false`                        |
| scannerRootMd       | 是否扫描根目录下的 Markdown 文件作为 sidebar，如果为 true，则扫描根目录下的 Markdown 文件作为 sidebar，且忽略根目录下的 index.md                           | `boolean`                                                                     | `true`                         |
| initItems           | 是否初始化第一层 items                                                                                                                                     | `boolean`                                                                     | `true`                         |
| initItemsText       | 是否初始化第一层 items 的 text 为当前目录名。当 `initItems` 为 true 时生效                                                                                 | `boolean`                                                                     | `false`                        |
| collapsed           | 是否折叠侧边栏，函数的 2 个参数为当前文件的相对路径（基于根目录）和侧边栏的 `text`                                                                         | `boolean` \| `((relativePath: string, text: string \| undefined) => boolean)` | `true`                         |
| fileIndexPrefix     | 文件名前缀必须以「数字.」开头                                                                                                                              | `boolean`                                                                     | `false`                        |
| titleFormMd         | 是否从 Markdown 文件获取第一个一级标题作为侧边栏 text                                                                                                      | `boolean`                                                                     | `false`                        |
| localeRootDir       | 当 VitePress 设置 locales 国际化后，如果将 root 语言（默认语言）的所有文件放到一个单独的目录下，如 zh，则需要将 `localeRootDir` 设为 zh                    | `string`                                                                      | 文档根目录                     |
| restart             | Markdown 文件创建或者删除时，是否重启 VitePress 服务                                                                                                       | `boolean`                                                                     | `false`                        |
| ignoreWarn          | 忽略插件在构建侧边栏时生成的警告信息                                                                                                                       | `boolean`                                                                     | `false`                        |
| sort                | 是否开启侧边栏排序功能，可以在 `frontmatter.sidebarSort` 对本文件进行排序，越低的越靠前                                                                    | `boolean`                                                                     | `true`                         |
| defaultSortNum      | 没有指定 `frontmatter.sidebarSort` 时的默认值，用于侧边栏排序                                                                                              | `number`                                                                      | 9999                           |
| sortNumFromFileName | 是否用文件名的前缀序号作为其侧边栏 Item 的排序序号。如果为 true，当文件名存在序号前缀，则使用序号前缀，否则使用 defaultSortNum                             | `boolean`                                                                     | `false`                        |
| indexSeparator      | 自定义序号后的分隔符（默认仍然支持 `.` 作为分隔符，该配置是支持额外分隔符，如自定义分隔符为 `_`，则文件名 `01.a.md` 和 `01_a.md` 都生效）                  | `string`                                                                      |                                |
| resolveRule         | 解析过则，filePath 则基于文件路径解析，rewrites 则基于 VitePress 的 rewrites 配置解析，如果 resolveRule 为 rewrites 但是 rewrites 为空，则走 filePath 规则 | `filePath` / `rewrites`                                                       | filePath                       |
| checkRewritesPrefix | 是否校验每个目录下的 rewrites 前缀是否一致，仅当 ignoreWarn 为 true 生效                                                                                   | `boolean`                                                                     | false                          |

> 额外说明

假设根目录下有目录名为 `guide`：

- 当 `initItems` 为 true，则最终结果为 `sidebar: { "/guide": { items: [], collapsed }}`
  - 当 `initItemsText` 为 true，则最终结果为 `sidebar: { "/guide": { text: "guide", items: [], collapsed }}`
  - 当 `initItemsText` 为 false，则最终结果为 `sidebar: { "/guide": { items: [] }}`
- 当 `initItems` 为 false，则最终结果为 `sidebar: { "/guide": [] }`

### Functions

可以通过插件提供的回调函数来修改侧边栏数据

| name                     | description                                                                      | type                                                               | default |
| ------------------------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------- |
| sidebarResolved          | 解析完每个 sidebar 后的回调。每个 sidebar 指的是二级目录                         | `(data: DefaultTheme.SidebarMulti) => DefaultTheme.SidebarMulti`   |         |
| sidebarItemsResolved     | 解析完每个 sidebarItem 后的回调。每个 sidebarItem 指的是每个二级目录下的文件数组 | `(data: DefaultTheme.SidebarItem[]) => DefaultTheme.SidebarItem[]` |         |
| beforeCreateSidebarItems | 创建 sidebarItem 之前的回调。每个 sidebarItem 指的是每个二级目录下的文件数组     | `(data: string[]) => string[]`                                     |         |
| prefixTransform          | 自定义标题前缀内容，参数 `prefix` 为 `frontmatter.sidebarPrefix` 传入            | `(prefix: string) => string`                                       |         |
| suffixTransform          | 自定义标题后缀内容，参数 `suffix` 为 `frontmatter.sidebarSuffix` 传入            | `(prefix: string) => string`                                       |         |

## 📘 TypeScript

### 🛠️ Options

```typescript
import type { DefaultTheme } from "vitepress";

export interface SidebarOption {
  /**
   * 生成侧边栏时，忽略的文件/文件夹列表，支持正则表达式
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
   * 是否扫描根目录下的 md 文件作为 sidebar，如果为 true，则扫描根目录下的 md 文件作为 sidebar，且忽略根目录下的 index.md
   *
   * @default true
   */
  scannerRootMd?: boolean;
  /**
   * 是否默认折叠侧边栏
   *
   * @default true
   */
  collapsed?: boolean;
  /**
   * 文件名前缀必须以「数字.」开头
   *
   * @default true
   */
  fileIndexPrefix?: boolean;
  /**
   * 是否从 md 文件获取第一个一级标题作为侧边栏 text
   *
   * @default false
   * @remark 侧边栏 text 获取顺序
   * titleFormMd 为 true：md 文件 frontmatter.title > [md 文件第一个一级标题] > md 文件名
   * titleFormMd 为 false：md 文件 frontmatter.title > md 文件名
   */
  titleFormMd?: boolean;
  /**
   * 当 VitePress 设置 locales 国际化后，如果将 root 语言（默认语言）的所有文件放到一个单独的目录下，如 zh，则需要将 localeRootDir 设为 zh，否则侧边栏无法知道文件都放到了 zh
   * 如果 root 语言（默认语言）的所有文件放在文档根目录下，则不需要设置 localeRootDir
   *
   * @default 文档根目录
   */
  localeRootDir?: string;
  /**
   * 解析完每个 sidebar 后的回调。每个 sidebar 指的是 SidebarOption.path 目录下的每个子目录
   *
   * @param data 当前 sidebar 列表
   * @default undefined
   */
  sidebarResolved?: (data: DefaultTheme.SidebarMulti) => DefaultTheme.SidebarMulti;
  /**
   * 解析完每个 sidebarItem 后的回调。每个 sidebarItem 指的是每个目录下的文件数组
   *
   * @param data 当前 sidebarItem 列表
   * @default undefined
   */
  sidebarItemsResolved?: (data: DefaultTheme.SidebarItem[]) => DefaultTheme.SidebarItem[];
  /**
   * 创建 sidebarItem 之前的回调。每个 sidebarItem 指的是每个目录下的文件数组
   *
   *
   * @param data 将要解析的所有文件名
   * @default undefined
   * @remark 可以过滤掉不需要解析为 sidebarItem 的文件
   */
  beforeCreateSidebarItems?: (data: string[]) => string[];
  /**
   * Markdown 文件创建或者删除时，是否重启 VitePress 服务
   *
   * @default false
   */
  restart?: boolean;
  /**
   * 忽略插件在构建侧边栏时生成的警告信息
   *
   * @default false
   */
  ignoreWarn?: boolean;
  /**
   * 是否开启侧边栏排序功能，可以在 frontmatter.sidebarSort 对本文件进行排序，越低的越靠前
   *
   * 如果只通过文件名添加前缀序号进行排序，则建议关掉该配置，因为该配置开启后，会读取每一个文件的 frontmatter.sidebarSort，耗费些许时间
   *
   * @default true
   */
  sort?: boolean;
  /**
   * 没有指定 frontmatter.sidebarSort 时的默认值，用于侧边栏排序
   *
   * @default 9999
   */
  defaultSortNum?: number;
  /**
   * 是否用文件名的前缀序号作为其侧边栏 Item 的排序序号。如果为 true，当文件名存在序号前缀，则使用序号前缀，否则使用 defaultSortNum
   *
   * @default false
   */
  sortNumFromFileName?: boolean;
  /**
   * 自定义序号后的分隔符（默认仍然支持 . 作为分隔符，该配置是支持额外分隔符，如自定义分隔符为 _，则文件名 01.a.md 和 01_a.md 都生效）
   */
  indexSeparator?: string;
  /**
   * 自定义标题前缀内容，参数 prefix 为 frontmatter.sidebarPrefix 传入
   */
  prefixTransform?: (prefix: string) => string;
  /**
   * 自定义标题后缀内容，参数 suffix 为 frontmatter.sidebarSuffix 传入
   */
  suffixTransform?: (suffix: string) => string;
}
```

## 🉑 License

[MIT](../../LICENSE) License © 2025 [Teeker](https://github.com/Kele-Bingtang)
