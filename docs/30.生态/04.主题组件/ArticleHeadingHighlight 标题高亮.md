---
title: ArticleHeadingHighlight 标题高亮
date: 2025-04-29 02:41:47
permalink: /ecosystem/components/article-heading-highlight
categories:
  - 生态
  - 主题组件
tags:
  - 生态
  - 主题组件
codeBlock:
  collapseHeight: false
---

使用标题高亮组件，可以在点击标题时，高亮标题，方便快速定位在哪个位置。

## 基础使用

```ts
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import { TkArticleHeadingHighlight } from "vitepress-theme-teek";

export default {
  extends: DefaultTheme,
  Layout: () => h("div", null, [h(TkArticleHeadingHighlight), h(DefaultTheme.Layout)]),
};
```
