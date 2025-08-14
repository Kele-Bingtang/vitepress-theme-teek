<script setup lang="ts" name="FooterContainer">
import { usePageState } from "@teek/components/theme/ConfigProvider";
const { isHomePage } = usePageState();
import { useNamespace } from "@teek/composables";
import { TkFooterGroup } from "@teek/components/theme/FooterGroup";
import { TkFooterInfo } from "@teek/components/theme/FooterInfo";
defineOptions({ name: "FooterContainer" });
const ns = useNamespace("footer-container");
</script>

<template>
  <div :class="ns.b()">
    <TkFooterGroup v-if="isHomePage" />
    <slot name="teek-footer-info-before" />

    <TkFooterInfo v-if="isHomePage" />
    <slot name="teek-footer-info-after" />
    <slot name="layout-bottom" />
  </div>
</template>
