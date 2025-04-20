<script setup lang="ts" name="VpContainer">
import type { VpContainerProps } from "./vpContainer";
import { computed } from "vue";
import { useNamespace } from "@teek/hooks";

defineOptions({ name: "VpContainer" });

const ns = useNamespace("vp-container");

const { type = "tip", title, text = "", textHtml = "" } = defineProps<VpContainerProps>();

const useContainer = computed(() => text || textHtml);
</script>

<template>
  <div v-if="useContainer" :class="[ns.b(), 'vp-doc']">
    <div :class="[type, 'custom-block', { 'no-title': !title }]">
      <div v-if="title" class="custom-block-title">{{ title }}</div>
      <p v-if="textHtml" v-html="textHtml"></p>
      <p v-else>{{ text }}</p>
    </div>
  </div>
</template>
