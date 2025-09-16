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
import { TkCommentArtalk, teekConfigContext } from "vitepress-theme-teek";
import "vitepress-theme-teek/theme-chalk/tk-comment-twikoo.css";

provide(teekConfigContext, {
  comment: {
    options: {
      // twikoo 配置，官网：https://twikoo.js.org/
      envId: "https://vp.teek.top/",
      link: "https://gcore.jsdelivr.net/npm/twikoo@1.6.42/dist/twikoo.all.min.js",
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
