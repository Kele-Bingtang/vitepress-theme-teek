import type { TkAvatarProps } from "@teek/components/common/Avatar";

export interface Blogger {
  /**
   * 博主昵称
   */
  name: string;
  /**
   * 博主签名
   */
  slogan?: string;
  /**
   * 博主头像
   */
  avatar?: string;
  /**
   * 头像风格：square 为方形头像，circle 为圆形头像，circle-rotate 可支持鼠标悬停旋转，circle-rotate-last 将会持续旋转 59s
   *
   * @default 'square'
   */
  shape?: TkAvatarProps["shape"] | "circle-rotate" | "circle-rotate-last";
  /**
   * 背景图片地址，仅当 shape 为 circle 相关值时有效
   *
   * @since v1.1.5
   */
  circleBgImg?: string;
  /**
   * 遮罩层是否显示，仅当 shape 为 circle 且 circleBgImg 配置时有效
   *
   * @default true
   * @since v1.3.1
   */
  circleBgMask?: boolean;
  /**
   * 圆形头像大小，仅当 shape 为 circle 相关值时有效
   *
   * @default 100
   * @since v1.4.6
   */
  circleSize?: TkAvatarProps["size"];
  /**
   * 字体颜色
   *
   * @since v1.3.1
   */
  color?: string;
  /**
   * 状态，仅当 shape 为 circle 相关值时有效
   *
   * @since v1.4.6
   */
  status?: {
    /**
     * 图标
     */
    icon: string;
    /**
     * 图标大小
     *
     * @default 24
     */
    size?: TkAvatarProps["size"];
    /**
     * 鼠标悬停图标的提示语
     */
    title?: string;
  };
}
