import type { Size } from "../pagination";
import type Jumper from "./jumper.vue";

export interface PaginationJumperProps {
  /**
   * 分页大小
   *
   * @default 'default'
   */
  size?: Size;
}

export type PaginationJumperInstance = InstanceType<typeof Jumper>;
