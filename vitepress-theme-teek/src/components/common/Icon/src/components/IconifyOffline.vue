<script setup lang="ts" name="IconifyOffline">
import type { IconifyIcon } from "@iconify/vue";
import { onMounted } from "vue";
import { Icon, addIcon } from "@iconify/vue";

defineOptions({ name: "IconifyOffline" });

const props = defineProps<{ icon: IconifyIcon }>();

onMounted(() => {
  addIcon(props.icon + "", props.icon as IconifyIcon);
});
</script>

<template>
  <Icon :icon :style="{ outline: 'none' }" />
</template>
