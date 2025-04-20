export interface HomeCardProps {
  /**
   * 标题
   */
  title?: string;
  /**
   * 标题链接
   */
  titleLink?: string;
  /**
   * 标题点击事件，优先级低于 titleLink
   */
  titleClick?: () => void;
  /**
   * 是否开启分页功能
   */
  page?: boolean;
  /**
   * 每页显示数量
   */
  pageSize?: number;
  /**
   * 总数量
   */
  total?: number;
  /**
   * 是否自动分页
   */
  autoPage?: boolean;
  /**
   * 翻页间隔时间，单位：毫秒
   */
  pageSpeed?: number;
}
