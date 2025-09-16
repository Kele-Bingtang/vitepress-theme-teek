import type { PermalinkOption } from "vitepress-plugin-permalink";
import type { SidebarOption } from "vitepress-plugin-sidebar-resolve";
import type { CatalogueOption } from "vitepress-plugin-catalogue";
import type { MdH1Option } from "vitepress-plugin-md-h1";
import type { DocAnalysisOption } from "vitepress-plugin-doc-analysis";
import type { AutoFrontmatterOption } from "vitepress-plugin-auto-frontmatter";

export interface Plugins {
  /**
   * 是否启用 sidebar 插件
   *
   * @default true
   */
  sidebar?: boolean;
  /**
   * sidebar 插件配置项
   */
  sidebarOption?: SidebarOption;
  /**
   * 是否启用 permalink 插件
   *
   * @default true
   */
  permalink?: boolean;
  /**
   * permalinks 插件配置项
   */
  permalinkOption?: PermalinkOption;
  /**
   * 是否启用 mdH1 插件
   *
   * @default true
   */
  mdH1?: boolean;
  /**
   * mdH1 插件配置项
   */
  mdH1Option?: MdH1Option;
  /**
   * catalogues 插件配置项
   */
  catalogueOption?: CatalogueOption;
  /**
   * 是否启用 docAnalysis 插件
   *
   * @default true
   */
  docAnalysis?: boolean;
  /**
   * docAnalysis 插件配置项
   */
  docAnalysisOption?: DocAnalysisOption;
  /**
   * fileContentLoader 插件扫描 markdown 文档时，指定忽略路径，格式为 glob 表达式，如 test/**
   *
   * @default []
   */
  fileContentLoaderIgnore?: string[];
  /**
   * 是否启用 autoFrontmatter 插件
   *
   * @default false
   */
  autoFrontmatter?: boolean;
  /**
   * autoFrontmatter 插件配置项，Teek 中对其进行了增强，拓展了其他配置项
   */
  autoFrontmatterOption?: AutoFrontmatterOptionExtra;
}

/**
 * 扩展后的自定义 AutoFrontmatter 配置接口，继承原始 AutoFrontmatterOption，并添加自定义字段
 */
export interface AutoFrontmatterOptionExtra extends AutoFrontmatterOption {
  /**
   * 是否开启生成永久链接 Permalink
   *
   * @default true
   */
  permalink?: boolean;
  /**
   * 永久链接生成类型，如果不手动设置，则根据 sidebar 插件的 resolveRule 动态切换：resolveRule 为 filePath 则默认为 simple，为 rewrites 则默认为 rules
   *
   * @default sidebarOption.resolveRule 为 filePath 则默认为 simple，为 rewrites 则默认为 rules
   */
  permalinkType?: "simple" | "rules";
  /**
   * 自动生成 permalink 的固定前缀，如 pages、pages/demo，默认为 pages，当 permalink 为 true 且 permalinkType 为 simple 时生效
   *
   * @default 'pages''
   */
  permalinkPrefix?: string;
  /**
   * 处理 permalink 的规则配置，当 permalink 为 true 且 permalinkType 为 rules 时生效
   *
   * @example
   * { folderName: "*"}, // '*' 代表所有文件都生成永久链接，不设置 rule 则默认为 /$path/$uuid6
   * { folderName: "00.Teek", rule: "/teek" } // 添加前缀
   * { folderName: "00.Teek/01.XXX", rule: "/test/tool/$uuid6", removeLevel: 1 } // 先移除一层前缀，再添加前缀，等价于 /tool/$uuid6
   * { folderName: "00.Teek/01.XXX", rule: "/test/$uuid6", removeLevel: 99} // 清空指定层级前缀并添加前缀，前缀使用随机数
   * { folderName: "00.Teek/01.XXX", rule: "/test-$uuid4-$uuid2/aaa/", removeLevel: 99} // 混合固定字符串和随机数
   * { folderName: "00.Teek/01.XXX", rule: "/$path-$uuid2/teek/$uuid", removeLevel: 99 } // 使用一级目录的哈希混合随机数
   */
  permalinkRules?: PermalinkRule[];
  /**
   * 是否开启自动生成 categories，开启时根据文档目录自动生成分类
   *
   * @default true
   */
  categories?: boolean;
  /**
   * 是否自动为无封面图的 Markdown 文档添加随机封面，根据 coverImgList 内容随机选择（coverImgList 为空时无效）
   *
   * @default false
   */
  coverImg?: boolean;
  /**
   * 是否强制重新生成 coverImg 的属性值（coverImgList 为空时无效）
   *
   * @default false
   */
  forceCoverImg?: boolean;
  /**
   * 封面图列表，填写封面图路径，支持本地路径和网络路径
   *
   * @default '[]'
   */
  coverImgList?: string[];
}

/**
 * Permalink 生成规则类型
 */
export interface PermalinkRule {
  /**
   * 文件夹路径或文件名称
   */
  folderName: string;
  /**
   * 当为文件夹路径：前缀匹配
   * 当为文件夹名称：精确匹配
   *
   * @example
   * $UUID{n} 支持 $UUID, $UUID6, $UUID10 等格式，产生 n 位的随机字符串（数字加小写字母）
   * - n 默认 6 位
   * - n 取值 1 - 15之间
   * - 不区分大小写
   *
   * $PATH{n} 支持 $PATH, $PATH6，$PATH10 等格式， 代表一级目录并将其转为为 hash 值
   * - n 默认 6 位
   * - n 取值 6 - 10 之间，低于 6 按 6 处理（防止碰撞）
   * - 不区分大小写
   *
   * @default '/$path6/$uuid6'
   */
  rule?: string;
  /**
   * 要移除的前缀层级（以 / 分割），如 permalink 为 /test/xx 时，removeLevel 为 1，则最终生成的 permalink 为 /xx，当 removeLevel 为 99，则会移除所有层级，只剩根路径
   *
   * @default 0
   */
  removeLevel?: number;
}
