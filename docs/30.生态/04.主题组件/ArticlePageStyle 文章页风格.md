---
title: ArticlePageStyle 文章页风格
date: 2025-04-13 15:54:25
permalink: /ecosystem/components/article-page-style
categories:
  - 生态
  - 主题组件
tags:
  - 生态
  - 主题组件
codeBlock:
  collapseHeight: false
---

使用文章页风格组件可以在文章页进行风格调整。

## 基础使用

```ts
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import { TkArticlePageStyle, teekConfigContext } from "vitepress-theme-teek";
import "vitepress-theme-teek/theme-chalk/tk-article-page-style.css";

provide(teekConfigContext, {
  pageStyle: "default", // 可选 "default" | "card" | "segment" | "card-nav" | "segment-nav"，默认为 "default"
});

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      "doc-before": () => h(TkArticlePageStyle),
    }),
};
```
