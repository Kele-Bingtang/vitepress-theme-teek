<script setup lang="ts" name="ArticlePage">
import type { ArticlePageProps } from "./articlePage";
import { useNamespace } from "@teek/composables";
import DocAsideOutline from "./components/DocAsideOutline.vue";

defineOptions({ name: "ArticlePage" });

defineProps<ArticlePageProps>();

const ns = useNamespace("article-page");
</script>

<template>
  <div :class="[ns.b(), ns.is('aside', aside)]">
    <div v-if="aside" :class="ns.e('aside')">
      <div :class="ns.e('aside__container')">
        <DocAsideOutline />
      </div>
    </div>

    <div :class="[ns.join('doc'), { 'vp-doc': doc }]">
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
