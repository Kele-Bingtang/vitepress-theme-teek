---
title: ArticleAnalyze 文章分析
date: 2025-04-29 02:41:47
permalink: /ecosystem/components/article-analyze
categories:
  - 生态
  - 主题组件
tags:
  - 生态
  - 主题组件
codeBlock:
  collapseHeight: false
---

使用文章分析组件，可以获取文章的创建时间、字数、阅读时间、访问量等信息。

## 基础使用

```ts
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import { TkArticleAnalyze, teekConfigContext } from "vitepress-theme-teek";

provide(teekConfigContext, {
  author: { name: "Teeker", link: "https://github.com/Kele-Bingtang" },
  articleAnalyze: {
    showIcon: true,
    dateFormat: "yyyy-MM-dd",
    showAuthor: true,
    showCreateDate: true,
    showUpdateDate: false,
    showCategory: false,
    showTag: false,
  },
  docAnalysis: {
    wordCount: true,
    readingTime: true,
  },

  // ... 更多配置请看配置系列文章
});

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      "doc-before": () => h(TkArticleAnalyze),
    }),
};
```
