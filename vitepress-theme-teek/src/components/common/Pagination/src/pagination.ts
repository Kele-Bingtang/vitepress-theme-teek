import type { ComputedRef, InjectionKey, ModelRef } from "vue";
import type { TkIconProps } from "@teek/components/common/Icon";

export interface PaginationContext {
  currentPage?: ModelRef<number>;
  pageCount?: ComputedRef<number>;
  disabled?: ComputedRef<boolean>;
  changeEvent?: (val: number) => void;
  handleSizeChange?: (val: number) => void;
}

export const paginationKey: InjectionKey<PaginationContext> = Symbol("paginationKey");

export type LayoutKey = "prev" | "pager" | "next" | "jumper" | "->" | "total" | "slot";

export type Size = "" | "default" | "small" | "large";

export interface PaginationProps {
  /**
   * 总条目数
   */
  total?: number;
  /**
   * 总页数，与 total 二选一
   */
  pageCount?: number;
  /**
   * 设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠
   *
   * @default 7
   */
  pagerCount?: number;
  /**
   * 组件布局，子组件名用逗号分隔
   *
   * @default 'prev, pager, next, jumper, ->, total'
   */
  layout?: string;
  /**
   * 替代图标显示的上一页文字
   */
  prevText?: string;
  /**
   * 上一页的图标， 比 prev-text 优先级更高
   */
  prevIcon?: TkIconProps["icon"];
  /**
   * 替代图标显示的下一页文字
   */
  nextText?: string;
  /**
   * 下一页的图标， 比 next-text 优先级更高
   */
  nextIcon?: TkIconProps["icon"];
  /**
   * 分页大小
   *
   * @default 'default'
   */
  size?: Size;
  /**
   * 是否为分页按钮添加背景色
   *
   * @default false
   */
  background?: boolean;
  /**
   * 是否禁用
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * 只有一页时是否隐藏
   *
   * @default false
   */
  hideOnSinglePage?: boolean;
}

export interface PaginationEmits {
  "size-change": [value: number];
  change: [currentPage: number, pageSize: number];
  "current-change": [value: number];
  "prev-click": [value: number];
  "next-click": [value: number];
}
