<script setup lang="ts" name="NotFoundDelay">
import { useRouter, useData } from "vitepress";
import { onBeforeMount, ref } from "vue";
import NotFound from "vitepress/dist/client/theme-default/NotFound.vue";
import usePermalink from "../usePermalink";

const router = useRouter();
const { site, theme } = useData();
const { teyGetFilePathByPermalink } = usePermalink(false);

// 禁止加载 404 页面
const disableNotFoundPage = ref(true);

const unDisableNotFoundPage = () => {
  disableNotFoundPage.value = false;
};

onBeforeMount(async () => {
  const { permalinks } = theme.value;
  if (!permalinks && !Object.keys(permalinks || {}).length) return unDisableNotFoundPage();

  const { search, hash } = new URL(window.location.href);
  const filePath = teyGetFilePathByPermalink(router.route.path);

  if (filePath) {
    // 尝试获取文件路径（当 pathname 为 permalink 时才获取成功）
    const targetUrl = site.value.base + filePath + search + hash;
    history.replaceState(history.state || null, "", targetUrl);
    await router.go(targetUrl);

    // 3s 后如果未成功跳转文件地址，则打开 404 页面
    setTimeout(unDisableNotFoundPage, 3000);
  } else unDisableNotFoundPage();
});
</script>

<template>
  <template v-if="!disableNotFoundPage">
    <slot name="not-found"><NotFound /></slot>
  </template>
</template>
