---
title: Composables 函数
date: 2025-03-30 16:39:44
permalink: /ecosystem/composables
categories:
  - 生态
tags:
  - 生态
---

Teek 提供了 Composables 函数（即 Hooks 函数），提高开发效率。

## onClickOutside

监听点击外部事件，当点击到指定元素外部时，执行回调函数。

```vue
<script setup lang="ts">
import { onClickOutside } from "vitepress-theme-teek";
import { useTemplateRef } from "vue";

const target = useTemplateRef<HTMLElement>("target");

onClickOutside(target, event => console.log(event));
</script>

<template>
  <div ref="target">Hello world</div>
  <div>Outside element</div>
</template>
```

## useAnchorScroll

监听浏览器滚动，当滚动到锚点，自动在 URL 后面添加锚点信息。

```ts
import { useAnchorScroll } from "vitepress-theme-teek";

const { startWatch } = useAnchorScroll();

const stop = startWatch(); // 开始监听

stop(); // 停止监听
```

## useUvPv

使用 busuanzi、vercount 等网站流量统计提供商统计网站访问量。

```ts
import { useUvPv } from "vitepress-theme-teek";

/**
 * 使用网站流量统计器统计网站访问量
 *
 * @param immediate 是否初始化请求，即自动执行一次 request，类型 boolean
 * @param options 额外配置项
 *
 * @returnParam sitePv 网站总访问量，类型 number
 * @returnParam siteUv 网站总访客数，类型 number
 * @returnParam pagePv 当前页面访问量，类型 number
 * @returnParam isGet 是否已经获取过数据，类型 boolean
 * @returnParam request 请求网站流量统计器函数，类型 Function
 */
const { sitePv, siteUv, pagePv, isGet, request } = useUvPv(true, {
  url: "", // 如果基于提供商自建个人的网络流量计时器，则请填写对应网址
  provider: "busuanzi", // 支持 busuanzi、vercount
  tryRequest: false, // 如果请求接口失败，是否重试，类型 boolean
  tryCount: 5, // 重试次数，仅当 tryRequest 为 true 时有效
  tryIterationTime: 2000, // 重试间隔时间，单位毫秒，仅当 tryRequest 为 true 时有效
});
```

## useClipboard

复制文本到剪贴板。

```ts
import { useClipboard } from "vitepress-theme-teek";

/**
 * 复制文本到剪贴板
 *
 * @returnParam copy 复制文本到剪贴板，类型 Function
 * @returnParam text 已复制的文本，类型 string
 * @returnParam copied 复制是否成功，类型 boolean
 * @returnParam isSupported 浏览器是否支持复制，类型 boolean
 */
const { copy, text, copied, isSupported } = useClipboard();

if (!isSupported) alert("您的浏览器不支持复制");

copy("Hello World");

if (copied) alert("复制成功，内容为：" + text);
else alert("复制失败");
```

## useDebounce

防抖函数。

```ts
import { useDebounce } from "vitepress-theme-teek";

/**
 * 防抖函数
 *
 * @param func 回调函数
 * @param delay 延迟时间
 * @param immediate 是否立即执行，如果为 true，则立即执行回调函数，否则在延迟时间后执行
 */
const handleClick = useDebounce(() => {}, 500, true);
```

## useElementHover

监听鼠标在指定元素的悬停状态。

```vue
<script setup lang="ts">
import { useElementHover } from "vitepress-theme-teek";
import { useTemplateRef } from "vue";

const buttonEl = useTemplateRef<HTMLButtonElement>("buttonEl");
const isHovered = useElementHover(buttonEl);
</script>

<template>
  <button ref="buttonEl">
    {{ isHovered }}
  </button>
</template>
```

## useEventListener

在 `onMounted` 监听事件，在 `onUnmounted` 取消监听事件

```ts
import { useEventListener } from "vitepress-theme-teek";

// 基本使用
useEventListener(window, "click", event => {});

// 函数式传入元素
useEventListener(
  () => window,
  "click",
  event => {}
);
```

## useLocale

实现国际化功能，获取不同语言下的指定值。

```ts
import { useLocale } from "vitepress-theme-teek";

const { lang, locale, t } = useLocale();

console.log(lang.value); // 当前使用的语言
console.log(locale.value); // 语言配置内容

console.log(t("tk.home.label")); // 获取当前语言的指定内容
```

利用 `t` 函数除了直接指定内容外，还可以在获取的同时进行动态赋值。

假如 `zh-CN` 语言配置内容为：

