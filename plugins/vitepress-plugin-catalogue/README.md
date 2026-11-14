# vitepress-plugin-catalogue

这是一个适用于 `vitepress` 的 Vite 插件，`vitepress` 启动会扫描 Markdown 文档，对 `frontmatter.catalogue` 为 true 的文档进行分析。

## ✨ Feature

- 🚀 自动生成目录页数据，挂载到 `themeConfig.catalogues` 下

## 🕯️ Install

安装 `vitepress-plugin-catalogue` 插件

```bash
# 推荐使用 pnpm
pnpm i vitepress-plugin-catalogue
# or yarn
yarn add vitepress-plugin-catalogue
# or npm
npm install vitepress-plugin-catalogue
```

添加 `vitepress-plugin-catalogue` 插件到 `.vitepress/config.ts`

```typescript
import { defineConfig } from "vitepress";
import Catalogue from "vitepress-plugin-catalogue";

export default defineConfig({
  vite: {
    plugins: [Catalogue(/* options */)],
  },
});
```

> 说明：该插件仅限项目启动时生效，如果给 Markdown 添加 `catalogue` 功能，需要重启项目生效。

插件默认忽略 `["node_modules", "dist", ".vitepress", "public"]` 目录下的文件，且只扫描 Markdown 文档。

## 📖 Usage

假设项目的目录结构如下：

```text
.
├─ docs                # 项目根目录
│  ├─ guide
│  │  ├─ vue
│  │  │  └─ getting.md
│  │  │  └─ routing.md
│  │  └─ why.md
│  │  └─ catalogue.md     # 目录页
```

`catalogue.md` 内容如下：

```yaml
---
catalogue: true
path: guide
---
```

path 是基于 [srcDir](https://vitepress.dev/zh/reference/site-config#srcdir) 的相对路径。

你可以在 `themeConfig.catalogues` 得到如下内容：

```json
{
  "arr": [
    {
      "title": "vue",
      "children": [
        { "title": "getting", "link": "/guide/vue/getting" },
        { "title": "routing", "link": "/guide/vue/routing" }
      ]
    },
    {
      "title": "why",
      "link": "/guide/why"
    }
  ],
  "map": {
    "guide/catalogue": {
      "path": "guide",
      "catalogues": [
        {
          "title": "vue",
          "children": [
            { "title": "getting", "link": "/guide/vue/getting" },
            { "title": "routing", "link": "/guide/vue/routing" }
          ]
        },
        {
          "title": "why",
          "link": "/guide/why"
        }
      ]
    }
  },
  "inv": {
    "guide": {
      "filePath": "guide/catalogue",
      "catalogues": [
        {
          "title": "vue",
          "children": [
            { "title": "getting", "link": "/guide/vue/getting" },
            { "title": "routing", "link": "/guide/vue/routing" }
          ]
        },
        {
          "title": "why",
          "link": "/guide/why"
        }
      ]
    }
  }
}
```

如果某个 Markdown 文档不想被纳入目录里，则：

```yaml
---
inCatalogue: false
---
```

## 🛠️ Options

| name                  | description                                                                                                                               | type                                         | default                        |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------ |
| ignoreList            | 忽略的文件/文件夹列表，支持正则表达式                                                                                                     | `string[]`                                   | `[]`                           |
| path                  | 指定扫描的根目录                                                                                                                          | `string`                                     | `vitepress` 的 `srcDir` 配置项 |
| ignoreIndexMd         | 是否忽略每个目录下的 index.md 文件                                                                                                        | `boolean`                                    | `false`                        |
| titleFormMd           | 是否从 md 文件获取第一个一级标题作为侧边栏 text                                                                                           | `boolean`                                    | `false`                        |
| indexSeparator        | 自定义序号后的分隔符（默认仍然支持 `.` 作为分隔符，该配置是支持额外分隔符，如自定义分隔符为 `_`，则文件名 `01.a.md` 和 `01_a.md` 都生效） | `string`                                     |                                |
| catalogueItemResolved | 解析完每个 catalogueItem 后的回调。每个 catalogueItem 指的是每个目录下的文件数组                                                          | `(data: CatalogueItem[]) => CatalogueItem[]` |                                |

根据 `themeConfig.catalogues` 的数据，你可以编写 vue 组件制作一个目录页。

## 📘 TypeScript

### 🛠️ Options

```typescript
export interface CatalogueOption {
  /**
   * 忽略的文件/文件夹列表，支持正则表达式
   *
   * @default []
   */
  ignoreList?: Array<RegExp | string>;
  /**
   * 文章所在的目录，基于 .vitepress 目录层级添加
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
   * 控制是否从 md 文件获取第一个一级标题作为侧边栏 text
   *
   * @default false
   * @remark 侧边栏 text 获取顺序
   * titleFormMd 为 true：md 文件 frontmatter.title > [md 文件第一个一级标题] > md 文件名
   * titleFormMd 为 false：md 文件 frontmatter.title > md 文件名
   */
  titleFormMd?: boolean;
  /**
   * 自定义序号后的分隔符（默认仍然支持 . 作为分隔符，该配置是支持额外分隔符，如自定义分隔符为 _，则文件名 01.a.md 和 01_a.md 都生效）
   */
  indexSeparator?: string;
  /**
   * 解析完每个 catalogueItem 后的回调。每个 catalogueItem 指的是每个目录下的文件数组
   *
   * @param data 当前 catalogueItem 列表
   */
  catalogueItemResolved?: (data: CatalogueItem[]) => CatalogueItem[];
}
```

### Data

如下是目录数据结构类型

```typescript
export interface Catalogue {
  /**
   * 目录页数据，map 和 inv 都是由 arr 转换得来的
   */
  arr: CatalogueInfo[];
  /**
   * key 为文件相对路径，value 为 { path：扫描的目录页路径, url: "访问路径", catalogues：目录页数据 }
   */
  map: {
    [key: string]: { path: string; url: string; catalogues: CatalogueItem[] };
  };
  /**
   * key 为 path：扫描的目录页路径文，value 为 { path：件相对路径, url: "访问路径", catalogues：目录页数据 }
   */
  inv: {
    [key: string]: { filePath: string; url: string; catalogues: CatalogueItem[] };
  };
}

export interface CatalogueInfo {
  /**
   * 文件相对路径
   */
  filePath: string;
  /**
   * 要扫描的目录路径
   */
  path: string;
  /**
   * 目录页数据
   */
  catalogues?: CatalogueItem[];
}

export interface CatalogueItem {
  /**
   * 文件名称
   */
  title: string;
  /**
   * 文件 frontmatter
   */
  frontmatter: Record<string, any>;
  /**
   * 文件访问路径
   */
  url?: string;
  /**
   * 子目录
   */
  children?: CatalogueItem[];
}
```

## License

[MIT](../../LICENSE) License © 2025 [Teeker](https://github.com/teekhub)
