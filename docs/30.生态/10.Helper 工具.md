---
title: Helper 工具
date: 2025-03-30 14:50:15
permalink: /ecosystem/helper
categories:
  - 生态
tags:
  - 生态
---

Teek 提供了工具类，提高开发效率。

## 时间

### getNowDate

获取当前时间，返回格式为 `yyyy-MM-dd HH:mm:ss`。

```ts
import { getNowDate } from "vitepress-theme-teek";

getNowDate(); //  2025-01-13 00:00:00
getNowDate("yyyy-MM-dd"); //  2025-01-13
```

### formatDate

格式化时间

```ts
import { formatDate } from "vitepress-theme-teek";

formatDate(new Date()); // 2025-01-13 00:00:00
formatDate("2025-01-13 00:00:00", "yyyy-MM-dd"); // 2025-01-13
```

类型：

```ts
const formatDate: (date: Date | string | number, format = "yyyy-MM-dd hh:mm:ss") => string;
```

### formatDiffDate

计算相差时间差，返回多少年（月/天/时/分/秒）前

```ts
import { formatDate } from "vitepress-theme-teek";

formatDiffDate("2025-01-13 00:00:00", "2025-01-14 01:00:00"); // 1 天前
formatDiffDate("2025-01-13 00:00:00"); // 2月前（与当前日期计算）
```

类型：

```ts
const formatDiffDate: (startDate: Date | string | number, endDate?: Date | string | number) => string;
```

### formatDiffDateToDay

计算时间相差到天

```ts
import { formatDiffDateToDay } from "vitepress-theme-teek";

formatDiffDateToDay("2021-10-19"); //  1258 天
```

类型：

```ts
const formatDiffDateToDay: (startDate: Date | string | number, endDate?: Date | string | number) => number;
```

## 校验

Teek 提供了一系列用于校验数据类型的工具函数，帮助开发者快速验证变量的类型或状态。

