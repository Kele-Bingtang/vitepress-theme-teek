## Master 同步代码

该分支为 1.0.x，其架构与 master 已不一样，如果需要跟新为最新的 master 代码，需要进行如下操作：

组件同步（记得备份）：

1. 将 master 的 `packages` 下的 `components` 目录替换到该分支的 `vitepress-theme-teek` 目录的 `components`
2. 将 `components/theme` 目录下的 `ConfigProvider` 文件夹删除
3. 全局搜索 `@teek/static`，替换为 `@teek/assets`，或者将 `vitepress-theme-teek` 下的 `assets` 改名为 `static`
4. 全局搜索 `@teek/components/theme/ConfigProvider`，替换为 `@teek/ConfigProvider`
5. 全局搜索 `@teek/theme-chalk`，替换为 `@vitepress-theme-teek/theme-chalk`