```ts
export default {
  lang: "zh-CN",
  tk: {
    pagination: {
      total: "共 {total} 条",
    },
  },
};
```

对 total 赋予真正的值：

```ts
import { useLocale } from "vitepress-theme-teek";

const { t } = useLocale();

console.log(t("tk.pagination.total", { total: 20 })); // 输出：共 20 条
```

## useMediaQuery

监听媒体查询，可以检查查询结果或在结果更改时接收通知。

```ts
import { useMediaQuery } from "vitepress-theme-teek";

const isLargeScreen = useMediaQuery("(min-width: 1024px)"); // true
const isMiniScreen = useMediaQuery("(max-width: 1px)"); // false
```

## useMounted

创建一个用于在组件挂载时执行的函数。

```ts
import { useMounted } from "vitepress-theme-teek";

useMounted(() => {});
```

获取是否通过已挂载阶段的状态：

```ts
import { useMounted } from "vitepress-theme-teek";

const isMounted = useMounted();
```

这本质上是以下内容的简写：

```ts
const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});
```

## useNamespace

创建一个命名空间，用于创建具有唯一前缀的类名。

```ts
import { useNamespace } from "vitepress-theme-teek";

/**
 * 命名空间
 *
 * @param block 块名，类型 string
 * @param namespaceOverrides 命名空间，类型 string
 */
const ns = useNamespace("button", "tk");

ns.b(); // 返回 "tk-button"
ns.e("primary"); // 返回 "tk-button__primary"
ns.m("disabled"); // 返回 "tk-button--disabled"
ns.be("primary", "disabled"); // 返回 "tk-button-primary__disabled"
ns.bm("primary", "disabled"); // 返回 "tk-button-primary--disabled"
ns.em("primary", "disabled"); // 返回 "tk-button__primary--disabled"
ns.bem("primary", "large", "disabled"); // 返回 "tk-button-primary__large--disabled"
ns.is("disabled"); // 返回 "is-disabled"
ns.join("select"); // 返回 "tk-select"
ns.cssVar("color"); // 返回 "var(--tk-color)"
ns.cssVarName("color"); // 返回 "--tk-color"

ns.createBem("tk", "button", "primary", "large", "disabled"); // 返回 "tk-button-primary__large--disabled"
```

## usePopoverSize

获取弹框的位置：`top`、`right`、`bottom`、`left`。

```vue
<script setup lang="ts">
import { usePopoverSize } from "vitepress-theme-teek";
import { useTemplateRef, computed, ref } from "vue";

const trigger = useTemplateRef<HTMLElement>("trigger");
const target = useTemplateRef<HTMLElement>("target");

const { top, right, bottom, left, update } = usePopoverSize(trigger, target);

const style = computed(() => ({
  top: `${top.value}px`,
  right: `${right.value}px`,
  bottom: `${bottom.value}px`,
  left: `${left.value}px`,
}));

const visible = ref(false);
</script>

<template>
  <div ref="trigger" @click="visible = !visible">点击我</div>
  <Teleport to="body">
    <div ref="target" v-show="visible" :style="style">我是一个弹框</div>
  </Teleport>
</template>
```

计算出来的弹框位置是基于 body 位置进行计算的，所以需要将弹框元素移到 body 元素下。

## useStorage

创建一个用于管理存储的函数，根据传入的存储类型（sessionStorage 或 localStorage）返回相应的操作函数

```ts
import { useStorage } from "vitepress-theme-teek";

/**
 * 创建一个用于管理存储的函数，根据传入的存储类型（sessionStorage 或 localStorage）返回相应的操作函数
 *
 * @param type 存储类型，默认为 sessionStorage
 */
const localStorage = useStorage("localStorage");

localStorage.setStorage("key", "value");
localStorage.getStorage("key");
localStorage.removeStorage("key");
localStorage.removeStorages(["key1", "key2"]);
localStorage.clear(["key"]); // 清空除了 key 的其他所有数据
```

存储格式：

```json
{
  "_type": "", // 存储值的类型，如 String、Number 等
  "value": "" // 存储的值
}
```

## useScrollData

定时对数据进行截取，实现滚动。

