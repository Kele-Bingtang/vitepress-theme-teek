# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.5.2](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.5.1...v1.5.2) (2025-11-02)

### Bug Fixes

- **ArticleTitle:** 修复一级标题含 `<xxx>` 时页面渲染问题 ([26cc160](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/26cc16024324d92662eb8fb9c98c7715142a31bd))
- **breadcrumb:** 🐞 修复面包屑跳转目录页链接不对问题 ([2d9e313](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2d9e31385491533170c985eff65b838252c3e30d))
- **comment:** 🐞 修复 frontmatter.comment 为 true 时评论区不加载问题 ([aa07770](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/aa07770cafb7ca9ead56a0e7446ea0fb0c9f79ab))
- **style:** 🐞 修复 pageStyle 配置后移动端 padding 问题和 footer 去除间距样式 ([20af41a](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/20af41a1d2b1f6d4a1a92b91e79c8bf8137297ec))
- **styles:** 🐞 修复 pageStyle 配置在移动端没有 padding 问题和 footer 去除间距样式 ([3dd138f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/3dd138f853e713f4e3ad08637a2f2a0ac4c69484))

### Docs

- **config:** 📚 更新 Teek 配置文档说明 ([bcc5c11](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/bcc5c11c1d775eb05ba9068990cbf3e05208b9db))

### Others

- **deps:** 🔨 更新依赖版本并修复类型错误 ([231ba35](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/231ba35ac38b3eb0e8c7ad6ec3031655d2d1fbbd))

## [1.5.1](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.5.0...v1.5.1) (2025-10-19)

### Features

- **teek:** 🚀 添加图标模块导出配置 ([07617b7](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/07617b777d942a565922e565ad993ea20360907d))

### Bug Fixes

- **comment:** 🐞 修复评论区实例注入后右下角前往评论区按钮不出现问题 ([3c92603](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/3c92603b1318bcde73695f5d248ededbadc10ccb))
- **config:** 🐞修复 permalink 默认不自动生成问题 ([2b8f223](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2b8f223b7ed6240efbd0f443568daa0551d8263e))
- **helper:** 🐞 修复日期格式化函数中年份获取方法调用错误 ([9a96056](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/9a9605615052ac2403ad1a45a7cdf17f4a2850fe))
- **LoginPage:** 🐞 修复页面认证反复跳转逻辑 ([480082c](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/480082c2dde0bb26ba280f71a41db95869c4adc0))
- **vitepress-plugins:** 🐞 修复日期生成多出 8 小时问题 ([b163c48](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/b163c48c198120089aaec5cb0ff4dd31060d0f2c))

### Docs

- **config:** 📚 更新配置文档中的颜色字段名称 ([3c68105](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/3c68105e276c431fb42c79b8ece929dba0f877b1))

### Others

- **version:** 🔨 bump version to 1.5.1 ([af57ea2](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/af57ea2e53c26b27785987698e26d8b4e1a9391e))

## [1.5.0](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.4.6...v1.5.0) (2025-09-23)

### Features

- **article:** 🚀 新增文章页 Banner 相关插槽 ([f301b9f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/f301b9f1e4f3de290c54c204a3a57bed8714fac0))
- **article:** 🚀 新增文章页顶部 Banner 功能 ([f05b14e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/f05b14e3fa4086d437ba045fbc654bbe5428772e))
- **components:** 🚀 twikoo 支持实例注入 ([164b704](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/164b704ac86684453ad748f959ccf278c0b39e62))
- **config:** 🚀 优化首页卡片栏显示逻辑和优化 Frontmatter 自动生成规则 ([fd255ea](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/fd255eaf0d7ce59b209b2ccae7b6bc7b29d55788))
- **copy:** 🚀新增复制文本横幅提示 ([3bcfafd](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/3bcfafd8830721ac93c0dbb796b50fa059c6e58c))
- **copy:** 新增复制文本横幅提示 ([e51d15a](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e51d15a5a9509d9a77bab2393335a644d3352359))
- **demo:** 🚀 Demo 日容器支持非 Vue 组件的源码复制 ([c05cf62](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/c05cf629aba1c10b36d671d062cb17ec16f87c51))
- **docAnalysis:** 🚀 支持 appendInfo 函数式配置及网站访问量自定义事件 ([cdc2213](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/cdc2213974ed32789fb9833d672a3333ce1080d5))
- **theme:** 🚀 新增复制提示功能并优化样式引用路径 ([2b95542](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2b95542355356ea083ef39bfd336183b979b7ca2))
- **theme:** 🚀 优化 RouteLoading 组件 ([13a9013](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/13a901301fa954b20cb8c6aa4bcad38f6599bec5))
- **theme:** 🚀 支持 body 背景图和 banner 图片的动态获取和更新文档 ([56889a8](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/56889a804a109f48781fda428217560dab412df6))
- **viewTransition:** 🚀 新增深色、浅色模式切换过渡动画配置 ([0a681c7](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/0a681c731f596a03ca84a1fafe3172f71e25decd))

### Bug Fixes

- **banner:** 🐞 修复禁用首页大图后导航栏白屏问题 ([98fccbe](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/98fccbe9da825a7591a62ae7db84f09cd39a7fb8))
- **catalogue:** 🐞 修复目录页 Item 的 url 没有 / 开头问题 ([5cb54d4](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/5cb54d464a0909c5814c1dd25e8024152530b3c6))
- **markdown:** 🐞 修复 TODO 插件中代码块文本出现多次问题 ([c246a76](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/c246a768617f33be9c529ea880ac9f06f07ab9c5))
- **theme:** 🐞 修复 My 的状态 icon 文本渲染 img 问题 ([62db8a3](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/62db8a30331bda1cb59c6b287574811335db8ad9))
- **vitepress-plugins:** 🐞 修复 auto-frontmatter 日期生成和 catalogue url 路径问题 ([d74480e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/d74480e1202318e87824dd60b70da93e76499efc))

### Docs

- 📚 更新网站配置和元数据 ([bed59e8](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/bed59e856b098b7ae85518854cfdc702733ee5ea))

### Styling

- **article:** 🎨 修改 ArticleBanner 标签元素悬停样式 ([78087ee](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/78087eebc6eb3760fd2359522658d1cdc0a20e76))
- **config:** 🎨 调整 permalink 功能默认值并优化相关逻辑 ([5e9fd2e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/5e9fd2ee30e7528bbb020e01dd5c8636f2da569f))

### Code Refactoring

- **articleBanner:** ♻️ 调整文章页 Banner 相关配置 ([b06bb76](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/b06bb76b009776e6461a3b7b66edd77d5dc84d28))
- **auto-frontmatter:** ♻️ 优化自动 frontmatter 生成功能 ([b8388a4](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/b8388a4a7bde4c52a35e835e8dd842fcbaea4bec))
- **theme:** ♻️ 优化文章列表封面图加载逻辑 ([95ba70a](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/95ba70a6ced8fa204bcd3b594cab038e05573f13))

### Build System

- **teek:** 📦️ v1.5.0 版本发布 ([92bad89](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/92bad89c563b224f8e3609add2c76780aff72440))

### [1.4.6](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.4.5...v1.4.6) (2025-08-30)

### Features

- **blogger:** 🚀 添加博主状态图标并优化头像功能 ([be17ba7](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/be17ba7be748164a4d23c693ca2e04bda4daffae))
- **docs:** 🚀 优化侧边栏交互并添加新功能 ([d9ea72f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/d9ea72f620b7504711f04b0ea2c8e3964e5658e6))
- **docs:** 🚀 优化文章底部提示信息并新增侧边栏和目录栏悬停样式 ([0bfd80d](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/0bfd80d2ecd11de8def776c917885fda6868158d))
- **docs:** 🚀 v1.4.6 版本发布 ([0d0517e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/0d0517e06fbab0b16d89863fa0f5b240d02fc341))

### Bug Fixes

- **config:** 🐞 修复 frontmatter.author 在首页文章列表配置无效问题 ([d9bb0d2](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/d9bb0d2d66c17e5121bd7fe873f8d477705fd603))
- **docs:** 🐞 修复 doc-footer-before 插槽失效问题和持久化配置切换并支持文章底部自定义 ([73b818d](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/73b818d8036ab4163bde36375c43c9f4396fd6dd))
- **theme:** 🐞 部分主题色的聚光灯覆盖字体问题修复 ([c847d4d](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/c847d4d1d7fecd27c8faa71066ac94e62461358f))

### Performance Improvements

- **docs:** ⚡️ 优化代码以增强页面加载性能 ([cb0efd2](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/cb0efd22a38a6b8bd8f5468af07486058343dc08))

### Code Refactoring

- **composables:** ♻️ useSwitchData 函数初始化支持 shuffle 随机获取 ([8e51e3e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/8e51e3ebdcf6a3f66a916e1faea26a22492a9b4d))
- **config:** ♻️ 重构配置项并优化文档 ([83e9f2f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/83e9f2f6a0907fdef8606f4a9d5ab7309e7b7391))

### Docs

- 📚 更新 CHANGELOG.md 中版本号格式 ([a6c2c0e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/a6c2c0efa346bdb6964512e0f1fdce39adde7f4a))
- 📚 移除不需要的图标 ([279c934](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/279c934d9eeb6c4a96da8181fb5d2300b27283c2))
- **vitepress:** 📚 更新 Teek 配置文件模板的注释说明 ([0c68177](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/0c681773707acd6c4bcf2bbb114aa30c5b9580cb))
- **vitepress:** 📚 更新 Teek 配置文件模板注释 ([290440d](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/290440d3c166564d5d3c76cf7bf0ebf082569d49))

## [1.4.5](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.4.4...v1.4.5) (2025-08-24)

### Features

- **theme:** 🚀 优化页面加载动画和视图过渡效果 ([3fbb162](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/3fbb162aea4ab01fdb296f025713bd4415d2437e))
- **theme:** 🚀 优化页面加载体验和布局 ([c3bbdbf](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/c3bbdbfb7f95c038d0b1ef61567fd5a3f5a09787))

### Code Refactoring

- **docs:** ♻️ 优化文档网站配置和样式 ([48c38f4](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/48c38f48abf18af106f223a8775b08912fb0fd03))

### Styling

- **theme:** 🎨 调整底部提示框位置 ([44ec22e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/44ec22ef475b64cf8d6cc606bd004838e6deb13a))

### Docs

- 📚 更新 TODO 文档 ([d3e1615](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/d3e161519e87788c78f91f7b5c8d5c9db6fbc554))
- **docs:** 📚 v1.4.5 版本发布 ([3618a10](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/3618a10c2feab9e685fe5ecd9551890fe074ada2))
- **theme:** 📚 样式增强文档内容更新 ([6ea03a8](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/6ea03a8215b0b5df7962f2b42fe03e6b713fc6e9))

## [1.4.4](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.4.3...v1.4.4) (2025-08-23)

### Features

- **config:** 🚀 添加重写前缀一致性校验功能，修复壁纸模式 banner 失效问题 ([cb39a81](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/cb39a81f1a5830b46a7e98f960034136cd5b9238))
- **sidebar:** 🚀 支持 rewrites 侧边栏 ([af3d7a7](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/af3d7a7583a83e7d8ba6d4eba30e07d196ed9955))
- **sidebar:** 🚀 侧边栏插件支持 rewrites 规则 ([2315d67](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2315d6730b348f78df10e5b27a81f9f06d9a1d0f))
- **theme:** 🚀 添加自定义主题尺寸和代码块语言显示样式 ([dd71d77](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/dd71d77e3d19205e72de669c919103db0cbaca86))

### Bug Fixes

- **theme:** 🐞 优化首页组件和列表项样式 ([3882b4f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/3882b4f86c510f00727958d3765b3c5f20e04090))

### Docs

- 📚 更新 TODO 文档内容 ([2bbe1b2](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2bbe1b2911da3bc72044dbd4856bd1368f5cb355))
- **changelog:** 📚 优化 CHANGELOG.md 文件格式和内容 ([32a6aa0](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/32a6aa039b9f9d34e8d80a8c50fe431ca6d4091e))

### Styling

- **theme:** 🎨 调整主题增强面板样式 ([3f9dac0](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/3f9dac02bf4fc17c8b6f4f6c14a24efa0ae6eae2))

### Code Refactoring

- **config:** ♻️ 重构配置文件并优化主题设置，新增永久链接文档 ([5e0442d](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/5e0442d7f418040bcc686a252c8f1ee1b55e1ad4))
- **docs:** ♻️ 重构文档路径并优化主题功能 ([30da8bb](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/30da8bb8ab04fdac3010fa839a053e91bbad936a))
- **theme:** ♻️ 优化主题页面元素的过渡动画和新增卡片栏插槽 gap ([ef839bc](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/ef839bce62e8379f45e6ccb061981350eb493e49))

