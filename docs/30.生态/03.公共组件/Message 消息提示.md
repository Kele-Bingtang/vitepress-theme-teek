---
title: Message 消息提示
date: 2025-04-13 15:51:12
permalink: /ecosystem/components/message
categories:
  - 生态
  - 公共组件
tags:
  - 生态
  - 公共组件
---

更多用法使用请看 ElementPlus 的 [Message 文档](https://element-plus.org/zh-CN/component/message.html)。

## 基础用法

::: demo
message/basic
:::

## antd 风格

通过传入 `customClass: "antd"` 来启用 antd 风格。

::: demo
message/antd
:::

## API

### 配置项

| 名称                     | 说明                                                                    | 类型                                     | 默认值 |
| :----------------------- | :---------------------------------------------------------------------- | :--------------------------------------- | :----- |
| message                  | 消息文字                                                                | `string` / `VNode` / `() => VNode`       | ''     |
| type                     | 消息类型                                                                | `success` / `warning` / `info` / `error` | info   |
| plain                    | 是否纯色                                                                | `boolean`                                | false  |
| icon                     | 自定义图标，该属性会覆盖 `type` 的图标。                                | `string` / `Component`                   | —      |
| dangerouslyUseHTMLString | 是否将 message 属性作为 HTML 片段处理                                   | `boolean`                                | false  |
| customClass              | 自定义类名                                                              | `string`                                 | ''     |
| duration                 | 显示时间，单位为毫秒。 设为 0 则不会自动关闭                            | `number`                                 | 3000   |
| showClose                | 是否显示关闭按钮                                                        | `boolean`                                | false  |
| onClose                  | 关闭时的回调函数, 参数为被关闭的 message 实例                           | `() => void`                             | —      |
| offset                   | Message 距离窗口顶部的偏移量                                            | `number`                                 | 16     |
| appendTo                 | 设置 message 的根元素，默认为 `document.body`                           | `string` / `HTMLElement`                 | —      |
| grouping                 | 合并内容相同的消息，不支持 VNode 类型的消息                             | `boolean`                                | false  |
| repeatNum                | 重复次数，类似于 Badge 。当和 `grouping` 属性一起使用时作为初始数量使用 | `number`                                 | 1      |

### 方法

调用 `Message` 会返回当前 Message 的实例。 如果需要手动关闭实例，可以调用它的 `close` 方法。

| 名称  | 描述               | 类型         |
| :---- | :----------------- | :----------- |
| close | 关闭当前的 Message | `() => void` |