```ts
import { useScrollData } from "vitepress-theme-teek";
import { onMounted } from "vue";

const data = [
  { name: "张三", age: 18 },
  { name: "李四", age: 19 },
  { name: "王五", age: 20 },
  { name: "赵六", age: 21 },
  { name: "钱七", age: 22 },
  { name: "孙八", age: 23 },
  { name: "周九", age: 24 },
];

/**
 * 定时对数据进行截取，实现滚动
 *
 * @param data 数据，类型 Array<string>
 * @param limit 显示数量，类型 number
 * @param options 配置项，类型 UseScrollDataOptions
 *
 * @returnParam data 显示的数据，类型 Array
 * @returnParam start 开始滚动，类型 Function
 * @returnParam stop 停止滚动，类型 Function
 * @returnParam restart 重启滚动，类型 Function
 */
const { data, start, stop, restart } = useScrollData(dataList, 5, {} /* option */);

onMounted(() => {
  start();

  stop();
  stop(true); // 还原数据为开始状态，当调用 start()，则会从开始状态开始执行，默认 true

  restart();
});
```

`option` 类型：

```ts
interface UseScrollDataOptions {
  /**
   * 自动滚动间隔时间
   *
   * @default 3000
   */
  intervalTime?: number;
  /**
   * data 发生变化，是否重新加载
   *
   * @default false
   */
  reloadWhenDataChanged?: boolean;
}
```

## useSwitchData

从数据列表里按顺序/随机获取一笔数据。

```ts
import { useSwitchData } from "vitepress-theme-teek";
import { onMounted } from "vue";

const dataArray = ["./img1.png", "./img2.png", "./img3.png"];

/**
 * 从数据列表里按顺序/随机获取一笔数据
 *
 * @param dataList 数据列表，类型 Array<string>
 * @param option 配置项，类型 UseSwitchDataOption
 *
 * @returnParam data 当前数据，类型 Ref<string>
 * @returnParam index 当前数据的索引，类型 Ref<number>
 * @returnParam start 开始数据切换，类型 Function
 * @returnParam stop 停止数据切换，类型 Function
 * @returnParam restart 重启数据切换，类型 Function
 */
const { data, index, start, stop, restart } = useSwitchData(dataList, {} /* option */);

onMounted(() => {
  start();

  stop();
  stop(true); // 还原数据为开始状态，当调用 start()，则会从开始状态开始执行，默认 true

  restart();
});
```

`option` 类型：

```ts
interface UseSwitchDataOption {
  /**
   * 切换间隔时间，单位：毫秒
   */
  timeout?: number;
  /**
   * 是否随机切换数据
   */
  shuffle?: boolean;
  /**
   * data 发生变化，是否重新加载
   *
   * @default false
   */
  reloadWhenDataChanged?: boolean;
  /**
   * 切换数据之前执行的回调函数
   */
  onBeforeUpdate?: (newValue: string) => void;
  /**
   * 自定义切换逻辑
   */
  onUpdate?: (data: Ref<string>, newValue: string) => void;
  /**
   * 切换数据之后执行的回调函数
   */
  onAfterUpdate?: (newValue: string) => void;
}
```

## useTextTypes

打字功能

```ts
import { useTextTypes } from "vitepress-theme-teek";
import { onMounted } from "vue";

const textArray = ["Hello Teek!", "Hello VitePress!", "Hello World!"];

/**
 * 打字功能
 * @param textArray 打字数组
 * @param option 打字配置项
 *
 * @returnParam text 当前打字内容
 * @returnParam isFinished 打字是否结束
 * @returnParam start 开始打字
 * @returnParam stop 停止打字
 * @returnParam restart 重启打字，类型 Function
 */
const { text, isFinished, start, stop, restart } = useTextTypes(textArray, {} /* option */);

onMounted(() => {
  start();

  stop();
  stop(true); // 还原数据为开始状态，当调用 start()，则会从开始状态开始执行，默认 true

  restart();
});
```

`option` 类型：

```ts
interface TypesOption {
  /**
   * 打字间隔时间，单位：毫秒
   */
  inputTime?: number;
  /**
   * 删字间隔时间，单位：毫秒
   */
  outputTime?: number;
  /**
   * 获取新数据间隔时间，单位：毫秒
   */
  nextTime?: number;
  /**
   * 是否随机获取新数据
   */
  shuffle?: boolean;
  /**
   * data 发生变化，是否重新加载
   *
   * @default false
   */
  reloadWhenDataChanged?: boolean;
}
```

## useThemeColor

根据传入的颜色计算其他类似的颜色，然后将计算好的颜色覆盖 VitePress 的 Var 变量。

```ts
import { useThemeColor } from "vitepress-theme-teek";
import { ref } from "vue";

const primary = ref("#395AE3");

// 初始化时已调用 start，无需再次调用 start
const { start, stop, update, clear } = useThemeColor(primary);

// 修改值后自动重新计算（内部调用 update 函数）
primary.value = "#395AE3";
```

