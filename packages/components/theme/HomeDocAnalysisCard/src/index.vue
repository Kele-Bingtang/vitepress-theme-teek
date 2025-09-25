<script setup lang="ts" name="HomeDocAnalysisCard">
import type { DocAnalysis, DocAnalysisInfo } from "@teek/config";
import { computed, nextTick, watch } from "vue";
import { useData } from "vitepress";
import { useNamespace, useLocale, useUvPv, useVpRouter } from "@teek/composables";
import { formatDiffDateToDay, getNowDate, isFunction, formatDiffDate } from "@teek/helper";
import { docAnalysisIcon } from "@teek/static";
import { useTeekConfig, usePosts } from "@teek/components/theme/ConfigProvider";
import { TkPageCard } from "@teek/components/common/PageCard";

defineOptions({ name: "HomeDocAnalysisCard" });

const ns = useNamespace("doc-analysis");
const { t } = useLocale();
const { getTeekConfigRef } = useTeekConfig();
const { theme } = useData();
const vpRouter = useVpRouter();

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
  url: "",
  provider: "",
  siteView: true,
  iteration: false,
  pageIteration: 2000,
  permalink: true,
  ...docAnalysisConfig.value.statistics,
}));
// 是否使用访问量功能
const useSiteView = computed(() => !!statisticsConfig.value.provider && statisticsConfig.value.siteView);

const { router } = vpRouter;

// 通过 busuanzi、vercount 等网站流量统计提供商获取访问量和访客数
const { sitePv, siteUv, isGet, request } = useUvPv(false, statisticsConfig.value);

// 支持开关
watch(useSiteView, newVal => {
  if (newVal) request();
});

watch(
  router.route,
  () => {
    if (useSiteView.value) {
      // 如果使用了 permalink 插件且 permalink 为 true，则代表使用 permalink 作为统计链接
      if (statisticsConfig.value.permalink && router.state?.permalinkPlugin) {
        nextTick(request);
      } else request();
    }
  },
  { immediate: true }
);

type DocAnalysisResolve = DocAnalysisInfo & { originValue?: string | number };

// appendInfo 支持函数，因此单独抽离出来计算，防止函数里有请求导致重复触发
const appendInfo = computed(() => {
  const { appendInfo } = docAnalysisConfig.value;
  return isFunction(appendInfo) ? appendInfo() : appendInfo;
});

const docAnalysisList = computed<DocAnalysisResolve[]>(() => {
  const { createTime, overrideInfo } = docAnalysisConfig.value;
  const { fileList = [], totalFileWords, lastCommitTime } = docAnalysisInfo.value;

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
      originValue: sitePv.value,
      value: isGet.value ? `${sitePv.value} ${t("tk.docAnalysisCard.viewCountUnit")}` : "Get...",
      show: useSiteView.value,
    },
    {
      key: "visitCount",
      label: t("tk.docAnalysisCard.visitCount"),
      originValue: siteUv.value,
      value: isGet.value ? `${siteUv.value} ${t("tk.docAnalysisCard.visitCountUnit")}` : "Get...",
      show: useSiteView.value,
    },
    ...appendInfo.value,
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
  <TkPageCard :title="finalTitle" :class="ns.b()" :aria-label="t('tk.docAnalysisCard.label')">
    <template v-for="item in docAnalysisList" :key="item.key">
      <div v-if="item.show !== false" :class="ns.e('item')">
        <span v-html="item.label" />
        <span v-html="item.value" />
      </div>
    </template>
  </TkPageCard>
</template>
