<script setup lang="ts" name="ArticleInfo">
import type { PostBaseInfoProps } from "./articleInfo";
import type { Article, ArticleInfoPosition, TkContentData } from "@teek/config";
import { useRoute, withBase, useData } from "vitepress";
import { computed, unref } from "vue";
import { formatDate, isFunction } from "@teek/helper";
import { useNamespace, useLocale } from "@teek/hooks";
import { userIcon, calendarIcon, editPenIcon, folderOpenedIcon, collectionTagIcon } from "@teek/assets";
import { useTeekConfig, usePosts } from "@teek/configProvider";
import { TkIcon } from "@teek/components/common/Icon";

defineOptions({ name: "ArticleInfo" });

const ns = useNamespace("article-info");
const { t } = useLocale();

const { post, scope, split = false } = defineProps<PostBaseInfoProps>();

const { getTeekConfigRef } = useTeekConfig();
const { page } = useData();

// 文章信息配置项
const articleConfig = getTeekConfigRef<Article>("article", {
  showIcon: true,
  dateFormat: "yyyy-MM-dd",
  showAuthor: true,
  showCreateDate: true,
  showUpdateDate: false,
  showCategory: false,
  showTag: false,
  titleTip: {},
});

const posts = usePosts();
const route = useRoute();

// 文章创建时间，先读取 post.date，如果不存在，则遍历所有 md 文档获取文档的创建时间（因此建议在文档的 frontmatter 配置 date，让文章扫描耗费性能降低）
const createDate = computed(() => {
  const originPosts: TkContentData[] = unref(posts).originPosts;
  const date =
    post.date ||
    originPosts.filter(item => [item.url, `${item.url}.md`].includes(`/${route.data.relativePath}`))[0]?.date;
  const dateFormatConst = unref(articleConfig).dateFormat;

  if (isFunction(dateFormatConst)) return dateFormatConst(date || "");
  return formatDate(date || new Date(), dateFormatConst);
});

// 文章更新时间，取 git 的最后一次提交时间
const updateDate = computed(() => {
  const date = unref(page).lastUpdated;
  if (!date) return "";

  const dateFormatConst = unref(articleConfig).dateFormat;

  if (isFunction(dateFormatConst)) return dateFormatConst(date);
  return formatDate(date, dateFormatConst);
});

const baseInfo = computed(() => {
  const { showAuthor, showCreateDate, showUpdateDate, showCategory, showTag, titleTip = {} } = unref(articleConfig);

  return [
    {
      title: unref(titleTip).author ?? t("tk.articleInfo.author"),
      icon: userIcon,
      data: post.author?.name,
      href: post.author?.link,
      target: post.author?.link ? "_blank" : "_self",
      show: isShow(showAuthor),
    },
    {
      title: unref(titleTip).createTime ?? t("tk.articleInfo.createTime"),
      icon: calendarIcon,
      data: unref(createDate),
      show: isShow(showCreateDate),
    },
    {
      title: unref(titleTip).updateTime ?? t("tk.articleInfo.updateTime"),
      icon: editPenIcon,
      data: unref(updateDate),
      show: unref(updateDate) && scope === "article" && showUpdateDate,
    },
    {
      title: unref(titleTip).category ?? t("tk.articleInfo.category"),
      icon: folderOpenedIcon,
      dataList: post.frontmatter?.categories || [],
      href: "/categories?category={data}",
      class: "or",
      show: scope === "post" || isShow(showCategory),
    },
    {
      title: unref(titleTip).tag ?? t("tk.articleInfo.tag"),
      icon: collectionTagIcon,
      dataList: post.frontmatter?.tags || [],
      href: "/tags?tag={data}",
      class: "or",
      show: scope === "post" || isShow(showTag),
    },
  ];
});

const isShow = (showInfo?: boolean | ArticleInfoPosition[]) => {
  const arr = [showInfo || []].flat();
  if (arr.includes(true) || arr.includes(scope)) return true;
  return false;
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
        <TkIcon v-if="articleConfig.showIcon" :icon="item.icon" aria-hidden="true" />
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
