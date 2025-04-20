<script setup lang="ts" name="RightBottomButton">
import { useData } from "vitepress";
import { ns } from "./namespace";
import BackTop from "./BackTop.vue";
import ToComment from "./ToComment.vue";

defineOptions({ name: "RightBottomButton" });

const { theme } = useData();
</script>

<template>
  <div :class="[ns.b(), ns.joinNamespace('wallpaper-outside'), 'flx-column']">
    <slot name="teek-right-bottom-before" />

    <BackTop />
    <ToComment v-if="theme.comment?.provider" />
    <!-- <ThemeSize v-if="themeSettingConfig.useThemeSize" /> -->
    <!-- <ThemeStyle v-if="themeSettingConfig.useThemeStyle" /> -->

    <slot name="teek-right-bottom-after" />
  </div>
</template>
