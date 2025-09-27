import type { UseUvPvOptions } from "@teek/composables/useUvPv";
import type { PartialKey } from "@teek/helper";

export interface DocAnalysis {
  /**
   * 是否启用站点信息卡片
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * 卡片标题
   *
   * @default '${icon}站点信息'
   */
  title?: string | ((icon: string) => string);
  /**
   * 项目创建时间
   */
  createTime?: string;
  /**
   * 是否开启文章页的字数统计
   *
   * @default true
   */
  wordCount?: boolean;
  /**
   * 是否开启文章页的阅读时长统计
   *
   * @default true
   */
  readingTime?: boolean;
  /**
   * 访问量、访客数统计配置
   */
  statistics?: {
    /**
     * 是否开启首页的访问量和排名统计，仅当 provider 存在生效
     *
     * @default true
     */
    siteView?: boolean;
    /**
     * 是否开启文章页的浏览量统计，仅当 provider 存在生效
     *
     * @default true
     */
    pageView?: boolean;
    /**
     * 是否只统计永久链接的浏览量，如果为 false，则统计 VitePress 默认的文档目录链接
     *
     * @default true
     */
    permalink?: boolean;
  } & UseUvPvOptions; // 支持 UseUvPvOptions 的配置项
  /**
   * 自定义现有信息
   * originValue 为计算前的数据，currentValue 为计算后的数据（加单位的数据），针对 lastActiveTime 这些需要判断 N 分、N 时、N 天的 key，originValue 为具体的时间，需要自行计算
   */
  overrideInfo?: (Omit<PartialKey<DocAnalysisInfo, "label">, "value"> & {
    value?: (originValue: string | number, currentValue?: string | number) => string;
  })[];
  /**
   * 自定义额外信息，类型和 overrideInfo 一样
   * @default []
   */
  appendInfo?:
    | (Omit<DocAnalysisInfo, "key"> & { key: string })[]
    | (() => (Omit<DocAnalysisInfo, "key"> & { key: string })[]);
}

export interface DocAnalysisInfo {
  /**
   * 站点信息唯一标识
   */
  key:
    | "totalPosts"
    | "weekAddNum"
    | "monthAddNum"
    | "runtime"
    | "totalWordCount"
    | "lastActiveTime"
    | "viewCount"
    | "visitCount"
    | string;
  /**
   * 站点信息标签
   */
  label: string;
  /**
   * 站点信息值的描述
   */
  value: string;
  /**
   * 是否显示在站点信息
   *
   * @default true
   */
  show?: boolean;
}
