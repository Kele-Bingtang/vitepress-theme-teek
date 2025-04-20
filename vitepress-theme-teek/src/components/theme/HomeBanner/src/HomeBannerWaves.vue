<script setup lang="ts" name="HomeBannerWaves">
import { useNamespace } from "@teek/hooks";

defineOptions({ name: "HomeBannerWaves" });

const ns = useNamespace("banner-waves");
</script>

<template>
  <svg
    :class="ns.b()"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 24 150 28"
    preserveAspectRatio="none"
    shape-rendering="auto"
  >
    <!--形状容器-->
    <defs>
      <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
    </defs>
    <!--组合波浪-->
    <g class="parallax">
      <use class="use" xlink:href="#gentle-wave" x="48" y="0"></use>
      <use class="use dark:fill-black" xlink:href="#gentle-wave" x="48" y="3"></use>
      <use class="use dark:fill-black" xlink:href="#gentle-wave" x="48" y="5"></use>
      <use class="use dark:fill-black" xlink:href="#gentle-wave" x="48" y="7"></use>
    </g>
  </svg>
</template>
