import type { InjectionKey } from "vue";

export interface BreadcrumbProps {
  /**
   * 分隔符
   *
   * @default '/'
   */
  separator?: string;
}

export const breadcrumbKey: InjectionKey<BreadcrumbProps> = Symbol("breadcrumbKey");
