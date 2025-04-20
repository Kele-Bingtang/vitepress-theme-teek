<script setup lang="ts" name="SvgIcon">
defineOptions({ name: "SvgIcon" });

defineProps<{ icon: string }>();
</script>

<template>
  <i v-html="icon" />
</template>
