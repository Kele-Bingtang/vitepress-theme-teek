<script setup lang="ts" name="HomeTopArticleCard">
import type { TopArticle, TkContentData } from "@teek/config";
import { computed, ref, unref } from "vue";
import { withBase } from "vitepress";
import { useNamespace, useLocale } from "@teek/hooks";
import { topArticleIcon } from "@teek/assets";
import { formatDate, isFunction } from "@teek/helper";
import { useTeekConfig, usePosts, useBgColor } from "@teek/configProvider";
import { TkHomeCard } from "@teek/components/theme/HomeCard";

defineOptions({ name: "HomeTopArticleCard" });

const ns = useNamespace("top-article");
const { t } = useLocale();
const { getTeekConfigRef } = useTeekConfig();
const posts = usePosts();

// 精选文章配置项
const topArticleConfig = getTeekConfigRef<Required<TopArticle>>("topArticle", {
  limit: 4,
  title: t("tk.topArticleCard.title", { icon: topArticleIcon }),
  emptyLabel: t("tk.topArticleCard.emptyLabel"),
  autoPage: false,
  pageSpeed: 4000,
  dateFormat: "yyyy-MM-dd hh:mm:ss",
});

const topArticleList = computed(() => {
  const sortPostsByDateAndSticky: TkContentData[] = unref(posts).sortPostsByDateAndSticky;
  return sortPostsByDateAndSticky.filter(p => p.frontmatter.top)?.map((p, index) => ({ ...p, num: index + 1 }));
});

const pageNum = ref(1);

// 当前页的文章列表
const currentTopArticleList = computed(() => {
  const { limit } = unref(topArticleConfig);
  const p = unref(pageNum);
  return unref(topArticleList).slice((p - 1) * limit, p * limit);
});

const formatPostDate = (date?: string) => {
  const dateFormatConst = unref(topArticleConfig).dateFormat;

  if (isFunction(dateFormatConst)) return dateFormatConst(date || "");
  return formatDate(date || new Date(), dateFormatConst);
};

const finalTitle = computed(() => {
  const { title } = unref(topArticleConfig);
  if (isFunction(title)) return title(topArticleIcon);
  return title;
});

const bgColor = useBgColor();
const itemRefs = ref<HTMLLIElement[]>([]);

const getStyle = (num: number, index: number) => {
  return {
    [ns.cssVarName("num-bg-color")]: unref(bgColor)[num % unref(bgColor).length],
    top: `calc(${index} * (calc(${ns.cssVar("home-top-article-gap")} + ${unref(itemRefs)?.[index]?.getBoundingClientRect().height || 0}px)))`,
  };
};
</script>

<template>
  <slot name="teek-home-top-article-before" />

  <TkHomeCard
    page
    v-model="pageNum"
    :pageSize="topArticleConfig.limit"
    :total="topArticleList.length"
    :title="finalTitle"
    :autoPage="topArticleConfig.autoPage"
    :pageSpeed="topArticleConfig.pageSpeed"
    :class="ns.b()"
    :aria-label="t('tk.topArticleCard.label')"
  >
    <template #default="{ transitionName }">
      <TransitionGroup
        v-if="topArticleList.length"
        :name="transitionName"
        tag="ul"
        mode="out-in"
        :class="`${ns.e('list')} flx-column`"
        :aria-label="t('tk.topArticleCard.listLabel')"
      >
        <li
          ref="itemRefs"
          v-for="(item, index) in currentTopArticleList"
          :key="item.num"
          :class="ns.e('list__item')"
          :style="getStyle(item.num - 1, index)"
          :aria-label="item.title"
        >
          <span :class="['num', { sticky: item.frontmatter.sticky }]">{{ item.num }}</span>
          <div :class="ns.e('list__item__info')">
            <a :href="item.url && withBase(item.url)" class="hover-color flx-align-center">
              <span class="title sle">{{ item.title }}</span>
            </a>
            <div class="date">{{ formatPostDate(item.date) }}</div>
          </div>
        </li>
      </TransitionGroup>

      <div v-else :class="ns.m('empty')" :aria-label="topArticleConfig.emptyLabel">
        {{ topArticleConfig.emptyLabel }}
      </div>
    </template>
  </TkHomeCard>

  <slot name="teek-home-top-article-after" />
</template>
