<script setup lang="ts" name="HomeCardList">
import type { TeekConfig } from "@teek/config";
import { computed, onMounted, useTemplateRef } from "vue";
import { useWindowTransition, useNamespace } from "@teek/composables";
import { useTeekConfig, usePageState, useWindowTransitionConfig } from "@teek/components/theme/ConfigProvider";
import { TkHomeMyCard } from "@teek/components/theme/HomeMyCard";
import { TkHomeTopArticleCard } from "@teek/components/theme/HomeTopArticleCard";
import { TkHomeCategoryCard } from "@teek/components/theme/HomeCategoryCard";
import { TkHomeTagCard } from "@teek/components/theme/HomeTagCard";
import { TkHomeFriendLinkCard } from "@teek/components/theme/HomeFriendLinkCard";
import { TkHomeDocAnalysisCard } from "@teek/components/theme/HomeDocAnalysisCard";

defineOptions({ name: "HomeCardList" });

const ns = useNamespace("home-card-list");
const { getTeekConfigRef } = useTeekConfig();
const teekConfig = getTeekConfigRef<TeekConfig>(null, {});

// 获取用户配置 + 默认的卡片排序
const finalHomeCardSort = computed(() => {
  const configCardSort = teekConfig.value.homeCardSort || [];
  return ["my", ...new Set([...configCardSort, ...["topArticle", "category", "tag", "friendLink", "docAnalysis"]])];
});

const { isHomePage, isCategoriesPage, isTagsPage } = usePageState();

// 定义组件映射
const componentMap = computed(() => {
  const { topArticle, category, tag, docAnalysis, friendLink } = teekConfig.value;
  const homePage = isHomePage.value;
  const categoriesPage = isCategoriesPage.value;
  const tagsPage = isTagsPage.value;

  return {
    my: {
      el: TkHomeMyCard,
      show: homePage,
      slot: ["teek-home-card-my-before", "teek-home-card-my-after"],
    },
    topArticle: {
      el: TkHomeTopArticleCard,
      show: homePage && topArticle?.enabled !== false,
      slot: ["teek-home-card-top-article-before", "teek-home-card-top-article-after"],
    },
    category: {
      el: TkHomeCategoryCard,
      props: { categoriesPage: categoriesPage },
      show: (homePage || categoriesPage) && category?.enabled !== false,
      slot: ["teek-home-card-category-before", "teek-home-card-category-after"],
    },
    tag: {
      el: TkHomeTagCard,
      props: { tagsPage: tagsPage },
      show: (homePage || tagsPage) && tag?.enabled !== false,
      slot: ["teek-home-card-tag-before", "teek-home-card-tag-after"],
    },
    docAnalysis: {
      el: TkHomeDocAnalysisCard,
      show: homePage && docAnalysis?.enabled !== false,
      slot: ["teek-home-card-doc-analysis-before", "teek-home-card-doc-analysis-after"],
    },
    friendLink: {
      el: TkHomeFriendLinkCard,
      show: homePage && friendLink?.enabled !== false,
      slot: ["teek-home-card-friend-link-before", "teek-home-card-friend-link-after"],
    },
  };
});

// 屏幕加载元素时，开启过渡动画
const windowTransition = useWindowTransitionConfig(config => config.card);
const cardListInstance = useTemplateRef("cardListInstance");
const { start } = useWindowTransition(cardListInstance as any, false);

onMounted(() => {
  windowTransition.value && start();
});
</script>

<template>
  <div :class="[ns.b(), 'flx-column']">
    <slot name="teek-home-card-before" />

    <slot name="teek-home-card">
      <template v-for="item in finalHomeCardSort" :key="item">
        <!-- 使用淡入动画 -->
        <div v-if="windowTransition" ref="cardListInstance">
          <component v-if="componentMap[item]?.show" :is="componentMap[item]?.el" v-bind="componentMap[item]?.props">
            <template v-for="name in componentMap[item]?.slot" :key="name" #[name]>
              <slot :name="name" />
            </template>
          </component>
        </div>

        <!-- 不使用淡入动画 -->
        <template v-else>
          <component v-if="componentMap[item]?.show" :is="componentMap[item]?.el" v-bind="componentMap[item]?.props">
            <template v-for="name in componentMap[item]?.slot" :key="name" #[name]>
              <slot :name="name" />
            </template>
          </component>
        </template>
      </template>
    </slot>

    <slot name="teek-home-card-after" />
  </div>
</template>
