---
title: CommentTwikoo 评论区
date: 2025-04-13 15:52:45
permalink: /ecosystem/components/twikoo
categories:
  - 生态
  - 主题组件
tags:
  - 生态
  - 主题组件
codeBlock:
  collapseHeight: false
---

使用 Twikoo 快速搭建一个评论区。

## 基础使用

```ts
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import { TkCommentTwikoo, teekConfigContext } from "vitepress-theme-teek";
import "vitepress-theme-teek/theme-chalk/tk-comment-twikoo.css";

provide(teekConfigContext, {
  comment: {
    options: {
      // twikoo 配置，官网：https://twikoo.js.org/
      envId: "your envId",
      link: "https://gcore.jsdelivr.net/npm/twikoo@1.6.42/dist/twikoo.all.min.js",
    },
});

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      "doc-after": () => h(TkCommentTwikoo),
    }),
};
```

## 实例注入

通过配置项 `server`，Teek 内部会自动创建一个 Twikoo 实例，当然您也可以手动注入示例：

首先您需要安装 Twikoo 依赖：

```bash
pnpm add -D twikoo
```

然后引入：

```ts
import DefaultTheme from "vitepress/theme";
import { TkCommentTwikoo, teekConfigContext, twikooContext } from "vitepress-theme-teek";
import { h } from "vue";
import { useData, useRoute } from "vitepress";
import Twikoo from "twikoo";
import "vitepress-theme-teek/theme-chalk/tk-comment-twikoo.css";

export default {
  extends: DefaultTheme,
  Layout: defineComponent({
    name: "LayoutProvider",
    setup() {
      const { isDark, page } = useData();
      const route = useRoute();

      provide(teekConfigContext, {
        comment: {
          options: {
            // twikoo 配置，官网：https://twikoo.js.org/
            envId: "your envId",
          },
        },
      });

      // options 为 `provide(teekConfigContext, {})` 的内容
      provide(twikooContext, (el, options) => twikoo.init({ ...options, el }));

      return () =>
        h(DefaultTheme.Layout, null, {
          "doc-after": () => h(TkCommentTwikoo),
        });
    },
  }),
};
```

手动创建实例会更灵活，您可以随意操控实例的样子。
