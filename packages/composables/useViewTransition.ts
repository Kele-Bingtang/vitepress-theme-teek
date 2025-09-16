import type { ViewTransition } from "@teek/config";
import { useData } from "vitepress";
import { nextTick, provide } from "vue";
import { isClient } from "@teek/helper";

/**
 * 使用 View Transition API
 */
export const useViewTransition = (options: ViewTransition) => {
  if (!isClient) return;

  const {
    enabled = true,
    mode = "out-in",
    duration = options.mode === "out-in" ? 300 : 600,
    easing = "ease-in",
  } = options;

  if (!enabled) return;
  const outIn = mode === "out-in";
  const { isDark } = useData();

  document.documentElement.setAttribute("view-transition", mode);

  const enableTransitions = () =>
    "startViewTransition" in document && window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

  provide("toggle-appearance", async ({ clientX: x, clientY: y }: MouseEvent) => {
    if (!enableTransitions()) {
      isDark.value = !isDark.value;
      return;
    }

    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px at ${x}px ${y}px)`,
    ];

    await document.startViewTransition(async () => {
      isDark.value = !isDark.value;
      await nextTick();
    }).ready;

    const isDarkCondition = outIn ? isDark.value : false;

    document.documentElement.animate(
      { clipPath: isDarkCondition ? clipPath.reverse() : clipPath },
      {
        duration,
        easing,
        fill: "forwards",
        pseudoElement: `::view-transition-${isDarkCondition ? "old" : "new"}(root)`,
      }
    );
  });
};
