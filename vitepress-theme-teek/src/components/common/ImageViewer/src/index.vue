<script setup lang="ts" name="ImageViewer">
import ImageViewer from "./ImageViewer.vue";

defineOptions({ name: "ImageViewerControl" });

const visible = defineModel({ default: false });

const close = () => {
  document.body.style.overflow = "";
  visible.value = false;
};
</script>

<template>
  <ImageViewer v-if="visible" v-bind="$attrs" @close="close" />
</template>
