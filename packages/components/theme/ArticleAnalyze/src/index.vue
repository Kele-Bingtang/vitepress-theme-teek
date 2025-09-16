<script setup lang="ts" name="ArticleAnalyze">
import type { ArticleAnalyze, ArticlePosition, Author, DocAnalysis, DocDocAnalysisFileInfo } from "@teek/config";
import type { TkContentData } from "@teek/config";
import { computed, nextTick, ref, watch } from "vue";
import { useData } from "vitepress";
import { useNamespace, useLocale, useUvPv, useVpRouter } from "@teek/composables";
import { readingIcon, clockIcon, viewIcon } from "@teek/static/icons";
import { TkArticleBreadcrumb } from "@teek/components/theme/ArticleBreadcrumb";
import { useTeekConfig } from "@teek/components/theme/ConfigProvider";
import { TkArticleInfo } from "@teek/components/theme/ArticleInfo";
import { TkIcon } from "@teek/components/common/Icon";

defineOptions({ name: "ArticleAnalyze" });

const { breadcrumb = true, scope = "article" } = defineProps<{ breadcrumb?: boolean; scope?: ArticlePosition }>();

const ns = useNamespace("article-analyze");
const { t } = useLocale();

const { getTeekConfig, getTeekConfigRef } = useTeekConfig();
const { theme, frontmatter } = useData();
const vpRouter = useVpRouter();
const { router } = vpRouter;

// 文章基本信息
const post = computed<TkContentData>(() => ({
  author: getTeekConfig<Author>("author", {}),
  date: frontmatter.value.date,
  frontmatter: frontmatter.value,
  url: "",
  relativePath: "",
}));

// 站点信息数据
const docAnalysisInfo = computed(() => theme.value.docAnalysisInfo || {});

// 文章阅读量、阅读时长、字数
const pageViewInfo = computed(() => {
  let pageViewInfo: Partial<DocDocAnalysisFileInfo> = {};
  docAnalysisInfo.value.eachFileWords?.forEach(item => {
    if (item.fileInfo.relativePath === router.route.data.filePath) pageViewInfo = item;
  });

  return pageViewInfo;
});

// 文章信息配置项
const articleConfig = getTeekConfigRef<ArticleAnalyze>("articleAnalyze", {
  showInfo: true,
  showIcon: true,
  teleport: {},
});

// 是否展示作者、日期、分类、标签等信息
const isShowInfo = computed(() => {
  const arr = [articleConfig.value.showInfo].flat();
  if (arr.includes(true) || arr.includes("article")) return true;
  return false;
});

const baseInfoRef = ref<HTMLDivElement>();

// 传送到指定位置
const teleportInfo = () => {
  const { selector, position = "after", className = "teleport" } = articleConfig.value.teleport || {};
  const baseInfoRefConst = baseInfoRef.value;
  // 没有指定选择器，则不进行传送
  if (!selector || !baseInfoRefConst) return;

  const docDomContainer = document.querySelector("#VPContent");
  const targetDom = docDomContainer?.querySelector(selector);

  // 传送前先尝试删除传送位置的自己，避免传送重新渲染
  targetDom?.parentElement?.querySelectorAll(`.${ns.e("wrapper")}`).forEach(v => v.remove());

  baseInfoRefConst.classList.add(className);
  targetDom?.[position]?.(baseInfoRefConst);
};

watch(router.route, () => nextTick(teleportInfo), { immediate: true, flush: "post" });

const docAnalysisConfig = getTeekConfigRef<DocAnalysis>("docAnalysis", {
  wordCount: true,
  readingTime: true,
  statistics: {},
});

const statisticsConfig = computed<NonNullable<DocAnalysis["statistics"]>>(() => ({
  url: "",
  provider: "",
  pageView: true,
  tryRequest: false,
  tryCount: 5,
  tryIterationTime: 2000,
  permalink: true,
  ...docAnalysisConfig.value.statistics,
}));
// 是否使用访问量功能
const usePageView = computed(() => !!statisticsConfig.value.provider && statisticsConfig.value.pageView);

// 通过 busuanzi、vercount 等网站流量统计提供商获取访问量
const { pagePv, isGet, request } = useUvPv(false, statisticsConfig.value);

// 支持开关
watch(usePageView, newVal => {
  if (newVal) request();
});

watch(
  router.route,
  () => {
    if (usePageView.value) {
      // 如果使用了 permalink 插件且 permalink 为 true，则代表使用 permalink 作为统计链接
      if (statisticsConfig.value.permalink && router.state?.permalinkPlugin) {
        nextTick(request);
      } else request();
    }
  },
  { immediate: true }
);
</script>

<template>
  <div :class="`${ns.b()} flx-justify-between`" :aria-label="t('tk.articleAnalyze.label')">
    <TkArticleBreadcrumb v-if="breadcrumb" />

    <div v-if="isShowInfo" ref="baseInfoRef" :class="`${ns.e('wrapper')} flx-align-center`">
      <TkArticleInfo :post :scope />

      <div v-if="docAnalysisConfig.wordCount && pageViewInfo.wordCount" class="flx-center">
        <TkIcon v-if="articleConfig.showIcon" :icon="readingIcon" aria-hidden="true" />
        <a :title="t('tk.articleAnalyze.wordCount')" class="hover-color" :aria-label="t('tk.articleAnalyze.wordCount')">
          {{ pageViewInfo.wordCount }}
        </a>
      </div>

      <div v-if="docAnalysisConfig.readingTime && pageViewInfo.readingTime" class="flx-center">
        <TkIcon v-if="articleConfig.showIcon" :icon="clockIcon" />
        <a
          :title="t('tk.articleAnalyze.readingTime')"
          class="hover-color"
          :aria-label="t('tk.articleAnalyze.readingTime')"
        >
          {{ pageViewInfo.readingTime }}
        </a>
      </div>

      <div v-if="usePageView" class="flx-center">
        <TkIcon v-if="articleConfig.showIcon" :icon="viewIcon" />
        <a :title="t('tk.articleAnalyze.pageView')" class="hover-color" :aria-label="t('tk.articleAnalyze.pageView')">
          {{ isGet ? pagePv : "Get..." }}
        </a>
      </div>
    </div>
  </div>
</template>
