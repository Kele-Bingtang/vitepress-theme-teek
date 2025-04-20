<script setup lang="ts" name="HomePostItem">
import type { Article, Post, TkContentData } from "@teek/config";
import { computed, unref } from "vue";
import { withBase } from "vitepress";
import { useNamespace, useLocale } from "@teek/hooks";
import { useTeekConfig } from "@teek/configProvider";
import { createImageViewer } from "@teek/components/common/ImageViewer";
import { TkArticleInfo } from "@teek/components/theme/ArticleInfo";

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
  imageViewer: {},
});
const articleConfig = getTeekConfigRef<Article>("article", {
  showInfo: true,
});

const postUrl = post.url && withBase(post.url);
const excerpt = computed(
  () => post.frontmatter.description || post.excerpt || (unref(postConfig).showCapture && post.capture)
);

/**
 * 点击图片进行预览
 */
const handleViewImg = (imgUrl: string | string[]) => {
  const urlList = [imgUrl || []].flat() as string[];
  createImageViewer({ ...unref(postConfig).imageViewer, urlList });
};

const coverImgMap = computed(() => {
  const imgSrcList = [post.frontmatter.coverImg || []].flat();
  return {
    default: {
      is: "div",
      props: {
        style: `background-image: url(${withBase(imgSrcList[0])});`,
        onClick: () => handleViewImg(imgSrcList),
      },
    },
    full: {
      is: "img",
      props: {
        src: withBase(imgSrcList[0]),
        onClick: () => handleViewImg(imgSrcList),
      },
    },
  };
});

// 是否展示作者、日期、分类、标签等信息
const isShowInfo = computed(() => {
  const arr = [unref(articleConfig).showInfo].flat();
  if (arr.includes(true) || arr.includes("post")) return true;
  return false;
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

    <div :class="[ns.e('info'), 'flx']">
      <div :class="ns.e('info__left')">
        <!-- 标题 -->
        <a class="title hover-color" :href="postUrl" :aria-label="post.title">
          {{ post.title }}
        </a>

        <!-- 摘要 top -->
        <div
          v-if="excerpt && postConfig.excerptPosition === 'top'"
          :class="`${ns.e('info__left__excerpt')} top`"
          :aria-label="t('tk.homePost.excerptLabel')"
        >
          <div class="excerpt" v-html="excerpt" />
          <a v-if="postConfig.showMore" class="more" :href="postUrl" :aria-label="postConfig.moreLabel">
            {{ postConfig.moreLabel }}
          </a>
        </div>

        <!-- 文章信息 -->
        <div :class="ns.e('info__left__footer')" :aria-label="t('tk.homePost.infoLabel')">
          <TkArticleInfo v-if="isShowInfo" :post scope="post" :split="postConfig.splitSeparator" />
        </div>

        <!-- 摘要 bottom -->
        <div
          v-if="excerpt && postConfig.excerptPosition === 'bottom'"
          :class="`${ns.e('info__left__excerpt')} bottom`"
          :aria-label="t('tk.homePost.excerptLabel')"
        >
          <div class="excerpt" v-html="excerpt" />
          <a v-if="postConfig.showMore" class="more" :href="postUrl" :aria-label="postConfig.moreLabel">
            {{ postConfig.moreLabel }}
          </a>
        </div>
      </div>

      <!-- 右侧封面图 -->
      <div :class="`${ns.e('info__right')} flx-align-center`">
        <div
          v-if="post.frontmatter.coverImg || post.frontmatter.coverImg?.length"
          class="cover-img"
          :aria-label="t('tk.homePost.coverImgLabel')"
        >
          <component
            :is="coverImgMap[coverImgMode].is"
            v-bind="coverImgMap[coverImgMode].props"
            :class="coverImgMode"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>
