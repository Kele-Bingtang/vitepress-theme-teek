# vitepress-plugin-permalink

## 1.2.1

### Patch Changes

- 修复 unbuild 构建 Vue 组件失效问题

## 1.2.0

### Minor Changes

- 新增 Rewrites 方式生成永久链接，优化 Proxy 方式 404 问题

## 1.1.6

### Patch Changes

- 修复浏览器前进后退仍然出现 404 页面问题

## 1.1.5

### Patch Changes

- 修复浏览器前进后退 404 问题

## 1.1.4

### Patch Changes

- f38f6b7: 优化 404 页面处理逻辑
- 3ff375a: 移出 notFoundOption 配置项，优化 notFound 组件，改为在路由变化前预先处理

## 1.1.3

### Patch Changes

- 新增新配置项，支持更多定制化功能

## 1.1.2

### Patch Changes

- 1a7fd26: Permalink 监听组件注册的 layout-top 插槽改为 layout-bottom，解决首页内容初次渲染丢失问题
- 9a8b9df: 去掉 UsePermalink 组件引入，改为函数引入，兼容 layout 为 false 的页面

## 1.1.1

### Patch Changes

- 移出 resolveId 钩子，添加 404 延迟组件

## 1.1.0

### Minor Changes

- 采用 resolveId 钩子解决 404 问题
- 移除 404 延迟组件及其配置项

## 1.0.19

### Patch Changes

- package url 更新

## 1.0.18

### Patch Changes

- 新增 router.onAfterUrlLoad 钩子和 router.state.permalinkPlugin 标识

## 1.0.17

### Patch Changes

- 修复国际化下刷新 404 问题
- 浏览器刷新后标题显示 404 修复

## 1.0.16

### Patch Changes

- 修复跳转 permalink 后无法回退问题

## 1.0.15

### Patch Changes

- 文档更新

## 1.0.14

### Patch Changes

- process.cwd() 替换为 srcDir

## 1.0.13

### Patch Changes

- 在 peerDependency 移出 vite 依赖，优化 Vite 构建时重复执行插件问题

## 1.0.12

### Patch Changes

- 修复 router 跳转前置路由重复绑定问题

## 1.0.11

### Patch Changes

- 仓库地址更新

## 1.0.10

### Patch Changes

- push 改为 to

## 1.0.9

### Patch Changes

- 修复版本输出不正确问题

## 1.0.8

### Patch Changes

- 新增日志功能，优化日志输出格式

## 1.0.7

### Patch Changes

- 修复 router.push 重复跳转问题

## 1.0.6

### Patch Changes

- 删除部分配置项，修复浏览器前进、后退 404 出现

## 1.0.5

### Patch Changes

- 初始化 permalink 替换 URL 功能由 onMouted 改为 onBeforeMount

## 1.0.4

### Patch Changes

- 修复已知问题

## 1.0.3

### Patch Changes

- 修复日志失效问题

## 1.0.2

### Patch Changes

- 构建成功后添加日志输出

## 1.0.1

### Patch Changes

- 发布 npm
