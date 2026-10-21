---
title: ImageViewer 图片预览
date: 2025-04-13 15:50:49
permalink: /ecosystem/components/image-viewer
categories:
  - 生态
  - 公共组件
tags:
  - 生态
  - 公共组件
---

## 图片预览

通过 `createImageViewer` 函数来打开图片预览

::: demo
imageViewer/basic
:::

## API

### 配置项

| 事件名             | 说明                                                                                     | 类型                | 默认值 |
| :----------------- | :--------------------------------------------------------------------------------------- | :------------------ | :----- |
| urlList            | 用于预览的图片链接列表                                                                   | `string[]`          | []     |
| altList            | 用于预览的图片 alt 列表，未提供时使用图片文件名                                          | `string[]`          | []     |
| zIndex             | 预览时遮罩层的 z-index                                                                   | `number` / `string` | —      |
| initialIndex       | 初始预览图像索引，小于 `url-list` 的长度                                                 | `number`            | 0      |
| infinite           | 是否可以无限循环预览                                                                     | `boolean`           | true   |
| hideOnClickModal   | 是否可以通过点击遮罩层关闭预览                                                           | `boolean`           | false  |
| teleported         | image 自身是否插入至 body 元素上。 嵌套的父元素属性会发生修改时应该将此属性设置为 `true` | `boolean`           | false  |
| zoomRate           | 图像查看器缩放事件的缩放速率。                                                           | `number`            | 1.2    |
| minScale           | 图像查看器缩放事件的最小缩放比例                                                         | `number`            | 0.2    |
| maxScale           | 图像查看器缩放事件的最大缩放比例                                                         | `number`            | 7      |
| closeOnPressEscape | 是否可以通过按下 ESC 关闭                                                                | `boolean`           | true   |
| showProgress       | 是否显示预览图片的进度条内容                                                             | `boolean`           | false  |

### 方法

| 事件名 | 说明                                                                 | 类型                      |
| :----- | :------------------------------------------------------------------- | :------------------------ |
| close  | 当点击 X 按钮或者在 `hide-on-click-modal` 为 true 时点击遮罩层时触发 | `() => void`              |
| switch | 切换图像时触发。                                                     | `(index: number) => void` |
| rotate | 旋转图像时触发。                                                     | `(deg: number) => void`   |

这样使用：

```vue
<script setup lang="ts">
import { createImageViewer } from "vitepress-theme-teek";

const handleClick = () => {
  createImageViewer({ onSwitch: () => {}, onRotate: () => {} });
};
</script>

<template>
  <button @click="handleClick">点击打开图片预览</button>
</template>
```
