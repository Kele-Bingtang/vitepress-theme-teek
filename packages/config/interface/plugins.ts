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
   * 是否开启生成永久链接 Permalink，如果开启该功能，但未提供 permalinkRules 规则，则使用默认规则 { folderName: "*", prefix: "/$path/$uuid5" }
   *
   * @default false
   */
  permalink?: boolean;
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
   * 是否开启强制覆盖已存在的封面图（coverImgList 为空时无效）
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
  /**
   * 处理 permalink 的规则配置，permalink 设置为 false 时无效
   * @example
   * { folderName: "00.Teek", prefix: "/teek" } // 添加前缀
   * { folderName: "00.Teek/01.XXX", prefix: "/tool", removeLevel: 1 } // 先移除一层前缀，再添加前缀
   * { folderName: "00.Teek/01.XXX", prefix: "/test/$uuid5", removeLevel: 99} // 清空指定层级前缀并添加前缀，前缀使用随机数
   * { folderName: "00.Teek/01.XXX", prefix: "/test-$uuid4-$uuid2/aaa/", removeLevel: 99} // 混合固定字符串和随机数
   * { folderName: "00.Teek/01.XXX", prefix: "/note", clear: true } // 清空 permalink，此时prefix无效，clear优先级高
   * { folderName: "00.Teek/01.XXX", prefix: "/$path-$uuid2/teek/$uuid", removeLevel: 99 }, // 使用一级目录的哈希混合随机数
   * { folderName: "00.Teek/01.XXX", clear: true} // 清空前缀并且添加前缀使用随机数
   * { folderName: "*", clear: true}, // * 代表所有文件都匹配，清空所有文件的永久链接
   */
  permalinkRules?: TransformRule[];
}

/**
 * Permalink 生成规则类型
 */
export interface TransformRule {
  /**
   * 文件夹路径或文件名称
   */
  folderName: string;
  /**
   * 当为文件夹路径：前缀匹配
   * 当为文件夹名称：精确匹配
   *
   * @example
   * $UUID{n} 支持 $UUID, $UUID5, $UUID10 等格式，产生 n 位的随机字符串（数字加小写字母）
   * - n 默认5位
   * - n 取值[1 - 15]之间
   * - 不区分大小写
   *
   * $PATH{n} 支持 $PATH, $PATH5，$PATH10 等格式， 代表一级目录并将其转为为hash值
   * - n 默认6位
   * - n 取值[6 - 10]之间，低于 6 按 6 处理（防止碰撞）
   * - 不区分大小写
   */
  prefix?: string;
  /**
   * 要移除的前缀层级（以 / 分割），适合移除前缀并添加的场景（可以填写一个很大的数，那么就会全部清空再添加前缀）
   */
  removeLevel?: number;
  /**
   * 是否清空 permalink，适合只想要清空的场景。true 清空，默认 false（此时填写 prefix 无效，clear 优先级高）
   */
  clear?: boolean;
}
