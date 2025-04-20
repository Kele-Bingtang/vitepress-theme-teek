export type CommentConfig<T extends keyof CommentProvider = ""> = {
  /**
   * 评论区提供者
   * twikoo 官网：https://twikoo.js.org/
   * waline 官网：https://waline.js.org/
   * giscus 官网：https://giscus.app/zh-CN
   * artalk 官网：https://artalk.js.org/
   * render 需要自定义评论区组件，并通过 comment 插槽传入
   */
  provider: T;
  /**
   * 评论区配置项，根据 provider 不同而不同，具体看对应官网的使用介绍
   */
  options?: CommentProvider[T];
};

export type CommentProvider = {
  "": object;
  /**
   * twikoo 评论区配置项
   */
  twikoo: {
    /**
     * 官网其他配置项
     */
    [key: string]: any;
    envId: string;
    /**
     * twikoo.js 在线链接
     * @default 'https://gcore.jsdelivr.net/npm/twikoo@{version}/dist/twikoo.min.js'
     */
    link?: string;
    /**
     * twikoo 版本号，不定期更新为最新版
     *
     * @default '1.6.41'
     */
    version?: string;
    /**
     * 页面渲染后多少毫秒开始渲染 twikoo，如果设置太短，可能获取的 DOM 还没加载完成
     *
     * @default 700 (0.7秒)
     */
    timeout?: number;
    /**
     * katex 配置项，如果设置，则加载 katex
     */
    katex?: {
      /**
       * katex 的 css、core、render 的在线链接
       */
      cssLink: string;
      coreJsLink: string;
      renderJsLink: string;
      /**
       * katex 的 css、core、render 的 integrity
       */
      cssIntegrity?: string;
      coreJsIntegrity?: string;
      renderJsIntegrity?: string;
    };
  };
  /**
   * waline 评论区配置项
   */
  waline: {
    /**
     * 官网其他配置项
     */
    [key: string]: any;
    /**
     * waline 后台服务器地址
     */
    serverURL?: string;
    /**
     * waline.js 在线链接
     */
    jsLink?: string;
    /**
     * waline.css 在线链接
     */
    cssLink?: string;
    /**
     * waline.css 的 integrity
     */
    cssIntegrity?: string;
    /**
     * 暗黑模式，具体使用请看 waline 官网
     *
     * @default "html[class='dark']"
     */
    dark?: string;
  };
  /**
   * giscus 评论区配置项
   */
  giscus: {
    [key: string]: any;
    repo: `${string}/${string}`;
    repoId: string;
    category: string;
    categoryId: string;
    mapping?: "url" | "title" | "og:title" | "specific" | "number" | "pathname";
    strict?: "0" | "1";
    reactionsEnabled?: "0" | "1";
    emitMetadata?: "0" | "1";
    inputPosition?: "top" | "bottom";
    lang?: string;
    theme?: string;
    loading?: "lazy" | "eager";
    /**
     * 是否使用在线链接，如果不打算安装依赖，则设为 true
     *
     * @default false
     */
    useOnline?: boolean;
    /**
     * giscus.js 在线链接，useOnline 为 true 时生效
     *
     * @default 'https://giscus.app/client.js'
     */
    link?: string;
    /**
     * giscus.js 的 integrity
     */
    integrity?: string;
  };
  /**
   * artalk 评论区配置项
   */
  artalk: {
    [key: string]: any;
    /**
     * artalk 后台服务器地址
     */
    server?: string;
    /**
     * artalk 站点名称
     */
    site?: string;
  };
  /**
   * 自定义评论组件
   */
  render: Record<string, any>;
};
