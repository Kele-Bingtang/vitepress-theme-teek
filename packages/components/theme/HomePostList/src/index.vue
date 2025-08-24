<script setup lang="ts" name="HomePostList">
import type { TkPaginationProps } from "@teek/components/common/Pagination";
import type { Post, TkContentData } from "@teek/config";
import { reactive, ref, watch, nextTick, computed, onMounted, watchEffect } from "vue";
import { useRoute, useData } from "vitepress";
import { isClient, removeUnit } from "@teek/helper";
import { useNamespace, useLocale, useWindowSize, useWindowTransition } from "@teek/composables";
import { emptyIcon } from "@teek/static";
import { useTeekConfig, usePosts, useWindowTransitionConfig } from "@teek/components/theme/ConfigProvider";
import { TkPagination } from "@teek/components/common/Pagination";
import { TkIcon } from "@teek/components/common/Icon";
import { pageNumKey } from "./homePostList";
import HomePostItem from "./HomePostItem.vue";
import HomePostItemCard from "./HomePostItemCard.vue";

defineOptions({ name: "HomePostList" });

const ns = useNamespace("post-list");
const { t } = useLocale();

const { getTeekConfigRef } = useTeekConfig();
const posts = usePosts();
const { frontmatter } = useData();

const postConfig = getTeekConfigRef<Required<Post>>("post", {
  postStyle: "list",
  coverImgMode: "default",
  emptyLabel: t("tk.homePost.emptyLabel"),
  transition: true,
  transitionName: ns.join("slide-fade"),
});
// 自定义一页数量 & 分页组件的 Props
const pageConfig = getTeekConfigRef<Partial<TkPaginationProps & { pageSize?: number }>>("page", {});

// 分页信息
const pageNum = ref(1);
const total = ref(0);
const coverImgMode = ref(postConfig.value.coverImgMode);

const isPaging = defineModel({ default: false });

const defaultPageSize = computed(() => (postConfig.value.postStyle === "list" ? 10 : 15));
const pageSize = computed(() => pageConfig.value.pageSize || defaultPageSize.value);

const route = useRoute();
const currentPosts = ref<TkContentData[]>([]);
const totalPostsCount = ref(0);

watchEffect(() => {
  coverImgMode.value = postConfig.value.coverImgMode;
});

const updateData = () => {
  if (!isClient) return;

  // 分页处理，如果 URL 查询参数存在 pageNum，则加载对应的 post
  const { searchParams } = new URL(window.location.href);
  const p = Number(searchParams.get(pageNumKey)) || 1;
  if (p !== pageNum.value) pageNum.value = p;
  // 大于 1 代表开始分页
  isPaging.value = p > 1;

  const postConst = posts.value;
  const frontmatterConst = frontmatter.value;
  let post = postConst.sortPostsByDateAndSticky;

  if (frontmatterConst.categoriesPage) {
    // 在分类页时，如果 URL 查询参数存在 category，则加载该 category 的 post，不存在则加载所有 post
    const c = searchParams.get("category");
    post = c ? postConst.groupPosts.categories[c] : post.filter((item: TkContentData) => item.frontmatter.categories);
  } else if (frontmatterConst.tagsPage) {
    // 在标签页时，如果 URL 查询参数存在 tag，则加载该 tag 的 post，不存在则加载所有 post
    const t = searchParams.get("tag");
    post = t ? postConst.groupPosts.tags[t] : post.filter((item: TkContentData) => item.frontmatter.tags);
  }

  // 总数处理
  if (total.value !== post?.length) total.value = post?.length || 0;

  const inHomePosts = post.filter(item => item.frontmatter.inHomePost !== false);
  totalPostsCount.value = inHomePosts.length;

  currentPosts.value = inHomePosts.slice((pageNum.value - 1) * pageSize.value, pageNum.value * pageSize.value);
};

watch(() => route.path, updateData, { immediate: true });

/**
 * 切换分页时，记录到 URL 上
 */
