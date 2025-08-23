<script setup lang="ts" name="HomeTagCard">
import type { Tag } from "@teek/config";
import { watch, computed, ref, inject, onMounted } from "vue";
import { useRouter, withBase } from "vitepress";
import { useNamespace, useLocale } from "@teek/composables";
import { tagIcon } from "@teek/static";
import { isFunction } from "@teek/helper";
import { pageNumKey } from "@teek/components/theme/HomePostList";
import { useTeekConfig, usePagePath, usePosts, useTagColor } from "@teek/components/theme/ConfigProvider";
import { postDataUpdateSymbol } from "@teek/components/theme/Home/src/home";
import { TkPageCard } from "@teek/components/common/PageCard";

defineOptions({ name: "HomeTagCard" });

const ns = useNamespace("tag");
const { t } = useLocale();
const { getTeekConfigRef } = useTeekConfig();
const { tagsPage = false } = defineProps<{ tagsPage?: boolean }>();

const pageNum = ref(1);
// 标签配置项
const tagConfig = getTeekConfigRef<Required<Tag>>("tag", {
  pageTitle: t("tk.tagCard.pageTitle", { icon: tagIcon }),
  homeTitle: t("tk.tagCard.homeTitle", { icon: tagIcon }),
  emptyLabel: t("tk.tagCard.emptyLabel"),
  moreLabel: t("tk.tagCard.moreLabel"),
  limit: 21,
  autoPage: false,
  pageSpeed: 4000,
  bgColor: "",
});

const { tagPath } = usePagePath();
const posts = usePosts();
const tagColor = useTagColor();

const tags = computed(() => posts.value.groupCards.tags);

// 当前显示的标签，如果是在标签页，则显示所有标签，如果在首页，则显示前 limit 个标签
const currentTags = computed(() => {
  const { limit } = tagConfig.value;
  const t = tags.value;
  const p = pageNum.value;
  return tagsPage ? t : t.slice((p - 1) * limit, p * limit);
});

const finalTitle = computed(() => {
  const { pageTitle, homeTitle } = tagConfig.value;
  const pt = isFunction(pageTitle) ? pageTitle(tagIcon) : pageTitle;
  const ht = isFunction(homeTitle) ? homeTitle(tagIcon) : homeTitle;
  return { pt, ht };
});

const getTagStyle = (index: number) => {
  const tagColorConst = tagColor.value;

  // 标签色
  const color = tagColorConst[index % tagColorConst.length];
  return {
    [ns.cssVarName("home-tag-bg-color")]: color.bg,
    backgroundColor: color.bg,
    color: color.text,
    borderColor: color.border,
  };
};

const updatePostListData = inject(postDataUpdateSymbol, () => {});
const router = useRouter();
const selectedTag = ref("");
const tagKey = "tag";

/**
 * 点击分类，更新文章列表数据
 */
const handleSwitchTag = (tag = "") => {
  const { pathname, searchParams } = new URL(window.location.href);
  const categoriesPageLinkConst = withBase(tagPath.value);
  const inCategoriesPage = categoriesPageLinkConst === pathname;

  // 先删除旧的参数再追加新的
  searchParams.delete(pageNumKey);
  searchParams.append(pageNumKey, "1");
  searchParams.delete(tagKey);
  if (tag) searchParams.append(tagKey, tag);

  const searchParamsStr = tag ? `?${searchParams.toString()}` : "";

  // 避免重复点击
  if (inCategoriesPage && selectedTag.value === tag) return;
  selectedTag.value = tag;

  // 如果此时不在分类页，则跳转至分类页
  if (!inCategoriesPage) return router.go(categoriesPageLinkConst + searchParamsStr);

  // 如果在分类页，则替换 URL，但不刷新
  window.history.pushState({}, "", pathname + searchParamsStr);
  // 更新文章列表数据
  updatePostListData();
};

onMounted(() => {
  const { searchParams } = new URL(window.location.href);
  const tag = searchParams.get(tagKey);
  // 更新激活的分类
  if (tag) selectedTag.value = tag;
});

watch(
  () => tagsPage,
  () => {
    // 离开分类页后，激活状态清楚
    if (!tagsPage) {
      selectedTag.value = "";
      return;
    }

    const { searchParams } = new URL(window.location.href);
    const tag = searchParams.get(tagKey);
    if (tag && selectedTag.value !== tag) selectedTag.value = tag;
  }
);
</script>

<template>
  <TkPageCard
    :page="!tagsPage"
    v-model="pageNum"
    :pageSize="tagConfig.limit"
    :total="tags.length"
    :title="finalTitle[tagsPage ? 'pt' : 'ht']"
    :titleClick="handleSwitchTag"
    :autoPage="tagConfig.autoPage"
    :pageSpeed="tagConfig.pageSpeed"
    :class="[ns.b(), ns.is('page', tagsPage)]"
    :aria-label="t('tk.tagCard.label')"
  >
    <template #default="{ transitionName }">
      <TransitionGroup
        v-if="tags.length"
        :name="transitionName"
        tag="div"
        mode="out-in"
        :class="ns.e('list')"
        :aria-label="t('tk.tagCard.listLabel')"
      >
        <a
          v-for="(item, index) in currentTags"
          :key="item.name"
          :style="getTagStyle(index)"
          @click="handleSwitchTag(item.name)"
          :class="[{ active: item.name === selectedTag }, ns.join('pointer')]"
          :aria-label="item.name"
        >
          <span>{{ item.name }}</span>
          <span class="num">{{ item.length }}</span>
        </a>

        <a
          v-if="!tagsPage && tagConfig.limit < tags.length"
          :href="withBase(tagPath)"
          class="more"
          :aria-label="tagConfig.moreLabel"
        >
          {{ tagConfig.moreLabel }}
        </a>
      </TransitionGroup>

      <div v-else :class="ns.m('empty')" :aria-label="tagConfig.emptyLabel">{{ tagConfig.emptyLabel }}</div>
    </template>
  </TkPageCard>
</template>
