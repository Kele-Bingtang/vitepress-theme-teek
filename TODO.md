# TODO

## v1.5.0

### 代办

- 壁纸滚动 `fixed`

### issue

### 已完成

- 修复 `My` 的状态 `icon` 文本渲染 `img` 问题
- 重构 `frontmatter` 插件生成 `permalink` 规则，新增 `frontmatter.coverImg` 生成规则
- 首页卡片栏支持配置来取消显示
- `demo` 容器 `yaml` 支持非 `Vue` 组件的源码复制
- 新增文章页 Banner 功能以及相关插槽
- 新增深色、浅色模式切换过渡动画配置
- 修复 TODO 插件中代码块文本出现多次问题 [#145](https://github.com/Kele-Bingtang/vitepress-theme-teek/issues/145)
- `docAnalysis.appendInfo` 支持函数式配置
- 网站访问量添加自定义事件，利用该事件搭配 `docAnalysis.appendInfo` 添加更多访问量信息
- 新增复制提示功能

## AR

- 修复浏览器报错：`Hydration completed but contains mismatches.`，官方解决方案：`https://cn.vuejs.org/guide/scaling-up/ssr#hydration-mismatch`
- 集成 AI 添加文章摘要输出

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
