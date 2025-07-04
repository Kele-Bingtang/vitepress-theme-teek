<script setup lang="ts" name="ArticleAnalyze">
import type { ArticleAnalyze, DocAnalysis, DocDocAnalysisFileInfo, TeekConfig } from "@teek/config";
import type { TkContentData } from "@teek/config";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useData } from "vitepress";
import { useNamespace, useLocale, useBuSuanZi, useVpRouter } from "@teek/composables";
import { readingIcon, clockIcon, viewIcon } from "@teek/static/icons";
import { TkArticleBreadcrumb } from "@teek/components/theme/ArticleBreadcrumb";
import { useTeekConfig } from "@teek/components/theme/ConfigProvider";
import { TkArticleInfo } from "@teek/components/theme/ArticleInfo";
import { TkIcon } from "@teek/components/common/Icon";

defineOptions({ name: "ArticleAnalyze" });

const ns = useNamespace("article-analyze");
const { t } = useLocale();

const { getTeekConfig, getTeekConfigRef } = useTeekConfig();
const { theme, frontmatter } = useData();
const vpRouter = useVpRouter();
const { router } = vpRouter;

// 文章基本信息
const post = computed<TkContentData>(() => ({
  author: getTeekConfig<TeekConfig["author"]>("author", {}),
  date: frontmatter.value.date,
  frontmatter: frontmatter.value,
  url: "",
}));

// 站点信息数据
const docAnalysisInfo = computed(() => theme.value.docAnalysisInfo || {});

// 文章阅读量、阅读时长、字数
const pageViewInfo = computed(() => {
  let pageViewInfo: Partial<DocDocAnalysisFileInfo> = {};
  docAnalysisInfo.value.eachFileWords?.forEach(item => {
    if (item.fileInfo.relativePath === router.route.data.relativePath) pageViewInfo = item;
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

onMounted(() => {
  nextTick(teleportInfo);
});

const docAnalysisConfig = getTeekConfigRef<DocAnalysis>("docAnalysis", {
  wordCount: true,
  readingTime: true,
  statistics: {},
});

const statisticsConfig = computed<NonNullable<DocAnalysis["statistics"]>>(() => ({
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

// 通过不蒜子获取访问量
const { pagePv, isGet, request } = useBuSuanZi(usePageView.value, {
  tryRequest: statisticsConfig.value.tryRequest,
  tryCount: statisticsConfig.value.tryCount,
  tryIterationTime: statisticsConfig.value.tryIterationTime,
});

const statisticsInfo = computed(() => ({ pagePv: pagePv.value, isGet: isGet.value }));

// 支持开关
watch(usePageView, newVal => {
  if (newVal) request();
});

// 如果使用了 permalink 插件，则可以使用该插件提供的 onAfterUrlLoad 回调监听 URL 变化事件
if (statisticsConfig.value.permalink && router.state?.permalinkPlugin) {
  vpRouter.bindRouterFn("urlChange", () => {
    router.onAfterUrlLoad = () => {
      if (usePageView.value) request();
    };
  });
} else {
  watch(router.route, () => {
    if (usePageView.value) request();
  });
}
</script>

<template>
  <div :class="`${ns.b()} flx-justify-between`" :aria-label="t('tk.articleAnalyze.label')">
    <TkArticleBreadcrumb />

    <div v-if="isShowInfo" ref="baseInfoRef" :class="`${ns.e('wrapper')} flx-align-center`">
      <TkArticleInfo :post scope="article" />

      <div v-if="docAnalysisConfig.wordCount || pageViewInfo.wordCount" class="flx-center">
        <TkIcon v-if="articleConfig.showIcon" :icon="readingIcon" aria-hidden="true" />
        <a :title="t('tk.articleAnalyze.wordCount')" class="hover-color" :aria-label="t('tk.articleAnalyze.wordCount')">
          {{ pageViewInfo.wordCount }}
        </a>
      </div>

      <div v-if="docAnalysisConfig.readingTime || pageViewInfo.readingTime" class="flx-center">
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
          {{ statisticsInfo.isGet ? statisticsInfo.pagePv : "Get..." }}
        </a>
      </div>
    </div>
  </div>
</template>
