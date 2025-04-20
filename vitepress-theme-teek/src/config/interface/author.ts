export interface Author {
  /**
   * 作者名称，作用在首页的 PostItem 和文章页
   */
  name: string;
  /**
   * 点击作者名称后跳转的链接
   */
  link?: string;
}
