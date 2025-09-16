---
title: ArticleAppreciation 赞赏
date: 2025-04-13 15:53:30
permalink: /ecosystem/components/article-appreciation
categories:
  - 生态
  - 公共组件
tags:
  - 生态
  - 公共组件
codeBlock:
  collapseHeight: false
---

使用赞赏组件可以在文章页使用赞助功能。

## 文章页底部赞赏

```ts
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import { TkDocAfterAppreciation, teekConfigContext } from "vitepress-theme-teek";
import "vitepress-theme-teek/theme-chalk/tk-article-appreciation.css";

provide(teekConfigContext, {
  appreciation: {
    options: {
      icon: "weChatPay", // 赞赏图标，内置 weChatPay 和 alipay
      expandTitle: "打赏支持", // 展开标题，支持 HTML
      collapseTitle: "下次一定", // 折叠标题，支持 HTML
      content: `<img src='/teek-logo-large.png'>`, // 赞赏内容，支持 HTML
      expand: false, // 是否默认展开，默认 false

      // ... 更多配置请看配置系列文章
    },
  },
});

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      "doc-after": () => h(TkDocAfterAppreciation),
    }),
};
```

## 大纲栏底部赞赏

```ts
import DefaultTheme from "vitepress/theme";
import { AsideBottomAppreciation, teekConfigContext } from "vitepress-theme-teek";
import { h } from "vue";

provide(teekConfigContext, {
  appreciation: {
    options: {
      title: "打赏支持", // 赞赏标题，支持 HTML
      content: `<img src='/teek-logo-large.png'>`, // 赞赏内容，支持 HTML
    },
  },
});

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      "aside-bottom": () => h(AsideBottomAppreciation),
    }),
};
```