本内容仅列出常用的校验工具函数，更多请看 [校验文件](https://github.com/Kele-Bingtang/vitepress-theme-teek/tree/master/packages/helper/is.ts)。

### isExternal

校验是否为合法的 URL 前缀（如 `http://`、`https://`、`mailto:`、`tel:`）。

```ts
import { isExternal } from "vitepress-theme-teek";

isExternal("https://example.com"); // true
isExternal("mailto:test@example.com"); // true
isExternal("/path/to/file"); // false
```

类型：

```ts
const isExternal: (path: string) => boolean;
```

### isValidURL

校验是否为有效的 URL。

```ts
import { isValidURL } from "vitepress-theme-teek";

isValidURL("https://example.com"); // true
isValidURL("ftp://example.com"); // true
isValidURL("invalid-url"); // false
```

类型：

```ts
const isValidURL: (url: string) => boolean;
```

### isFunction

判断是否为函数。

```ts
import { isFunction } from "vitepress-theme-teek";

isFunction(() => {}); // true
isFunction({}); // false
```

类型：

```ts
const isFunction: <T = Function>(val: unknown) => val is T;
```

### isObject

判断是否为对象。

```ts
import { isObject } from "vitepress-theme-teek";

isObject({}); // true
isObject([]); // false
isObject(null); // false
```

类型：

```ts
const isObject: (val: any) => val is Record<any, any>;
```

### isDate

判断是否为日期对象。

```ts
import { isDate } from "vitepress-theme-teek";

isDate(new Date()); // true
isDate("2025-01-01"); // false
```

类型：

```ts
const isDate: (val: unknown) => val is Date;
```

### isNumber

判断是否为有效的数字（包含正负整数、0 以及正负浮点数）。

```ts
import { isNumber } from "vitepress-theme-teek";

isNumber("123"); // true
isNumber("-123.45"); // true
isNumber("abc"); // false
```

类型：

```ts
const isNumber: (val: unknown) => val is number;
```

### isAsyncFunction

判断是否为异步函数。

```ts
import { isAsyncFunction } from "vitepress-theme-teek";

isAsyncFunction(async () => {}); // true
isAsyncFunction(() => {}); // false
```

类型：

```ts
const isAsyncFunction: <T = any>(val: unknown) => val is Promise<T>;
```

### isPromise

判断是否为 Promise 对象。

```ts
import { isPromise } from "vitepress-theme-teek";

isPromise(Promise.resolve()); // true
isPromise({ then: () => {} }); // false
```

类型：

```ts
const isPromise: <T = any>(val: unknown) => val is Promise<T>;
```

### isString

判断是否为字符串。

```ts
import { isString } from "vitepress-theme-teek";

isString("hello"); // true
isString(123); // false
```

类型：

```ts
const isString: (val: unknown) => val is string;
```

### isStringNumber

判断是否为字符串数字。

```ts
import { isStringNumber } from "vitepress-theme-teek";

isStringNumber("hello"); // false
isString("123"); // true
```

类型：

```ts
const isStringNumber: (val: string) => boolean;
```

### isBoolean

判断是否为布尔值。

```ts
import { isBoolean } from "vitepress-theme-teek";

isBoolean(true); // true
isBoolean(1); // false
```

类型：

```ts
const isBoolean: (val: unknown) => val is boolean;
```

### isArray

判断是否为数组。

```ts
import { isArray } from "vitepress-theme-teek";

isArray([]); // true
isArray({}); // false
```

类型：

```ts
const isArray: (arg: any) => boolean;
```

### isClient

判断是否在客户端环境。

```ts
import { isClient } from "vitepress-theme-teek";

isClient(); // true (在浏览器中)
```

类型：

```ts
const isClient: () => boolean;
```

### isEmpty

判断是否为空值（包括空字符串、`null`、`undefined`、空数组和空对象）。

```ts
import { isEmpty } from "vitepress-theme-teek";

isEmpty(""); // true
isEmpty([]); // true
isEmpty({}); // true
isEmpty("hello"); // false
```

类型：

```ts
const isEmpty: (val: any, checkFull?: boolean) => boolean;
```

### isFocusable

确定目标元素是否可聚焦。

```ts
import { isFocusable } from "vitepress-theme-teek";

isFocusable(document.querySelector("input")); // true
isFocusable(document.querySelector("span")); // false
```

类型：

```ts
const isFocusable: (element: HTMLElement) => boolean;
```

## 其他

### withBase

为路径添加站点根路径前缀。

```ts
import { withBase } from "vitepress-theme-teek";

withBase("/notes", "/foo"); // /notes/foo
```

类型：

```ts
const withBase: (base: string, path: string | undefined) => string | undefined;
```

### upperFirst

将字符串的第一个字符大写。

```ts
import { upperFirst } from "vitepress-theme-teek";

upperFirst("hello"); // Hello
```

类型：

```ts
const upperFirst: (str: string) => string;
```

### addUnit

添加像素单位。

```ts
import { addUnit } from "vitepress-theme-teek";

addUnit(16); // 16px
addUnit("16"); // 16rem
addUnit("16", "rem"); // 16rem
```

类型：

```ts
const addUnit: (str: string | number) => string;
```

### removeUnit

移出像素单位。

```ts
import { addUnit } from "vitepress-theme-teek";

removeUnit("16px"); // 16
removeUnit("16rem", "rem"); // 16
```

类型：

```ts
const removeUnit: (str: string | number) => number | undefined;
```

### get

获取对象的值，支持深层次获取。

```ts
import { get } from "vitepress-theme-teek";

const obj = {
  author: {
    name: "Teek",
  },
};

get(obj, "author.name"); // Teek
get(obj, "author.link", "https://vp.teek.top/"); // https://vp.teek.top/
```

类型：

```ts
const get: (object: Record<string, any>, path: string, defaultValue?: any) => any;
```