const handlePagination = () => {
  const { searchParams } = new URL(window.location.href!);
  // 先删除旧的再追加新的
  searchParams.delete(pageNumKey);
  searchParams.append(pageNumKey, String(pageNum.value));
  // 替换 URL，但不刷新
  window.history.pushState({}, "", `${window.location.pathname}?${searchParams.toString()}`);

  // 更新数据
  updateData();
  // 滚动
  nextTick(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const navHeight = removeUnit(rootStyles.getPropertyValue("--vp-c-text-1"));
    // 滚动返回时，减去导航栏的高度
    document.querySelector("html")?.scrollTo({ top: window.innerHeight - navHeight, behavior: "smooth" });
  });
};

const pagePropsRef = reactive<TkPaginationProps>({ ...pageConfig.value });
const { size = "default", layout = "prev, pager, next, jumper, ->, total" } = pageConfig.value;
const targetSize = "small";
const targetLayout = "prev, pager, next";

/**
 * 响应式监听屏幕宽度，小于指定值后分页组件尺寸改为 small，布局改为 prev, pager, next，封面模式改为 default
 */
useWindowSize(width => {
  if (width <= 768) {
    if (pagePropsRef.size !== targetSize) pagePropsRef.size = targetSize;
  } else if (pagePropsRef.size !== size) pagePropsRef.size = size;

  if (width <= 960) {
    if (pagePropsRef.layout !== targetLayout) pagePropsRef.layout = targetLayout;
  } else if (pagePropsRef.layout !== layout) pagePropsRef.layout = layout;

  if (width <= 960) {
    if (coverImgMode.value !== "default") coverImgMode.value = "default";
  } else if (coverImgMode.value !== postConfig.value.coverImgMode) coverImgMode.value = postConfig.value.coverImgMode;
});

// 屏幕加载元素时，开启过渡动画
const windowTransition = useWindowTransitionConfig(config => config.post);
const postItemListInstance = ref<HTMLLIElement[] | null>(null);
const { start } = useWindowTransition(postItemListInstance as any, false);

onMounted(() => {
  windowTransition.value && start();
});

defineExpose({ updateData });
</script>

<template>
  <div :class="[ns.b(), ns.is('card', postConfig.postStyle === 'card')]">
    <template v-if="currentPosts">
      <slot name="teek-home-post-list" v-bind="{ currentPosts, transitionName: postConfig.transitionName }">
        <TransitionGroup
          tag="ul"
          :name="postConfig.transition ? postConfig.transitionName : ''"
          :aria-label="t('tk.homePost.label')"
        >
          <li v-for="post in currentPosts" :key="post.url" :class="{ 'full-img': coverImgMode === 'full' }">
            <div v-if="windowTransition" ref="postItemListInstance" style="width: 100%; height: 100%">
              <HomePostItemCard v-if="postConfig.postStyle === 'card'" :post />
              <HomePostItem v-else :post :coverImgMode />
            </div>

            <template v-else>
              <HomePostItemCard v-if="postConfig.postStyle === 'card'" :post />
              <HomePostItem v-else :post :coverImgMode />
            </template>
          </li>
        </TransitionGroup>
      </slot>

      <div :class="`${ns.e('pagination')} flx-justify-center`" :aria-label="t('tk.homePost.pageLabel')">
        <TkPagination
          v-if="totalPostsCount >= pageSize"
          v-model:page-size="pageSize"
          v-model:current-page="pageNum"
          :total="total"
          background
          @current-change="handlePagination"
          v-bind="{ ...pagePropsRef }"
        />
      </div>
    </template>

    <div v-else :class="[ns.e('empty'), 'flx-column-center']" :aria-label="postConfig.emptyLabel">
      <TkIcon :icon="emptyIcon" :size="160" color="var(--vp-c-text-3)" aria-hidden="true" />
      <span :class="ns.e('empty__title')">{{ postConfig.emptyLabel }}</span>
    </div>
  </div>
</template>
