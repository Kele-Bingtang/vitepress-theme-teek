import type { TkIconProps } from "@teek/components/common/Icon";

export interface AvatarProps {
  /**
   * 头像大小
   */
  size?: string | number;
  /**
   * 头像形状
   *
   * @default 'circle'
   */
  shape?: "circle" | "square";
  /**
   * 头像图标
   */
  icon?: TkIconProps["icon"];
  /**
   * 图标头像大小
   */
  iconSize?: string | number;
  /**
   * 头像图片地址
   */
  src?: string;
  /**
   * 头像图片原生 alt 属性
   */
  alt?: string;
  /**
   * 头像图片原生 srcset 属性
   */
  srcSet?: string;
  /**
   * 当展示类型为图片的时候，设置图片如何适应容器
   *
   * @default 'cover'
   */
  fit?: string;
  /**
   * 头像背景色
   */
  bgColor?: string;
  /**
   * 文本头像字体色
   */
  textColor?: string;
  /**
   * 文本头像字体大小
   */
  textSize?: string | number;
  /**
   * 文本，如果是中文，则取第一个字符，如果是一个英文单词，则取前两个转大写，如果是多个英文单词，则取前两个单次的首字母转大写
   */
  text?: string;
}

export interface AvatarEmit {
  error: [evt: Event];
}
