---
title: CommentWaline 评论区
date: 2025-04-13 15:52:54
permalink: /ecosystem/components/waline
categories:
  - 生态
  - 主题组件
tags:
  - 生态
  - 主题组件
codeBlock:
  collapseHeight: false
---

使用 Waline 快速搭建一个评论区。

## 基础使用

```ts
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import { TkCommentWaline, teekConfigContext } from "vitepress-theme-teek";
import "vitepress-theme-teek/theme-chalk/tk-comment-waline.css";

provide(teekConfigContext, {
  comment: {
    options: {
      // waline 配置，官网：https://waline.js.org/
      serverURL: "https://vp.teek.top/",
      jsLink: "https://unpkg.com/@waline/client@v3/dist/waline.js",
      cssLink: "https://unpkg.com/@waline/client@v3/dist/waline.css",
    },
  },
});

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      "doc-after": () => h(TkCommentWaline),
    }),
};
```

## 实例注入

通过配置项 Teek 内部会自动创建一个 Waline 实例，当然您也可以手动注入示例：

首先您需要安装 Waline 依赖：

```bash
pnpm add -D @waline/client
```

然后引入：

```ts
import DefaultTheme from "vitepress/theme";
import { TkCommentWaline, teekConfigContext, walineContext } from "vitepress-theme-teek";
import { h } from "vue";
import { init } from "@waline/client";
import "@waline/client/style";
import "vitepress-theme-teek/theme-chalk/tk-comment-waline.css";

provide(teekConfigContext, {
  comment: {
    options: {
      // waline 配置，官网：https://waline.js.org/
      serverURL: "https://vp.teek.top/",
      jsLink: "https://unpkg.com/@waline/client@v3/dist/waline.js",
      cssLink: "https://unpkg.com/@waline/client@v3/dist/waline.css",
    },
  },
});

export default {
  extends: DefaultTheme,
  Layout: defineComponent({
    name: "LayoutProvider",
    setup() {
      // options 为 `provide(teekConfigContext, {})` 的内容
      provide(walineContext, (el, options) => init({ serverURL: options.serverURL!, dark: options.dark, el }));

      return () =>
        h(DefaultTheme.Layout, null, {
          "doc-after": () => h(TkCommentWaline),
        });
    },
  }),
};
```
