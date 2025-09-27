// props 的参数来源与 Demo Markdown 插件：https://github.com/Kele-Bingtang/vitepress-theme-teek/blob/main/packages/markdown/plugins/demo.ts
// 该插件传参数给 DemoCode 组件时只能是 string 类型，所以下面的类型都是 string，实际在 DemoCode 组件里需要序列化回来

export interface DemoCodeProps {
  /**
   * Markdown 内容转为 HTML 的源码（代码块展示源码内容时需要）
   */
  source: string;
  /**
   * 源码（触发复制按钮时需要复制该内容）
   */
  rawSource: string;
  /**
   * 源码文件路径（读取 path 路径指定的 Vue 文件来渲染效果），基于 .vitepress 目录层级扫描
   *
   * @tip path 路径的文件内容可以不等于 rawSource，场景：页面渲染的效果是一个 Vue 组件，查看源代码并复制是另一个 Vue 组件
   */
  path: string;
  /**
   * 描述
   */
  description: string;
  /**
   * 配置项
   */
  options: string;
  /**
   * 只看组件效果，不显示工具栏和源码查看
   */
  effect: string;
}
