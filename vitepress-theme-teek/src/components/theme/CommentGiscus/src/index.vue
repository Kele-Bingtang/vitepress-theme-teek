<script setup lang="ts" name="CommentGiscus">
import type { CommentProvider } from "@teek/config";
import { ref, nextTick, onMounted, computed, unref, inject } from "vue";
import { useData } from "vitepress";
import { isFunction } from "@teek/helper";
import { useNamespace, useVpRouter } from "@teek/hooks";
import { useTeekConfig } from "@teek/configProvider";
import { giscusSymbol } from "./giscus";

defineOptions({ name: "CommentGiscus" });

const ns = useNamespace("");
const vpRouter = useVpRouter();

const { getTeekConfig } = useTeekConfig();
const { isDark } = useData();

const giscusOptions = getTeekConfig<CommentProvider["giscus"]>("comment", {}).options;

const {
  repo,
  repoId,
  category,
  categoryId,
  mapping = "pathname",
  strict = "0",
  reactionsEnabled = "1",
  emitMetadata = "0",
  inputPosition = "top",
  lang = "zh-CN",
  theme: giscusThemeConfig,
  loading = "eager",
  useOnline = true,
  link = "https://giscus.app/client.js",
  integrity,
  ...options
} = giscusOptions;

const giscusTheme = computed(() => {
  if (isFunction(giscusThemeConfig)) return giscusThemeConfig(unref(isDark));
  return giscusThemeConfig || (unref(isDark) ? "dark" : "light");
});

// 尝试从上下文获取 giscus 组件
const giscusComponentFn = inject(giscusSymbol, () => null);
const giscusComponent = giscusComponentFn?.(giscusOptions);

const isShow = ref(false);

const reloadGiscus = () => {
  isShow.value = false;
  nextTick(() => {
    isShow.value = true;
  });
};

onMounted(() => {
  if (!useOnline && !giscusComponent) {
    return console.error(
      "[Teek Error] Giscus initialization failed. Please configure the 'useOnline' to 'true' or provide the giscus component"
    );
  }
  reloadGiscus();
  // 路由切换后更新评论内容
  vpRouter.bindAfterRouteChange(ns.joinNamespace("giscus"), () => {
    reloadGiscus();
  });
});
</script>

<template>
  <div v-if="isShow" class="giscus-container">
    <component
      v-if="giscusComponent"
      :is="giscusComponent"
      :repo
      :repo-id
      :category
      :category-id
      :mapping
      :reactions-enabled
      :emit-metadata
      :input-position
      :lang
      :theme="giscusTheme"
      :loading
      v-bind="options"
    />
    <component
      v-else-if="useOnline"
      :is="'script'"
      defer
      :src="link"
      :integrity
      :data-repo="repo"
      :data-repo-id="repoId"
      :data-category="category"
      :data-category-id="categoryId"
      :data-mapping="mapping"
      :data-strict="strict"
      :data-reactions-enabled="reactionsEnabled"
      :data-emit-metadata="emitMetadata"
      :data-input-position="inputPosition"
      :data-theme="giscusTheme"
      :data-lang="lang"
      v-bind="options"
      crossorigin="anonymous"
    />
  </div>
</template>
