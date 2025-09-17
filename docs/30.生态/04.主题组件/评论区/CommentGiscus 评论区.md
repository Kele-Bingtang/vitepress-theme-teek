---
title: CommentGiscus 评论区
date: 2025-04-13 15:52:36
permalink: /ecosystem/components/giscus
categories:
  - 生态
  - 主题组件
tags:
  - 生态
  - 主题组件
codeBlock:
  collapseHeight: false
---

使用 Giscus 快速搭建一个评论区。

## 基础使用

```ts
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import { TkCommentGiscus, teekConfigContext } from "vitepress-theme-teek";
import "vitepress-theme-teek/theme-chalk/tk-comment-giscus.css";

provide(teekConfigContext, {
  comment: {
    options: {
      // giscus 配置，官网：https://giscus.app/zh-CN
      repo: "your repo",
      repoId: "your repo id",
      category: "your category",
      categoryId: "your category id",
    },
  },
});

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      "doc-after": () => h(TkCommentGiscus),
    }),
};
```

## 实例注入

通过配置项 Teek 内部会自动创建一个 Giscus 实例，当然您也可以手动注入示例：

首先您需要安装 Giscus 依赖：

```bash
pnpm add -D @giscus/vue
```

然后引入：

```ts
import DefaultTheme from "vitepress/theme";
import { TkCommentGiscus, teekConfigContext, giscusContext } from "vitepress-theme-teek";
import { h } from "vue";
import Giscus from "@giscus/vue";
import "vitepress-theme-teek/theme-chalk/tk-comment-giscus.css";

export default {
  extends: DefaultTheme,
  Layout: defineComponent({
    name: "LayoutProvider",
    setup() {
      provide(giscusContext, () => Giscus);

      return () =>
        h(DefaultTheme.Layout, null, {
          "doc-after": () => h(TkCommentGiscus),
        });
    },
  }),
};
```
