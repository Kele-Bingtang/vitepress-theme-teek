<script setup lang="ts" name="ArticlePageStyle">
import { unref, watch } from "vue";
import { useTeekConfig } from "@teek/configProvider";
import { useNamespace } from "@teek/hooks";

const ns = useNamespace("body-bg-image");

const { getTeekConfigRef } = useTeekConfig();

const pageStyle = getTeekConfigRef("pageStyle", "default");

watch(
  pageStyle,
  () => {
    const tkLayoutDom = document.querySelector(`.${ns.joinNamespace("layout")}`);
    // 清除可能已经存在的 pageStyle
    ["default", "card", "card-nav", "segment", "segment-nav"].forEach(item =>
      tkLayoutDom?.classList.remove(ns.joinNamespace(item))
    );

    tkLayoutDom?.classList.add(ns.joinNamespace(unref(pageStyle)));
  },
  { immediate: true }
);
</script>

<template></template>
