import { isArray } from "@teek/helper";
import { useScopeDispose } from "./useScopeDispose";
import { useMounted } from "./useMounted";
import { MaybeRef, nextTick, unref, watch } from "vue";

/**
 * 元素出现在屏幕内时，开启过渡效果
 */
export const useWindowTransition = (element: MaybeRef<HTMLElement | HTMLElement[] | null>, immediate = true) => {
  let startInMounted = false;
  const cleanup: (() => void)[] = [];

  /**
   * 创建 IntersectionObserver 初始化监听屏幕外元素
   */
  const start = () => {
    const elementConst = unref(element);
    if (!elementConst) return;

    if (isArray(elementConst)) elementConst.forEach(el => initTransition(el));
    else initTransition(elementConst);
  };

  /**
   * 初始化动画类
   */
  const initTransition = (el: HTMLElement) => {
    // 初始化动画 class
    el.classList.add("scroll__animate");

    const { create, clean } = useIntersectionObserver(
      el,
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 使用 requestAnimationFrame 确保在下一帧执行
            requestAnimationFrame(() => {
              try {
                // 添加 visible class，触发动画
                el.classList.add("visible");
                clean();
              } catch (error) {
                console.error("初始化动画失败:", error);
              }
            });
          }
        });
      },
      0.1
    );

    create();
    cleanup.push(clean);
  };

  /**
   * 清除所有 IntersectionObserver
   */
  const stop = () => {
    cleanup.forEach(fn => fn());
  };

  const restart = () => {
    stop();
    start();
  };

  watch(
    () => unref(element),
    () => {
      !startInMounted && restart();
    },
    { deep: true }
  );

  useMounted(async () => {
    // 防止 watch 立即执行
    startInMounted = true;
    immediate && restart();

    await nextTick();
    startInMounted = false;
  });

  useScopeDispose(stop);

  return { start, stop, restart };
};

/**
 * 使用 IntersectionObserver 监听元素是否可见
 */
export const useIntersectionObserver = (
  observerDom: MaybeRef<HTMLElement | null>,
  callback: (entries: IntersectionObserverEntry[]) => void,
  threshold: number
) => {
  let intersectionObserver: IntersectionObserver | null = null;

  // 创建 IntersectionObserver
  const createIntersectionObserver = () => {
    const observerDomValue = unref(observerDom);
    if (intersectionObserver || !observerDomValue) return;

    intersectionObserver = new IntersectionObserver(callback, { threshold });
    intersectionObserver.observe(observerDomValue);
  };

  // 清理 IntersectionObserver
  const cleanIntersectionObserver = () => {
    if (intersectionObserver) {
      intersectionObserver.disconnect();
      intersectionObserver = null;
    }
  };

  useScopeDispose(cleanIntersectionObserver);

  return { create: createIntersectionObserver, clean: cleanIntersectionObserver };
};
