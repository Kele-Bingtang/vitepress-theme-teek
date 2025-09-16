---
title: Home 首页
date: 2025-04-13 15:55:54
permalink: /ecosystem/components/home
categories:
  - 生态
  - 主题组件
tags:
  - 生态
  - 主题组件
codeBlock:
  collapseHeight: false
---

使用首页组件可以快速搭建一个精美的博客首页。

## 基础使用

```ts
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import { TkHome, teekConfigContext } from "vitepress-theme-teek";
import "vitepress-theme-teek/theme-chalk/tk-home-banner-bg-image.css";
import "vitepress-theme-teek/theme-chalk/tk-home-banner-bg-pure.css";
import "vitepress-theme-teek/theme-chalk/tk-home-banner-bg-content.css";
import "vitepress-theme-teek/theme-chalk/tk-home-banner-bg-feature.css";
import "vitepress-theme-teek/theme-chalk/tk-home-banner-bg-waves.css";
import "vitepress-theme-teek/theme-chalk/tk-home-banner.css";
import "vitepress-theme-teek/theme-chalk/tk-home-card.css";
import "vitepress-theme-teek/theme-chalk/tk-home-category-card.css";
import "vitepress-theme-teek/theme-chalk/tk-home-doc-analysis-card.css";
import "vitepress-theme-teek/theme-chalk/tk-home-friend-link-card.css";
import "vitepress-theme-teek/theme-chalk/tk-home-fullscreen-wallpaper.css";
import "vitepress-theme-teek/theme-chalk/tk-home-my-card.css";
import "vitepress-theme-teek/theme-chalk/tk-home-card-list.css";
import "vitepress-theme-teek/theme-chalk/tk-home-post-item.css";
import "vitepress-theme-teek/theme-chalk/tk-home-post-list.css";
import "vitepress-theme-teek/theme-chalk/tk-home-tag-card.css";
import "vitepress-theme-teek/theme-chalk/tk-home-top-article-card.css";
import "vitepress-theme-teek/theme-chalk/tk-home.css";

provide(teekConfigContext, {
  // ... 更多配置请看配置系列文章
});

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      "home-hero-before": () => h(TkHome),
    }),
};
```