### Build System

- 📦️ v1.4.4 版本发布 ([6131696](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/6131696bb9acfbea4896277f1aed5b2ca70a6509))
- 📦️ 更新版本号至 1.4.3 ([e8f1a6f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e8f1a6fa5d538f81348e0e9b3747b62924517848))

## [1.4.3](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.4.2...v1.4.3) (2025-08-18)

### Features

- **permalink:** 🚀 新增 Rewrites 方式生成永久链接 ([48622f8](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/48622f85f6fb99528e6b734b8fd7938d002b6065))

### Bug Fixes

- **config:** 🐞 更新 vitepress-plugin-permalink 版本并修复浏览器导航问题 ([ba86e11](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/ba86e115babe7856831b1ea30007de022d3127e8))
- **router:** 🐞 修复 permalink 返回 404 的问题 ([9a2a469](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/9a2a4693c88ca812572e308a894c69ef2de68e5a))
- **statistics:** 🐞 优化页面和站点访问统计功能 ([35028c3](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/35028c3f9708b3cb5c31b9efa1b9d352b1bbd81c))
- **teek:** 🐞 修复 permalink 插件禁用时导致的项目无法启动问题 ([b2f0af8](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/b2f0af8b5b9d80356925de2c82f8f36262d049a5))
- **vitepress-plugin-permalink:** 🐞 修复浏览器前进后退 404 问题 ([c383f30](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/c383f302cc72c1e32f05cd928b18df5196ee2686))

### Docs

- **changelog:** 📚 v1.4.2 版本发布 ([a38313f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/a38313ffcdd7bc9fdd6cf7f360a4fb9868e4994d))

### Code Refactoring

- **permalink:** ♻️ 更新永久链接插件并调整路由跳转逻辑 ([cfc8655](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/cfc8655c4c2653efb082dbea6132cbce6ba7fe49))
- **permalink:** ♻️ 永久链接功能 404 优化 ([71d178e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/71d178e1e40c58905612aa5d8e50e0e00a2e5d38))

## [1.4.2](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.4.1...v1.4.2) (2025-08-17)

### Bug Fixes

- **components:** 🐞 优化图片预览功能并修复 404 页面刷新问题 ([4d78dec](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/4d78dec372c1e8aea198b7e4ef955c9599f3bcdb))

### Build System

- 📦️ 更新 vitepress-plugin-permalink 依赖 ([37c234f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/37c234fe4b6c8f45c5649542184bdaa0884048fa))

### Code Refactoring

- **.github:** ♻️ 更新 issue 模板并优化路由跳转逻辑 ([b12e108](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/b12e10839c7765d890bee580cbf9bccf4450b215))
- **teek:** ♻️ 优化永久链接处理逻辑 ([aef7946](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/aef79466296e5ae660b1c8f2e3049bce9c34df6a))

### Docs

- **changelog:** 📚 v1.4.1 版本发布 ([cacbed1](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/cacbed1b81f0eb8d0056e8333d02025b2c029633))
- **changelog:** 📚 更新 CHANGELOG.md 文件 ([9ec9379](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/9ec93795f91f0a9ce23b4fbc439b2868f4e1dada))
- **search:** 📚 为 VitePress 配置 Algolia 搜索并调整标记样式 ([6fbce9e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/6fbce9ee6d995d66afcf2abf274e74a978cd19ac))

## [1.4.1](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.4.0...v1.4.1) (2025-08-17)

### Features

- **icon:** 🚀 新增社交图标库以及 iconfont 使用说明 ([b5b4e81](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/b5b4e817581a0df75ef6c7186b2ed4b2cd958505))
- **theme:** 🚀 添加全局淡入动画效果 ([d924f36](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/d924f36cfa67d4e35f2d3fcb153525740afd0efe))
- **theme:** 🚀 添加页面全局 Loading 动画功能 ([2340009](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2340009e4961ab98f360755b12fe2e4d763d578b))
- **theme:** 🚀 新增首页特性组件并优化相关配置 ([b10783f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/b10783f1226e18f5191276952793f1e64a781a9d))
- **theme:** 🚀 新增自定义主题色功能 ([60f6f85](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/60f6f85a47902896e9f3bc6e76d4bc5cb1e392d3))
- **theme:** 🚀 优化首次访问页面时的 404 问题处理 ([f38f6b7](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/f38f6b7432126459ec69e7982dabbcdf1352cb97))
- **theme:** 🚀 优化主题样式和功能 ([a478ba5](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/a478ba5054bae216cea786ffa2fd7dc0c0860326))

### Bug Fixes

- 🐞 修复打包失效问题 ([881ec37](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/881ec3712c695f8ea00d7a27a6a098f708bc9bf3))
- **config:** 🐞 修复打包失效问题 ([88834c4](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/88834c4dec95424b7c3ebd1f2fc3dbbd5b925a33))

### Performance Improvements

- **theme:** ⚡️ 优化配置提供者 ([2b85ac5](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2b85ac50cada6eddcdeacfa410c9a36d4395b375))
- **theme:** ⚡️ 优化图标库加载和 ESLint 配置 ([c04c7ad](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/c04c7ad62cf1924fadd4266408b1832ec4509953))

### Docs

- 📚 删除 2-light.svg ([ac760f7](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/ac760f79f60041a2b8171f054943f6182e3ff243))
- **CHANGELOG:** 📚 1.4.0 版本发布 ([4ab3127](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/4ab31278c7d6ccb32515d2d7bb4bd8224bc324db))
- **config:** 📚 更新主题配置文档和 Issue 提交模板 ([352c67d](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/352c67d264356edce684561ac9a1b6535dc4aaba))
- **docs:** 📚 更新文档内容 ([7e1d35f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/7e1d35fef92d37c627a98037adfe23bccc7d25d4))

### Code Refactoring

- **config:** ♻️ 重命名 fadeTransition 为 windowTransition ([c4c47ab](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/c4c47abda1dd554c99989ee4191db66a7196669a))
- **docs:** ♻️ 优化文档注释和样式 ([1318123](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/131812321d7bf50c5bf52db07a784906bd4240e2))
- **permalink:** ♻️ 优化永久链接插件功能和结构 ([3ff375a](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/3ff375ad200f602f8e8d4f59d9b026ee564b3272))
- **theme:** ♻️ 优化网络流量统计函数和优化组件文档使用说明 ([e9f5867](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e9f58673de626b02fbc37592257267f82594dc08))

### Build System

- **deps:** 📦️ vitepress-plugin-permalink 1.1.4 版本发布 ([bba3838](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/bba38383db3ae1fd1db2cd3d3154cae5fb62c576))

## [1.4.0](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.3.5...v1.4.0) (2025-08-11)

### Features

