---
title: ArticleImagePreview 文章页图片预览
date: 2025-04-13 15:53:44
permalink: /ecosystem/components/article-image-preview
categories:
  - 生态
  - 主题组件
tags:
  - 生态
  - 主题组件
codeBlock:
  collapseHeight: false
---

使用文章页图片预览组件可以在文章页进行图片预览。

## 基础使用

```ts
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import { TkArticleImagePreview, teekConfigContext } from "vitepress-theme-teek";

provide(teekConfigContext, {
  appreciation: {
    article: {
      imageViewer: {
        hideOnClickModal: true, // 点击图片时隐藏预览

        // ... 更多配置请看配置系列文章
      },
    },
  },
});

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      "doc-before": () => h(TkArticleImagePreview),
    }),
};
```

更多 `imageViewer` 配置项请看 [ImageViewer 图片预览](/ecosystem/components/image-viewer)。
