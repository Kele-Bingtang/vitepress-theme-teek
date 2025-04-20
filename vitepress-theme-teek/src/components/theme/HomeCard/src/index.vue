<script setup lang="ts" name="HomeCard">
import type { HomeCardProps } from "./homeCard";
import { unref, onMounted, ref, onUnmounted } from "vue";
import { withBase } from "vitepress";
import { useNamespace, useLocale } from "@teek/hooks";
import { arrowLeftIcon, arrowRightIcon } from "@teek/assets";
import { TkIcon } from "@teek/components/common/Icon";

defineOptions({ name: "HomeCard" });

const ns = useNamespace("home-card");
const pointClass = ns.joinNamespace("pointer");
const { t } = useLocale();

const {
  title = "",
  titleLink,
  titleClick,
  page = false,
  pageSize = 4,
  total = 0,
  autoPage = false,
  pageSpeed = 4000,
} = defineProps<HomeCardProps>();

const emit = defineEmits<{ pagination: [to: number, "prev" | "next"] }>();

const pageNum = defineModel<number>({ default: 1 });
const pageTotalNum = Math.ceil(total / pageSize);
const hasNextData = total !== 0 && pageTotalNum !== 1;
// Vue 动画名
const transitionName = ref(ns.joinNamespace("scroll"));

/**
 * 分页
 * @param to 前往第几页
 * @param type 前往类型，prev：上一页，next：下一页
 */
const pagination = (to: number, type: "prev" | "next") => {
  emit("pagination", to, type);
  // 修改为分页动画名
  transitionName.value = ns.joinNamespace(`slide-${type}`);

  if (page && autoPage) startAutoPage();
  const index = unref(pageNum) % pageTotalNum;
  const res = (index + to) % pageTotalNum;

  // 修改页码，对超出或低出的页码进行调整
  if (res < 1) pageNum.value = pageTotalNum + res;
  else if (res > pageTotalNum) pageNum.value = 1;
  else pageNum.value = res;
};

let timer: ReturnType<typeof setTimeout> | null;

/**
 * 开启自动翻页
 */
const startAutoPage = () => {
  // 先关闭自动翻页
  closeAutoPage();
  if (pageSpeed > 0) {
    timer = setTimeout(() => {
      pagination(1, "next");
    }, pageSpeed);
  }
};
/**
 * 关闭自动翻页
 */
const closeAutoPage = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
};

onMounted(() => {
  if (page && autoPage) startAutoPage();
});

onUnmounted(() => {
  if (page && autoPage) closeAutoPage();
});
</script>

<template>
  <div :class="`${ns.b()} card`" :aria-label="t('tk.homeCard.label')">
    <div v-if="title" :class="`${ns.e('header')} flx-justify-between`">
      <slot name="title">
        <a v-if="titleLink" :href="withBase(titleLink)" :aria-label="title">
          <span class="title flx-align-center" v-html="title"></span>
        </a>
        <a v-else-if="titleClick" @click="() => titleClick()" :class="pointClass" :aria-label="title">
          <span class="title flx-align-center" v-html="title"></span>
        </a>
        <span v-else class="title flx-align-center" v-html="title"></span>
      </slot>
      <slot name="page" v-bind="{ pagination }">
        <div v-if="page">
          <slot name="page-left" v-bind="{ pagination }">
            <span
              :class="['page-button', hasNextData ? pointClass : 'disabled']"
              @click="pagination(-1, 'prev')"
              role="button"
              :aria-label="t('tk.homeCard.prev')"
              :aria-disabled="!hasNextData"
            >
              <TkIcon :icon="arrowLeftIcon" :size="14" aria-hidden="true" />
            </span>
          </slot>

          <slot name="page-right" v-bind="{ pagination }">
            <span
              :class="['page-button', hasNextData ? pointClass : 'disabled']"
              @click="pagination(1, 'next')"
              role="button"
              :aria-label="t('tk.homeCard.next')"
              :aria-disabled="!hasNextData"
            >
              <TkIcon :icon="arrowRightIcon" :size="14" aria-hidden="true" />
            </span>
          </slot>
        </div>
      </slot>
    </div>

    <slot v-bind="{ transitionName, startAutoPage, closeAutoPage }" />
  </div>
</template>
