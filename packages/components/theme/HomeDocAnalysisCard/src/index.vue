<script setup lang="ts" name="HomeDocAnalysisCard">
import type { DocAnalysis, DocAnalysisInfo } from "@teek/config";
import { computed, watch } from "vue";
import { useData } from "vitepress";
import { useNamespace, useLocale, useBuSuanZi, useVpRouter } from "@teek/composables";
import { formatDiffDateToDay, getNowDate, isFunction, formatDiffDate } from "@teek/helper";
import { docAnalysisIcon } from "@teek/static";
import { useTeekConfig, usePosts } from "@teek/components/theme/ConfigProvider";
import { TkPageCard } from "@teek/components/common/PageCard";

defineOptions({ name: "HomeDocAnalysisCard" });

const ns = useNamespace("doc-analysis");
const { t } = useLocale();
const { getTeekConfigRef } = useTeekConfig();
const { theme } = useData();

// 站点信息配置项
const docAnalysisConfig = getTeekConfigRef<Required<DocAnalysis>>("docAnalysis", {
  createTime: undefined,
  title: t("tk.docAnalysisCard.title", { icon: docAnalysisIcon }),
  statistics: {},
  overrideInfo: [],
  appendInfo: [],
});

const docAnalysisInfo = computed(() => theme.value.docAnalysisInfo || {});

const finalTitle = computed(() => {
  const { title } = docAnalysisConfig.value;
  if (isFunction(title)) return title(docAnalysisIcon);
  return title;
});

const createToNowDay = computed(() => formatDiffDateToDay(docAnalysisConfig.value.createTime || getNowDate()));

const posts = usePosts();

/**
 * 本周新增的文章数
 */
const postAddNum = computed(() => {
  const sortPostsByDate = posts.value.sortPostsByDate;
  let weekAddNum = 0;
  let monthAddNum = 0;

  const currentDate = new Date(getNowDate());

  for (const item of sortPostsByDate) {
    if (!item.date) continue;

    const postDate = new Date(item.date);

    if (postDate.getTime() > currentDate.getTime() - 7 * 24 * 60 * 60 * 1000) weekAddNum++;
    if (postDate.getTime() > currentDate.getTime() - 30 * 24 * 60 * 60 * 1000) monthAddNum++;
    else return { weekAddNum, monthAddNum }; // sortPostsByDate 本身已经对时间排好序了，因此不满足近一月，也就不需要遍历了
  }

  return { weekAddNum, monthAddNum };
});

/**
 * 格式化字数
 */
const formatWordCount = (wordCount: number) => {
  if (wordCount < 1000) return wordCount + "";
  if (wordCount < 1000000) return Math.round(wordCount / 100) / 10 + "k";
  return Math.round(wordCount / 10000) / 10 + "w";
};

const statisticsConfig = computed<NonNullable<DocAnalysis["statistics"]>>(() => ({
  provider: "",
  siteView: true,
  iteration: false,
  pageIteration: 2000,
  permalink: true,
  ...docAnalysisConfig.value.statistics,
}));
// 是否使用访问量功能
const useSiteView = computed(() => !!statisticsConfig.value.provider && statisticsConfig.value.siteView);

// 通过不蒜子获取访问量和访客数
const { sitePv, siteUv, isGet, request } = useBuSuanZi(useSiteView.value, {
  tryRequest: statisticsConfig.value.tryRequest,
  tryCount: statisticsConfig.value.tryCount,
  tryIterationTime: statisticsConfig.value.tryIterationTime,
});

const statisticsInfo = computed(() => ({ siteUv: siteUv.value, sitePv: sitePv.value, isGet: isGet.value }));

// 支持开关
watch(useSiteView, newVal => {
  if (newVal) request();
});

const vpRouter = useVpRouter();
const { router } = vpRouter;

