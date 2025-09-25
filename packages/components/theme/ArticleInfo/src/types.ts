import type { TkContentData, ArticleInfoPosition } from "@teek/config";

export interface PostBaseInfoProps {
  /**
   * 文章数据
   */
  post: TkContentData;
  /**
   * 父组件所在区域
   */
  scope: ArticleInfoPosition;
  /**
   * 是否显示分割线 |
   *
   * @default false
   */
  split?: boolean;
}
