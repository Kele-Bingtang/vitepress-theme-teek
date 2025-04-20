<script setup lang="ts" name="ArticleShare">
import type { ArticleShare } from "@teek/config";
import { computed } from "vue";
import { useClipboard, useNamespace, useLocale } from "@teek/hooks";
import { shareIcon, thumbsIcon } from "@teek/assets";
import { useTeekConfig } from "@teek/configProvider";
import { TkIcon } from "@teek/components/common/Icon";

defineOptions({ name: "ArticleShare" });

const ns = useNamespace("article-share");
const { t } = useLocale();

const { getTeekConfigRef } = useTeekConfig();
const articleShareConfig = getTeekConfigRef<ArticleShare>("articleShare", {
  icon: shareIcon,
  text: t("tk.articleShare.text"),
  copiedIcon: thumbsIcon,
  copiedText: t("tk.articleShare.copiedText"),
  query: false,
  hash: false,
});

const shareLink = computed(() => {
  const { hash, query } = articleShareConfig.value;
  const { origin, pathname, search } = location;

  return `${origin}${pathname}${query ? search : ""}${hash ? location.hash : ""}`;
});

const { copy, copied } = useClipboard(2000);
</script>

<template>
  <div :class="ns.b()">
    <button
      :class="[ns.e('button'), { copied }, 'flx-center']"
      :aria-label="copied ? articleShareConfig.copiedText : articleShareConfig.text"
      aria-live="polite"
      @click="copy(shareLink)"
    >
      <div v-if="!copied" class="flx-center">
        <TkIcon :icon="shareIcon" style="margin-right: 4px" />
        {{ articleShareConfig.text }}
      </div>

      <div v-else class="flx-center">
        <TkIcon :icon="thumbsIcon" style="margin-right: 4px" />
        {{ articleShareConfig.copiedText }}
      </div>
    </button>
  </div>
</template>
