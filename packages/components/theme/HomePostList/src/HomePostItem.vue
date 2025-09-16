<script setup lang="ts" name="HomePostItem">
import type { ArticleAnalyze, Post, TkContentData } from "@teek/config";
import { computed } from "vue";
import { withBase } from "vitepress";
import { useNamespace, useLocale } from "@teek/composables";
import { useTeekConfig } from "@teek/components/theme/ConfigProvider";
import { TkArticleInfo } from "@teek/components/theme/ArticleInfo";
import { TkArticleTitle } from "@teek/components/theme/ArticleTitle";

defineOptions({ name: "HomePostItem" });

const ns = useNamespace("post-item");
const { t } = useLocale();
const { post, coverImgMode } = defineProps<{ post: TkContentData; coverImgMode: "default" | "full" }>();

const { getTeekConfigRef } = useTeekConfig();

const postConfig = getTeekConfigRef<Post>("post", {
  excerptPosition: "bottom",
  showMore: true,
  moreLabel: t("tk.homePost.moreLabel"),
  showCapture: false,
  splitSeparator: false,
  listStyleTitleTagPosition: "right",
  defaultCoverImg: [],
});
const articleConfig = getTeekConfigRef<ArticleAnalyze>("articleAnalyze", {
  showInfo: true,
});

const postUrl = post.url && withBase(post.url);
const excerpt = computed(
  () => post.frontmatter.description || post.excerpt || (postConfig.value.showCapture && post.capture)
);

const imgSrcList = computed(() => [post.frontmatter.coverImg || postConfig.value.defaultCoverImg || []].flat());

const coverImgMap = computed(() => {
  const imgSrc = imgSrcList.value[Math.floor(Math.random() * imgSrcList.value.length)];
  return {
    default: {
      is: "div",
      props: {
        style: `background-image: url(${withBase(imgSrc)});`,
      },
    },
    full: {
      is: "img",
      props: {
        src: withBase(imgSrc),
      },
    },
  };
});

// 是否展示作者、日期、分类、标签等信息
const isShowInfo = computed(() => {
  const arr = [articleConfig.value.showInfo].flat();
  return arr.includes(true) || arr.includes("post");
});
</script>

<template>
  <div :class="ns.b()">
    <i
      v-if="!!post.frontmatter.sticky"
      class="pin"
      :title="t('tk.homePost.pin', { sticky: post.frontmatter.sticky })"
      :aria-label="t('tk.homePost.pinLabel')"
    />

    <div class="list flx">
      <div :class="ns.e('left')">
        <!-- 标题 -->
        <a :class="[ns.e('left__title'), 'hover-color', 'sle']" :href="postUrl" :aria-label="post.title">
          <TkArticleTitle :post :title-tag-props="{ position: postConfig.listStyleTitleTagPosition }" />
        </a>

        <!-- 摘要 top -->
        <div
          v-if="excerpt && postConfig.excerptPosition === 'top'"
          :class="`${ns.e('left__excerpt')} top`"
          :aria-label="t('tk.homePost.excerptLabel')"
        >
          <div class="excerpt" v-html="excerpt" />
          <a v-if="postConfig.showMore" class="more" :href="postUrl" :aria-label="postConfig.moreLabel">
            {{ postConfig.moreLabel }}
          </a>
        </div>

        <!-- 文章信息 -->
        <div :class="ns.e('left__footer')" :aria-label="t('tk.homePost.infoLabel')">
          <TkArticleInfo v-if="isShowInfo" :post scope="post" :split="postConfig.splitSeparator" />
        </div>

        <!-- 摘要 bottom -->
        <div
          v-if="excerpt && postConfig.excerptPosition === 'bottom'"
          :class="`${ns.e('left__excerpt')} bottom`"
          :aria-label="t('tk.homePost.excerptLabel')"
        >
          <div class="excerpt" v-html="excerpt" />
          <a v-if="postConfig.showMore" class="more" :href="postUrl" :aria-label="postConfig.moreLabel">
            {{ postConfig.moreLabel }}
          </a>
        </div>
      </div>

      <!-- 右侧封面图 -->
      <div :class="`${ns.e('right')} flx-align-center`">
        <a
          v-if="imgSrcList.length"
          :href="postUrl"
          :class="`${coverImgMode} cover`"
          :aria-label="t('tk.homePost.coverImgLabel')"
        >
          <component
            :is="coverImgMap[coverImgMode].is"
            v-bind="coverImgMap[coverImgMode].props"
            aria-hidden="true"
            class="cover-img"
          />
        </a>
      </div>
    </div>
  </div>
</template>
