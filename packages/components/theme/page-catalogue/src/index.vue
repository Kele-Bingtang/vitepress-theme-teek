<script setup lang="ts" name="CataloguePage">
import { computed } from "vue";
import { useData } from "vitepress";
import { useNamespace, useLocale } from "@teek/composables";
import { TkArticlePage } from "@teek/components/common/article-page";
import CatalogueItem from "./catalogue-item.vue";

defineOptions({ name: "CataloguePage" });

const ns = useNamespace("catalogue");
const { t } = useLocale();

const { theme, frontmatter } = useData();

// 目录列表
const catalogues = computed(() => theme.value.catalogues?.inv[frontmatter.value.path]?.catalogues);
</script>

<template>
  <TkArticlePage :class="ns.b()" :aria-label="t('tk.catalogue.label')">
    <slot name="teek-catalogue-top-before" />

    <div :class="ns.e('header')" role="group" aria-labelledby="catalogue-header-title">
      <h1 id="catalogue-header-title">{{ frontmatter.title }}</h1>
      <div class="description">{{ frontmatter.desc || frontmatter.description }}</div>
    </div>

    <slot name="teek-catalogue-top-after" />

    <div :class="ns.e('wrapper')" aria-labelledby="catalogue-list-title">
      <div id="catalogue-list-title" class="title">{{ frontmatter.pageTitle || t("tk.catalogue.title") }}</div>
      <ul class="flx-wrap-between">
        <template v-for="(item, index) in catalogues" :key="index">
          <CatalogueItem :item :index="Number(index) + 1" />
        </template>
      </ul>
    </div>

    <div class="vp-doc">
      <Content />
    </div>
  </TkArticlePage>
</template>
