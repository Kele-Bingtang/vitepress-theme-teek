# vitepress-theme-teek

在线主题文档：[Teek](http://vp.teek.top/)。

## 使用

项目拉取

```bash
git clone https://github.com/Kele-Bingtang/vitepress-theme-teek.git
```

依赖安装（只能用 pnpm 安装依赖）

```bash
pnpm install
```

引用包构建

```bash
pnpm to:theme stub
```

## 项目启动

文档项目启动

```bash
pnpm docs:dev
```

Demo 项目启动（三选一）

```bash
# 基本文档 Demo
pnpm demo:base dev
# 国际化文档 Demo（默认语言的文档放到根目录下）
pnpm demo:locales dev
# 国际化文档 Demo（默认语言的文档放到指定目录下）
pnpm demo:localesRoot dev
```

如果项目启动失败，则执行如下命令后再启动：

```base
pnpm plugin:build
```

## TODO

- 组件生态文档编写
- 背景色支持
- 部分组件的 var 变量是否添加到命名空间内而不是 root？
- MD 文档添加/删除自动重启项目
- hooks 引用 @teek 改为 相对路径？
- 归档页添加 commit 图标风格，如：`http://niubin.site/archive.html`
