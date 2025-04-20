<script setup lang="ts" name="LayoutThemeColor">
import { computed, onMounted, watch } from "vue";
import { useStorage, useMediaQuery, useLocale } from "@teek/hooks";
import { clickIcon } from "@teek/assets";
import { useTeekConfig } from "@teek/configProvider";
import { TkSegmented } from "@teek/components/common/Segmented";
import { LayoutThemeColor, mobileMaxWidthMedia } from "./layoutEnhance";
import { ns, layoutThemeColorSlideStorageKey } from "./namespace";
import BaseTemplate from "./components/BaseTemplate.vue";

defineOptions({ name: "LayoutThemeColor" });

const { getTeekConfigRef } = useTeekConfig();
const layoutEnhanceConfig = getTeekConfigRef("layoutEnhance", {});
const { t } = useLocale();

const layoutThemeColor = useStorage(
  layoutThemeColorSlideStorageKey,
  layoutEnhanceConfig.value.layoutThemeColor?.defaultColor || LayoutThemeColor.vpDefault
);
const disabled = useMediaQuery(mobileMaxWidthMedia);

const update = (val: string) => {
  const el = document.documentElement;
  const attribute = "theme-color";

  if (el.getAttribute(attribute) === val) return;
  el.setAttribute(attribute, val);
};

watch(layoutThemeColor, val => {
  update(val);
});

onMounted(() => {
  update(layoutThemeColor.value);
});

const vitePressSegmentedOptions = computed(() => [
  {
    value: LayoutThemeColor.vpDefault,
    text: `VP ${t("tk.layoutEnhance.layoutThemeColor.defaultLabel")}`,
    title: `VitePress ${t("tk.layoutEnhance.layoutThemeColor.defaultLabel")}`,
    ariaLabel: `VitePress ${t("tk.layoutEnhance.layoutThemeColor.defaultLabel")}`,
  },
  {
    value: LayoutThemeColor.vpGreen,
    text: `VP ${t("tk.layoutEnhance.layoutThemeColor.greenLabel")}`,
    title: `VitePress ${t("tk.layoutEnhance.layoutThemeColor.greenLabel")}`,
    ariaLabel: `VitePress ${t("tk.layoutEnhance.layoutThemeColor.greenLabel")}`,
  },
  {
    value: LayoutThemeColor.vpYellow,
    text: `VP ${t("tk.layoutEnhance.layoutThemeColor.yellowLabel")}`,
    title: `VitePress ${t("tk.layoutEnhance.layoutThemeColor.yellowLabel")}`,
    ariaLabel: `VitePress ${t("tk.layoutEnhance.layoutThemeColor.yellowLabel")}`,
  },
  {
    value: LayoutThemeColor.vpRed,
    text: `VP ${t("tk.layoutEnhance.layoutThemeColor.redLabel")}`,
    title: `VitePress ${t("tk.layoutEnhance.layoutThemeColor.redLabel")}`,
    ariaLabel: `VitePress ${t("tk.layoutEnhance.layoutThemeColor.redLabel")}`,
  },
]);

const elementPluSegmentedOptions = computed(() => [
  {
    value: LayoutThemeColor.epBlue,
    text: `EP ${t("tk.layoutEnhance.layoutThemeColor.blueLabel")}`,
    title: `ElementPlus ${t("tk.layoutEnhance.layoutThemeColor.blueLabel")}`,
    ariaLabel: `ElementPlus ${t("tk.layoutEnhance.layoutThemeColor.blueLabel")}`,
  },
  {
    value: LayoutThemeColor.epGreen,
    text: `EP ${t("tk.layoutEnhance.layoutThemeColor.greenLabel")}`,
    title: `ElementPlus ${t("tk.layoutEnhance.layoutThemeColor.greenLabel")}`,
    ariaLabel: `ElementPlus ${t("tk.layoutEnhance.layoutThemeColor.greenLabel")}`,
  },
  {
    value: LayoutThemeColor.epYellow,
    text: `EP ${t("tk.layoutEnhance.layoutThemeColor.yellowLabel")}`,
    title: `ElementPlus ${t("tk.layoutEnhance.layoutThemeColor.yellowLabel")}`,
    ariaLabel: `ElementPlus ${t("tk.layoutEnhance.layoutThemeColor.yellowLabel")}`,
  },
  {
    value: LayoutThemeColor.epRed,
    text: `EP ${t("tk.layoutEnhance.layoutThemeColor.redLabel")}`,
    title: `ElementPlus ${t("tk.layoutEnhance.layoutThemeColor.redLabel")}`,
    ariaLabel: `ElementPlus ${t("tk.layoutEnhance.layoutThemeColor.redLabel")}`,
  },
]);

const tips = [
  {
    title: t("tk.layoutEnhance.layoutThemeColor.vpHelpTipTitle"),
    content: t("tk.layoutEnhance.layoutThemeColor.vpHelpTipContent"),
  },
  {
    title: t("tk.layoutEnhance.layoutThemeColor.epHelpTipTitle"),
    content: t("tk.layoutEnhance.layoutThemeColor.epHelpTipContent"),
  },
];
</script>

<template>
  <BaseTemplate
    :class="ns.e('layout-color')"
    :icon="clickIcon"
    :title="t('tk.layoutEnhance.layoutThemeColor.title')"
    :helper="!layoutEnhanceConfig.layoutThemeColor?.disableHelp"
    :helper-desc="t('tk.layoutEnhance.layoutThemeColor.helpDesc')"
    :tips
    :disabled
  >
    <TkSegmented v-model="layoutThemeColor" :options="vitePressSegmentedOptions" :disabled="disabled" />
    <TkSegmented v-model="layoutThemeColor" :options="elementPluSegmentedOptions" :disabled="disabled" />
  </BaseTemplate>
</template>
