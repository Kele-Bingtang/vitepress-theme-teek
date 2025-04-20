import type { PermalinkOption, NotFoundOption } from "vitepress-plugin-permalink";
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
  permalinkOption?: PermalinkOption & NotFoundOption;
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
   * autoFrontmatter 插件配置项，并拓展出其他配置项
   *
   * permalinkPrefix 为自动生成 permalink 的固定前缀，如 pages、pages/demo，默认为 pages。当禁用 permalink 插件后，不会自动生成 permalink
   * categories 为是否自动生成 categories
   *
   * @default '{ permalinkPrefix: "pages", categories: true }'
   */
  autoFrontmatterOption?: AutoFrontmatterOption & { permalinkPrefix?: string; categories?: boolean };
}
