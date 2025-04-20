<script setup lang="ts" name="HomeBannerBgPure">
import type { Banner } from "@teek/config";
import { useNamespace, useLocale } from "@teek/hooks";
import { useTeekConfig } from "@teek/configProvider";

defineOptions({ name: "HomeBannerBgPure" });

const ns = useNamespace("banner-bg-pure");
const { t } = useLocale();
const { getTeekConfig } = useTeekConfig();

const getStyle = () => {
  const { pureBgColor = "#28282d" } = getTeekConfig<Banner>("banner", {});
  return { backgroundColor: pureBgColor };
};
</script>

<template>
  <div :class="ns.b()" :style="getStyle()" :aria-label="t('tk.homeBanner.bgPureLabel')">
    <slot />
  </div>
</template>
