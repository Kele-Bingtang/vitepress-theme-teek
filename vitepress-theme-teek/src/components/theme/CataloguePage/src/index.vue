<script setup lang="ts" name="CataloguePage">
import { computed, unref } from "vue";
import { useData } from "vitepress";
import { useNamespace, useLocale } from "@teek/hooks";
import CatalogueItem from "./CatalogueItem.vue";

defineOptions({ name: "CataloguePage" });

const ns = useNamespace("catalogue");
const { t } = useLocale();

const { theme, frontmatter } = useData();

// 目录列表
const catalogues = computed(() => unref(theme).catalogues?.inv[unref(frontmatter).path]?.catalogues);
</script>

<template>
  <div :class="`${ns.b()} ${ns.joinNamespace('page')}`" :aria-label="t('tk.catalogue.label')">
    <slot name="teek-catalogue-top-before" />

    <div :class="ns.e('header')" role="group" aria-labelledby="catalogue-header-title">
      <h2 id="catalogue-header-title" :class="ns.joinNamespace('page-title-h2')">{{ frontmatter.title }}</h2>
      <div class="description">{{ frontmatter.desc || frontmatter.description }}</div>
    </div>

    <slot name="teek-catalogue-top-after" />

    <div :class="ns.e('wrapper')" aria-labelledby="catalogue-list-title">
      <div id="catalogue-list-title" class="title">{{ frontmatter.pageTitle || t("tk.catalogue.title") }}</div>
      <ul class="flx-wrap-between">
        <template v-for="(item, index) in catalogues" :key="index">
          <CatalogueItem :item :index="index + 1" />
        </template>
      </ul>
    </div>

    <div class="vp-doc" :aria-label="t('tk.catalogue.docLabel')">
      <Content />
    </div>
  </div>
</template>
