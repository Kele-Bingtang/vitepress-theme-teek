export interface DemoCodeProps {
  /**
   * 经过 md 转为 HTML 的源码
   */
  source: string;
  /**
   * 源码
   */
  rawSource: string;
  /**
   * 源码文件路径，基于 .vitepress 目录层级添加
   */
  path: string;
  /**
   * 描述
   */
  description: string;
  /**
   * 配置项
   */
  demo: string;
}
