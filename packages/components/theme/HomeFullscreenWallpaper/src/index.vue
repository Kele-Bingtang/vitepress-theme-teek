<script setup lang="ts" name="HomeFullscreenWallpaper">
import type { Wallpaper } from "@teek/config";
import { ref } from "vue";
import { useNamespace, useEventListener } from "@teek/composables";
import { useTeekConfig } from "@teek/components/theme/ConfigProvider";

defineOptions({ name: "HomeFullscreenWallpaper" });

const ns = useNamespace("fullscreen-wallpaper");
const { getTeekConfigRef } = useTeekConfig();

// 定义一个 ref 来跟踪是否处于全屏状态
const isFullscreen = ref(false);

const wallpaperConfig = getTeekConfigRef<Wallpaper>("wallpaper", {
  hideBanner: false,
  hideMask: false,
});

/**
 * 监听键盘事件
 */
const handleKeyDown = (event: KeyboardEvent) => {
  // 全屏模式禁止打开 F12 开发者工具
  if (event.key === "F12" && isFullscreen.value) return event.preventDefault();

  // 全屏模式禁止使用 Ctrl + Shift + I 打开开发者工具
  if (event.key === "I" && event.ctrlKey && event.shiftKey && isFullscreen.value) return event.preventDefault();

  if (event.key === "F11") {
    // 阻止浏览器全屏默
    event.preventDefault();

    // 手动进入全屏模式
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if ((document.documentElement as any).mozRequestFullScreen) {
      // Firefox
      (document.documentElement as any).mozRequestFullScreen();
    } else if ((document.documentElement as any).webkitRequestFullscreen) {
      // Chrome, Safari, Opera
      (document.documentElement as any).webkitRequestFullscreen();
    } else if ((document.documentElement as any).msRequestFullscreen) {
      // IE/Edge
      (document.documentElement as any).msRequestFullscreen();
    }
  }
};

/**
 * 监听全屏变化事件
 */
const handleFullscreenChange = () => {
  const htmlDom = document.documentElement;
  // 如果滚动条不为 0，则不执行任何操作
  if (htmlDom.scrollTop !== 0) return;

  const vpDocDom = document.querySelector(".vp-doc");
  const bannerContentDom = document.querySelector(`.${ns.join("banner__content")}`);
  const wavesDom = document.querySelector(`.${ns.join("banner-waves")}`);
  const bodyBgImageMaskDom = document.querySelector(`.${ns.join("body-bg-image")} .mask`);
  const bannerMaskDom = document.querySelector(`.${ns.join("banner-bg-image")} .mask`);

  isFullscreen.value = !!document.fullscreenElement;

  const { hideBanner, hideMask } = wallpaperConfig.value;
  const options = [
    { el: htmlDom, executeClass: ns.b() },
    { el: vpDocDom, executeClass: "display-none" },
    { el: bannerContentDom, executeClass: "no-feature" },
    {
      el: bannerContentDom,
      executeClass: "display-none",
      execute: hideBanner,
    },
    { el: wavesDom, executeClass: "display-none", execute: hideBanner },
    { el: bodyBgImageMaskDom, executeClass: "display-none", execute: hideMask },
    { el: bannerMaskDom, executeClass: "display-none", execute: hideMask },
  ];

  addOrRemoveClass(!!document.fullscreenElement, options);
};

const addOrRemoveClass = (
  add: boolean,
  options: { el: Element | null; executeClass?: string; notExecuteClass?: string; execute?: boolean }[]
) => {
  // 进入全屏
  if (add) {
    options.forEach(item => {
      if (item.execute !== false) item.executeClass && item.el?.classList.add(item.executeClass);
      else item.notExecuteClass && item.el?.classList.add(item.notExecuteClass);
    });
    return;
  }

  // 退出全屏
  options.forEach(item => {
    if (item.execute !== false) item.executeClass && item.el?.classList.remove(item.executeClass);
    else item.notExecuteClass && item.el?.classList.remove(item.notExecuteClass);
  });
};

/**
 * 监听右键菜单事件
 */
const handleContextMenu = (event: MouseEvent) => {
  // 全屏模式禁用右键菜单
  if (isFullscreen.value) event.preventDefault();
};

const getDocument = () => document;

useEventListener(getDocument, "keydown", handleKeyDown);
useEventListener(getDocument, "fullscreenchange", handleFullscreenChange);
useEventListener(getDocument, "contextmenu", handleContextMenu);
</script>

<template>
  <div :class="ns.b()"></div>
</template>
