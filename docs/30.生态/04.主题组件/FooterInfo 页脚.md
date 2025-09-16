---
title: FooterInfo 页脚
date: 2025-04-13 15:55:38
permalink: /ecosystem/components/footer-info
categories:
  - 生态
  - 主题组件
tags:
  - 生态
  - 主题组件
codeBlock:
  collapseHeight: false
---

使用页脚组件可以在页脚自定义内容，如版权信息、备案信息等。

## 基础使用

```ts
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import { TkFooterInfo, teekConfigContext } from "vitepress-theme-teek";
import "vitepress-theme-teek/theme-chalk/tk-footer-info.css";

provide(teekConfigContext, {
  footerInfo: {
    topMessage: ["下面的内容和图标都可以修改（本条内容也可以隐藏的）"],
    bottomMessage: ["上面的内容和图标都可以修改（本条内容也可以隐藏的）"],
    copyright: {
      createYear: 2021,
      suffix: "天客 Blog",
    },
    icpRecord: {
      name: "桂ICP备2021009994号",
      link: "http://beian.miit.gov.cn/",
    },
    customHtml: `<span style="color: var(--tk-theme-color)">自定义标签内容</span>`,
    // ... 更多配置请看配置系列文章
  },
});

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      "layout-bottom": () => h(TkFooterInfo),
    }),
};
```
