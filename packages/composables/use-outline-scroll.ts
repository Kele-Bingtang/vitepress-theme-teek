import { isClient } from "@teek/helper";

/** 高亮项与容器可视边界保留的间距 */
const MARGIN = 16;

/**
 * 右侧目录跟随高亮（高亮项超出所在滚动容器可视区时自动滚动容器）
 */
export const useOutlineScroll = () => {
  /**
   * 向上查找第一个可滚动的祖先容器（兼容 VitePress 文档页与 Teek 文章页两种目录结构）
   */
  const findScrollableParent = (element: HTMLElement | null): HTMLElement | null => {
    let current = element?.parentElement ?? null;

    while (current && current !== document.body) {
      const { overflowY } = getComputedStyle(current);
      if (/(auto|scroll)/.test(overflowY) && current.scrollHeight > current.clientHeight + 1) return current;
      current = current.parentElement;
    }

    return null;
  };

  /**
   * 让高亮项进入容器的可视区
   */
  const scrollIntoView = (link: HTMLElement): void => {
    const container = findScrollableParent(link);
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const paddingTop = parseFloat(getComputedStyle(container).paddingTop) || 0;
    // 容器含 padding-top（如导航栏高度 + 48px），可视区起点需去掉 padding
    const visibleTop = containerRect.top + paddingTop + MARGIN;
    const visibleBottom = containerRect.bottom - MARGIN;
    const linkRect = link.getBoundingClientRect();

    if (linkRect.top < visibleTop) container.scrollTop -= visibleTop - linkRect.top;
    else if (linkRect.bottom > visibleBottom) container.scrollTop += linkRect.bottom - visibleBottom;
  };

  /**
   * 启动监听：目录高亮变化时自动滚动所在容器
   */
  const startWatch = (): void => {
    if (!isClient) return;

    // 监听 body，兼容路由切换时目录 DOM 被替换的情况
    const observer = new MutationObserver(records => {
      // 一次回调可能产生多条 class 记录，只处理最后一条变为高亮的目标
      let target: HTMLElement | null = null;

      records.forEach(record => {
        const element = record.target as HTMLElement;
        if (element.classList.contains("outline-link") && element.classList.contains("active")) target = element;
      });

      const link = target;
      if (!link) return;

      scrollIntoView(link);
    });

    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["class"] });
  };

  return { startWatch };
};
