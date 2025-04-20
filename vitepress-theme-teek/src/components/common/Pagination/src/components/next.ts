import type Next from "./next.vue";
import type { TkIconProps } from "@teek/components/common/Icon";

export interface PaginationNextProps {
  /**
   * 是否禁用
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * 当前页码
   *
   * @default 1
   */
  currentPage?: number;
  /**
   * 总页数
   */
  pageCount?: number;
  /**
   * 下一页按钮文本
   */
  nextText?: string;
  /**
   * 下一页按钮图标
   */
  nextIcon?: TkIconProps["icon"];
}

export type PaginationNextInstance = InstanceType<typeof Next>;
