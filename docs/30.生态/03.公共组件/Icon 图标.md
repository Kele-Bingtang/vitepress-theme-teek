---
title: Icon 图标
date: 2025-05-05 17:56:26
permalink: /ecosystem/components/icon
categories:
  - 生态
  - 主题组件
tags:
  - 生态
  - 主题组件
---

## 基础用法

Icon 支持如下类型：

- svg
- unicode
- iconfont
- symbol
- img
- component
- iconifyOffline
- iconifyOnline

提供传入 `iconType` 来设置图标类型。

::: demo
icon/basic
:::

## 简写使用

Icon 支持特定的格式来自动识别图标类型，无需传入 `iconType`。

1. icon 为 `img-` 或 `IMG-` 开头，或者以 `.png`、`.jpg` 等图片后缀结尾，`iconType` 默认为 `img`
2. icon 为 `<svg` 开头，`iconType` 默认为 `svg`
3. icon 为 `if-` 或 `IF-` 开头，`iconType` 默认为 `iconfont`
4. icon 为 `uni-` 或 `UNI-` 开头，`iconType` 默认为 `unicode`
5. icon 为 `sym-` 或 `SYM-` 开头，`iconType` 默认为 `symbol`
6. icon 为含有 `name` 或者 `setup`，`iconType` 默认为 `component`
7. icon 为含有 `body`，`iconType` 默认为 `iconifyOffline`
8. icon 含有 `:`，`iconType` 默认为 `iconifyOnline`

::: demo
icon/simple
:::

## 激活状态

Icon 支持鼠标激活状态，通过传入 `hover` 来激活，`hover-color` 来设置颜色，默认为 Teek 的主题色。

::: demo
icon/hover
:::

## API

### 配置项

| 事件名     | 说明                                              | 类型                                            | 默认值                |
| :--------- | :------------------------------------------------ | :---------------------------------------------- | :-------------------- |
| icon       | 图标                                              | `string` / `Object` / `Comment` / `IconifyIcon` | —                     |
| iconType   | 图标类型                                          | `IconType`                                      | —                     |
| size       | 图标大小                                          | `string` / `number`                             | inherit               |
| color      | 图标颜色                                          | `string`                                        | inherit               |
| hover      | 图标是否可悬停                                    | `boolean`                                       | false                 |
| hoverColor | 图标悬停时的颜色                                  | `string`                                        | var(--tk-theme-color) |
| imgAlt     | img 标签的原生 alt，仅当 `iconType` 为 `img` 生效 | `string`                                        | —                     |
| style      | 自定义图标样式                                    | `Record<string, any>`                           | —                     |

IconType 类型为 `svg` / `unicode` / `iconfont` / `symbol` / `img` / `component` / `iconifyOffline` / `iconifyOnline`。

### 插槽

| 插槽名  | 说明           |
| :------ | :------------- |
| default | 自定义图标内容 |
