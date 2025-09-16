---
title: CataloguePage 目录页
date: 2025-04-13 15:54:48
permalink: /ecosystem/components/catalogue
categories:
  - 生态
  - 主题组件
tags:
  - 生态
  - 主题组件
codeBlock:
  collapseHeight: false
---

## 基础使用

将目录页注册到全局里：

```ts
import DefaultTheme from "vitepress/theme";
import { TkCataloguePage } from "vitepress-theme-teek";
import "vitepress-theme-teek/theme-chalk/tk-catalogue-page.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app, siteData }) {
    app.component("TkCataloguePage", TkCataloguePage);
  },
};
```

创建一个 Markdown 文件，在 `frontmatter` 添加如下内容：

```yaml
---
layout: TkCataloguePage
path: guide # 扫描的路径，基于 .vitepress 同级目录
desc: 描述
sidebar: false
---
```

此时访问该 Markdown 文件，即可看到效果。
