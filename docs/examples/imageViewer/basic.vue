<script setup lang="ts">
import { createImageViewer } from "vitepress-theme-teek";

const handleClick = () => {
  const urlList = [
    "https://vp.teek.top/teek-logo-large.png",
    "https://testingcf.jsdelivr.net/gh/teekhub/static/user/avatar1.png",
  ];

  createImageViewer({ urlList });
};
</script>

<template>
  <button @click="handleClick">点击打开图片预览</button>
</template>
