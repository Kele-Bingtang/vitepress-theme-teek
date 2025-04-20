<script setup lang="ts" name="Spotlight">
import { computed } from "vue";
import { useStorage, useMediaQuery, useLocale } from "@teek/hooks";
import { clickIcon } from "@teek/assets";
import { useTeekConfig } from "@teek/configProvider";
import { TkSegmented } from "@teek/components/common/Segmented";
import { touchMedia } from "./layoutEnhance";
import { spotlightStorageKey } from "./namespace";
import BaseTemplate from "./components/BaseTemplate.vue";
import SpotlightHover from "./components/SpotlightHover.vue";

defineOptions({ name: "Spotlight" });

const { getTeekConfigRef } = useTeekConfig();
const layoutEnhanceConfig = getTeekConfigRef("layoutEnhance", {});
const { t } = useLocale();

const disabled = useMediaQuery(touchMedia);
const spotlight = useStorage(spotlightStorageKey, layoutEnhanceConfig.value.spotlight?.defaultToggle || true);

const segmentedOptions = computed(() => [
  {
    value: true,
    text: "ON",
    title: t("tk.layoutEnhance.spotlight.onTipTitle"),
    ariaLabel: t("tk.layoutEnhance.spotlight.onTipTitle"),
  },
  {
    value: false,
    text: "OFF",
    title: t("tk.layoutEnhance.spotlight.offTipTitle"),
    ariaLabel: t("tk.layoutEnhance.spotlight.offTipTitle"),
  },
]);

const tips = [
  {
    title: `ON ${t("tk.layoutEnhance.spotlight.onTipTitle")}`,
    content: t("tk.layoutEnhance.spotlight.onHelpTipContent"),
  },
  {
    title: `OFF ${t("tk.layoutEnhance.spotlight.offTipTitle")}`,
    content: t("tk.layoutEnhance.spotlight.offHelpTipContent"),
  },
];
</script>

<template>
  <BaseTemplate
    :icon="clickIcon"
    :title="t('tk.layoutEnhance.spotlight.title')"
    :helper="!layoutEnhanceConfig.spotlight?.disableHelp"
    :helper-desc="t('tk.layoutEnhance.spotlight.helpDesc')"
    :tips
    :disabled
  >
    <TkSegmented v-model="spotlight" :options="segmentedOptions" :disabled="disabled" />
  </BaseTemplate>

  <SpotlightHover v-if="spotlight && !disabled" :enabled="spotlight && !disabled" />
</template>
