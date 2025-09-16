---
title: ArticleOverviewPage 清单页 <Badge type="tip" text="v1.2.0" />
date: 2025-05-14 23:05:15
permalink: /ecosystem/components/article--overview-page
categories:
  - 生态
  - 公共组件
tags:
  - 生态
  - 公共组件
codeBlock:
  collapseHeight: false
---

::: warning 🚧 施工中
很高兴见到你！但很抱歉，这个页面还在施工中，如果没有找到你感兴趣的信息，你可以先在侧边栏的导航中寻找你感兴趣的内容来开始阅读
::::

## 基础使用

将清单页注册到全局里：

```ts
import DefaultTheme from "vitepress/theme";
import { ArticleOverviewPage } from "vitepress-theme-teek";
import "vitepress-theme-teek/theme-chalk/tk-article-overview-page.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app, siteData }) {
    app.component("TkArticleOverviewPage", ArticleOverviewPage);
  },
};
```

创建一个 Markdown 文件，在 `frontmatter` 添加如下内容：

```yaml
---
layout: TkArticleOverviewPage
---
```

此时访问该 Markdown 文件，即可看到效果。
