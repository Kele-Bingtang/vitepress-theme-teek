<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineOptions({ name: "IconifyOnline" });

defineProps<{ icon: string }>();
</script>

<template>
  <Icon :icon="icon" :style="{ outline: 'none' }"></Icon>
</template>
