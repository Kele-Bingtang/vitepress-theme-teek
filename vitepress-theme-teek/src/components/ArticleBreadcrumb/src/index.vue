<script setup lang="ts" name="ArticleBreadcrumb">
import type { Breadcrumb as BreadcrumbType } from "@teek/config/types";
import { computed, unref } from "vue";
import { useData, withBase } from "vitepress";
import { useTeekConfig } from "@teek/configProvider";
import { useNamespace, useLocale } from "@teek/hooks";
import { houseIcon } from "@teek/assets/icons";
import Icon from "@teek/components/Icon";
import Breadcrumb from "./Breadcrumb.vue";
import BreadcrumbItem from "./BreadcrumbItem.vue";

defineOptions({ name: "ArticleBreadcrumb" });

const ns = useNamespace("article-breadcrumb");
const { t } = useLocale();

const { getTeekConfigRef } = useTeekConfig();
const { localeIndex, theme, page } = useData();

// 面包屑配置项
const breadcrumb = getTeekConfigRef<BreadcrumbType>("breadcrumb", {
  enabled: true,
  showCurrentName: false,
  separator: "/",
  homeLabel: t("tk.articleBreadcrumb.home"),
});

const relativePathArr = computed(() => unref(page).relativePath.split("/") || []);

const breadcrumbList = computed(() => {
  const classifyList: { fileName: string; filePath: string }[] = [];
  const relativePathArrConst: string[] = unref(relativePathArr);

  relativePathArrConst.forEach((item, index) => {
    // 去除「序号.」的前缀，并获取文件名
    const fileName = item.replace(/^\d+\./, "").split(".")?.[0] || "";

    // 兼容国际化功能，如果配置多语言，在面包屑去掉多语言根目录名
    if (
      (index !== relativePathArrConst.length - 1 || unref(breadcrumb).showCurrentName) &&
      fileName !== unref(localeIndex)
    ) {
      classifyList.push({
        fileName,
        filePath: unref(theme).catalogues?.inv[item]?.filePath || "",
      });
    }
  });
  return classifyList;
});
</script>

<template>
  <div :class="`${ns.b()}`" role="navigation" :aria-label="t('tk.articleBreadcrumb.label')">
    <Breadcrumb v-if="breadcrumb?.enabled" :separator="breadcrumb.separator">
      <BreadcrumbItem>
        <a :href="withBase('/')" :title="breadcrumb.homeLabel" class="hover-color" :aria-label="breadcrumb.homeLabel">
          <Icon :icon="houseIcon" aria-hidden="true" />
        </a>
      </BreadcrumbItem>
      <BreadcrumbItem v-for="(item, index) in breadcrumbList" :key="index">
        <component
          :is="item.filePath ? 'a' : 'span'"
          :href="item.filePath && withBase(`/${item.filePath}`)"
          :title="item.fileName"
          :class="[item.filePath ? 'hover-color' : '']"
          :aria-label="item.fileName"
        >
          {{ item.fileName }}
        </component>
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>
