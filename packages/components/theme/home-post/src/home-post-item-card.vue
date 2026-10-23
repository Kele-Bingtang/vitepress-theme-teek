<script setup lang="ts" name="HomePostItemCard">
import type { ArticleAnalyze, Post, TkContentData } from "@teek/config";
import { computed } from "vue";
import { withBase } from "vitepress";
import { getImageAlt } from "@teek/helper";
import { useNamespace, useLocale } from "@teek/composables";
import { topIcon } from "@teek/static";
import { useTeekConfig } from "@teek/components/theme/config-provider";
import { TkIcon } from "@teek/components/common/icon";
import { TkArticleInfo } from "@teek/components/theme/article-info";
import { TkArticleTitle } from "@teek/components/theme/article-title";

defineOptions({ name: "HomePostItemCard" });

const ns = useNamespace("post-item-card");
const { t } = useLocale();

const { post } = defineProps<{ post: TkContentData }>();

const { getTeekConfigRef } = useTeekConfig();

const postConfig = getTeekConfigRef<Post>("post", {
  showCapture: false,
  splitSeparator: false,
  cardStyleTitleTagPosition: "left",
  defaultCoverImg: [],
});
const articleConfig = getTeekConfigRef<ArticleAnalyze>("articleAnalyze", { showInfo: true });

const postUrl = post.url && withBase(post.url);

const imgSrcList = computed(() => [post.frontmatter.coverImg || postConfig.value.defaultCoverImg || []].flat());
const excerpt = computed(
  () => post.frontmatter.description || post.excerpt || (postConfig.value.showCapture && post.capture)
);

// 是否展示作者、日期、分类、标签等信息
const isShowInfo = computed(() => {
  const arr = [articleConfig.value.showInfo].flat();
  return arr.includes(true) || arr.includes("post");
});
</script>

<template>
  <div :class="ns.b()">
    <TkIcon
      v-if="!!post.frontmatter.sticky"
      :icon="topIcon"
      class="top"
      :size="40"
      :title="t('tk.homePost.pin', { sticky: post.frontmatter.sticky })"
      :aria-label="t('tk.homePost.pinLabel')"
    />

    <div v-if="imgSrcList.length" :class="ns.e('cover-img')">
      <a :href="postUrl">
        <img
          :src="withBase(imgSrcList[0])"
          :alt="getImageAlt(imgSrcList[0], post.frontmatter.coverAlt)"
          class="cover-img"
        />
      </a>
    </div>

    <div :class="[ns.e('info')]">
      <a class="title hover-color, sle" :href="postUrl" :aria-label="post.title">
        <TkArticleTitle :post :title-tag-props="{ position: postConfig.cardStyleTitleTagPosition }" />
      </a>

      <span v-if="excerpt" class="excerpt mle" v-html="excerpt" :aria-label="t('tk.homePost.excerptLabel')" />

      <TkArticleInfo
        v-if="isShowInfo"
        :post
        scope="post"
        :split="postConfig.splitSeparator"
        :aria-label="t('tk.homePost.infoLabel')"
      />
    </div>
  </div>
</template>
