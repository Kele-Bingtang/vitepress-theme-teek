import type Total from "./total.vue";

export interface PaginationTotalProps {
  /**
   * 总条目数
   */
  total: number;
}

export type PaginationTotalInstance = InstanceType<typeof Total>;
