import type { TkAvatarProps } from "../../components/common/Avatar";

export interface Blogger {
  /**
   * 博主昵称
   */
  name: string;
  /**
   * 博主头像
   */
  avatar: string;
  /**
   * 博主签名
   */
  slogan?: string;
  /**
   * 头像风格：square 为方形头像，circle 为圆形头像，circle-rotate 可支持鼠标悬停旋转
   *
   * @default 'square'
   */
  shape?: TkAvatarProps["shape"] | "circle-rotate";
}
