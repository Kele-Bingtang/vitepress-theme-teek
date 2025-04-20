<script setup lang="ts" name="LayoutPageWidthSlide">
import { computed, watch, onMounted } from "vue";
import { useDebounce, useStorage, useMediaQuery, useLocale } from "@teek/hooks";
import { autoWidthIcon, scaleIcon } from "@teek/assets";
import { useTeekConfig } from "@teek/configProvider";
import { TkInputSlide } from "@teek/components/common/InputSlide";
import { activateMaxWidthSlideMedia, LayoutMode, mobileMaxWidthMedia } from "./layoutEnhance";
import { ns, layoutModeStorageKey, pageMaxWidthSlideStorageKey, transitionName, pageMaxWidthVar } from "./namespace";
import BaseTemplate from "./components/BaseTemplate.vue";

defineOptions({ name: "LayoutPageWidthSlide" });

const { getTeekConfigRef } = useTeekConfig();
const layoutEnhanceConfig = getTeekConfigRef("layoutEnhance", {});
const { t } = useLocale();

const min = computed(() => 60 * 100);
const max = computed(() => 100 * 100);

const pageMaxWidth = useStorage(
  pageMaxWidthSlideStorageKey,
  layoutEnhanceConfig.value.layoutSwitch?.pageLayoutMaxWidth?.defaultMaxWidth || 90 * 100
);
const layoutMode = useStorage<LayoutMode>(
  layoutModeStorageKey,
  layoutEnhanceConfig.value.layoutSwitch?.defaultMode || LayoutMode.Original
);

const updatePageMaxWidth = (val: number) => {
  document.body.style.setProperty(pageMaxWidthVar, `${Math.ceil(val / 100)}%`);
};

onMounted(() => updatePageMaxWidth(pageMaxWidth.value));

const disabled = useMediaQuery(mobileMaxWidthMedia);
const shouldActivateMaxWidth = useMediaQuery(activateMaxWidthSlideMedia);

watch(shouldActivateMaxWidth, () => {
  updatePageMaxWidth(pageMaxWidth.value);
});

const update = useDebounce(updatePageMaxWidth, 1000);
watch(pageMaxWidth, update);

const format = (val: number) => `${Math.ceil(val / 100)}%`;

const tips = [
  {
    title: t("tk.layoutEnhance.pageLayoutMaxWidth.helpTipTitle"),
    icon: scaleIcon,
    content: t("tk.layoutEnhance.pageLayoutMaxWidth.helpTipContent"),
  },
];
</script>

<template>
  <Transition :name="transitionName">
    <BaseTemplate
      v-show="layoutMode === LayoutMode.SidebarWidthAdjustableOnly || layoutMode === LayoutMode.BothWidthAdjustable"
      :icon="autoWidthIcon"
      :title="t('tk.layoutEnhance.pageLayoutMaxWidth.title')"
      :helper="!layoutEnhanceConfig.layoutSwitch?.pageLayoutMaxWidth?.disableHelp"
      :helper-desc="t('tk.layoutEnhance.pageLayoutMaxWidth.helpDesc')"
      :tips
      :disabled
    >
      <TkInputSlide
        v-model="pageMaxWidth"
        :disabled
        :min
        :max
        :format
        :class="ns.e('slide')"
        :aria-label="t('tk.layoutEnhance.pageLayoutMaxWidth.helperTipTitle')"
      />
    </BaseTemplate>
  </Transition>
</template>
