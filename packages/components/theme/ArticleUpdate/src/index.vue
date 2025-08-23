<script setup lang="ts" name="ArticleUpdate">
import type { TkContentData, ArticleUpdate } from "@teek/config";
import { computed } from "vue";
import { withBase, useRoute, useData } from "vitepress";
import { useNamespace, useLocale } from "@teek/composables";
import { editPenIcon } from "@teek/static";
import { usePosts, useTeekConfig, usePagePath } from "@teek/components/theme/ConfigProvider";
import { TkIcon } from "@teek/components/common/Icon";
import { TkArticleTitle } from "@teek/components/theme/ArticleTitle";

defineOptions({ name: "ArticleUpdate" });

const ns = useNamespace("article-update");
const { t } = useLocale();
const posts = usePosts();
const route = useRoute();
const { frontmatter } = useData();
const { getTeekConfigRef } = useTeekConfig();
const { archivesPath } = usePagePath();

const articleConfig = getTeekConfigRef<ArticleUpdate>("articleUpdate", {
  limit: 3,
});

const updatePosts = computed(() => {
  const path = "/" + route.data.filePath.replace(".md", "");
  return [
    ...posts.value.sortPostsByDate
      .filter(item => ![route.path, path, `${path}.html`].includes(item.url))
      .slice(0, articleConfig.value.limit),
    { title: "更多文章 >", url: archivesPath.value, frontmatter: {}, date: "" } as TkContentData,
  ];
});
</script>

<template>
  <div :class="ns.b()" v-show="frontmatter.article !== false">
    <div :class="[ns.e('title'), 'flx-align-center']">
      <TkIcon :icon="editPenIcon" class="edit-icon" aria-hidden="true" />
      <a
        v-if="archivesPath"
        :href="withBase(archivesPath)"
        class="hover-color"
        :aria-label="t('tk.articleUpdate.label')"
      >
        {{ t("tk.articleUpdate.label") }}
      </a>
      <span v-else>{{ t("tk.articleUpdate.label") }}</span>
    </div>

    <ul>
      <li v-for="(item, index) in updatePosts" :key="item.url" class="flx-center">
        <span :class="ns.m('num')" aria-hidden="true">
          {{ index !== updatePosts.length - 1 ? (index + 1).toString().padStart(2, "0") : "" }}
        </span>

        <div :class="ns.e('content')">
          <a v-if="item.url" :href="withBase(item.url)" class="flx-1 hover-color sle" :aria-label="item.title">
            <TkArticleTitle :post="item" :title-tag-props="{ position: 'right', size: 'small' }" />
          </a>
          <span v-if="item.date" :class="ns.em('content', 'date')">{{ item.date }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
