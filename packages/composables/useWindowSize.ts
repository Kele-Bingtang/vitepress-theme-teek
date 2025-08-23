import { shallowRef } from "vue";
import { isClient } from "@teek/helper";
import { useDebounce } from "./useDebounce";
import { useEventListener } from "./useEventListener";
import { useMounted } from "./useMounted";

export interface UseWindowSizeOptions {
  /**
   * 初始宽度
   *
   * @default Number.POSITIVE_INFINITY
   */
  initialWidth?: number;
  /**
   * 初始高度
   *
   * @default Number.POSITIVE_INFINITY
   */
  initialHeight?: number;
  /**
   * 滚动条是否应包含在宽度和高度中
   * 仅当 type 为 inner 时有效`
   *
   * @default true
   */
  includeScrollbar?: boolean;

  /**
   * 获取窗口大小类型：innerXxx、outerXxx、visualViewportXxx
   *
   * @default 'inner'
   */
  type?: "inner" | "outer" | "visual";
}

/**
 * 实时获取窗口大小
 *
 * @param sizeChangedCallback 钩子函数，当窗口发生改变时调用
 * @param options 选项
 */
export const useWindowSize = (
  sizeChangedCallback?: (width: number, height: number) => undefined,
  options: UseWindowSizeOptions = {}
) => {
  const {
    initialWidth = Number.POSITIVE_INFINITY,
    initialHeight = Number.POSITIVE_INFINITY,
    includeScrollbar = true,
    type = "inner",
  } = options;

  const width = shallowRef(initialWidth);
  const height = shallowRef(initialHeight);
  let stop: () => void = () => {};

  const update = useDebounce(() => {
    if (!isClient) return;

    if (type === "outer") {
      width.value = window.outerWidth;
      height.value = window.outerHeight;
    } else if (type === "visual" && window.visualViewport) {
      const { width: visualViewportWidth, height: visualViewportHeight, scale } = window.visualViewport;
      width.value = Math.round(visualViewportWidth * scale);
      height.value = Math.round(visualViewportHeight * scale);
    } else if (includeScrollbar) {
      width.value = window.innerWidth;
      height.value = window.innerHeight;
    } else {
      width.value = window.document.documentElement.clientWidth;
      height.value = window.document.documentElement.clientHeight;
    }

    sizeChangedCallback?.(width.value, height.value);
  }, 100);

  update();
  useMounted(update);

  stop = useEventListener(() => window, "resize", update, { passive: true });

  if (isClient && type === "visual" && window.visualViewport) {
    stop = useEventListener(window.visualViewport, "resize", update, { passive: true });
  }

  return { width, height, update, stop };
};

export type UseWindowSizeReturn = ReturnType<typeof useWindowSize>;
