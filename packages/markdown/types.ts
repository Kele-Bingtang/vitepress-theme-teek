/**
 * 分享卡片配置项
 */
export declare namespace ShareCard {
  export interface Config {
    /**
     * 每行显示的卡片数量
     *
     * @default 'auto'
     */
    cardNum?: number | "auto";
    /**
     * 跳转方式
     *
     * @default '_blank'
     */
    target?: "_blank" | "_self";
    /**
     * 每行卡片之间的间隔
     *
     * @default 20
     */
    cardGap?: number;
    /**
     * 是否显示代码块
     */
    showCode?: boolean;
  }

  export interface Item {
    /**
     * 名称
     */
    name: string;
    /**
     * 描述
     */
    desc: string;
    /**
     * 头像
     */
    avatar?: string;
    /**
     * 头像的 alt，默认取 name
     */
    alt?: string;
    /**
     * 跳转链接
     */
    link?: string;
    /**
     * 背景色
     * @default var(--vp-c-gray-1)
     */
    bgColor: string;
    /**
     * 文字颜色
     * @default var(--vp-c-text-1)
     */
    textColor: string;
  }
}

/**
 * 图片卡片配置项
 */
export declare namespace ImgCard {
  export interface Config {
    /**
     * 每行显示的卡片数量
     *
     * @default 3
     */
    cardNum?: number;
    /**
     * 跳转方式
     *
     * @default '_blank'
     */
    target?: "_blank" | "_self";
    /**
     * 图片宽度
     *
     * @default 'auto'
     */
    imgHeight?: string;
    /**
     * 设置图片的填充方式，为 CSS object-it 属性值
     *
     * @default 'cover'
     */
    objectFit?: "cover" | "fill" | "contain" | "scale-down" | "none";
    /**
     * 显示描述信息的行数
     *
     * @default 2
     */
    lineClamp?: number;
    /**
     * 每行卡片之间的间隔
     *
     * @default 20
     */
    cardGap?: number;
    /**
     * 是否显示代码块
     */
    showCode?: boolean;
  }

  export interface Item {
    /**
     * 图片链接
     */
    img: string;
    /**
     * 图片的 alt，默认取图片文件名
     */
    alt?: string;
    /**
     * 跳转链接
     */
    link?: string;
    /**
     * 名称
     */
    name: string;
    /**
     * 描述
     */
    desc?: string;
    /**
     * 作者
     */
    author?: string;
    /**
     * 作者头像
     */
    avatar?: string;
    /**
     * 作者头像的 alt，默认取头像文件名
     */
    avatarAlt?: string;
  }
}

/**
 * 导航卡片配置项
 */
export declare namespace NavCard {
  export interface Config {
    /**
     * 每行显示的卡片数量
     *
     * @default 3
     */
    cardNum?: number;
    /**
     * 跳转方式
     *
     * @default '_blank'
     */
    target?: "_blank" | "_self";
    /**
     * 显示描述信息的行数
     *
     * @default 2
     */
    lineClamp?: number;
    /**
     * 每行卡片之间的间隔
     *
     * @default 20
     */
    cardGap?: number;
    /**
     * 是否显示代码块
     */
    showCode?: boolean;
  }

  export interface Item {
    /**
     * 名称
     */
    name: string;
    /**
     * 描述
     */
    desc: string;
    /**
     * 图片链接
     */
    img?: string;
    /**
     * 图片的 alt，默认取图片文件名
     */
    alt?: string;
    /**
     * 跳转链接
     */
    link?: string;
    /**
     * 右上角徽章
     */
    badge?: string;
    /**
     * 右上角徽章类型
     *
     * @default 'info'
     */
    badgeType?: "info" | "tip" | "warning" | "danger";
  }
}

export interface ContainerLabel {
  /**
   * note 容器的默认标题
   *
   * @default 'NOTE'
   */
  noteLabel?: string;
}
