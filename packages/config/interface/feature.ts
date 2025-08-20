import type { IconProps } from "@teek/components/common/Icon/src/icon";

export interface Feature {
  /**
   * 标题
   */
  title: string;
  /**
   * 描述
   */
  details?: string;
  /**
   * 图片地址
   */
  image?: string;
  /**
   * Features 数据
   */
  features?: FeatureItem[];
  /**
   * Highlights 数据
   */
  highlights?: FeatureItem[];
}

interface FeatureItem {
  /**
   * 标题
   */
  title: string;
  /**
   * 描述
   */
  details?: string;
  /**
   * 图标地址
   */
  icon?: IconProps["icon"];
  /**
   * 点击跳转链接
   */
  link?: string;
}
