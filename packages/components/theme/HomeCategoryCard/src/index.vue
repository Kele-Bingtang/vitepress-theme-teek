<script setup lang="ts" name="HomeCategoryCard">
import type { Category } from "@teek/config";
import { computed, ref, inject, onMounted, watch } from "vue";
import { useRouter, withBase } from "vitepress";
import { useNamespace, useLocale } from "@teek/composables";
import { categoryIcon } from "@teek/static";
import { isFunction } from "@teek/helper";
import { pageNumKey } from "@teek/components/theme/HomePostList/src/homePostList";
import { useTeekConfig, usePagePath, usePosts } from "@teek/components/theme/ConfigProvider";
import { postDataUpdateSymbol } from "@teek/components/theme/Home/src/home";
import { TkPageCard } from "@teek/components/common/PageCard";

defineOptions({ name: "HomeCategoryCard" });

const { categoriesPage = false } = defineProps<{ categoriesPage?: boolean }>();

const ns = useNamespace("category");
const { t } = useLocale();
const { getTeekConfigRef } = useTeekConfig();
const { categoryPath } = usePagePath();

// 分类配置项
const categoryConfig = getTeekConfigRef<Required<Category>>("category", {
  path: "/categories",
  pageTitle: t("tk.categoryCard.pageTitle", { icon: categoryIcon }),
  homeTitle: t("tk.categoryCard.homeTitle", { icon: categoryIcon }),
  emptyLabel: t("tk.categoryCard.emptyLabel"),
  moreLabel: t("tk.categoryCard.moreLabel"),
  limit: 5,
  autoPage: false,
  pageSpeed: 4000,
});

const posts = usePosts();
const pageNum = ref(1);
const categories = computed(() => posts.value.groupCards.categories);

// 当前显示的分类，如果是在分类页，则显示所有分类，如果在首页，则分页显示
const currentCategories = computed(() => {
  const { limit } = categoryConfig.value;
  const c = categories.value;
  const p = pageNum.value;
  return categoriesPage ? c : c.slice((p - 1) * limit, p * limit);
});

// 标题
const finalTitle = computed(() => {
  const { pageTitle, homeTitle } = categoryConfig.value;
  const pt = isFunction(pageTitle) ? pageTitle(categoryIcon) : pageTitle;
  const ht = isFunction(homeTitle) ? homeTitle(categoryIcon) : homeTitle;
  return { pt, ht };
});

const updatePostListData = inject(postDataUpdateSymbol, () => {});
const router = useRouter();
const selectedCategory = ref("");
const categoryKey = "category";

/**
 * 点击分类，更新文章列表数据
 */
const handleSwitchCategory = (category = "") => {
  const { pathname, searchParams } = new URL(window.location.href);
  const categoriesPathConst = withBase(categoryPath.value);
  const inCategoriesPage = categoriesPathConst === pathname;

  // 先删除旧的参数再追加新的
  searchParams.delete(pageNumKey);
  searchParams.append(pageNumKey, "1");
  searchParams.delete(categoryKey);
  if (category) searchParams.append(categoryKey, category);

  const searchParamsStr = category ? `?${searchParams.toString()}` : "";

  // 避免重复点击
  if (inCategoriesPage && selectedCategory.value === category) return;
  selectedCategory.value = category;

  // 如果此时不在分类页，则跳转至分类页
  if (!inCategoriesPage) return router.go(categoriesPathConst + searchParamsStr);

  // 如果在分类页，则替换 URL，但不刷新
  window.history.pushState({}, "", pathname + searchParamsStr);
  // 更新文章列表数据
  updatePostListData();
};

onMounted(() => {
  const { searchParams } = new URL(window.location.href);
  const category = searchParams.get(categoryKey);
  // 更新激活的分类
  if (category) selectedCategory.value = category;
});

watch(
  () => categoriesPage,
  () => {
    // 离开分类页后，激活状态清除
    if (!categoriesPage) {
      selectedCategory.value = "";
      return;
    }
    const { searchParams } = new URL(window.location.href);
    const category = searchParams.get(categoryKey);
    if (category && selectedCategory.value !== category) selectedCategory.value = category;
  }
);

const itemRefs = ref<HTMLLIElement[]>([]);
</script>

<template>
  <TkPageCard
    :page="!categoriesPage"
    v-model="pageNum"
    :pageSize="categoryConfig.limit"
    :total="categories.length"
    :title="finalTitle[categoriesPage ? 'pt' : 'ht']"
    :titleClick="handleSwitchCategory"
    :autoPage="categoryConfig.autoPage"
    :pageSpeed="categoryConfig.pageSpeed"
    :class="[ns.b(), ns.is('page', categoriesPage)]"
    :aria-label="t('tk.categoryCard.label')"
  >
    <template #default="{ transitionName }">
      <TransitionGroup
        v-if="categories.length"
        :name="transitionName"
        tag="div"
        mode="out-in"
        :class="`${ns.e('list')} flx-column`"
        :aria-label="t('tk.categoryCard.listLabel')"
      >
        <a
          ref="itemRefs"
          v-for="(item, index) in currentCategories"
          :key="item.name"
          @click="handleSwitchCategory(item.name)"
          :class="[{ active: item.name === selectedCategory }, 'hover-color']"
          :style="`top: ${index * itemRefs?.[index]?.getBoundingClientRect().height || 0}px`"
          :aria-label="item.name"
        >
          <span class="sle">{{ item.name }}</span>
          <span>{{ item.length }}</span>
        </a>

        <a
          v-if="!categoriesPage && categoryConfig.limit < categories.length"
          :href="withBase(categoryPath)"
          :aria-label="categoryConfig.moreLabel"
        >
          {{ categoryConfig.moreLabel }}
        </a>
      </TransitionGroup>

      <div v-else :class="ns.m('empty')" :aria-label="categoryConfig.emptyLabel">
        {{ categoryConfig.emptyLabel }}
      </div>
    </template>
  </TkPageCard>
</template>
