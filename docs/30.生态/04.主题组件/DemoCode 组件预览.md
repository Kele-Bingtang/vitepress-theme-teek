---
title: DemoCode 组件预览
date: 2025-04-13 15:55:14
permalink: /ecosystem/components/demo-code
categories:
  - 生态
  - 主题组件
tags:
  - 生态
  - 主题组件
codeBlock:
  collapseHeight: false
---

使用组件预览组件可以渲染一个 Vue 组件的效果，并支持代码复制、查看源代码等功能。

## 基础使用

```ts
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import { TkDemoCode, teekConfigContext } from "vitepress-theme-teek";
import "vitepress-theme-teek/theme-chalk/tk-demo-code.css";

provide(teekConfigContext, {
  markdown: {
    demo: {
      playgroundUrl: "", // Playground 链接
      playgroundMainFileName: "App.vue", // Playground 主文件名
      githubUrl: "", // Github 链接
      playgroundButtonTip: "在 Playground 中编辑", // 鼠标悬浮 Playground 按钮提示
      githubButtonTip: "在 Github 中编辑", // 鼠标悬浮 Github 按钮提示
      copyButtonTip: "复制代码", // 鼠标悬浮复制代码按钮提示
      collapseSourceButtonTip: "查看源代码", // 鼠标悬浮查看源代码按钮提示
      expandSourceButtonTip: "隐藏源代码", // 鼠标悬浮隐藏源代码按钮提示

      // ... 更多配置请看配置系列文章
    },
  },
});

export default {
  extends: DefaultTheme,
  enhanceApp({ app, siteData }) {
    app.component("TkDemoCode", TkDemoCode);
  },
};
```

## 插槽

DemoCode 组件默认有 4 个按钮，如果需要自定义按钮，可以通过 `slots` 来实现。

- `teek-demo-code-button-left`：最左侧按钮插槽
- `teek-demo-code-button-right`：最右侧按钮插槽

`app.component` 注册组件时，同名的组件会被覆盖，因此无论 Teek 之前是否已经注册（全局引入时自动注册）过 `TkDemoCode` 组件，您都可以通过 `app.component` 来覆盖。
