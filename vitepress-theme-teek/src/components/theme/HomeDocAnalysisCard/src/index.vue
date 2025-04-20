<script setup lang="ts" name="HomeDocAnalysisCard">
import type { DocAnalysis, DocAnalysisInfo } from "@teek/config";
import type { UseBuSuanZiReturn } from "@teek/hooks";
import { computed, ref, unref, watch } from "vue";
import { useData, useRoute } from "vitepress";
import { useNamespace, useLocale, useBuSuanZi } from "@teek/hooks";
import { formatDiffDateToDay, getNowDate, isFunction, formatDiffDate } from "@teek/helper";
import { docAnalysisIcon } from "@teek/assets";
import { useTeekConfig, usePosts } from "@teek/configProvider";
import { TkHomeCard } from "@teek/components/theme/HomeCard";

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

const docAnalysisInfo = computed(() => unref(theme).docAnalysisInfo || {});

const finalTitle = computed(() => {
  const { title } = unref(docAnalysisConfig);
  if (isFunction(title)) return title(docAnalysisIcon);
  return title;
});

const createToNowDay = computed(() => formatDiffDateToDay(unref(docAnalysisConfig).createTime || getNowDate()));

const posts = usePosts();

/**
 * 本周新增的文章数
 */
const postAddNum = computed(() => {
  const sortPostsByDate = unref(posts).sortPostsByDate;
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
  ...unref(docAnalysisConfig).statistics,
}));
// 是否使用访问量功能
const useSiteView = computed(() => !!unref(statisticsConfig).provider && unref(statisticsConfig).siteView);
const statisticsInfo: Partial<UseBuSuanZiReturn> = {
  sitePv: ref(0),
  siteUv: ref(0),
  isGet: ref(false),
};

// 通过不蒜子获取访问量和访客数
const { sitePv, siteUv, isGet, request } = useBuSuanZi(unref(useSiteView), {
  tryRequest: unref(statisticsConfig).tryRequest,
  tryCount: unref(statisticsConfig).tryCount,
  tryIterationTime: unref(statisticsConfig).tryIterationTime,
});
statisticsInfo.sitePv = sitePv;
statisticsInfo.siteUv = siteUv;
statisticsInfo.isGet = isGet;

const route = useRoute();
watch(route, () => {
  if (unref(useSiteView)) request();
});

type DocAnalysisResolve = DocAnalysisInfo & { originValue?: string | number };

const docAnalysisList = computed<DocAnalysisResolve[]>(() => {
  const { createTime, appendInfo, overrideInfo } = unref(docAnalysisConfig);
  const { fileList = [], totalFileWords, lastCommitTime } = unref(docAnalysisInfo);
  const { siteUv, sitePv, isGet } = statisticsInfo;

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
      originValue: unref(postAddNum)?.weekAddNum,
      value: `${unref(postAddNum)?.weekAddNum} ${t("tk.docAnalysisCard.fileUnit")}`,
    },
    {
      key: "monthAddNum",
      label: t("tk.docAnalysisCard.monthAddNum"),
      originValue: unref(postAddNum)?.monthAddNum,
      value: `${unref(postAddNum)?.monthAddNum} ${t("tk.docAnalysisCard.fileUnit")}`,
    },
    {
      key: "runtime",
      label: t("tk.docAnalysisCard.runtime"),
      originValue: createTime,
      value: `${unref(createToNowDay) === 0 ? t("tk.docAnalysisCard.runtimeLess") : `${unref(createToNowDay)} ${t("tk.docAnalysisCard.runtimeUnit")}`}`,
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
      originValue: unref(sitePv),
      value: unref(isGet) ? `${unref(sitePv)} ${t("tk.docAnalysisCard.viewCountUnit")}` : "Get...",
      show: unref(useSiteView),
    },
    {
      key: "visitCount",
      label: t("tk.docAnalysisCard.visitCount"),
      originValue: unref(siteUv),
      value: unref(isGet) ? `${unref(siteUv)} ${t("tk.docAnalysisCard.visitCountUnit")}` : "Get...",
      show: unref(useSiteView),
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
  <slot name="teek-home-doc-analysis-before" />

  <TkHomeCard :title="finalTitle" :class="ns.b()" :aria-label="t('tk.docAnalysisCard.label')">
    <template v-for="item in docAnalysisList" :key="item.key">
      <div v-if="item.show !== false" :class="ns.e('item')">
        <span v-html="item.label" />
        <span v-html="item.value" />
      </div>
    </template>
  </TkHomeCard>

  <slot name="teek-home-doc-analysis-after" />
</template>