- 🚀 代码块超过一定高度添加遮罩，点击查看更多展开全部代码 ([bbe3d65](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/bbe3d6536af1cfb37576c7d07c77e32d7dd0804a))
- **catalogue:** 🚀 支持自定义序号分隔符并优化目录解析 ([59bd019](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/59bd019b8248b48ed794569c3647310b0d7824b1))
- **docAnalysis:** 🚀 统计服务提供商新增 vercount 并优化统计逻辑 ([3c48f1d](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/3c48f1d46469ba16baa784918e82ce855b21e79a))
- **docs:** 🚀 新增部分新功能和修复部分问题 ([365370a](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/365370a741e6d5efec1bea6409e51651eea948b2))
- **docs:** 🚀 优化目录结构和侧边栏排序功能 ([7e4091a](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/7e4091a4624aaa65c5f6842a8e60a69d5552305d))
- **plugin:** 🚀 升级插件版本并添加新功能 ([11bd85e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/11bd85e38d613c23c12267138b3953cf6d9d283c))
- **sidebar:** 🚀 添加侧边栏展开/折叠触发器，新增 transition-duration 相关 var 变量 ([ba1751b](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/ba1751b213e3329511efe0655e6e303a7d7fa37c))
- **sidebar:** 🚀 支持自定义序号分隔符，fixes [#86](https://github.com/Kele-Bingtang/vitepress-theme-teek/issues/86) ([7ea83a7](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/7ea83a76d90ff0a930477133934bc2f9b671edbf))
- **theme:** 🚀 新增回到顶部和滚动到评论区配置，并支持插槽覆盖 ([562fe72](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/562fe727855257587386df6227aa60de5a8ff29c))
- **theme:** 🚀 优化代码块折叠功能并添加侧边栏触发器国际化支持 ([b3f767f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/b3f767f3f4b099bad2c0414c94b3056c131b33a7))

### Bug Fixes

- 🐞 修复首页卡片栏插槽失效问题 ([ded0aca](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/ded0aca7df3539bbc1cb561f8be24cac9f951225))
- **theme:** 🐞 修复 articleAnalyze 组件的 teleport 配置不生效问题，fixes [#90](https://github.com/Kele-Bingtang/vitepress-theme-teek/issues/90) ([507be0c](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/507be0c18fde8ce838c9a64793f44d89fa930088))
- **theme:** 🐞 修复进度条显示进度数值的样式 ([48d7214](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/48d7214b8d7475d8c436a89ef4e03fdfb1174856))

### Docs

- 📚 快速开始文档更新 ([cf906ed](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/cf906ed51e25469c7ae57c4316b4564fb185ec19))
- 📚 使用文档更新 ([cbab646](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/cbab6461d4e1bd2218a9127f57bca215e111fdeb))
- **case:** 📚 更新案例展示页面并移除 TODO 事项 ([5006a1b](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/5006a1be274b912a661fb350523d7af96dcd1070))
- **README:** 📚 更新效果图说明并添加官方文档链接 ([c36c028](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/c36c028e95c91c2bbfc3b6379f94a09b33b3e145))
- **README:** 📚 添加文档首页截图 ([79105b5](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/79105b5978d0de0d18218013106c72274eb32b2b))
- **README:** 📚 添加项目效果图和赞助支持内容 ([ab59a0c](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/ab59a0c0d07ecfa86784a3dc92d2699f8ff61410))
- **README:** 📚 添加英文版本并优化中文版本 ([61f8234](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/61f8234d8510e0b47b582a2c524b6b2e1fcfa80f))

### Code Refactoring

- **components:** ♻️ 优化 HomeBanner 组件描述切换效果 ([a02a18e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/a02a18eb6f18555d21ee318d6e2d1336b48de34a))
- **components:** ♻️ 优化多个组件的属性处理和代码结构 ([76f58dc](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/76f58dc68d94d1705cbed6e8cc7852d76fc9a7db))
- **theme:** ♻️ 重构侧边栏触发器样式和逻辑 ([bac82c9](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/bac82c9cf4f8d24177b866f06ccd59bd3b093faf))
- **theme:** ♻️ 重构主题组件并优化样式 ([861e29c](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/861e29c07b44dd850789282ef531d8b57cdd82a2))

## [1.3.6](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.3.5...v1.3.6) (2025-07-31)

### Features

- 🚀 代码块超过一定高度添加遮罩，点击查看更多展开全部代码
- 🚀 添加frontmatter字段，`bottomTip`文章页底部articleBottomTip提示，默认为true表示显示，false表示不显示；`topTip`文章页顶部articleTopTip提示，默认为true表示显示，false表示不显示

## [1.3.5](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.3.4...v1.3.5) (2025-06-03)

### Features

- 🚀 卡片列表点击图片由放大改为跳转文章页，新增拓展专题文档，更新部分文档内容 ([f0d5657](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/f0d565793c1bb42511fa8219d2694965558509d1))
- 🚀 文档新增自定义 404 页面 ([76b9e4d](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/76b9e4d158313010a894770dd4406dc52966c8b2))
- 🚀 hooks 重命名为 composables，首页卡片、友情链接、卡片容器的图片去掉预览功能，修复文章分类文字下半身消失问题 ([5e9c116](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/5e9c116b67eec35dd2e8e95ff10c62858156cc27))

### Bug Fixes

- 🐞 修复导航组件失效问题 ([71776d2](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/71776d2d0febf2ad1a247aa5da28e8d2a8d0d41c))

### Styling

- 🎨 优化代码引入顺序 ([2ead72c](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2ead72c75bad8770142664a0179b5f67c7f3a240))

### Docs

- 📚 插槽布局文档移到指南系列，部分生态文档重命名 ([aa7160a](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/aa7160a44778873026c944a05519a94c1a15124e))
- 📚 删除不需要的组件 ([1439e6b](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/1439e6b61bfd74b579602e5e721b2a8058961140))

## [1.3.4](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.3.3...v1.3.4) (2025-05-21)

### Features

- 🚀 登录页背景图解耦，支持 frontmatter 自定义传入，优化登录页在移动端的样式 ([17f69ec](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/17f69eccb58c4044479706cdad126161fc9840a1))
- 🚀 新增 articleBottomTip 配置项，VpContainer 支持传入 HTML 格式文本 ([df11913](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/df11913e7a666b1cf06056d0b7e45845ffb456a5))

### Bug Fixes

- 🐞 修复登录页文本框存在默认值问题 ([c7d45e8](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/c7d45e847ccc7595e627ec8b7ee60d672ff1fb59))

## [1.3.3](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.3.2...v1.3.3) (2025-05-20)

### Features

- 🚀 v1.3.3 版本发布 ([199b671](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/199b67141dca185ad22f724550a5d7cd89ae8101))

### Bug Fixes

- 🐞 修复打包的部分 .d.ts 文件引入其他文件路径错误问题 ([9280f43](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/9280f43c9822919e7f958b8f0d7677c06ec143ec))
- 🐞 修复清单页没有渲染全局组件问题 ([0e11282](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/0e1128263dffaa7ac23f32cf4dda48ea2fb01efe))

## [1.3.2](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.3.1...v1.3.2) (2025-05-20)

### Features

- 🚀 主题增强面板新增 switchModeDone、switchColorDone 配置项，优化 articleShare 在 pageStyle 配置下的样式 ([ff4bf0e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/ff4bf0e2cd5db9d6a27b5864c79615d47b95f0fa))
- 🚀 v1.3.2 版本发布 ([5cd1553](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/5cd155379351e4afd2b4d883f3580a5812032a5e))

### Bug Fixes

- 🐞 修复 teek 文档的配置切换功能在移动端自动重置问题，auto-frontmatter 和 sidebar-resolve 插件发版 ([833573a](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/833573ad62890092d56bbc0044b6e2a588873f4a))
- 🐞 修复归档页的贡献图标宽度不兼容问题，风险链接提示页不支持内容编写 ([6481500](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/6481500f79014915d5bbd2a75632d1b611046d51))
- 🐞 footerGroup 移动端样式优化，修复风险链接提示页不生效问题，修复白名单黑名单配置项命名 ([dc1cbed](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/dc1cbed0f1e3e4b9f7e30065e91c81c7982a332e))

### Styling

- 🎨 更新版本号 ([cfa00f6](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/cfa00f627244fa8dfc23b3150b4ace5a0c3175f0))

## [1.3.1](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.3.0...v1.3.1) (2025-05-19)

### Features

- 🚀 1.0.0-alpha.5 版本发布 ([e4e0d93](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e4e0d93cf7a9f255651103d7a4926fd962879943))
- 🚀 登录页、风险链接提示页兼容移动端，footerGroup 文字整体左对齐 ([6f9e148](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/6f9e1483c44b5d87da6602f7c7e363c64441cdc9))
- 🚀 首页卡片栏新增插槽覆盖各个卡片，优化首页文章列表在移动端的效果，my 卡片新增部分配置项 ([644a41a](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/644a41a17dec08061238e8ea4f1e405211e5a7d2))
- 🚀 移动端的侧边栏上方添加 blogger 栏，首页卡片栏新增部分插槽，优化部分组件样式，移动端支持切换主题 ([436e832](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/436e832ef1c4dfc171829cc6cda897f038f7aceb))
- 🚀 useNamespace 新增 storageKey 统一缓存 key 的格式 ([ed824aa](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/ed824aa00be4807ac887c94307af8e20863c2490))

### Bug Fixes

- 🐞 文档导航栏历史版本 link 错误修复 ([7bd71da](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/7bd71da56ab43af440d1437f644b0a405b1f954a))
- 🐞 segment-nav 风格下的部分样式修复 ([6a111e2](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/6a111e2474fb188eca542a4247313acfa8602e58))

## [1.3.0](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.2.0...v1.3.0) (2025-05-18)

### Features

- 🚀 登录页新增验证码功能，新增各个阶段的回调配置项 ([e880baa](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e880baa137983c0baf60f6c19f5ca5ffea75c0f2))
- 🚀 清单页支持大纲栏 ([b94a270](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/b94a2707b793440cdd1a791af7662a9955d1a633))
- 🚀 去掉部分组件 props，article 为 false 不显示文档分析组件 ([4f090ab](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/4f090ab95702369e53db407a50753319205a5330))
- 🚀 新增 ArticleTitle 组件，支持 title 使用 HTML 标签，部分 article 配置项抽离和重命名，优化部分样式 ([1fd969e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/1fd969ebbab193580c9af5edffc3d9337377c10a))
- 🚀 新增 DocAfterAppreciationPopper 组件，优化部分样式 ([a21b63e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/a21b63ef2ab63953f8914dda458d9deccbbf4cd3))
- 🚀 新增 usePagePath 函数获取功能页链接，优化部分样式，优化文档案例展示 ([cd80a7e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/cd80a7eb2f705d73048739e34caf7670d9f15b29))
- 🚀 新增登录页、新增私密认证功能，优化部分代码问题，permlaink 插件的路由监听由组件引入改为函数引入 ([9a8b9df](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/9a8b9dfa38c23deb73a8fddba6784fa883cb3993))
- 🚀 新增风险链接提示页 RiskLink 及其配置项，优化部分样式 ([f173a0d](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/f173a0d2769a16a19222f4ae0e3696348771e1e2))
- 🚀 新增全局配置 articleUpdate 相关配置项 ([a451e82](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/a451e82c6ccc4f3787c4a684c2f9ab6bbcc5ce0c))
- 🚀 新增文章页组件，归档页、目录页、清单页重构使用文章页组件，优化部分样式，删除目录页部分国际化内容，导出部分组件 ([3b77d68](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/3b77d689181d7aaa3037ba401aef82bba27e0285))
- 🚀 优化 Article 显示 Title HTML，支持动态 HTML 字符串解析，注册 TitleTag、Icon 全局组件，修复部分样式 ([82010fb](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/82010fbff297074b3c1eff5bcb989b66a9bffe87))
- 🚀 组件 HomeCard 更名 PageCard，添加部分文档说明，私密文章单页面级别添加 loginInfo 配置，优化部分组件代码，优化部分组件样式，部分文件重命名 ([44c1367](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/44c13679f95788e17c3cd1e805f4514690ed3300))
- 🚀 demo 容器支持效果渲染组件和源码复制组件分离，修复文章页的媒体样式，mdh1 插件默认支持文档布局注入一级标题，auto-frontmatter 插件添加 recover 配置项 ([c7459ee](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/c7459ee801efe037ec96ae5ed290fded4fe5aff8))
- 🚀 permalink、auto-frontmatter、mdh1 插件版本发布，Teek v1.3.0 版本发布 ([a21405d](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/a21405d61acaa7d8eec8620d07dfb39047af482a))

### Bug Fixes

- 🐞 修复 permalink 插件导致首页内容初次渲染丢失问题 ([1a7fd26](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/1a7fd268f3f093c0131e1a9e6527f3f5f988f453))
- 🐞 修复卡片文章列表不兼容移动端样式问题 ([58b0263](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/58b02639612c5c9eedf7eb11811515c0196230a2))
- 🐞 修复文章列表在最后一页时导致分页组件丢失问题 ([8746428](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/874642847caf60ac026128d1317280175b45caf6))

### Styling

- 🎨 删除 template 标签 ([54475b4](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/54475b48f1a9606ed37f85434d08505da601d76e))
- 🎨 新增 Icon 文档，优化 Icon 组件，优化部分组件样式 ([a1a87de](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/a1a87de179d62467abed9cb336c97b428dac6cf8))

### Code Refactoring

- ♻️ auto-frontmatter 插件的 recover 配置项改为 recoverTransform ([a4282d6](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/a4282d61a2b4d07edaab274a24a3a0c3cc6b0980))

## [1.2.0](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.1.5...v1.2.0) (2025-05-11)

### Features

- 🚀 1.1.5 版本发布 ([241c817](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/241c8173ff6a03a9df92b5b5926fa3a0e9ec7ba8))
- 🚀 1.2.0 版本发布 ([c62fd0a](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/c62fd0a1d0d54842887384df7366c1cb362851e9))
- 🚀 标签栏添加数量显示，文章页底部添加最新更新栏 ([16e147e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/16e147ec007736419e598617315f29653671e4ec))
- 🚀 文档新增配置切换功能，卡片文章列表高度保持一致，修复文章列表进入分类页、标签页不高亮问题，优化部分样式 ([98841f9](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/98841f911517bb40e461218950911c62afe49b0a))
- 🚀 新增 homeCardListPosition 配置项切换首页卡片列表位置，清单页添加 publishDateFormat 配置项格式化发布日期，新增部分文档说明 ([3e8478e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/3e8478ecd6e723aac782014d957b363330f72456))
- 🚀 新增文章清单页，文档分析插件新增 transformFile 配置项 ([5b2dcd6](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/5b2dcd6324bfc3ab1b0994580fd27b2e64744fc4))
- 🚀 章页底部最近更新栏添加多语言支持，支持归档页跳转 ([3457c91](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/3457c91e30862905d689437a42f875327d6624b0))

### Bug Fixes

- 🐞 修复 srr 报 is not defined，修复 feature、category card 动画丢失问题，ArticleUpdate 组件支持 frontmatter 关闭 ([aa52c08](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/aa52c0863cbb43eddb8aaf354860f9e811faddda))

## [1.1.5](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.1.4...v1.1.5) (2025-05-09)

### Features

- 🚀 博主头像 circle 支持旋转一次，支持新增背景图 ([00fe665](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/00fe665220af031591b2bde26a929297284b3620))
- 🚀 新增文章列表的卡片风格、新增 TitleTag 组件 ([43f01dd](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/43f01dd6380367193837d7e0c5538354b3fbf1d6))
- 🚀 mdH1 插件将 noTitle 改为 autoTitle ([9cb008a](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/9cb008a7082a12559e15ab64cc911b5e98d285d1))
- 🚀 message 组件新增 primary 类型 ([44604fb](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/44604fb701345291b4b5c53859200fc58bdc989a))

### Bug Fixes

- 🐞 修复 pageStyle 配置项第一次进入无法初始化功能问题 ([bdb4bb8](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/bdb4bb8622d6e3f15d458159693689bfb2739554))
- 🐞 修复 TitleTag EP 样式失效问题，新增 TitleTag 使用文档 ([8a88eb1](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/8a88eb1875f2bd56372321b05a480fe1ea4518c7))
- 🐞 修复文章列表封面图模式为 full 时显示的样式问题 ([f97365f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/f97365fd1db3add8871de187fdafbc51e710c285))
- 🐞 优化 full 封面图样式，优化文章页风格样式，优化部分动画效果，优化部分代码风格 ([148290b](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/148290bb430dbdfb9fd399546312b06b9936a1af))

## [1.1.4](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.1.3...v1.1.4) (2025-05-07)

### Features

- 🚀 1.1.4 版本发布 ([ec32978](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/ec32978d90b3e84a0f3a06e197924bc16bb4cb36))
- 🚀 footerGroup 样式美化 ([9ed1878](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/9ed1878e2cb94c686309bb9a93d4c7b00f76913f))
- 🚀 permalink 发版，修复刷新 404 问题 ([efd9db9](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/efd9db9c437adf40d9e6881b1c0d611557054af2))

### Bug Fixes

- 🐞 修复 twikoo 样式全局污染问题 ([b8d84ba](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/b8d84badcc7b9eb7bda518df8d96a0e0964b18e1))
- 🐞 修复友链卡片滚动和翻页动画不兼容问题 ([7747de8](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/7747de82ea757d860bc97d9b04b1a4f1bed1db2c))
- 🐞 useTemplateRef 改为 ref 来修复控制台警告问题，修复友链卡片鼠标悬停后无法滚动问题 ([0996544](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/0996544d2e55234cc87f8884f8136a9efd41f0ef))

### Docs

- 📚 文档新增个人友链 ([c45d6ef](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/c45d6ef8d35c929112227f819d69f03ce80899c7))
- 📚 CHANGELOG 文档更新 ([7f8e584](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/7f8e58401c09687cc24d6255b29664148b7da19e))

## [1.1.3](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.1.2...v1.1.3) (2025-05-06)

### Bug Fixes

- 🐞 修复依赖版本过低问题 ([7ac7067](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/7ac70670c017a14654478364825fe1263fdf2981))

## [1.1.2](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.1.1...v1.1.2) (2025-05-06)

### Features

- 🚀 版本发布 ([27be153](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/27be153380960818c015e1fbef77a070cc5dbb4a))

### Bug Fixes

- 🐞 热门标签背景白色背景修复，details 下的代码块风格还原默认，友情链接 Title 支持点击跳转，permalink 插件发版 ([2d461c1](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2d461c1ad10811ced9d46ae96e18c3cacdc0e282))

### Docs

- 📚 文档内容更新 ([01422d4](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/01422d41534624767b61acf31a66805e848a41d7))
- 📚 config.ts 改为 config.mts ([c4571bd](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/c4571bd09c0cb5cceac0d047d2031ded25cfacc8))
- 📚 readme 文档更新 ([adf63e4](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/adf63e4faa1ba544dd2f9ae030529bfa0e30686e))

## [1.1.1](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.1.0...v1.1.1) (2025-05-05)

### Bug Fixes

- 🐞 插槽失效修复，themeSize 失效修复，comment 失效修复，滚动到评论区按钮丢失修复，unref 全面改为 .value ([26fe007](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/26fe007cfedf6ff6bfa5938a36c32ea2004fa520))

### Docs

- 📚 文档内容更新 ([5a36ae8](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/5a36ae8ea58c162e7367f77e6e5d252507282c36))

### Code Refactoring

- ♻️ rem 改为 px ([e73e409](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e73e409b51fb86c3e404547f1ed523685fdb92a3))

## [1.1.0](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.0.2...v1.1.0) (2025-04-30)

### Features

- 🚀 版本号更新 ([c74b5fc](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/c74b5fce2c27d490184634afeb9807123d370c6f))
- 🚀 布局增强组件支持国际化 ([0d47df9](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/0d47df94888bf8e28df2e67d1dbfc141c41e9074))
- 🚀 代码块配置优化，新增 collapseHeight 指定超过高度后自动折叠，新增 copiedDone 回调自定义复制成功提示 ([c17466d](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/c17466d755776a945861671da476093082cc3da0))
- 🚀 还原 Teek 单体项目功能，备份 1.0.x 版本 ([9e1f4fb](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/9e1f4fbc38bca8f03688fdbffd80b7fde22f9831))
- 🚀 类型新增 index 导出，组件重命名，文件移动 ([c0edc94](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/c0edc94186e4d746b2d8f98cc27b2975d34b12ee))
- 🚀 去掉 ClientOnly 标签，组件和函数添加更健全的 SSR 校验 ([12fb9be](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/12fb9be18d65c682358fa82cd0a98b3dc450e8f7))
- 🚀 使用 packages 管理子工程 ([5a55444](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/5a554442b52e75152c2702a078ed07f11a7b288f))
- 🚀 使用 Pnpm Catalog 功能管理依赖版本 ([02257fd](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/02257fd7fa69a9ccd00bb76520e283798d0fc982))
- 🚀 视图增强改名为布局增强，完善配置项 ([05324e4](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/05324e4e8bb025ed4da609ee143d84fe7dc96b26))
- 🚀 首页新增动画，新增生态文档，优化部分文档内容 ([8d30889](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/8d30889d6bee8eb20b514b89adfe85f556abc0e6))
- 🚀 添加 titleTag 功能，插件发版 ([9ed77b5](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/9ed77b5fdc0c1db8026fb38543d81e194446fd6c))
- 🚀 通过 vite alias 将 .. 相对路径替换为 [@teek](https://github.com/teek)，rollup 构建时使用 @rollup/plugin-alias 将 [@teek](https://github.com/teek) 还原为 .. 相对路径 ([d485183](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/d485183a8605461df52d478736006ab6fb86ca7a))
- 🚀 文档新增 sitemap，新增 .script 目录忽略，修复部分配置项 ts 提示报错 ([31973ee](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/31973ee030f45e0892cd59fa6d72a24a9694e3da))
- 🚀 新增 Popover 弹框组件，之前手写弹框的组件更新为该组件 ([03a21fd](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/03a21fdff89c415f34ce34e94dde89913b9f3c7d))
- 🚀 新增 post.captureRender 配置项支持摘要按照 HTML 渲染 ([e7f26f8](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e7f26f85b30aa06940c72435961fe217958e0d9b))
- 🚀 新增 usePopoverSize、useScrollbarSize 文件，优化 Popover 组件，优化文档内容 ([62abbd3](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/62abbd39fb1043df96468100b0eaaee27e50e55b))
- 🚀 新增国际化功能 ([e506b1c](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e506b1cd09b81aeed6b7faa672fb89ab52a23437))
- 🚀 新增页面加载淡入动画，主题加强布局切换动画在加载时不触发 ([7a5d786](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/7a5d786ec39f885737e01cb8803e2d52ece9ff42))
- 🚀 新增阅读增强组件，优化部分代码 ([57f34d0](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/57f34d08f3960793d11fdd7f69781a729db843df))
- 🚀 新增主题色扩散功能，demo 容器通过 effect 关键词来去掉工具栏和源码查看，只保留组件效果 ([3c0cbb4](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/3c0cbb49e467f351f0145b305e26a54c6c73ca1f))
- 🚀 新增组件生态文档模板，新增文章页标题点击高亮功能 ([6e49b14](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/6e49b14f25445b5b95d07a888082b81178971ca1))
- 🚀 样式变量重构，适配主题色扩散功能，卡片容器默认根据文档宽度响应式切换，删除 themeSetting 配置项 ([5c6d46a](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/5c6d46a455151fa8ae9829d8bc6274e3d0b41560))
- 🚀 阅读增强组件完善 ([942ad6f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/942ad6fe8305e774fbc6ece296b548b04fe66b63))
- 🚀 重构 useEventListener、useStorage，新增 useMounted，优化阅读增强组件 ([4d9369f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/4d9369f304c9a7b830dd764a66a39a8e76a2c9d8))
- 🚀 重构部分 hooks 函数，提高健壮性和及时清除副作用，文档新增 useRuntime 函数 ([89263a1](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/89263a1823c2c24602a350750be9893c122ca22f))
- 🚀 组件的引用由相对路径改为 [@teek](https://github.com/teek) ([6bec430](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/6bec43072bed095e752d417f12263615ad5a324c))
- 🚀 组件进行分类 ([194a9e3](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/194a9e3c6a4751c3a78cef4f7c08d515e859b622))
- 🚀 组件样式分为公共、主题两类 ([5c44c29](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/5c44c290218ad8a038685988f0ade2841fb50a13))
- 🚀 demoCode 支持 effect 只渲染组件，主题增强组件支持单文章页配置，部分样式修改，更新 1.1.0 版本新特性文档 ([1f59327](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/1f593270305f2f838f62126cee5f1a92b794b739))
- 🚀 html 新增无障碍，文章页图片支持滑动查看 ([044b8e2](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/044b8e2efb0d252c5a1dd931f082a874238e00c2))
- 🚀 icon 组件重构，支持在线图标 iconify，卡片容器支持 auto 自适应主题尺寸 ([e20d767](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e20d767f1dacb5319c68e6f86433a269e8d60fca))
- 🚀 layoutEnhance 命名为 themeEnhance，usePopoverSize 新增监听滚动事件，css var 优化到每一个文件 ([26be13a](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/26be13ac9f4c4b03feec64b6d37f853858870cb2))
- 🚀 permalink 插件添加 onAfterUrlLoad 钩子和 permalinkPlugin 标识，statistics 添加 permalink 配置，demoCode 优化 ([5097fc9](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/5097fc90bb4931176dfa1aba794ead0025cf7ff7))
- 🚀 popover 新增 trigger 配置项，聚光灯改为默认打开，添加 onClickOutside hooks ([9f4bc82](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/9f4bc828d20ddcbc5ff2e33b3d6a113d43ad8257))
- 🚀 popover 组件添加 placement 配置项，重构位置计算函数 ([5f00b97](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/5f00b97a32721c80e6c4083393311ebcfa967212))
- 🚀 sidebar 新增 restart 配置项，优化文档 ([2e106b5](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2e106b5f92d96a1da340450c46813a0f4b082bb9))
- 🚀 siteAnalytics 支持多个站点，添加部分文档 ([2ed6e82](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2ed6e8238f91d7d9b204e3b8bf6876eb60c3ac61))
- 🚀 v1.1.0 版本发布 ([b342dbf](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/b342dbf50e5b3d99ffa4ba11782b44cb97a78212))

### Bug Fixes

- 🐞 修复 triggerEl 失效问题 ([43f3298](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/43f32988ac781122f101e295297bb66dac979dd1))
- 🐞 修复 TS 类型报错 ([f25025b](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/f25025b7eef264938f682f32b85df0120adb3ad8))
- 🐞 修复 TS 类型报错问题 ([3220a78](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/3220a7847e97122e7816573b025341d7c70ed834))
- 🐞 修复 ts 语法问题 ([2bbce7a](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2bbce7a5461595785f422599bd5647edb9bb4d2d))
- 🐞 修复 useAnchorScroll 函数报 window is not defined 问题 ([fb5b44c](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/fb5b44cbc9c0a263697d3a4193299744ffb57b42))
- 🐞 修复打包 TS 类型错误问题 ([7f80c6f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/7f80c6f116231689865fe2f49e810da1e4864b94))
- 🐞 修复代码块复制内容失效问题 ([29632ba](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/29632bac4fe3c2139392645a59b74fabd2b980fc))
- 🐞 修复第一次进入页面，主题色失效问题 ([972d6d6](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/972d6d6ef80c18169143d17c8bb4a7663ac48d88))
- 🐞 修复回到顶部和滚动到评论区按钮点击事件延迟问题 ([0356389](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/0356389744284ce436757fd35e94f5bc31582e23))

### Code Refactoring

- ♻️ teek 由单个工程变为在 packages 使用多个子工程管理各个模块 ([2776058](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2776058afc6deb3b6e36a64a7e5e233efb0f1214))
- ♻️ vitepress 改为 VitePress ([f37b5db](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/f37b5dbe7d2b80260be14a52e5446152324aaab1))

### Styling

- 🎨 代码格式优化 ([5aad8cc](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/5aad8cccd57cf2a4c6d14d5247261147f4fd9842))
- 🎨 更新代码格式 ([649a19e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/649a19e14c8e9bb33134bd3652ab31ca8b934d48))
- 🎨 添加注释和文档说明 ([40d971e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/40d971e50452417fa49dd4bf1f722d672cf82dcb))
- 🎨 修改 package 的 author url，修复 scss 文件无效引入 ([8f9eab5](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/8f9eab545da7c171620d9c84b56c98641e18ef6c))
- 🎨 移出 console.log ([d38345a](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/d38345ab89a5b27860d658930a28cc3b96b43c18))
- 🎨 引入格式优化 ([4a62280](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/4a622806ce06979f0b29134c4bb30894f49bef4b))
- 🎨 translation 标签优化 ([485ebde](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/485ebde38676f53e5355eb1f5b2100ca260229e0))

### Docs

- 📚 更新文档 ([55af75a](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/55af75a96770696558b262956c8ea3732a6c2db7))
- 📚 更新文档 ([fe09d32](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/fe09d327da323382616afed4b7299ca880b18ff1))
- 📚 文档更新 ([edf6d65](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/edf6d65a6d41ac348d85bf76f3983fc6e579bf33))
- 📚 readme 文档更新 ([9807293](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/9807293c9b4aa60e372269c17febce3d0237f160))

## [1.0.2](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.0.0-alpha.9...v1.0.2) (2025-04-09)

### Features

- 🚀 升级依赖版本 ([d1ff891](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/d1ff891929f75a3d95b0e63ea245031199519dee))
- 🚀 新增部分文档 ([c5b5acb](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/c5b5acb473199d5f0165f7637d191e7078a12fbe))
- 🚀 移出 EP 依赖，重构部分使用 EP 的组件 ([5b350f7](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/5b350f72bfad84e3033528e8a5301a179f71c016))
- 🚀 重构 ImageViewer，修复部分代码 ([b7adbeb](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/b7adbeb54dd242798d8d1c9ad886c51b53fb10ae))
- 🚀 重构分页组件 ([2cea2b5](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2cea2b54a3a4e7cb147d847c07e597079786c93a))

### Bug Fixes

- 🐞 修复 feature 动画失效问题，精选文章添加 dateFormat 配置，添加 articleShare 文档说明 ([a83d7e2](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/a83d7e2a966f7a12b569e810c79d2ca582c6b45c))
- 🐞 修复预加载功能失效问题 ([e6759e0](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e6759e0b3fb542963268676d620a7837596b536d))

## [1.0.0-alpha.9](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.0.0-alpha.8...v1.0.0-alpha.9) (2025-04-05)

### Features

- 🚀 版本号更新 ([2ed7aa8](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2ed7aa80dcbb5117ab0c3403e31212751318c08e))
- 🚀 博客头像的背景色默认透明 ([8545f1e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/8545f1e18be8dcd9e8fca2b334a3460c6ce0ec12))
- 🚀 新增 Video 容器 ([d5819d6](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/d5819d629ac30cb847406cb4d0a9903a52937841))
- 🚀 新增底部信息组组件，重命名 Footer 为 FooterInfo，添加部分文档说明，优化部分代码 ([1266a4f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/1266a4fe5eaaf3d2a15d2b2a2ecedd5bf2721468))
- 🚀 新增页面分享组件 ([107fe0d](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/107fe0da55e7d833edc2b5fecd71789620198ccf))
- 🚀 新增赞赏功能，修复评论区不跟随 provide 配置项问题，修复 social 失效问题 ([c3dadf7](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/c3dadf7186262a0e46f1b5fbe53917e7af64a97d))
- 🚀 新增站点分析功能：Baidu、Google、umami ([d918d99](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/d918d992f8dfe6ad11fc938cd1a9ee9173d1a9da))

### Bug Fixes

- 🐞 修复 docs 打包失败问题 ([d535270](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/d535270d9a8f00fbdb2c8a3c5dbb07db279808e9))

## [1.0.0-alpha.8](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.0.0-alpha.7...v1.0.0-alpha.8) (2025-04-04)

### Features

- 🚀 vpHome 配置项功能由删除改为隐藏 ([6508baf](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/6508bafbb72bef315994bb2fe947a0e129e64ff4))

## [1.0.0-alpha.7](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.0.0-alpha.6...v1.0.0-alpha.7) (2025-04-04)

### Features

- 🚀 1.0.0-alpha.7 版本发布 ([20a4d88](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/20a4d88f0874b9f7a201b42d1cbe7b16809e0784))
- 🚀 重构 teekConfig 获取方式，支持 provide 注入配置项来实现页面动态切换配置功能，修复部分遗留问题 ([e5a4824](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e5a4824dc599058e506bcc7086105fcdc632cdb2))

### Bug Fixes

- 🐞 主题相关的缓存去掉项目名前缀 ([2cba3a4](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2cba3a4c995624784fefeccc33ccb7473bb4c55e))

## [1.0.0-alpha.6](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.0.0-alpha.5...v1.0.0-alpha.6) (2025-04-03)

### Features

- 🚀 文档新增博客风格切换，修复部分功能 ([b9614f3](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/b9614f3418cf927b4548daf3f96d2683ff98c148))
- 🚀 新增 useStorage hooks 函数来替换默认的存储方式 ([21806a0](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/21806a0a0b09d421a5f7ec8c1be57e7132983ead))
- 🚀 右下角按钮组组件抽离 ([1a0cfb0](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/1a0cfb0443603e812561038989aa55ea7af3aa11))
- 🚀 组件命名空间类命名由小驼峰改为短横线命名 ([9a3d2c0](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/9a3d2c0b908cf9e2cf501527b889892a7d830291))

### Bug Fixes

- 🐞 标题 404 修复，文档内链在国际化下 404 修复，配置项调整 ([840747e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/840747eb17ad8ee07879ab45a294a09154926e58))
- 🐞 文档导航栏历史版本 link 错误修复 ([25ae58a](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/25ae58a0bf059932155222af3ae7f42504601286))
- 🐞 lock 文件更新，修复文档打包失败 ([07feb5c](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/07feb5c00681e75e0c50b987e191d18422648404))

## [1.0.0-alpha.5](https://github.com/Kele-Bingtang/vitepress-theme-teek/compare/v1.0.0...v1.0.0-alpha.5) (2025-04-02)

### Features

- theme 的配置支持响应式 ([140b1d0](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/140b1d0ab1f9ceabf8c90806fef4b00be898e02b))
- 🚀 1.0.0-alpha.5 版本发布 ([5305b9d](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/5305b9d7f40324d836637bf05db8ad109b72a16c))
- 🚀 新增 CHANGELOG.md ([265ba83](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/265ba831121bede21007ef26c239fdf63a57d7c2))
- 🚀 新增 eslint 格式化 ([5a8bce0](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/5a8bce086049a666a6ecef953eaf10c19607be3c))
- 🚀 theme 支持 computer ([30b758c](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/30b758cb1011db8c70347c2802e218b72a064153))

### Bug Fixes

- 🐞 修复 Demo 容器引用的组件没有打包被打包，修复浏览器无法回退上一页问题，主题版权链接更改为 GitHub 地址 ([2e62d67](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2e62d67a173167cff1340b44e00795761e21f6bd))

### Docs

- 📚 文档内容纠正 ([95b6298](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/95b6298a1478fdf95a1c21d31f2c6867c675b04b))

### Styling

- 🎨 更新 teek 域名 ([4f2c9c2](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/4f2c9c299675f89a6e1fb62f5229202757029bea))

## 1.0.0-alpha.4 (2025-03-31)

### Features

- 🚀 1.0.0-alpha.4 版本发布 ([257dd6e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/257dd6ee106335168b5416a4d7b4bf9fca546965))
- 🚀 新增文档说明，修复 Demo 容器配置项无法传入问题，修复 themeStyle title 配置失效问题 ([4cd4e76](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/4cd4e762eb42094aaf00e27dc058abcc9f5bb4ac))

## 1.0.0-alpha.3 (2025-03-30)

- 🚀 1.0.0-alpha.3 版本发布，修复打包失败问题 ([d0dc115](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/d0dc1158ba8b857122fb1c4933fdd06bf067c68c))

## 1.0.0-alpha.2 (2025-03-30)

### Features

- 🚀 新增文档说明，优化变量命名 ([69c2e94](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/69c2e94bcfb4a5fca720079b944463ac037e1b9e))
- 🚀 所有标签支持国际化 ([ce32a88](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/ce32a88a7405f9e16b726b7dcbbb37888f8847c2))

### Docs

- 📚 文档更新 ([37f4563](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/37f4563de57d7dfeb38e3e284cad9c3f55cb372d))

## 1.0.0-alpha.1 (2025-03-29)

### Features

- 🚀 发布 1.0.0-alpha.1 版本 ([630503f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/630503f47feecdcd1e764c7c85e53441af947d96))
- 🚀 插件发版 ([522a6a3](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/522a6a33371621e981132449c189f948a659c061))
- 🚀 插件发版 ([5d006f4](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/5d006f4556501009930fb259e6dafb042c9b58d4))
- 🚀 markdown 容器创建方法提取出来，封装为 helper 工具类 ([a3123aa](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/a3123aa7afbe8757deecd6f2544ad4f9185b2703))
- 🚀 svg 图标重构，去掉 ep 的 icons 依赖 ([45899e8](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/45899e85ea4c136a7e651c372225e44357885285))
- 🚀 demo 容器完成 ([f8fd50b](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/f8fd50bc56560bee44d792b21dc8b858c3c03db7))
- 🚀 更新插件版本 ([ddada08](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/ddada08cd596ada55e160ae1396a2dcfbeb4c836))
- 🚀 新增 Demo 容器初版，优化动画样式引入 ([7f17e9d](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/7f17e9db21b506e6b2b648c54013e20187a1e871))
- 🚀 插件删除 peerDependency 的 vite 依赖 ([78773e2](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/78773e2e5a3760338c28c30fbfb874a957558e7a))

### Bug Fixes

- 🐞 修复 demo 配置项读取失效问题，修复打包警告问题 ([3f6652e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/3f6652ea9f9866ad1c5932e6e3f87bd97c470dba))
- 🐞 修复 DemoCode 路径丢失 base 问题 ([728895d](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/728895d73a880298e9f4163dae96342e223031fd))
- 🐞 修复构建失败问题 ([3713742](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/3713742495ee495f9423d59173a7bb03df87a802))
- 🐞 theme 支持响应式 ([0056bbb](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/0056bbb2437a751092362451c9aceeed55694539))

## 1.0.0-alpha.1 (2025-03-27)

### Features

- 🚀 发布版本 1.0.0-alpha.0 ([588cef6](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/588cef6e5321f0ba34d18cabb387e155d5df1d77))
- 🚀 壁纸组件添加根 div ([547705e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/547705e28c1087abb73aba7bc54f4ad6f2537d88))
- 🚀 侧边栏插件添加 initItems 和 initItemsText 配置项，支持修改一级目录的生成格式 ([a4a5202](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/a4a52024816ef7fa8c4cac734090f2e70051d1f2))
- 🚀 插件 1.0.1 发版 ([02899de](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/02899de394e414b7f79648ad51f12cdccdf08143))
- 🚀 插件部分代码、逻辑重构，说明文档内容优化，目录页功能、样式优化 ([3ec241b](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/3ec241b9b36c4e283fcd64d1848b7add83fbe1fe))
- 🚀 插件的 base 配置项命名为 srcDir ([c8e832a](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/c8e832ab8f9959408810228a32ef3a3b503010d1))
- 🚀 插件发版 ([8d4f914](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/8d4f91495b662ca1466c13ed82952faeea8cd8e1))
- 🚀 插件更改扫描方式 ([e0910a0](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e0910a0c4d77a8143d9cdea8459f5072906f2fd3))
- 🚀 插件忽略列表新增 dist 目录，插件的 gray-matter 依赖改为必须安装 ([b0a43fb](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/b0a43fb5bd43c3d1a062ab72354e72dcb0891e3b))
- 🚀 插件适配 vitepress 内置多语言功能 ([65fc2bf](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/65fc2bf928b7b7299f58b26dda40f0d2e602b512))
- 🚀 插件输出格式更新，插件版本发布。修复 wallpaper.hideMask 配置项失效问题 ([d84a7c3](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/d84a7c3f73f2f8e9491ca026a77a803138d9f6e8))
- 🚀 插件新增文档说明，扫描目录默认忽略的目录去掉 3 个 ([bb2763e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/bb2763e80c5be5e846f4216fa63623444f5d93b0))
- 🚀 插件优化 ([f36215a](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/f36215a0e1ec1457c266218133a554b2054a5b5e))
- 🚀 初始化主题的使用文档框架 ([850edbf](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/850edbf5fb9c0acc45ad6c0f40715a53dade6568))
- 🚀 从 BodyBgImg 组件将 pageStyle 功能抽离出来 ([2b917c1](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2b917c1c794eaacfc5d8e62f597fc852914cbd74))
- 🚀 代码块箭头改为通过 MD 插件添加 ([410cacf](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/410cacf38ff73056f3ea73927c3fafb5fcdaa372))
- 🚀 代码块语言支持修改大小写 ([954b307](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/954b307ee14d32fd45a703ca38fb7421f2c68b16))
- 🚀 导航高亮兼容国际化，修复目录页数据不加载问题 ([b3ee400](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/b3ee4006c8518b00bf39ba12af38437ca8a4f169))
- 🚀 对 vitepress 修改的样式改为按需引入 ([35032b5](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/35032b57f7b80a0bb38918dd5900972556ef72ee))
- 🚀 多语言下拉激活样式修改 ([93d4101](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/93d4101628872cb346caacea3c2a14d4a762b526))
- 🚀 访问量添加 iteration 配置项 ([3b57176](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/3b57176dec71cc63723995df8a493bf66c7fd2f6))
- 🚀 访问相同目录下的 Markdown 文档，对应导航高亮 ([7ccc017](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/7ccc017273d068b88f7989c5530ef3941f7180d8))
- 🚀 分类、标签、归档、目录等功能兼容多语言功能 ([7fad598](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/7fad598c4717ee07a6033e3a8b656a83c8d1de2f))
- 🚀 封面图在移动端切换为 default 模式 ([4911271](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/4911271d5e28c341c01e32cfc7b27cc8135c08ec))
- 🚀 给各个组件的配置项添加类型提示 ([21264d3](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/21264d35376aa904f497c8b64b52f22d666698c7))
- 🚀 更新插件依赖为最新版 ([89541ed](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/89541ed7d79c8ba635aac48826b752b135ec22b1))
- 🚀 归档页支持 markdown 写法 ([495037f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/495037ff6f72aaa0e2cd9aa7a6579b152eeb6387))
- 🚀 回到顶部按钮添加进度条 ([93a99c6](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/93a99c636bbd13d5fcc1331db4e8f46a51b051e1))
- 🚀 兼容 base 功能，permalink 在文档内当作链接跳转时，自动对国际化环境识别 ([79c380a](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/79c380a9b1097e6ae0f04a2fde1c6d75a09c8a4c))
- 🚀 解决打包报错问题 ([ff8c6ff](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/ff8c6ffe01e4ac303a4954d15acf63db8f57352f))
- 🚀 类型重构，站点信息支持自定义内容以及追加内容，友情链接代码优化 ([bd1d3d8](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/bd1d3d88aa353ce610b18b460ff388c58364f4d8))
- 🚀 每个组件添加局部样式文件说明，添加样式单独打包功能，优化部分代码格式 ([a98d2c4](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/a98d2c42b8a6601af73317c61732f300c318a752))
- 🚀 目录页和归档页支持额外配置来启用，去除 post 默认忽略目录页文档功能 ([3916240](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/39162400699cfdce668db08eadf0012e28adb843))
- 🚀 目录页适配移动端，分页组件适配移动端 ([24569e0](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/24569e0ee85b64bef7048437abdcf979f5086880))
- 🚀 去掉 base 配置项，改为从 vitepress 获取 ([61b57bb](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/61b57bb7f0cc8607bc74458ec1e529e809053dc8))
- 🚀 全背景图模式添加 4 个文章页样式，支持配置切换 ([5d86290](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/5d8629008c5732a5a9bfa8770d82ccf28355ef9e))
- 🚀 容器 left 样式抽离，添加 mark 样式，markdown 添加 note 容器 ([bfd03d2](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/bfd03d206483f0ce67828b559a9c83923dace906))
- 🚀 入口组件优化插槽代码格式 ([a453eb9](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/a453eb90b7fa18d9117c09b11d51715d7fbd29a1))
- 🚀 删除部分插件配置项，修复浏览器前进、后退 404 问题，修复代码块无法折叠问题，新增首页 footer 运行时间 Demo ([a0d7673](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/a0d7673f834248e489354c0e35e02516fc166c25))
- 🚀 使用 BEM 规范样式，打包插件覆盖问题修复 ([daba521](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/daba521ebbcd6dd1b4d495227d54dfbe09d18b8e))
- 🚀 使用 picocolors 代替 chalk ([3cc3888](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/3cc388846e4cbee113b959261074aa2d46467ddb))
- 🚀 使用不蒜子时，在 head 添加 meta 来解决计数不准确问题 ([44459f7](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/44459f720d5204c59a46ce1ccb0f7dbc3ea03879))
- 🚀 使用文档添加内容 ([17137d0](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/17137d05da6a4355dd6a5edc63315d6fe598422e))
- 🚀 适配移动端，修复 showBaseInfo 配置项失效问题 ([65810d7](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/65810d74ae61f99658a509c6109acf597f4e252b))
- 🚀 首页 Banner 新增半图功能，文章页顶部支持容器提示功能 ([3c87e4d](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/3c87e4d88443830495fa0ec28aaba9ab88467700))
- 🚀 首页 Banner 组件重构，分离多个组件。文章更新时间默认隐藏，样式代码优化 ([e0945b4](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e0945b4b201fc34266002aa6a62dd9acb0160ecb))
- 🚀 首页和文章页兼容移动端部分场景，添加 vp-plus 引用 ([68a6f46](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/68a6f4683e10683952825be00ab7c73a63be6c78))
- 🚀 首页卡片统一封装组件，支持分页功能以及左右滑动和上下滚动的动画效果，封装定时器切换数据的 hooks ([add1631](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/add1631fe92843d8caf507a01ffd51b961ac3a87))
- 🚀 首页卡片支持函数修改 title ([5c31293](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/5c31293b4b97f5bcb94e9cb70fab7fe5396cfc08))
- 🚀 首页完成分类和标签功能 ([91aeedc](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/91aeedc4f7eed891b150c4e64e8f0d659a2aa83a))
- 🚀 首页新增 Footer 功能，新增社交链接功能，优化部分配置项命名 ([7eea71a](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/7eea71af506081bd8097d6f495ce03939ac63276))
- 🚀 首页组件封装，分类页、标签页切换不刷新页面（重构逻辑），组件实例支持快捷导入，permalink 插件修复 router.push 问题并发版 ([774dd94](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/774dd948cbcffcc16b7d60a18e3c5d287f786daa))
- 🚀 提高 usePost 函数让代码更精简 ([520c87d](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/520c87db1b092e43b20ae44f89d54cc8a2bc5e91))
- 🚀 替换新版 Vitepress 废弃函数 ([812faa4](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/812faa4b871def241310159acf47c010e62a2e22))
- 🚀 添加 catalogue 插件，优化其他插件代码，文章页添加作者、发布时间、面包屑功能，首页添加图标 ([b117317](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/b117317666d5a81c2e494d19b1d522942102f252))
- 🚀 添加 descStyle 不同风格功能 ([310ff66](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/310ff66dccac75635d43713a4e842804ec07dd5a))
- 🚀 添加 externals ([7a46596](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/7a4659690e7722a4cdd792fed997541e86ebdea5))
- 🚀 添加 tsconfig 文件 ([3771806](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/37718067a5ad168f1b3143e85faae1b9eddc49aa))
- 🚀 添加 useVpRouter hooks 来提供 router 钩子绑定自定义逻辑功能 ([7d7548f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/7d7548f42030d7d4743e52dbd712cf418fce4171))
- 🚀 添加不同文档的超链接，优化文档内容 ([e7c4072](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e7c4072e31f8355acf1444eb08aa83ac0cb00f46))
- 🚀 添加代办说明 ([7693a23](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/7693a2349c70f7b98a3848705293d6bd3faf31aa))
- 🚀 添加公告组件，添加监听屏幕高度和宽度的 hooks，优化部分组件逻辑 ([2ee27d8](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2ee27d85b328e2492a75317be6d9eb15d6404004))
- 🚀 添加归档页面 ([38985aa](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/38985aad0c2a7d9592dbd8a129ef2096386b5cde))
- 🚀 添加两个不同风格的头像配置 avatarStyle ([9d5d262](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/9d5d26280816eb4dadc670884878c85c3afd2484))
- 🚀 添加首页各个卡片的启用禁用配置项，站点信息重命名 ([7c72ce9](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/7c72ce9f39b7c506063484f668df837f42720c54))
- 🚀 添加外观切换时开启过渡动画功能 ([796aa4c](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/796aa4c1588903e9f8255239bd8d1385d74fc276))
- 🚀 添加文章页的图片预览配置项，添加代码块和图片阴影 Demo ([e5b657c](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e5b657c49cca5f25c92d935a96d87c7f660531b7))
- 🚀 添加注释说明 ([1914956](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/19149562fe5db5366f42cb8201bf068e194de808))
- 🚀 统计量、访客数功能重构，修复数字不正确问题 ([ba5f4c4](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/ba5f4c4d63057d9632eb210d6d2455f29455c90b))
- 🚀 图片切换、文字切换、文字打印支持随机功能 ([b499d96](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/b499d960d91918d71c665b24d663a51ef39be976))
- 🚀 完成 cleanUrls 为 false 时，文章地址带有 .html 的适配功能 ([b0423c0](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/b0423c0cc66c194c43f5c3ae622274d899614dec))
- 🚀 文档更新、注释优化 ([36503e6](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/36503e60d4ae4f5afd1a1c0de80a859d66d498c7))
- 🚀 文档添加导航栏高亮功能 ([b352e6e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/b352e6e2990d1e013529425185f1d0d49a33e256))
- 🚀 文档新增 date ([4752003](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/4752003c346063b414a49bbcf104ceaab8ef6f13))
- 🚀 文档新增 fromatter，插件添加重复提示 ([e9f2dac](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e9f2dac3a7d422e938f39debf91c725df7832ab1))
- 🚀 文件创建时间如果获取不到，则获取最后一次访问时间 ([c3dc5f7](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/c3dc5f797d1a75ded56934007af28863580e8e59))
- 🚀 文章页的作者、日期、分类、标签支持配置开关 ([5d76680](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/5d7668052c54d4f1b3003d530ffce8ead3c490af))
- 🚀 文章页新增 updateTime 功能。Article 配置项支持 post、article 位置选择来显示信息 ([eecb87e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/eecb87ed6f1f0e2ee3ed696ce22d6383cc7d3ed2))
- 🚀 文章页新增多图片预览功能，部分配置项命名修改 ([873a2bd](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/873a2bde6f9e8530efec57377b8e83e1f61add8a))
- 🚀 新增 4 个评论框架及其配置项，文章页适配不同的主题尺寸，添加前往评论的快捷按钮 ([166d99f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/166d99f80f24a9e19db1777962b6eaf195e804f5))
- 🚀 新增 Banner 3 个风格切换，优化部分代码和样式，修复部分问题 ([da0687c](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/da0687cdf0c4618438e95be44f593a1279b3c9f5))
- 🚀 新增 center、right 容器，文档内容优化，修复代码块在移动端样式 ([a80483b](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/a80483bcd98a0750df390499a22461630b5876c6))
- 🚀 新增 changeset 管理包 ([fcbd604](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/fcbd60415d4a89442f700f18c980152b67786982))
- 🚀 新增 commit 校验以及规范相关代码 ([9d473fa](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/9d473fa53b38dcf527da324a08c86449d22e1fb6))
- 🚀 新增 description 和 except 组合使用，新增 excerptPosition、more、moreLabel 配置项 ([266a83e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/266a83ea95a3718b6656c864216cad2f7e76317c))
- 🚀 新增 homeCardSort 配置项，支持修改首页卡片的顺序 ([a266777](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/a26677719ec854a7414a4a50839a652aa726d94c))
- 🚀 新增 husky ([e455f71](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e455f71d48fa88020563e55a3ec210463afd55cb))
- 🚀 新增 isShowBaseInfo、dateFormat 配置项，新增封面图片 default 和 large 两种尺寸模式，优化主题尺寸部分 var 变量值 ([a1687df](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/a1687df25b1b033d85325d76b3bbf3cc4b4d4143))
- 🚀 新增 lint-staged 等规范类依赖 ([282d062](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/282d0626ff62e8ca4da5507284225aa325921794))
- 🚀 新增 log 日志，删除部分无用命令 ([9cad3b8](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/9cad3b86bedeb11c8a28bfc4c21a1247e86ab850))
- 🚀 新增 markdown TODO 插件，优化部分样式 ([6154fdc](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/6154fdc768c8f5ff4215a796649da80c1fce74c0))
- 🚀 新增 module 和 full-bundle 不同的外部依赖排除，package 依赖格式优化，站点信息添加近一周和近一月文章数功能 ([94035b5](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/94035b5518da0de860f4f3b2849fdbbe87f8cd74))
- 🚀 新增 Teeker Logo ([9fa01ee](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/9fa01eeeaa0ecf6e89c09065adf5364031840d17))
- 🚀 新增 tk page 页隐藏兄弟元素功能 ([64f8f31](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/64f8f311fb30fe23226615f08f1c1369a01fe3f6))
- 🚀 新增 vitepress-plugin-auto-frontmatter 插件，自动生成 frontmatter 到 md 文件 ([a296f95](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/a296f95a7d982b8bfff09a7703a2b869dd379d0d))
- 🚀 新增 vitepress-plugin-file-content-loader 插件来重构 posts 数据的获取，解决刷新、打开 F12 时等待时间长的问题 ([3206d38](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/3206d3825e61d75fcd65e9345cee3f4a6ce7990b))
- 🚀 新增 vitepress-plugin-md-h1 插件，优化插件代码格式 ([5744117](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/5744117af7aeeba9277e6fe3be3b950718a9208c))
- 🚀 新增 vitepress-plugin-permalinks 插件。优化 vitepress-plugin-sidebar-resolve 插件。修复部分问题 ([25408d7](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/25408d7283f7e187cb6df9f05257faa6fd661745))
- 🚀 新增编译构建相关代码 ([2808025](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/28080253f8674cef7e0677c4ada4d4db62fa6aa9))
- 🚀 新增部分 vp-plus 样式文件，permalink、mdh1 插件发版 ([1364115](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/1364115bad209e569e7374dc5f79d7c00284ab42))
- 🚀 新增插槽，支持自定义 HTML。MdH1 插件支持配置忽略文件名 ([dfdc541](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/dfdc5414d32ef5984e3788751af3417c3b892598))
- 🚀 新增打包功能，优化打包策略 ([fda7784](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/fda77848a9a8c98e851640947a6006036e58a343))
- 🚀 新增代办记录 ([2e7a6e6](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2e7a6e6a563a70105237557d4b2181f1059f7ca3))
- 🚀 新增代码块新版样式，支持折叠和展开 ([e31ab9e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e31ab9ef4df9868503157d87c2db79e8278b0ae5))
- 🚀 新增导航卡片插件，优化分享卡片和图文卡片的代码，新增部分样式 ([e75ce09](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e75ce094a463586a4c92b1a38c9e2ebb68fc9a7b))
- 🚀 新增公告 Demo，新增 Banner 大图、Body 大图切换时的动画效果，回到顶部图标切换为火箭图标，优化部分 Icon 样式 ([e00e205](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e00e205358d0fb43b84011b5e0553d4c52a88ec8))
- 🚀 新增开发专题的文档，优化部分代码格式 ([392cb89](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/392cb89f38b663c72a07369b127fa34a187d1200))
- 🚀 新增两个 markdown 卡片容器 ([f304a04](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/f304a04e25d005e09527fc8956d5dad06b30e026))
- 🚀 新增美化样式文件，代码块折叠功能适配代码组和 details 容器 ([c389e04](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/c389e04ec97419e40ee429a4b7c2aafb3ddc49dc))
- 🚀 新增目录页功能，sidebar 插件新增 frontmatter 配置排除功能 ([d8a954a](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/d8a954a2ba7a0f2f6cb61c8e2831fffc38cf156d))
- 🚀 新增评论配置的 ts 类型 ([7df6f41](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/7df6f41d5d31734f0b1fbdf14847718584a5c792))
- 🚀 新增使用文档，部分配置项支持 frontmatter ([e566710](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e566710c828f6378d36b9eb7bd023610e64969f4))
- 🚀 新增使用文档，优化部分代码逻辑，修复部分问题 ([567bd86](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/567bd8625969c5cef92a92522e02f80219e779d3))
- 🚀 新增使用文档，优化部分注释 ([a0dd59d](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/a0dd59d0e24b88fb7b95784d6ed8683b92f8e0c2))
- 🚀 新增使用文档，优化文档目录结果，修复主题风格和主题尺寸设置默认值导致无法切换 default 问题 ([3e705fb](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/3e705fbd75b19421de899708661c3de7106bc9d7))
- 🚀 新增使用文档，主题风格的配置项命名由 themeMode 改为 themeStyle ([f0db771](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/f0db771edb36e40d68ce6d262a21ca8e78654f6d))
- 🚀 新增首页大图功能，优化部分代码格式 ([65a1af8](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/65a1af88238f71db8e4b949ba1958da4cda14fcc))
- 🚀 新增首页顶部 F12 开启壁纸模式，Banner 波浪组件优化 ([03cd8da](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/03cd8da1a1cf76fce7f9c56814cd413b012f4162))
- 🚀 新增文档 Demo，优化部分代码命名 ([2748a73](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2748a73c3d9e791a40eafbffdf779a22ee3000a0))
- 🚀 新增文档，重构主题样式和主题尺寸代码 ([4868cf4](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/4868cf4397ff9ce69242b70542bf9dc1d77f3e08))
- 🚀 新增文章页一级标题渐变色样式 ([21f70e7](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/21f70e7993334e2cee23dfdbd38e22eb319ee9f4))
- 🚀 新增站点信息功能，优化多个插件的代码，修复部分问题 ([4a9cd67](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/4a9cd678459e748aa27d39d83539eac6c86cd7d9))
- 🚀 新增指南文档 ([a40ee7d](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/a40ee7daa3c3386b38a61a9d5af39e935c4fe6fa))
- 🚀 新增主题尺寸 large、default、small 切换功能，样式适配主题尺寸 ([04e0c56](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/04e0c569067c9a1dd1e7ea9712b582482c42023f))
- 🚀 新增主题开发专题文档 ([d1c1220](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/d1c1220fed59dd757e5ffbca12eec77452febab3))
- 🚀 新增主题开发专题文档，优化代码格式 ([54bc164](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/54bc164fdfb679888aabaf04c48279a2130d2bff))
- 🚀 新增主题模式和主题尺寸的默认值配置 ([5be26cc](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/5be26cce524cffdcbb92615ba15e0496b13b7d76))
- 🚀 新增主题切换功能，支持 7 种额外主题和用户自定义主题。修复 Post 翻页时，滚动返回位置有误 ([fca9925](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/fca9925761b565027b9543b8d54714ebfe3e3883))
- 🚀 新增组件的实例类型 ([bc81f51](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/bc81f51bf4c95a957dd08ebd67d78800ca63540f))
- 🚀 修复打包失效问题 ([5a86f5f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/5a86f5fe12bac3a3db597e27e67931bf2d153100))
- 🚀 样式全部添加命名空间，插件 srcDir 命名为 path ([46bed19](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/46bed193f5282804c4ac37fca066de9bd606dc9c))
- 🚀 样式位置、格式、内容重构，代码添加大量注释，优化部分代码问题 ([6abebdc](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/6abebdc02f3399b51d323c66399fb8a02c59b987))
- 🚀 优化 docAnalysis 插件的字数输出格式 ([08d4089](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/08d4089aa037fec4968ff7f531bde6649a61de5e))
- 🚀 优化 tsconfig 内容，修复部分 TS 问题 ([4684d60](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/4684d60adf440908b039f0015fc83781f05f6702))
- 🚀 站点信息添加配置项可以排除在统计里，优化部分代码格式 ([06e2d39](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/06e2d39f00c6f53472a8c66b5ef43343d14a53cf))
- 🚀 支持 permalink 高亮 nav ([e4bbf55](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e4bbf55871082f207965cf6fd0031dd8c766816b))
- 🚀 支持 rewrite 功能 ([2bd0c60](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2bd0c60a323622ce9e2b7b0c59f6351ba96d7b23))
- 🚀 支持在 frontmmater 配置 themeSize 或者 themeStyle ([fd1ec0a](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/fd1ec0ad1f9ba79916ab565bc3c1b1b8a2392a0a))
- 🚀 重构 Banner 全屏图片样式，修复插槽命名丢失问题 ([b2b33c3](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/b2b33c3478fc3f64e2f000a4a8b645bcafc517b3))
- 🚀 重构组件命名以及导出，添加 3 个插槽，添加 Banner 全图动画效果，添加 Banner 全图箭头组件 Demo ([c769839](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/c769839b81cad45dca0edc9fc89c6b217d5de446))
- 🚀 主题尺寸和主题样式支持持久化 ([571683f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/571683f57861f550f6a96f5beaefe437269976cc))
- 🚀 主题尺寸图标切换 ([0391166](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/0391166e645b7112aae17bb68946b6964a60f39e))
- 🚀 主题打包问题修复 ([07a5350](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/07a5350eb804583bd2b0296e6f6cc80c90872c66))
- 🚀 主题更名 ([06976a5](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/06976a59bb80e5d2c8c726276f85d6b407bf38ca))
- 🚀 主题命名 teeker ([12c3ed9](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/12c3ed99e45ea8d8ff902be0c996421f9a444789))
- 🚀 主题配置类型抽离为单个文件，评论区组件支持传入实例来替换在线 JS、CSS link ([f51279a](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/f51279a59620d11ba1fd2acaadd7d23aafd8e74a))
- 🚀 自定义首页功能 ([2d64377](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2d64377ea7bff281b63c508314f00baa63571e63))
- 🚀 组件目录重构，减少和外界的耦合性 ([0de96d7](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/0de96d76950e291159406ab5b03cc25ec5658ac8))
- 🚀 组件新增名称来支持调试，组件引入入口统一改为 index 文件 ([4f888ec](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/4f888ecb7a5e192c92befac7203c305fd8a99538))
- 🚀 auto-frontmatter 插件获取文件名时支持去掉序号 ([b1e79e6](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/b1e79e6a9a35d855a254eeebb68de7c692611aea))
- 🚀 banner 描述添加渐变样式文件，banner feature 添加鼠标悬停样式，banner 图片添加背景 fix 样式 ([9c7fb7f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/9c7fb7ff46755811f6dc66a4e0046c1678fe8875))
- 🚀 banner 新增配置项，优化部分样式，封装 useSwitchImage hooks 支持图片定时切换 ([2293997](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/22939978578a184fe13f0ff9f5458c3baf02539b))
- 🚀 banner feature 兼容移动端 ([1706b8e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/1706b8e3bddb0c90837675994006d34bd34df56c))
- 🚀 configProvider 添加函数注释 ([0d9795f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/0d9795f0620b8d990432bffb36bfc86c73f1f1e1))
- 🚀 eP 的面包屑和 Icon 组件换为自定义组件 ([aae12db](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/aae12db494955c04020e85fc8ac46bef164d7edd))
- 🚀 footer 的 massage 配置项分为 topMessage 和 bottomMessage 配置项，优化部分样式 ([9e061c8](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/9e061c8b73e0d10dd9b36fd30f184209c9539723))
- 🚀 md 插件类型添加命名空间，样式移到 base scss 文件 ([78efe02](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/78efe028735a0b2be188ef97f18747c46370e740))
- 🚀 mdH1 插件 1.0.1 发布 ([6187cef](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/6187cef4cc5cb3800ac2072c6771ca45803a79eb))
- 🚀 mdH1 插件针对 MD 文件特殊格式的兼容 ([dea2f31](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/dea2f319241b4a4a0224f7ee9a24796a1b674543))
- 🚀 mdH1 插件重构逻辑，修复 ignoreList 配置项失效问题 ([fc49afe](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/fc49afe3c6802706436ac78787110ec1c89ad14f))
- 🚀 mdH1 支持没有标题的 Markdown 文件 ([cb751e0](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/cb751e0f2adbc8980f0896cbe78e7514cefb4242))
- 🚀 permalink 插件发版 ([f5e1b84](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/f5e1b848bb1fc2bebefe3aded5aff0bb6e6ff1d1))
- 🚀 permalink 内置的 push 函数改为 to ([ed966c6](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/ed966c6af5515d013c7538425e110d2410e0aa00))
- 🚀 permalinks 采用 vite 服务器中间件来解决切换 url 有 404 页面出现问题，优化插件代码，新增测试文档 ([0f3a52c](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/0f3a52c142761c24caa4d5aff46b276078d767e9))
- 🚀 post 部分配置移到 article，article 新增在文章页运行自定义文章信息到指定 DOM 位置 ([29275ab](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/29275ab44a9babc5c9336c2b263ed00838d6a010))
- 🚀 post 封面图 large 改为 full，支持鼠标悬停放大 ([d064b35](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/d064b35918180c30caec348585f407c4f143d293))
- 🚀 post 列表采用 js 驱动 html，提高阅读性，封面模式为 large 时，支持新样式 ([ba5ffc6](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/ba5ffc6ab60852b5562e00485c3868b2e339f66b))
- 🚀 post 相关数据兼容多语言配置，优化插件代码，修复部分插件逻辑问题 ([b496fdd](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/b496fdd39e1e476d2fa68f3ab21569924bef936c))
- 🚀 rewrite 支持导航栏的 permalink ([cd03e34](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/cd03e341433daf1a7dc79ed808449abc9c1f0ec4))
- 🚀 teeker 改为 teek ([dfdcf4a](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/dfdcf4ab7091352f3f2ca9125a4733d9f6642464))
- 🚀 template 使用 bem 规范 class ([0ef0207](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/0ef020749335498e2578e8827378287fed988e71))
- 🚀 tODO 代码逻辑优化，提高健壮性，其他 MD 插件代码格式优化 ([0d989b5](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/0d989b5b0b0ba8f0db758e5f636aa053cdbae0be))
- 🚀 usePermalinks 重命名为 usePermalink ([b95a612](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/b95a6129d2e46e803dc94228e1a9d8cd164efaa2))
- 🚀 vitepress-plugin-auto-frontmatter 插件第一次发版，其他插件文档更新后发版 ([e2ef8ef](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e2ef8ef0af0f07877d328533d9935c1aa9a0334c))
- 🚀 vitepress-plugin-auto-frontmatter 新增使用文档，优化其他插件文件 ([c876d6f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/c876d6f5bb8bd98fb3ab14030684425875c194ac))
- 冲突解决 ([23d6052](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/23d605245cdb02105e3aa73885d24f92ffde3a65))
- demo网站风格新增 时间线 和 五彩纸屑 功能(将五彩纸屑功能从首页移到测试文档里，更加简约一点) ([db8e6d3](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/db8e6d3cc319b84abe6d14629988bafee5577226))
- �新增 运行后自动打开网页 功能 & 新增 回到顶部提示 功能 ([522b2e7](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/522b2e7fe17c8d454a9cd50113903cc083b3eb31))

### Bug Fixes

- 🐞 部分颜色由固定转为 var ([f43381f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/f43381fe5d525132b6a59eadb80e8463ebd635fd))
- 🐞 代码格式调整，修复 banner partImg 的 mask 失效问题，修复 docs 代码块背景色不兼容暗黑模式问题 ([fbecd85](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/fbecd854844ebb4f5f8eb752c230bfba08f4139a))
- 🐞 代码格式优化，优化部分性能 ([3a33bd9](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/3a33bd98a722efcccfb53c8f4628ea38cd291a1e))
- 🐞 分页样式修复 ([7485b7f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/7485b7f60c7707ce9b748a3f6fe1e5c1758c0126))
- 🐞 更改配置项 theme 为 style ([263e3c6](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/263e3c6443b187b364d6bc37f107219bb8061d28))
- 🐞 归档页修复 markdown 写法的样式问题 ([ba61d5f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/ba61d5f413e33094e70f317b582147896182d7c4))
- 🐞 解决终端打印 Scss 的废弃警告 ([276eaed](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/276eaeda80e7935d1aa7d44d6a26cf51acbbb50c))
- 🐞 去除 RouteLink 组件，修复跳转链接异常问题，修复代码格式 ([3395bb9](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/3395bb9cd478693dac14b2e3e5db441f40545c9f))
- 🐞 删除不需要的引用，公告组件和评论组件去掉 render 配置项，仅支持插槽传入自定义内容 ([805de14](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/805de140fe3fcc5cd16211a2e8882247c066b817))
- 🐞 删除不需要的引用，修复 ts 报红代码 ([6d5d689](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/6d5d689e81b5c03c63d09d06905d211a27b07926))
- 🐞 删除没有用的 async，添加外部依赖 ([a64b536](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/a64b5364aa504b9abbc16cc9ce5cfe041011b743))
- 🐞 首页导航栏背景色全白修复 ([7287a44](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/7287a4440dec3d4c0066db3386fbd03ea8aeee3a))
- 🐞 完善 permalinks 跳转功能。优化部分问题 ([815ba43](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/815ba43fd4cbc9a7d97f94800e9099ba1a0bb46a))
- 🐞 修复 artalk 评论区失效问题，Banner 大图添加 imgWaves 配置项来决定是否显示波浪线 ([5b4d784](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/5b4d7847ad6c59d3aafcf549682347ab70703a53))
- 🐞 修复 banner 大图监听滚轮事件失效问题 ([8c06725](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/8c06725c0643aec2c0fadf4c1dc9963cf6222771))
- 🐞 修复 banner 描述的背景模糊样式失效问题 ([a045e57](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/a045e57cd8433555977506f0126a2c1c027a0b04))
- 🐞 修复 fronmatter 关闭评论区失效问题，修复 artalk 初始化深色、浅色失败问题 ([054641f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/054641fc0f8a08434d92a8f1712f3ed42de014d0))
- 🐞 修复 frontmatter 不及时更新问题 ([2d20b5f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2d20b5f747f47b731877c1d7fba670868f849bc3))
- 🐞 修复 mdH1 插件在部分 markdown 中一级标题没有渲染成功问题 ([36f6fb4](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/36f6fb4381130507022cd6dfba713ac315e6f1b3))
- 🐞 修复 more 注释开启文章摘要功能失效问题 ([2743330](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/27433309fb5ed280580d0cadd86d54a0a54a01dc))
- 🐞 修复 nav 子级的默认 activeMatch 失效问题 ([293c57e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/293c57ec7b91478d3359d2f0b31ce569919b1864))
- 🐞 修复 permalink 的 usePernalinks 引用路径 TS 无法识别问题 ([1936f6c](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/1936f6c3bd3599dc7728449d494e0b51b8937f1b))
- 🐞 修复 postItem class 命名不规范问题 ([6faddeb](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/6faddeb04bcd57fcfc2bb7282de82bb2355df43c))
- 🐞 修复 TS 引用报红问题 ([6d5c6f3](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/6d5c6f3809d0c64dc9130feaf3bd11cf5b7ec8e8))
- 🐞 修复 ts 语法报错的代码，侧边栏插件提示优化，添加 [@fragment](https://github.com/fragment) 目录的 md 文档不会计入侧边栏 ([7d8bbe6](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/7d8bbe60a1da471001f24fadda39674169eb9096))
- 🐞 修复部分 TS 检验问题 ([e5ee649](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e5ee649a233e3ed86ee7e5ca2bd2fb2400931da2))
- 🐞 修复部分插件问题，优化代码格式，优化目录 ([03dc9c8](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/03dc9c8e7dc3f38dbb4dc0851e9ffc39585510c8))
- 🐞 修复部分超链接失效问题 ([b8e8a0c](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/b8e8a0c912420036ca0c3d9bfbc7770334a47aad))
- 🐞 修复部分代码逻辑、样式等问题，升级 vitepress 依赖，优化归档页的数据排序问题 ([844aecd](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/844aecd82a784f74eb150eefb2571d3e37807588))
- 🐞 修复插槽名不正确问题，添加各个 props 的注释说明 ([0664bc8](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/0664bc84ffddccc9ad9ad87c3ad8680e93db04f5))
- 🐞 修复打包报错问题 ([f515b17](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/f515b170c845de1935e285300c8de7f94a9b7a4e))
- 🐞 修复打包类型错误问题 ([8724eed](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/8724eedbeba93a1353082c72887d0a402ba55552))
- 🐞 修复打包失效问题 ([f6b7431](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/f6b74312424ee91048ff8ecf7ef4dc19a91f8bf5))
- 🐞 修复代码块配置项 codeBlock 失效问题 ([8a3cb45](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/8a3cb45416a40c366a7b6705841313363a4041a7))
- 🐞 修复非 Git 环境下，启动失败问题 ([a4f12b2](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/a4f12b252b6ab70e3150c2f42892baabbbc9c857))
- 🐞 修复分类和标签不显示在首页，修复首页卡片禁用配置项失效问题 ([f2805ce](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/f2805cea9af8ce35ee8c1dcebcedb58a58665871))
- 🐞 修复分类和标签来回切换 post 数据异常问题 ([e9618a8](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e9618a81a5f9315fdd4efbf086ea8f7464fe829f))
- 🐞 修复分页后刷新页面，恢复第一页问题 ([2c15cb8](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2c15cb8b54b5e53ce4b6b861a2bc580e586737b3))
- 🐞 修复分页失效问题，修复分类页和标签页卡片数据问题，修复分页动画生硬问题 ([40d001e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/40d001e826d641a67147e27a8d4eed0c3a94718a))
- 🐞 修复控制台警告 ([d9c1a7f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/d9c1a7f105feddcec38034c75cf30d1e4415454a))
- 🐞 修复目录页样式失效问题 ([6b0161d](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/6b0161dc9c15e4d639f872f9a113d4bea9035607))
- 🐞 修复评论区快速滚动失效问题，修复代码块组件的 TS 报红问题 ([c76dd44](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/c76dd44a8b2d6452b161966e0b599df742809657))
- 🐞 修复切换页面时，fronmatter 不及时更新问题 ([da422c3](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/da422c3d32abb1334e619d51e691a4ab24c66f13))
- 🐞 修复刷新页面 404 问题，permalink 插件发布新版 ([6778106](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/6778106a75ef5ad7e928427f2a78b292c9ed2403))
- 🐞 修复跳转 404 页面一闪而过问题，优化不蒜子函数，修复部分样式失效问题 ([fa9cc95](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/fa9cc95e6e1b1674a91e15e161a655aeebfc2dda))
- 🐞 修复新版代码块复制失败问题 ([25f897f](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/25f897f1c50bdd0a97d3d5925f57c198a89202b7))
- 🐞 修复样式 ([0b27a91](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/0b27a918f63303b1e8d67eb9415be0e6aef76480))
- 🐞 修复友链上下滚动的动画割裂问题，滚动 hooks 文件重命名，部分定时方法重命名带有 auto，修复首页卡片样式，优化配置项读写位置、名字、默认值 ([f3c01d7](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/f3c01d70891c22bae523a05fb45c97aa7f508ff5))
- 🐞 修复站点信息在切换多语言时，数据不更新问题 ([c19a332](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/c19a332a75ad0ca1d1029edc68062f611bff233e))
- 🐞 样式修复 ([e9b5d77](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e9b5d7704f7093c390fc0c82a405f4628c1a6f97))
- 🐞 优化目录结构，优化计算 sidebar 逻辑 ([e975a00](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e975a0028e897975a2d67439dcda60f73a6baa2e))
- 🐞 站点信息配置项重命名 ([c384043](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/c3840436023adac49c5993b2fb6316f6b13afbb6))
- 🐞 busuanzi 插件修复路由切换后不重新获取请求问题，添加路由回调使用说明 ([bd2b185](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/bd2b18552a9cc08bbb6ec62fdf956f89dd4766a1))
- 🐞 permalink 引用格式修改 ([27ae319](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/27ae31951618886e867350bb74d5d36a7142b3e5))
- 🐞 tk 命名修复 ([26c85f4](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/26c85f46218d264ba5e192aa8ebaf74c6fb1f6ab))
- 🐞 vitepress-plugin-auto-frontmatter 插件修复 exclude 和 include 配置失效问题 ([2adc9fe](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2adc9fe2883f7ecd0f7844cf7f147cb3894a0300))

### Code Refactoring

- ♻️ 删除不需要的方法 ([e8716f0](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/e8716f080f7ab9b2d23528deca7a01cf6d425bd2))
- ♻️ 重构 Banner 样式，兼容 Banner 全屏图片动画效果 ([379ba88](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/379ba8807df4e8295933996beee53543f34d2577))
- ♻️ env.d.ts 位置迁移 ([5a74ce2](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/5a74ce245949965b8f182a476540c451b82be1e3))

### Styling

- 🎨 变量命名优化，注释优化 ([667bc75](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/667bc75cd32eaca12afd521fbbaabb85f386f34d))
- 🎨 部分文件格式优化 ([904114e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/904114ef322117dad12edbbf492d85067e6052ef))
- 🎨 处理 pr ([8c31b0e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/8c31b0e0d53724ecffadef5c043f6e166f067829))
- 🎨 代码格式优化 ([0eab9df](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/0eab9dfd4443f295deb890ef2151506329f90c75))
- 🎨 切换评论区 ([9de59c4](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/9de59c4691a1c6d9a762ff62ababc9ad0261acf9))
- 🎨 删除空文件 ([88aae97](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/88aae9780ca34937d8c5c548ac6cc58876de7d85))
- 🎨 数组优化 ([1f3780b](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/1f3780ba2b570ed72edd9bea64204097ff4e2994))
- 🎨 添加 thpe 修饰类型引入 ([82c020a](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/82c020aa45c5cf91f381694697faeddadf8cb7f2))
- 🎨 添加注释 ([be5d841](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/be5d84186ff2b8d79537d18ee56b91ed5c26551c))
- 🎨 添加注释说明 ([6ea77c2](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/6ea77c2821df4be11360a53f40b236298e7cc5e5))
- 🎨 添加注释说明 ([119fa90](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/119fa9027ceaedf1c9dcc511ac24ef399ee35ff6))
- 🎨 修改部分包不发布 npm ([3b6b38b](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/3b6b38b0d39174abf8fbd9f3ff854a5b266b6544))
- 🎨 样式 var 命名优化 ([25deea3](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/25deea3a8786b68cc6eb23bf3b1e9273cbf5680e))
- 🎨 优化部分代码格式，命名 ([ea1bbe2](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/ea1bbe2e78b8b50485e1581675dd09819ed9504c))
- 🎨 优化代码格式 ([2e41b11](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2e41b110d6889b3513fcf80deb9021269dda9038))
- 🎨 优化配置项命名和位置 ([71ee3b9](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/71ee3b9a33106f4d3dcd0eb8d51466ba605f6076))
- 🎨 优化注释 ([60d83e1](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/60d83e1a09c7760ed66a68b7be05c007aa732d4e))
- 🎨 注释优化 ([843af1c](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/843af1c6a2a6040c2394394910bfef72ac7e4ffc))
- 🎨 hooks 代码格式优化 ([8d6ae38](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/8d6ae38f651abf29c30546130cdfc4dd37349a03))

### Docs

- 📚 更新 index.md ([bc6b210](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/bc6b21088caf476ce5d696e7cc20da3a56ce286d))
- 📚 更新文档 ([8215330](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/8215330806a24bef0ab86001628cb01fa5849382))
- 📚 类型添加注释，文档添加说明 ([77d2505](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/77d25056fc0952fdc6555718251d8868bd73d750))
- 📚 内容更新 ([50c98c8](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/50c98c818bec60b2768261b5d6bc991f1bd8bd7d))
- 📚 使用文档更新 ([2d2af47](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2d2af47bbfae6eceb2fcc27476abab14d6aa7a86))
- 📚 添加文档说明 ([25ce00e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/25ce00ee8deb313833ee1fffaa45b968ce5f380f))
- 📚 文档更新 ([37f4563](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/37f4563de57d7dfeb38e3e284cad9c3f55cb372d))
- 📚 文档更新 ([049af4a](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/049af4ae4967b0ca0e4147bdd760ab356fdd62d6))
- 📚 文档更新 ([10d5030](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/10d5030f455a215ef3f96dae63294ce5ee7c8b26))
- 📚 文档内容更新 ([2c47269](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/2c4726983f3f30b3508a0dda5f392522381ae3f3))
- 📚 优化文档内容 ([62a0553](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/62a05538540b2a04bcd00c959e25bfcdef537df6))
- 📚 优化文档内容 ([c9a4aff](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/c9a4aff27bff91699b42ca5e060bf858e3203881))
- 📚 git 链接更新 ([aa4643e](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/aa4643e2e47f501708dbef3521f19435f29506f3))
- 📚 rEADME 内容更新 ([48f9891](https://github.com/Kele-Bingtang/vitepress-theme-teek/commit/48f98913e2be5366c99513b8ea27e8ae6f37c507))
