---
title: RightBottomButton 右下角按钮组
date: 2025-04-29 02:41:47
permalink: /ecosystem/components/right-bottom-button
categories:
  - 生态
  - 主题组件
tags:
  - 生态
  - 主题组件
codeBlock:
  collapseHeight: false
---

右下角按钮组组件提供返回顶部、跳转到评论区功能。

## 基础使用

```ts
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import { TkRightBottomButton } from "vitepress-theme-teek";

export default {
  extends: DefaultTheme,
  Layout: () => h("div", null, [h(TkRightBottomButton), h(DefaultTheme.Layout)]),
};
```
