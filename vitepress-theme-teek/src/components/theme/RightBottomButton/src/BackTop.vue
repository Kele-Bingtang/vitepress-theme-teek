<script setup lang="ts" name="BackTop">
import type { ThemeSetting } from "@teek/config";
import { computed, unref, onMounted, ref } from "vue";
import { useLocale, useDebounce, useEventListener } from "@teek/hooks";
import { rocketIcon } from "@teek/assets";
import { useTeekConfig } from "@teek/configProvider";
import { TkMessage } from "@teek/components/common/Message";
import { TkIcon } from "@teek/components/common/Icon";
import { ns } from "./namespace";

defineOptions({ name: "BackTop" });

const { t } = useLocale();

const { getTeekConfigRef } = useTeekConfig();
const themeSettingConfig = getTeekConfigRef<Required<ThemeSetting>>("themeSetting", {
  backTopDone: undefined,
  titleTip: {},
});

// 返回顶部 & 前往评论区
const scrollTop = ref(0);
const showToTop = computed(() => unref(scrollTop) > 100);
const progress = ref(0);

const scrollToTop = useDebounce(() => {
  document.querySelector("html")?.scrollIntoView({ behavior: "smooth" });
  setTimeout(() => {
    unref(themeSettingConfig).backTopDone?.(TkMessage);
  }, 600);
}, 500);

const watchScroll = () => {
  scrollTop.value = document.documentElement.scrollTop || document.body.scrollTop || 0;
  updateScrollProgress();
};
/**
 * 更新返回顶部的进度条
 */
const updateScrollProgress = () => {
  const p = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  progress.value = Math.round(p * 100);
};

onMounted(() => {
  updateScrollProgress();
});

useEventListener(window, "scroll", watchScroll);
</script>

<template>
  <transition :name="ns.joinNamespace('fade')">
    <div
      v-show="showToTop"
      :title="themeSettingConfig.titleTip.backTop ?? t('tk.rightBottomButton.backTopTitle')"
      :class="[ns.e('button'), 'back-top']"
      @click="scrollToTop"
      :style="{ [ns.cssVarName('progress')]: progress }"
      role="button"
      :aria-label="themeSettingConfig.titleTip.backTop ?? t('tk.rightBottomButton.backTopTitle')"
      :aria-valuenow="progress"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <TkIcon :icon="rocketIcon" aria-hidden="true" />
    </div>
  </transition>
</template>
