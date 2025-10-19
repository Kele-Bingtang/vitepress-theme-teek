<script setup lang="ts" name="RightBottomButton">
import type { BackTop, TeekConfig, ThemeEnhance, ToComment } from "@teek/config";
import { computed, inject } from "vue";
import { useData } from "vitepress";
import { isBoolean } from "@teek/helper";
import { useTeekConfig } from "@teek/components/theme/ConfigProvider";
import { mobileMaxWidthMedia } from "@teek/components/theme/ThemeEnhance";
import { artalkContext } from "@teek/components/theme/CommentArtalk";
import { giscusContext } from "@teek/components/theme/CommentGiscus";
import { twikooContext } from "@teek/components/theme/CommentTwikoo";
import { walineContext } from "@teek/components/theme/CommentWaline";
import { useMediaQuery } from "@teek/composables";
import { ns } from "./namespace";
import BackTopComponent from "./BackTop.vue";
import ToCommentComponent from "./ToComment.vue";
import ThemeColorComponent from "./ThemeColor.vue";

defineOptions({ name: "RightBottomButton" });

const { getTeekConfigRef } = useTeekConfig();
const backTopConfig = getTeekConfigRef<BackTop>("backTop", { enabled: true });
const toCommentConfig = getTeekConfigRef<ToComment>("toComment", { enabled: true });
const themeEnhanceConfig = getTeekConfigRef<ThemeEnhance>("themeEnhance", { enabled: true });
const teekConfig = getTeekConfigRef<Required<TeekConfig>>(null, { comment: { provider: "" } });
const { frontmatter } = useData();

const commentConfig = computed(() => {
  const comment = frontmatter.value.comment ?? teekConfig.value.comment;
  if (isBoolean(comment)) return { enabled: comment };

  const getArtalkInstance = inject(artalkContext, null);
  const getGiscusInstance = inject(giscusContext, null);
  const getTwikooInstance = inject(twikooContext, null);
  const getWalineInstance = inject(walineContext, null);

  if (getArtalkInstance || getGiscusInstance || getTwikooInstance || getWalineInstance) {
    return { enabled: true };
  }

  return { enabled: true, provider: comment.provider };
});

const isMobile = useMediaQuery(mobileMaxWidthMedia);
const disabledThemeColor = computed(() => {
  const { enabled = true, themeColor = {}, position = "top" } = themeEnhanceConfig.value;
  const isDisabled = themeColor.disabled ?? themeColor.disabledInMobile;

  // 如果全局禁用主题增强功能，则禁用主题颜色，其次判断是否局部禁用主题颜色功能，最后默认移动端启用主题颜色功能
  if (!enabled) return true;
  if (isDisabled !== undefined) return isDisabled;
  return !isMobile.value && position === "top";
});
</script>

<template>
  <div :class="[ns.b(), ns.join('wallpaper-outside'), 'flx-column']">
    <slot name="teek-right-bottom-before" />

    <BackTopComponent v-if="backTopConfig.enabled">
      <template #default="scope">
        <slot name="teek-back-top" v-bind="scope" />
      </template>
    </BackTopComponent>

    <ToCommentComponent v-if="toCommentConfig.enabled && (commentConfig.enabled || commentConfig.provider)">
      <template #default="scope">
        <slot name="teek-to-comment" v-bind="scope" />
      </template>
    </ToCommentComponent>

    <ThemeColorComponent v-if="!disabledThemeColor" />

    <slot name="teek-right-bottom-after" />
  </div>
</template>
