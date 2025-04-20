<script setup lang="ts" name="ArticleImagePreview">
import { computed, unref } from "vue";
import { useEventListener } from "@teek/hooks";
import { useTeekConfig } from "@teek/configProvider";
import { createImageViewer } from "@teek/components/common/ImageViewer";

const { getTeekConfig } = useTeekConfig();

// 文章图片配置
const imageViewer = computed(() => {
  const { imageViewer = {} } = getTeekConfig("article", {});
  return imageViewer;
});

const previewImage = (e: Event) => {
  const target = e.target as HTMLElement;
  const currentTarget = e.currentTarget as HTMLElement;

  if (target.tagName.toLowerCase() === "img") {
    const imgDoms = currentTarget.querySelectorAll<HTMLImageElement>(".content-container .main img");
    const imgs = Array.from(imgDoms);

    const urlList = imgs.map(el => el.src);
    let initialIndex = imgs.findIndex(el => el === target);
    const url = target.getAttribute("src");

    // 兼容点击文档之外的图片
    if (initialIndex === -1 && url) {
      urlList.push(url);
      initialIndex = urlList.length - 1;
    }

    createImageViewer({ infinite: false, ...unref(imageViewer), urlList, initialIndex });
  }
};

useEventListener(document.querySelector("#VPContent"), "click", previewImage);
</script>

<template></template>
