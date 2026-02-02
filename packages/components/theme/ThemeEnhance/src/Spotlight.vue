<script setup lang="ts" name="Spotlight">
import type { ThemeEnhance } from "@teek/config";
import { computed, ref, watch } from "vue";
import { useData } from "vitepress";
import { useStorage, useMediaQuery, useLocale } from "@teek/composables";
import { clickIcon } from "@teek/static";
import { useTeekConfig } from "@teek/components/theme/ConfigProvider";
import { TkSegmented } from "@teek/components/common/Segmented";
import { touchMedia } from "./themeEnhance";
import { spotlightStorageKey } from "./namespace";
import BaseTemplate from "./components/BaseTemplate.vue";
import SpotlightHover from "./components/SpotlightHover.vue";

defineOptions({ name: "Spotlight" });

const { getTeekConfigRef } = useTeekConfig();
const themeEnhanceConfig = getTeekConfigRef<ThemeEnhance>("themeEnhance", {});
const { t } = useLocale();
const { frontmatter } = useData();

const supportTouch = useMediaQuery(touchMedia);

const spotlight = useStorage(spotlightStorageKey, themeEnhanceConfig.value.spotlight?.defaultValue ?? true);
const oldSpotlight = ref(spotlight.value);

// 文章单独设置是否使用聚光灯
watch(
  () => frontmatter.value.spotlight,
  newVal => {
    if (newVal !== undefined) {
      oldSpotlight.value = spotlight.value;
      spotlight.value = newVal;
    } else {
      // 还原
      spotlight.value = oldSpotlight.value;
    }
  },
  { immediate: true }
);

const segmentedOptions = computed(() => [
  {
    value: true,
    label: "ON",
    title: t("tk.themeEnhance.spotlight.onTipTitle"),
    ariaLabel: t("tk.themeEnhance.spotlight.onTipTitle"),
  },
  {
    value: false,
    label: "OFF",
    title: t("tk.themeEnhance.spotlight.offTipTitle"),
    ariaLabel: t("tk.themeEnhance.spotlight.offTipTitle"),
  },
]);

const tips = computed(() => [
  {
    title: `ON ${t("tk.themeEnhance.spotlight.onTipTitle")}`,
    content: t("tk.themeEnhance.spotlight.onHelpTipContent"),
  },
  {
    title: `OFF ${t("tk.themeEnhance.spotlight.offTipTitle")}`,
    content: t("tk.themeEnhance.spotlight.offHelpTipContent"),
  },
]);
</script>

<template>
  <BaseTemplate
    :icon="clickIcon"
    :title="t('tk.themeEnhance.spotlight.title')"
    :helper="!themeEnhanceConfig.spotlight?.disableHelp"
    :helper-desc="t('tk.themeEnhance.spotlight.helpDesc')"
    :tips
    :disabled="supportTouch"
  >
    <TkSegmented v-model="spotlight" :options="segmentedOptions" :disabled="supportTouch" />
  </BaseTemplate>

  <SpotlightHover v-if="spotlight && !supportTouch" :enabled="spotlight && !supportTouch" />
</template>
