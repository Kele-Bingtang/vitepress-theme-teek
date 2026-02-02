<script setup lang="ts" name="LayoutDocWidthSlide">
import type { ThemeEnhance } from "@teek/config";
import { computed, watch } from "vue";
import { isClient } from "@teek/helper";
import { useDebounce, useStorage, useMediaQuery, useLocale } from "@teek/composables";
import { autoWidthIcon, scaleIcon } from "@teek/static";
import { useTeekConfig } from "@teek/components/theme/ConfigProvider";
import { TkInputSlide } from "@teek/components/common/InputSlide";
import { activateMaxWidthSlideMedia, LayoutMode, mobileMaxWidthMedia } from "./themeEnhance";
import { ns, layoutModeStorageKey, docMaxWidthSlideStorageKey, transitionName, docMaxWidthVar } from "./namespace";
import { useAnimated } from "./useAnimated";
import BaseTemplate from "./components/BaseTemplate.vue";

defineOptions({ name: "LayoutDocWidthSlide" });

const { getTeekConfigRef } = useTeekConfig();
const themeEnhanceConfig = getTeekConfigRef<ThemeEnhance>("themeEnhance", {});
const { t } = useLocale();

const min = computed(() => 60 * 100);
const max = computed(() => 100 * 100);

const docMaxWidth = useStorage(
  docMaxWidthSlideStorageKey,
  (themeEnhanceConfig.value.layoutSwitch?.defaultDocMaxWidth || 95) * 100
);
const layoutMode = useStorage(
  layoutModeStorageKey,
  themeEnhanceConfig.value.layoutSwitch?.defaultMode || LayoutMode.Original
);

const { start: startAnimated } = useAnimated();

const updateMaxWidth = (val: number) => {
  if (!isClient) return;
  if (!themeEnhanceConfig.value.layoutSwitch?.disableAnimation) startAnimated();

  const bodyStyle = document.body.style;
  if (!shouldActivateMaxWidth.value) bodyStyle.setProperty(ns.join("page-max-width"), `100%`);

  bodyStyle.setProperty(docMaxWidthVar, `${Math.ceil(val / 100)}%`);
};

const isMobile = useMediaQuery(mobileMaxWidthMedia);
// 初始化会马上触发一次
const shouldActivateMaxWidth = useMediaQuery(activateMaxWidthSlideMedia);

watch(shouldActivateMaxWidth, () => {
  updateMaxWidth(docMaxWidth.value);
});

const update = useDebounce(updateMaxWidth, 1000);
watch(docMaxWidth, update);

const format = (val: number) => `${Math.ceil(val / 100)}%`;

const tips = computed(() => [
  {
    title: t("tk.themeEnhance.docLayoutMaxWidth.helpTipTitle"),
    icon: scaleIcon,
    content: t("tk.themeEnhance.docLayoutMaxWidth.helpTipContent"),
  },
]);
</script>

<template>
  <Transition :name="transitionName">
    <BaseTemplate
      v-show="layoutMode === LayoutMode.BothWidthAdjustable"
      :icon="autoWidthIcon"
      :title="t('tk.themeEnhance.docLayoutMaxWidth.title')"
      :helper="!themeEnhanceConfig.layoutSwitch?.disableDocMaxWidthHelp"
      :helper-desc="t('tk.themeEnhance.docLayoutMaxWidth.helpDesc')"
      :tips
      :disabled="isMobile"
    >
      <TkInputSlide
        v-model="docMaxWidth"
        :disabled="isMobile"
        :min
        :max
        :format
        :class="ns.e('slide')"
        :aria-label="t('tk.themeEnhance.docLayoutMaxWidth.helperTipTitle')"
      />
    </BaseTemplate>
  </Transition>
</template>
