<script setup lang="ts" name="ArticleImagePreview">
import type { ArticleAnalyze } from "@teek/config";
import { computed } from "vue";
import { useEventListener } from "@teek/composables";
import { useTeekConfig } from "@teek/components/theme/ConfigProvider";
import { createImageViewer } from "@teek/components/common/ImageViewer";

const { getTeekConfig } = useTeekConfig();

// 文章图片配置
const imageViewer = computed(() => {
  const { imageViewer = {} } = getTeekConfig<ArticleAnalyze>("articleAnalyze", {});
  return imageViewer;
});

const previewImage = (e: Event) => {
  const target = e.target as HTMLElement;

  // 当点击的是图片，且图片的 class 不为 no-preview 时，才触发预览
  if (
    target.tagName.toLowerCase() === "img" &&
    !target.className.includes("image-viewer__img") && // 处于预览状态，点击/拖拽图片时，不重新触发预览
    !target.className.includes("no-preview")
  ) {
    const imgDoms = target.querySelectorAll<HTMLImageElement>(".content-container .main img");
    const imgs = Array.from(imgDoms);

    const urlList = imgs.map(el => el.src);
    let initialIndex = imgs.findIndex(el => el === target);
    const url = target.getAttribute("src");

    // 兼容点击文档之外的图片
    if (initialIndex === -1 && url) {
      urlList.push(url);
      initialIndex = urlList.length - 1;
    }

    createImageViewer({ infinite: false, ...imageViewer.value, urlList, initialIndex });
  }
};

useEventListener(() => document.querySelector("#VPContent"), "click", previewImage);
</script>

<template></template>
