<script setup lang="ts" name="HomeRightInfo">
import { computed, unref } from "vue";
import { useNamespace } from "@teek/hooks";
import { useTeekConfig, usePage } from "@teek/configProvider";
import { TkHomeMyCard } from "@teek/components/theme/HomeMyCard";
import { TkHomeTopArticleCard } from "@teek/components/theme/HomeTopArticleCard";
import { TkHomeCategoryCard } from "@teek/components/theme/HomeCategoryCard";
import { TkHomeTagCard } from "@teek/components/theme/HomeTagCard";
import { TkHomeFriendLinkCard } from "@teek/components/theme/HomeFriendLinkCard";
import { TkHomeDocAnalysisCard } from "@teek/components/theme/HomeDocAnalysisCard";

defineOptions({ name: "HomeRightInfo" });

const ns = useNamespace("home-right-info");
const { getTeekConfig } = useTeekConfig();
const teekConfig = computed(() => getTeekConfig(null, {}));

// 获取用户配置 + 默认的卡片排序
const finalHomeCardSort = computed(() => {
  const configCardSort = unref(teekConfig).homeCardSort || [];
  return ["my", ...new Set([...configCardSort, ...["topArticle", "category", "tag", "friendLink", "docAnalysis"]])];
});

const { isHomePage, isCategoriesPage, isTagsPage } = usePage();

// 定义组件映射
const componentMap = computed(() => {
  const { topArticle, category, tag, docAnalysis, friendLink } = unref(teekConfig);
  const homePage = unref(isHomePage);
  const categoriesPage = unref(isCategoriesPage);
  const tagsPage = unref(isTagsPage);

  return {
    my: {
      el: TkHomeMyCard,
      show: homePage,
      slot: ["-home-my-before", "-home-my-after"],
    },
    topArticle: {
      el: TkHomeTopArticleCard,
      show: homePage && topArticle?.enabled !== false,
      slot: ["-home-top-article-before", "-home-top-article-after"],
    },
    category: {
      el: TkHomeCategoryCard,
      props: { categoriesPage: categoriesPage },
      show: (homePage || categoriesPage) && category?.enabled !== false,
      slot: ["-home-category-before", "-home-category-after"],
    },
    tag: {
      el: TkHomeTagCard,
      props: { tagsPage: tagsPage },
      show: (homePage || tagsPage) && tag?.enabled !== false,
      slot: ["-home-tag-before", "-home-tag-after"],
    },
    docAnalysis: {
      el: TkHomeDocAnalysisCard,
      show: homePage && docAnalysis?.enabled !== false,
      slot: ["-home-doc-analysis-before", "-home-doc-analysis-after"],
    },
    friendLink: {
      el: TkHomeFriendLinkCard,
      show: homePage && friendLink?.enabled !== false,
      slot: ["-home-friend-link-before", "-home-friend-link-after"],
    },
  };
});
</script>

<template>
  <div :class="[ns.b(), 'flx-column']">
    <slot name="teek-home-info-before" />

    <template v-for="item in finalHomeCardSort" :key="item">
      <component v-if="componentMap[item]?.show" :is="componentMap[item]?.el" v-bind="componentMap[item]?.props">
        <template v-for="name in componentMap[item]?.slot" :key="name" #[name]>
          <slot :name="name" />
        </template>
      </component>
    </template>

    <slot name="teek-home-info-after" />
  </div>
</template>
