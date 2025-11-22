<script setup lang="ts" name="ArticleInfo">
import type { PostBaseInfoProps } from "./types";
import type { ArticleAnalyze, ArticleInfoPosition, TkContentData } from "@teek/config";
import { useRoute, withBase, useData } from "vitepress";
import { computed } from "vue";
import { formatDate, isFunction } from "@teek/helper";
import { useNamespace, useLocale } from "@teek/composables";
import { userIcon, calendarIcon, editPenIcon, folderOpenedIcon, collectionTagIcon } from "@teek/static";
import { useTeekConfig, usePosts } from "@teek/components/theme/ConfigProvider";
import { TkIcon } from "@teek/components/common/Icon";

defineOptions({ name: "ArticleInfo" });

const ns = useNamespace("article-info");
const { t } = useLocale();

const { post, scope, split = false } = defineProps<PostBaseInfoProps>();

const { getTeekConfigRef } = useTeekConfig();
const { page } = useData();

// 文章信息配置项
const articleConfig = getTeekConfigRef<ArticleAnalyze>("articleAnalyze", {
  showIcon: true,
  dateFormat: "yyyy-MM-dd",
  dateUTC: true,
  showAuthor: true,
  showCreateDate: true,
  showUpdateDate: false,
  showCategory: false,
  showTag: false,
});

const posts = usePosts();
const route = useRoute();

// 文章创建时间，先读取 post.date，如果不存在，则遍历所有 md 文档获取文档的创建时间（因此建议在文档的 frontmatter 配置 date，让文章扫描耗费性能降低）
const createDate = computed(() => {
  const originPosts: TkContentData[] = posts.value.originPosts;
  const date = post.date || originPosts.find(item => [item.url, item.frontmatter.permalink].includes(route.path))?.date;
  const dateFormatConst = articleConfig.value.dateFormat;

  if (isFunction(dateFormatConst)) return dateFormatConst(date || "");
  return formatDate(date || new Date(), dateFormatConst, articleConfig.value.dateUTC);
});

// 文章更新时间，取 git 的最后一次提交时间
const updateDate = computed(() => {
  const date = page.value.lastUpdated;
  if (!date) return "";

  const dateFormatConst = articleConfig.value.dateFormat;

  if (isFunction(dateFormatConst)) return dateFormatConst(date);
  return formatDate(date, dateFormatConst, !articleConfig.value.dateUTC);
});

const baseInfo = computed(() => {
  const { showAuthor, showCreateDate, showUpdateDate, showCategory, showTag } = articleConfig.value;

  return [
    {
      title: t("tk.articleInfo.author"),
      icon: userIcon,
      data: post.author?.name,
      href: post.author?.link,
      target: post.author?.link ? "_blank" : "_self",
      show: isShow(showAuthor),
    },
    {
      title: t("tk.articleInfo.createTime"),
      icon: calendarIcon,
      data: createDate.value,
      show: isShow(showCreateDate),
    },
    {
      title: t("tk.articleInfo.updateTime"),
      icon: editPenIcon,
      data: updateDate.value,
      show: updateDate.value && ((scope === "article" && showUpdateDate) || scope === "article-banner"),
    },
    {
      title: t("tk.articleInfo.category"),
      icon: folderOpenedIcon,
      dataList: post.frontmatter?.categories || [],
      href: "/categories?category={data}",
      class: "or",
      show: scope !== "article-banner" && (scope === "post" || isShow(showCategory)),
    },
    {
      title: t("tk.articleInfo.tag"),
      icon: collectionTagIcon,
      dataList: post.frontmatter?.tags || [],
      href: "/tags?tag={data}",
      class: "or",
      show: scope !== "article-banner" && (scope === "post" || isShow(showTag)),
    },
  ];
});

const isShow = (showInfo?: boolean | ArticleInfoPosition[]) => {
  const arr = [showInfo || []].flat();
  return arr.includes(true) || arr.includes(scope);
};
</script>

<template>
  <div :class="[ns.b(), scope]" role="group" :aria-label="t('tk.articleInfo.label')">
    <template v-for="item in baseInfo" :key="item.title">
      <span
        v-if="item.show && (item.data || item.dataList?.length)"
        :class="[ns.e('item'), { split }]"
        role="group"
        :aria-label="item.title"
      >
        <TkIcon v-if="articleConfig.showIcon" :icon="item.icon" :class="ns.e('icon')" aria-hidden="true" />
        <a
          v-if="item.data"
          :title="item.title"
          :href="item.href && withBase(item.href)"
          :target="item.target"
          :class="[item.class, 'hover-color']"
          :aria-label="item.data"
        >
          {{ item.data }}
        </a>
        <a
          v-else
          v-for="(data, index) in item.dataList"
          :key="index"
          :title="item.title"
          :href="item.href && withBase(item.href.replace('{data}', encodeURIComponent(data)))"
          :class="[item.class, 'hover-color']"
          :aria-label="data"
        >
          {{ data }}
        </a>
      </span>
    </template>

    <slot />
  </div>
</template>
