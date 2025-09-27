---
title: ArticleBanner 文章页 Banner
date: 2025-09-14 21:13:50
permalink: /ecosystem/components/article-banner
categories:
  - 生态
  - 公共组件
tags:
  - 生态
  - 公共组件
codeBlock:
  collapseHeight: false
---

文章页顶部的 Banner 组件，仅在没有侧边栏的文章页生效，可以添加封面图或者背景色。

## 基础使用

```ts
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import { TkArticleBanner, teekConfigContext } from "vitepress-theme-teek";
import "vitepress-theme-teek/theme-chalk/tk-article-update.css";

provide(teekConfigContext, {
  articleBanner: {
    enabled: true, // 是否启用单文章页 Banner
    showCategory: true, // 是否展示分类
    showTag: true, // 是否展示标签
    defaultCoverImg: "", // 默认封面图
    defaultCoverBgColor: "", // 默认封面背景色，优先级低于 defaultCoverImg
  },
});

// 是否显示 Article Banner（使用条件：开启该功能、没有侧边栏的文章页）
const showArticleBanner = computed(
  () =>
    frontmatter.value.articleBanner !== false &&
    teekConfig.value.articleBanner.enabled &&
    !hasSidebar.value &&
    frontmatter.value.article !== false &&
    (!frontmatter.value.layout || frontmatter.value.layout === "doc") &&
    teekConfig.value.pageStyle === "default"
);

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      "layout-top": () => (showArticleBanner.value ? h(TkArticleBanner) : null),
    }),
};
```
