---
title: Avatar 头像
date: 2025-04-13 14:56:31
permalink: /ecosystem/components/avatar
categories:
  - 生态
  - 公共组件
tags:
  - 生态
  - 公共组件
---

Avatar 组件是基于 ElementPlus 的 Avatar 组件进行二次封装，添加了部分功能。

大部分功能请看 ElementPlus 的 [Avatar 文档](https://element-plus.org/zh-CN/component/avatar.html)。

## 文本头像

如果是中文，则取第一个字符，如果是一个英文单词，则取前两个转大写，如果是多个英文单词，则取前两个单次的首字母转大写。

::: demo
avatar/text
:::

## 在线 Icon

支持传入在线 Iconify 图标，请前往 [Iconify](https://iconify.design) 寻找您需要的图标。

::: demo
avatar/icon
:::

## API

### 配置项

| 名称       | 说明                                         | 类型                                              | 默认值                |
| :--------- | :------------------------------------------- | :------------------------------------------------ | :-------------------- |
| icon       | 设置 Avatar 的图标类型，具体参考 Icon 组件   | `string` / `Component` / `Object` / `IconifyIcon` | —                     |
| icon-size  | 图标头像大小                                 | `string` / `number`                               | 18                    |
| size       | Avatar 大小                                  | `number` / `enum`                                 | default               |
| shape      | Avatar 形状                                  | `enum`                                            | circle                |
| src        | Avatar 图片的源地址                          | `string`                                          | —                     |
| src-set    | 图片 Avatar 的原生 `srcset` 属性             | `string`                                          | —                     |
| alt        | 图片 Avatar 的原生 `alt` 属性                | `string`                                          | 图片文件名            |
| fit        | 当展示类型为图片的时候，设置图片如何适应容器 | `enum`                                            | cover                 |
| bg-color   | 头像背景色                                   | `string`                                          | `#c0c4cc` / `#6c6e72` |
| text-color | 文本头像字体色                               | `string`                                          | `var(--vp-c-white)`   |
| text-size  | 文本头像字体大小                             | `string` / `number`                               | 14                    |
| text       | 文本                                         | `string`                                          | —                     |

### Events

| 名称  | 说明               | 类型                 |
| :---- | :----------------- | :------------------- |
| error | 图片加载失败时触发 | `(e: Event) => void` |

### Slots

| 插槽名  | 说明               |
| :------ | :----------------- |
| default | 自定义头像展示内容 |
