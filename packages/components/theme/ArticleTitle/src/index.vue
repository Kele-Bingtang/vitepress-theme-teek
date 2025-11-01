<script setup lang="ts" name="ArticleTitle">
import type { TkContentData } from "@teek/config";
import type { TkTitleTagProps } from "@teek/components/common/TitleTag";
import { useNamespace, useLocale } from "@teek/composables";
import { TkTitleTag } from "@teek/components/common/TitleTag";
import { createDynamicComponent } from "./compile";

defineOptions({ name: "ArticleTitle" });

defineProps<{ post: TkContentData; titleTagProps?: TkTitleTagProps }>();

const ns = useNamespace("article-title");
const { t } = useLocale();
</script>

<template>
  <span :class="ns.b()" :aria-label="t('tk.articleTitle.label')">
    <TkTitleTag
      v-if="post.frontmatter.titleTag && titleTagProps?.position === 'left'"
      :text="post.frontmatter.titleTag"
      v-bind="titleTagProps"
      :aria-label="post.frontmatter.titleTag"
    />

    <slot>
      <template v-if="post.title">
        <component
          v-if="!post.title.includes('`<') && !post.title.includes('>`')"
          :is="createDynamicComponent(post.title)"
        />
        <span v-else>{{ post.title }}</span>
      </template>
    </slot>

    <TkTitleTag
      v-if="post.frontmatter.titleTag && titleTagProps?.position === 'right'"
      :text="post.frontmatter.titleTag"
      v-bind="titleTagProps"
      :aria-label="post.frontmatter.titleTag"
    />
  </span>
</template>
