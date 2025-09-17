---
title: CommentArtalk 评论区
date: 2025-04-13 15:52:27
permalink: /ecosystem/components/artalk
categories:
  - 生态
  - 主题组件
tags:
  - 生态
  - 主题组件
codeBlock:
  collapseHeight: false
---

使用 Artalk 快速搭建一个评论区。

## 基础使用

```ts
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import { TkCommentArtalk, teekConfigContext } from "vitepress-theme-teek";
import "vitepress-theme-teek/theme-chalk/tk-comment-artalk.css";

provide(teekConfigContext, {
  comment: {
    options: {
      // artalk 配置，官网：https://artalk.js.org/
      server: "https://vp.teek.top",
      site: "Teek Site",
    },
  },
});

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      "doc-after": () => h(TkCommentArtalk),
    }),
};
```

## 实例注入

通过配置项 `server`，Teek 内部会自动创建一个 Artalk 实例，当然您也可以手动注入示例：

首先您需要安装 Artalk 依赖：

```bash
pnpm add -D artalk
```

然后引入：

```ts
import DefaultTheme from "vitepress/theme";
import { TkCommentArtalk, teekConfigContext, artalkContext } from "vitepress-theme-teek";
import { h } from "vue";
import { useData, useRoute } from "vitepress";
import Artalk from "artalk";
import "artalk/Artalk.css";
import "vitepress-theme-teek/theme-chalk/tk-comment-artalk.css";

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
            // artalk 配置，官网：https://artalk.js.org/
            server: "https://vp.teek.top",
            site: "Teek Site",
          },
        },
      });

      // options 为 `provide(teekConfigContext, {})` 的内容
      provide(artalkContext, (el, options) =>
        Artalk.init({
          el,
          darkMode: isDark.value,
          pageKey: route.path,
          pageTitle: page.value.title,
          server: options.server,
          site: options.site,
        })
      );

      return () =>
        h(DefaultTheme.Layout, null, {
          "doc-after": () => h(TkCommentArtalk),
        });
    },
  }),
};
```

手动创建实例会更灵活，您可以随意操控实例的样子。
