import type { IconProps } from "../../components/common/Icon/src/icon";

export interface FooterGroup {
  /**
   * 分组标题
   */
  title?: string;
  /**
   * 分组前图标
   */
  icon?: IconProps["icon"];
  /**
   * 分组下的链接数组
   */
  links: FooterGroupLink[];
}

export interface FooterGroupLink {
  /**
   * 链接名称
   */
  name?: string;
  /**
   * 链接地址
   */
  link?: string;
  /**
   * 链接前图标
   */
  icon?: IconProps["icon"];
}
