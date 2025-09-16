---
title: CodeBlockToggle 代码块
date: 2025-04-13 15:55:03
permalink: /ecosystem/components/code-block-toggle
categories:
  - 生态
  - 主题组件
tags:
  - 生态
  - 主题组件
codeBlock:
  collapseHeight: false
---

使用代码块组件对 VitePress 的默认代码块进行样式和功能加强，支持折叠。

## 基础使用

```ts
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import { TkCodeBlockToggle, teekConfigContext } from "vitepress-theme-teek";
import "vitepress-theme-teek/theme-chalk/tk-code-block-toggle.css";

provide(teekConfigContext, {
  codeBlock: {
    disabled: false, // 是否禁用新版代码块
    collapseHeight: 700, // 超出高度后自动折叠，设置 true 则默认折叠，false 则默认不折叠

    // ... 更多配置请看配置系列文章
  },
});

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      "doc-before": () => h(TkCodeBlockToggle),
    }),
};
```
