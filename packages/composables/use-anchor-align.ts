import { getScrollOffset, onContentUpdated } from "vitepress";
import { isClient } from "@teek/helper";

/**
 * 内容更新后重新对齐锚点落点
 */
export const useAnchorAlign = () => {
  /**
   * 启动监听：内容更新后，若 URL hash 锚点落点偏移，则按 scrollOffset 重新对齐
   */
  const startWatch = (): void => {
    if (!isClient) return;

    onContentUpdated(() => {
      // 立即捕获 hash，避免被 useAnchorScroll 改写 URL hash 后再取值
      const hash = window.location.hash;
      if (hash.length <= 1) return;

      const id = decodeURIComponent(hash).slice(1);
      if (!id) return;

      // 等 VitePress 自身的 rAF 滚动与主题各增强的 nextTick 布局变更落地后再对齐
      setTimeout(() => {
        requestAnimationFrame(() => {
          const element = document.getElementById(id);
          if (!element) return;

          const rect = element.getBoundingClientRect();
          // 目标元素不可测量（如仍处于 display: none）时不处理，避免误改落点
          if (element.offsetParent === null || rect.top === 0) return;

          // 与 VitePress router.js 的公式保持一致
          const paddingTop = parseInt(getComputedStyle(element).paddingTop, 10) || 0;
          const top = window.scrollY + rect.top - getScrollOffset() + paddingTop;
          // 偏差超过 1px 才滚动，保证幂等
          if (Math.abs(top - window.scrollY) > 1) window.scrollTo(0, top);
        });
      }, 0);
    });
  };

  return { startWatch };
};
