# TODO

## v1.4.4

### 代办

- 壁纸滚动 fixed

### issue

### 已完成

- 主题增强面板的主题色 h3 标题添加 `margin-bottom`
- 修复卡片栏插槽失效问题
- 修复卡片风格文章列表没有摘要时高度不够问题
- 优化主题页面元素的过渡动画和新增卡片栏插槽 gap
- 支持 rewrites 侧边栏

## AR

- 修复浏览器报错：`Hydration completed but contains mismatches.`，官方解决方案：`https://cn.vuejs.org/guide/scaling-up/ssr#hydration-mismatch`

## 空模板

创建空的 Markdown 文档时，可以使用如下模板填充，提升友好度

::: warning 🚧 施工中
很高兴见到你！但很抱歉，这个页面还在施工中，如果没有找到你感兴趣的信息，你可以先在侧边栏的导航中寻找你感兴趣的内容来开始阅读
::::

## 发版流程

1. 执行 `pnpm run publish latest 1.0.1` 发布 1.0.1 的 latest 版本
2. 执行 `Git` 命令提交发布版本到本地仓库
3. 将 `package.json` 中的版本号退回到发版前，然后执行 `pnpm run release-patch` 生成 `CHANGELOG.md` 版本日志，该命令会修改 `package.json` 中的版本号，因此需要退回，该命令会恢复版本

发布版本和 `pnpm run release-xxx` 根据实际情况填写。
