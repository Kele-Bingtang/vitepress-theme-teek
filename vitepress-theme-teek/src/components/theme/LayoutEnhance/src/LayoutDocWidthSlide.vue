<script setup lang="ts" name="LayoutDocWidthSlide">
import { computed, watch, onMounted } from "vue";
import { useDebounce, useStorage, useMediaQuery, useLocale } from "@teek/hooks";
import { autoWidthIcon, scaleIcon } from "@teek/assets";
import { useTeekConfig } from "@teek/configProvider";
import { TkInputSlide } from "@teek/components/common/InputSlide";
import { activateMaxWidthSlideMedia, LayoutMode, mobileMaxWidthMedia } from "./layoutEnhance";
import { ns, layoutModeStorageKey, docMaxWidthSlideStorageKey, transitionName, docMaxWidthVar } from "./namespace";
import BaseTemplate from "./components/BaseTemplate.vue";

defineOptions({ name: "LayoutDocWidthSlide" });

const { getTeekConfigRef } = useTeekConfig();
const layoutEnhanceConfig = getTeekConfigRef("layoutEnhance", {});
const { t } = useLocale();

const min = computed(() => 60 * 100);
const max = computed(() => 100 * 100);

const docMaxWidth = useStorage(
  docMaxWidthSlideStorageKey,
  layoutEnhanceConfig.value.layoutSwitch?.docLayoutMaxWidth?.defaultMaxWidth || 90 * 100
);
const layoutMode = useStorage<LayoutMode>(
  layoutModeStorageKey,
  layoutEnhanceConfig.value.layoutSwitch?.defaultMode || LayoutMode.Original
);

const updateMaxWidth = (val: number) => {
  const bodyStyle = document.body.style;
  if (!shouldActivateMaxWidth.value) bodyStyle.setProperty(ns.joinNamespace("page-max-width"), `100%`);

  bodyStyle.setProperty(docMaxWidthVar, `${Math.ceil(val / 100)}%`);
};

onMounted(() => updateMaxWidth(docMaxWidth.value));

const disabled = useMediaQuery(mobileMaxWidthMedia);
const shouldActivateMaxWidth = useMediaQuery(activateMaxWidthSlideMedia);

watch(shouldActivateMaxWidth, () => {
  updateMaxWidth(docMaxWidth.value);
});

const update = useDebounce(updateMaxWidth, 1000);
watch(docMaxWidth, update);

const format = (val: number) => `${Math.ceil(val / 100)}%`;

const tips = [
  {
    title: t("tk.layoutEnhance.docLayoutMaxWidth.helpTipTitle"),
    icon: scaleIcon,
    content: t("tk.layoutEnhance.docLayoutMaxWidth.helpTipContent"),
  },
];
</script>

<template>
  <Transition :name="transitionName">
    <BaseTemplate
      v-show="layoutMode === LayoutMode.BothWidthAdjustable"
      :icon="autoWidthIcon"
      :title="t('tk.layoutEnhance.docLayoutMaxWidth.title')"
      :helper="!layoutEnhanceConfig.layoutSwitch?.docLayoutMaxWidth?.disableHelp"
      :helper-desc="t('tk.layoutEnhance.docLayoutMaxWidth.helpDesc')"
      :tips
      :disabled
    >
      <TkInputSlide
        v-model="docMaxWidth"
        :disabled
        :min
        :max
        :format
        :class="ns.e('slide')"
        :aria-label="t('tk.layoutEnhance.docLayoutMaxWidth.helperTipTitle')"
      />
    </BaseTemplate>
  </Transition>
</template>