// 如果使用了 permalink 插件，则可以使用该插件提供的 onAfterUrlLoad 回调监听 URL 变化事件
if (statisticsConfig.value.permalink && router.state?.permalinkPlugin) {
  vpRouter.bindRouterFn("urlChange", () => {
    router.onAfterUrlLoad = () => {
      if (useSiteView.value) request();
    };
  });
} else {
  watch(router.route, () => {
    if (useSiteView.value) request();
  });
}

type DocAnalysisResolve = DocAnalysisInfo & { originValue?: string | number };

const docAnalysisList = computed<DocAnalysisResolve[]>(() => {
  const { createTime, appendInfo, overrideInfo } = docAnalysisConfig.value;
  const { fileList = [], totalFileWords, lastCommitTime } = docAnalysisInfo.value;
  const { siteUv, sitePv, isGet } = statisticsInfo.value;

  const list: DocAnalysisResolve[] = [
    {
      key: "totalPosts",
      label: t("tk.docAnalysisCard.totalPosts"),
      originValue: fileList.length,
      value: `${fileList.length} ${t("tk.docAnalysisCard.fileUnit")}`,
    },
    {
      key: "weekAddNum",
      label: t("tk.docAnalysisCard.weekAddNum"),
      originValue: postAddNum.value?.weekAddNum,
      value: `${postAddNum.value?.weekAddNum} ${t("tk.docAnalysisCard.fileUnit")}`,
    },
    {
      key: "monthAddNum",
      label: t("tk.docAnalysisCard.monthAddNum"),
      originValue: postAddNum.value?.monthAddNum,
      value: `${postAddNum.value?.monthAddNum} ${t("tk.docAnalysisCard.fileUnit")}`,
    },
    {
      key: "runtime",
      label: t("tk.docAnalysisCard.runtime"),
      originValue: createTime,
      value: `${createToNowDay.value === 0 ? t("tk.docAnalysisCard.runtimeLess") : `${createToNowDay.value} ${t("tk.docAnalysisCard.runtimeUnit")}`}`,
    },
    {
      key: "totalWordCount",
      label: t("tk.docAnalysisCard.totalWordCount"),
      originValue: totalFileWords,
      value: `${formatWordCount(totalFileWords)} ${t("tk.docAnalysisCard.wordCountUnit")}`,
    },
    {
      key: "lastActiveTime",
      label: t("tk.docAnalysisCard.lastActiveTime"),
      originValue: lastCommitTime,
      value: formatDiffDate(lastCommitTime),
    },
    {
      key: "viewCount",
      label: t("tk.docAnalysisCard.viewCount"),
      originValue: sitePv,
      value: isGet ? `${sitePv} ${t("tk.docAnalysisCard.viewCountUnit")}` : "Get...",
      show: useSiteView.value,
    },
    {
      key: "visitCount",
      label: t("tk.docAnalysisCard.visitCount"),
      originValue: siteUv,
      value: isGet ? `${siteUv} ${t("tk.docAnalysisCard.visitCountUnit")}` : "Get...",
      show: useSiteView.value,
    },
    ...(appendInfo as any[]),
  ];

  if (overrideInfo.length) {
    list.forEach(item => {
      const override = overrideInfo.find((overrideItem: any) => overrideItem.key === item.key);
      if (override) {
        item.label = override.label || item.label;
        item.value = override.value ? override.value(item.originValue || "", item.value) : item.value;
        item.show = override.show !== false;
      }
    });
  }

  return list;
});
</script>

<template>
  <slot name="teek-home-card-doc-analysis-before" />

  <slot name="teek-home-card-doc-analysis">
    <TkPageCard :title="finalTitle" :class="ns.b()" :aria-label="t('tk.docAnalysisCard.label')">
      <template v-for="item in docAnalysisList" :key="item.key">
        <div v-if="item.show !== false" :class="ns.e('item')">
          <span v-html="item.label" />
          <span v-html="item.value" />
        </div>
      </template>
    </TkPageCard>
  </slot>

  <slot name="teek-home-card-doc-analysis-after" />
</template>
