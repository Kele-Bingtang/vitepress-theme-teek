---
title: FooterGroup 信息组
date: 2025-04-13 15:55:25
permalink: /ecosystem/components/footer-group
categories:
  - 生态
  - 主题组件
tags:
  - 生态
  - 主题组件
codeBlock:
  collapseHeight: false
---

使用信息组组件可以在页脚中展示多个分组链接。

## 基础使用

```ts
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import { TkFooterGroup, teekConfigContext } from "vitepress-theme-teek";
import "vitepress-theme-teek/theme-chalk/tk-footer-group.css";

provide(teekConfigContext, {
  footerGroup: [
    {
      title: "外部链接",
      links: [
        { name: "示例 1", link: "https://vp.teek.top" },
        { name: "示例 2", link: "https://vp.teek.top" },
        { name: "示例 3", link: "https://vp.teek.top" },
      ],
    },
    {
      title: "内部链接",
      links: [
        { name: "快速开始", link: "/guide/quickstart" },
        { name: "配置简介", link: "/reference/config" },
      ],
    },
  ],

  // ... 更多配置请看配置系列文章
});

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      "layout-bottom": () => h(TkFooterGroup),
    }),
};
```
