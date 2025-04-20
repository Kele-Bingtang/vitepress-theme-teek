<script setup lang="ts" name="LayoutSwitch">
import { computed, onMounted, watch } from "vue";
import { useStorage, useMediaQuery, useLocale } from "@teek/hooks";
import { fullscreenIcon, fullScreenOneIcon, fullscreenTwoIcon, layoutIcon, overallReductionIcon } from "@teek/assets";
import { useTeekConfig } from "@teek/configProvider";
import { TkSegmented } from "@teek/components/common/Segmented";
import { LayoutMode, mobileMaxWidthMedia } from "./layoutEnhance";
import { layoutModeStorageKey } from "./namespace";
import BaseTemplate from "./components/BaseTemplate.vue";

defineOptions({ name: "LayoutSwitch" });

const { getTeekConfigRef } = useTeekConfig();
const layoutEnhanceConfig = getTeekConfigRef("layoutEnhance", {});
const { t } = useLocale();

const attribute = "layout-mode";
const layoutMode = useStorage(
  layoutModeStorageKey,
  layoutEnhanceConfig.value.layoutSwitch?.defaultMode || LayoutMode.Original
);
const disabled = useMediaQuery(mobileMaxWidthMedia);

const update = (val: string) => {
  const el = document.documentElement;

  if (el.getAttribute(attribute) === val) return;
  el.setAttribute(attribute, val);
};

watch(layoutMode, val => {
  update(val);
});

onMounted(() => {
  update(layoutMode.value);

  if (!layoutEnhanceConfig.value.layoutSwitch?.disableAnimation) {
    document.documentElement.setAttribute(`${attribute}-animated`, "true");
  }
});

const content = computed(() => [
  {
    value: LayoutMode.FullWidth,
    title: t("tk.layoutEnhance.layoutSwitch.fullWidthTipTitle"),
    tipContent: t("tk.layoutEnhance.layoutSwitch.fullWidthHelpTipContent"),
    icon: fullScreenOneIcon,
  },
  {
    value: LayoutMode.SidebarWidthAdjustableOnly,
    title: t("tk.layoutEnhance.layoutSwitch.sidebarWidthAdjustableOnlyTipTitle"),
    tipContent: t("tk.layoutEnhance.layoutSwitch.sidebarWidthAdjustableOnlyHelpTipContent"),
    icon: fullscreenTwoIcon,
  },
  {
    value: LayoutMode.BothWidthAdjustable,
    title: t("tk.layoutEnhance.layoutSwitch.bothWidthAdjustableTipTitle"),
    tipContent: t("tk.layoutEnhance.layoutSwitch.bothWidthAdjustableHelpTipContent"),
    icon: fullscreenIcon,
  },
  {
    value: LayoutMode.Original,
    title: t("tk.layoutEnhance.layoutSwitch.originalWidthTipTitle"),
    tipContent: t("tk.layoutEnhance.layoutSwitch.originalWidthHelpTipContent"),
    icon: overallReductionIcon,
  },
]);

const segmentedOptions = computed(() =>
  content.value.map(item => ({
    value: item.value,
    title: item.title,
    ariaLabel: item.title,
    icon: item.icon,
  }))
);

const tips = computed(() =>
  content.value.map(item => ({
    title: item.title,
    icon: item.icon,
    content: item.tipContent,
  }))
);
</script>

<template>
  <BaseTemplate
    :icon="layoutIcon"
    :title="t('tk.layoutEnhance.layoutSwitch.title')"
    :helper="!layoutEnhanceConfig.layoutSwitch?.disableHelp"
    :helper-desc="t('tk.layoutEnhance.layoutSwitch.helpDesc')"
    :tips
    :disabled
  >
    <TkSegmented v-model="layoutMode" :options="segmentedOptions" :disabled="disabled" />
  </BaseTemplate>
</template>
