<script setup lang="ts" name="ToComment">
import type { ThemeSetting } from "@teek/config";
import { computed, unref, ref } from "vue";
import { useTeekConfig } from "@teek/configProvider";
import { TkMessage } from "@teek/components/common/Message";
import { TkIcon } from "@teek/components/common/Icon";
import { useLocale, useDebounce } from "@teek/hooks";
import { commentIcon } from "@teek/assets";
import { ns } from "./namespace";

defineOptions({ name: "ToComment" });

const { t } = useLocale();

const { getTeekConfigRef } = useTeekConfig();

const themeSettingConfig = getTeekConfigRef<Required<ThemeSetting>>("themeSetting", {
  toCommentDone: undefined,
  titleTip: {},
});

// 前往评论区
const scrollTop = ref(0);

const showToComment = computed(() => {
  const docContentHeight = document.querySelector(".content-container .main")?.getBoundingClientRect().height;
  const docFooterHeight = document.querySelector(".VPDocFooter")?.getBoundingClientRect().height || 200;
  let height = 0;
  if (docContentHeight) height = docContentHeight - docFooterHeight - window.innerHeight / 2;

  return unref(scrollTop) < height;
});

const scrollToComment = useDebounce(() => {
  document.querySelector(`#${ns.joinNamespace("comment")}`)?.scrollIntoView({ behavior: "smooth" });
  setTimeout(() => {
    unref(themeSettingConfig).toCommentDone?.(TkMessage);
  }, 600);
}, 500);
</script>

<template>
  <transition :name="ns.joinNamespace('fade')">
    <div
      v-show="showToComment"
      :title="themeSettingConfig.titleTip.toComment ?? t('tk.rightBottomButton.toComment')"
      :class="ns.e('button')"
      @click="scrollToComment"
      role="button"
      :aria-label="themeSettingConfig.titleTip.toComment ?? t('tk.rightBottomButton.toComment')"
    >
      <TkIcon :icon="commentIcon" aria-hidden="true" />
    </div>
  </transition>
</template>
