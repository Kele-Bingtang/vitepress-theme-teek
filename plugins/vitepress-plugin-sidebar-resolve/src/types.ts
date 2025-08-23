import type { DefaultTheme } from "vitepress";

export interface SidebarOption {
  /**
   * 生成侧边栏时，忽略的文件/文件夹列表，支持正则表达式
   *
   * @default []
   */
  ignoreList?: Array<RegExp | string>;
  /**
   * 文章所在的目录，基于 .vitepress 目录层级添加，开头不需要有 /
   *
   * @default 'vitepress 的 srcDir 配置项'
   */
  path?: string;
  /**
   * 生成的侧边栏数据类型，object 为对象，支持多侧边栏，array 为数组，所有文件都生成一个侧边栏
   *
   * @default 'object'
   */
  type?: "object" | "array";
  /**
   * 是否忽略每个目录下的 index.md 文件
   *
   * @default false
   */
  ignoreIndexMd?: boolean;
  /**
   * 是否扫描根目录下的 md 文件作为 sidebar，如果为 true，则扫描根目录下的 md 文件作为 sidebar，且忽略根目录下的 index.md
   *
   * @default true
   */
  scannerRootMd?: boolean;
  /**
   * 当 type 为 array 且 scannerRootMd 为 true 时，指定侧边栏根目录标题名称
   *
   * @default 'Root'
   */
  rootTitle?: string;
  /**
   * 是否初始化第一层 items
   *
   * 假设根目录下有目录名为 guide：
   * 1、当 initItems 为 true，则最终结果为 sidebar: { "/guide": { items: [], collapsed }}
   * 2、当 initItems 为 false，则最终结果为 sidebar: { "/guide": [] }
   *
   * @default true
   */
  initItems?: boolean;
  /**
   * 是否初始化第一层 items 的 text 为当前目录名。当 initItems 为 true 时生效
   *
   * 假设根目录下有目录名为 guide，且 initItems 为 true：
   * 1、当 initItemsText 为 true，则最终结果为 sidebar: { "/guide": { text: "guide", items: [], collapsed }}
   * 2、当 initItemsText 为 false，则最终结果为 sidebar: { "/guide": { items: [] }}
   *
   * @default false
   */
  initItemsText?: boolean;
  /**
   * 是否默认折叠侧边栏，可以是 boolean 或者一个函数
   *
   * 函数的 2 个参数为：
   * 1、当前文件的相对路径（基于根目录）
   * 2、侧边栏的 text
   *
   * @default undefined
   */
  collapsed?: boolean | ((relativePath: string, text: string | undefined) => boolean);
  /**
   * 文件名前缀必须以「序号.」开头
   *
   * @default true
   */
  fileIndexPrefix?: boolean;
  /**
   * 是否从 md 文件获取第一个一级标题作为侧边栏 text
   *
   * @default false
   * @remark 侧边栏 text 获取顺序
   * titleFormMd 为 true：md 文件 frontmatter.title > [md 文件第一个一级标题] > md 文件名
   * titleFormMd 为 false：md 文件 frontmatter.title > md 文件名
   */
  titleFormMd?: boolean;
  /**
   * 当 VitePress 设置 locales 国际化后，如果将 root 语言（默认语言）的所有文件放到一个单独的目录下，如 zh，则需要将 localeRootDir 设为 zh，否则侧边栏无法知道文件都放到了 zh
   * 如果 root 语言（默认语言）的所有文件放在文档根目录下，则不需要设置 localeRootDir
   *
   * @default 文档根目录
   */
  localeRootDir?: string;
  /**
   * 解析完每个 sidebar 后的回调。每个 sidebar 指的是 SidebarOption.path 目录下的每个子目录
   *
   * @param data 当前 sidebar 列表
   * @default undefined
   */
  sidebarResolved?: (
    data: DefaultTheme.SidebarMulti | DefaultTheme.SidebarItem[]
  ) => DefaultTheme.SidebarMulti | DefaultTheme.SidebarItem[];
  /**
   * 解析完每个 sidebarItem 后的回调。每个 sidebarItem 指的是每个目录下的文件数组
   *
   * @param data 当前 sidebarItem 列表
   * @default undefined
   */
  sidebarItemsResolved?: (data: DefaultTheme.SidebarMulti | DefaultTheme.SidebarItem[]) => DefaultTheme.SidebarItem[];
  /**
   * 创建 sidebarItem 之前的回调。每个 sidebarItem 指的是每个目录下的文件数组
   *
   * @param data 将要解析的所有文件名
   * @default undefined
   * @remark 可以过滤掉不需要解析为 sidebarItem 的文件
   */
  beforeCreateSidebarItems?: (data: string[] | DirectoryStructure) => string[];
  /**
   * Markdown 文件创建或者删除时，是否重启 VitePress 服务
   *
   * @default false
   */
  restart?: boolean;
  /**
   * 忽略插件在构建侧边栏时生成的警告信息
   *
   * @default false
   */
  ignoreWarn?: boolean;
  /**
   * 是否开启侧边栏排序功能，可以在 frontmatter.sidebarSort 对本文件进行排序，越低的越靠前
   *
   * 如果只通过文件名添加前缀序号进行排序，则建议关掉该配置，因为该配置开启后，会读取每一个文件的 frontmatter.sidebarSort，耗费些许时间
   *
   * @default true
   */
  sort?: boolean;
  /**
   * 没有指定 frontmatter.sidebarSort 时的默认值，用于侧边栏排序
   *
   * @default 9999
   */
  defaultSortNum?: number;
  /**
   * 是否用文件名的前缀序号作为其侧边栏 Item 的排序序号。如果为 true，当文件名存在序号前缀，则使用序号前缀，否则使用 defaultSortNum
   *
   * @default false
   */
  sortNumFromFileName?: boolean;
  /**
   * 自定义序号后的分隔符（默认仍然支持 . 作为分隔符，该配置是支持额外分隔符，如自定义分隔符为 _，则文件名 01.a.md 和 01_a.md 都生效）
   */
  indexSeparator?: string;
  /**
   * 自定义标题前缀内容，参数 prefix 为 frontmatter.sidebarPrefix 传入
   */
  prefixTransform?: (prefix: string) => string;
  /**
   * 自定义标题后缀内容，参数 suffix 为 frontmatter.sidebarSuffix 传入
   */
  suffixTransform?: (suffix: string) => string;
  /**
   * 解析过则，filePath 则基于文件路径解析，rewrites 则基于 VitePress 的 rewrites 配置解析，如果 resolveRule 为 rewrites 但是 rewrites 为空，则走 filePath 规则
   *
   * @default 'filePath'
   */
  resolveRule?: "filePath" | "rewrites";
  /**
   * 是否校验每个目录下的 rewrites 前缀是否一致，仅当 ignoreWarn 为 true 生效
   *
   * @default false
   */
  checkRewritesPrefix?: boolean;
}

export interface DirectoryStructure {
  [key: string]: DirectoryStructure | string;
}