## useWindowSize

实时获取窗口大小。

```ts
import { useWindowSize } from "vitepress-theme-teek";
import { watch } from "vue";

// 使用方式 1：watch 监听
const { width, height } = useWindowSize();

watch(width, newValue => {});
watch(height, newValue => {});

// 使用方式 2：函数回调监听
useWindowSize((width, height) => {});

// 选项
const { width, height } = useWindowSize(null, {
  type: "outer", // 获取 outerWidth、outerHeight，默认为 inner
  // ...
});
```

## useViewTransition

使用暗色、浅色切换的过渡动画。

```ts
import { useViewTransition } from "vitepress-theme-teek";

useViewTransition({
  enabled: true, // 是否启用深浅色切换动画效果
  mode: "out-in", // 动画模式，out 始终从点击点往全屏扩散，out-in 第一次从点击点往全屏扩散，再次点击从全屏回到点击点
  duration: 300, // 动画持续时间，当 mode 为 out 时，默认为 300ms，mode 为 out-in 时，默认为 600ms
  easing: "ease-in", // 缓动函数
});
```

需要引入 CSS 来实现过渡动画：

```css
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

// 当动画模式 mode 为 out-in 时，需要设置 z-index
html[view-transition="out-in"] {
  &::view-transition-old(root),
  &.dark::view-transition-new(root) {
    z-index: 1;
  }

  &::view-transition-new(root),
  &.dark::view-transition-old(root) {
    z-index: 9999;
  }
}
```

## useVpRouter

绑定自定义函数到 Router 的钩子里，为了防止覆盖掉其他人已添加在 Router 钩子的逻辑，useVpRouter 不是直接覆盖，而是追加。

```ts
import { useVpRouter } from "vitepress-theme-teek";

/**
 * 绑定自定义函数到 Router 的钩子里
 *
 * @returnParam router Vue Router 实例
 * @returnParam route Vue Router 路由实例
 * @returnParam bindBeforeRouteChange 绑定自定义函数到  onBeforeRouteChange 钩子
 * @returnParam bindBeforePageLoad 绑定自定义函数到  onBeforePageLoad 钩子
 * @returnParam bindAfterPageLoad 绑定自定义函数到  onAfterPageLoad 钩子
 * @returnParam bindAfterRouteChange 绑定自定义函数到 onAfterRouteChange 钩子
 * @returnParam bindRouterFn 自定义绑定逻辑
 */
const {
  router,
  route,
  bindBeforeRouteChange,
  bindBeforePageLoad,
  bindAfterPageLoad,
  bindAfterRouteChange,
  bindRouterFn,
} = useVpRouter();

/**
 * 绑定自定义函数到  onBeforeRouteChange 钩子
 *
 * @param stateFlag 为了防止重复添加，useVpRouter 会在 Router 中添加一个 state 对象，里面维护各个绑定自定义函数的唯一标识，防止重复绑定。
 * @remark 什么时候重复添加？当 useVpRouter 在某个组件使用，且组件会重新渲染时，如 404 组件。
 *
 * @param bindFn 要绑定的自定义函数
 * @param bindPosition 绑定的位置，before 为在原函数之前绑定，after 为在原函数之后绑定
 */
bindBeforeRouteChange("permalink", () => {}, "after");
```

## useZIndex

获取一个唯一的 z-index 值。

```ts
import { useZIndex } from "vitepress-theme-teek";

const { currentZIndex, nextZIndex } = useZIndex();

nextZIndex(); // currentZIndex 递增
```

`currentZIndex` 是一个全局的值，当任意组件调用 `nextZIndex` 时，所有组件获取的 `currentZIndex` 都会递增。

一般用于弹框、提示等悬浮组件，避免 z-index 冲突。

## useWindowTransition

指定元素出现在屏幕内时，开启过渡效果。

```ts
import { useViewTransition } from "vitepress-theme-teek";

/**
 * 指定元素出现在屏幕内时，开启过渡效果
 *
 * @param htmlElement 要添加过渡效果的元素，支持数组（支持响应式变量）
 * @param immediate 是否立即监听元素，如果为 false，则需要手动调用返回的 start 函数，默认 true
 *
 * @returnParam start 开启监听元素进入屏幕时开启过渡效果
 * @returnParam stop 停止监听元素进入屏幕时开启过渡效果
 * @returnParam restart 重启监听元素进入屏幕时开启过渡效果
 */
const { start, stop, restart } = useWindowTransition(htmlElement, immediate);
```
