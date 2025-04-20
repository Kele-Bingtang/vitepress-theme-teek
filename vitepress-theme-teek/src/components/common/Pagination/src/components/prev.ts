import type Prev from "./prev.vue";
import type { TkIconProps } from "@teek/components/common/Icon";

export interface PaginationPrevProps {
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
  currentPage: number;
  /**
   * 上一页按钮文本
   */
  prevText?: string;
  /**
   * 上一页按钮图标
   */
  prevIcon?: TkIconProps["icon"];
}

export interface PaginationPrevEmits {
  /**
   * 点击上一页按钮触发
   */
  click: [evt: MouseEvent];
}

export type PaginationPrevInstance = InstanceType<typeof Prev>;
