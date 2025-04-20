<script setup lang="ts" name="ArticleHeadingHighlight">
import { nextTick, watch } from "vue";
import { useRoute } from "vitepress";
import { useNamespace, useEventListener } from "@teek/hooks";

const ns = useNamespace("article-heading-highlight");

const handleHighlight = () => {
  if (!window?.location?.hash) return;

  const targetedHashId = decodeURIComponent(window.location.hash);
  if (!targetedHashId) return;

  let elem: HTMLElement | null;

  try {
    elem = document.querySelector(targetedHashId);
  } catch (e) {
    return console.error(e);
  }
  if (!elem) return;

  if (!elem.classList.contains(ns.b())) {
    elem.classList.add(ns.b());
  }
  elem.classList.remove(ns.b());

  // 防止重复点击导致再次高亮
  setTimeout(() => {
    if (elem) elem.classList.add(ns.b());
  }, 10);
};

const route = useRoute();

watch(route, async () => {
  await nextTick();
  handleHighlight();
});

useEventListener(window, "hashchange", handleHighlight);
</script>

<template></template>
