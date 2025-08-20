<script setup lang="ts">
import { TkIcon } from "vitepress-theme-teek";

const svg = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="39px" height="47px" viewBox="0 0 39 47" enable-background="new 0 0 39 47" xml:space="preserve">  <image id="image0" width="39" height="47" x="0" y="0"
    xlink:href="data:image/png;base64,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" />
</svg>
`;
</script>

<template>
  <div class="icons-container">
    <TkIcon icon="material-symbols:account-circle" />
    <TkIcon :icon="svg" />

    <link rel="stylesheet" href="//at.alicdn.com/t/font_2989306_w303erbip9.css" />
    <TkIcon icon="if-icon-github" />

    <TkIcon icon="img-https://vp.teek.top/blog/bg2.webp" imgAlt="Teek Img" />
    <TkIcon icon="https://vp.teek.top/blog/bg2.webp" imgAlt="Teek Img" />
  </div>
</template>

<style lang="scss" scoped>
.icons-container {
  display: flex;
  gap: 20px;
}
</style>
