<script setup lang="ts">
import { TkInputSlide } from "vitepress-theme-teek";
import { ref } from "vue";

const num = ref(0);
</script>

<template>
  <TkInputSlide v-model="num" :min="0" :max="100" style="margin: 20px 0" />
</template>
