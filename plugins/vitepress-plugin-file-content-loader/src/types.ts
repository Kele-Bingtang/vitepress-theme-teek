import type { GlobOptions } from "tinyglobby";

export interface FileContentLoaderOptions<T = FileContentLoaderData, R = FileContentLoaderData[]> {
  /**
   * 扫描的文件路径表达式，为 global 表达式
   */
  pattern: string | string[];
  /**
   * 是否获取文件的源内容，并放到在数据中
   *
   * @default false
   */
  includeSrc?: boolean;

  /**
   * 是否将 src 转换为 HTML 并放到在数据中
   *
   * @default false
   * @remark 不需要转换为 HTML 时，不要将 render 设为 true，否则内容过大导致容易内存溢出
   */
  render?: boolean;

  /**
   * If `boolean`, whether to parse and include excerpt? (rendered as HTML)
   *
   * If `function`, control how the excerpt is extracted from the content.
   *
   * If `string`, define a custom separator to be used for extracting the
   * excerpt. Default separator is `---` if `excerpt` is `true`.
   *
   * @see https://github.com/jonschlinkert/gray-matter#optionsexcerpt
   * @see https://github.com/jonschlinkert/gray-matter#optionsexcerpt_separator
   *
   * @default false
   */
  excerpt?:
    | boolean
    | ((
        file: {
          data: { [key: string]: any };
          content: string;
          excerpt?: string;
        },
        options?: any
      ) => void)
    | string;

  /**
   * 转换处理好的单条数据，并返回转换后的数据
   *
   * @remark 在返回转换后的数据时，建议不要返回 src 和 html，尤其是 html，容易数据过大导致容易内存溢出。src 和 html 分别是设置 includeSrc 和 render 为 true 时放入 data 中
   */
  transformData?: (data: FileContentLoaderData) => T | Promise<T>;
  /**
   * 转换处理好的所有数据，并返回转换后的数据
   *
   * @remark 在返回转换后的数据时，建议不要返回 src 和 html，尤其是 html，容易数据过大导致容易内存溢出。src 和 html 分别是设置 includeSrc 和 render 为 true 时放入 data 中
   */
  transformRaw?: (raw: (FileContentLoaderData | Awaited<T>)[]) => R | Promise<R>;
  /**
   * tinyglobby 的配置项
   * 插件默认已经忽略 node_modules 和 dist 目录的所有文件
   */
  globOptions?: GlobOptions;
  /**
   * 指定 themeConfig 的一个不存在的 key，将处理/转换的数据挂在到该 key 下
   *
   * @default contentLoader
   * @remark 如果没有传入 themeConfigKey，则可以通过 themeConfig.contentLoader 获取处理/转换的数据
   */
  themeConfigKey?: string;
}

export interface FileContentLoaderData {
  /**
   * 文件的访问 url
   */
  url: string;
  /**
   * 文件相对路径
   */
  relativePath: string;
  /**
   * 文件的源内容
   */
  src?: string;
  /**
   * src 转换后的 html
   */
  html?: string;
  /**
   * 文件的 frontmatter 数据
   */
  frontmatter: Record<string, any>;
  /**
   * 文件摘要格式
   */
  excerpt?: string;
}
