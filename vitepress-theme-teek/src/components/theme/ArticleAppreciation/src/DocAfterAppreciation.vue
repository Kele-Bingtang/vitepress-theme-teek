<script setup lang="ts" name="DocAfterAppreciation">
import type { Appreciation } from "@teek/config";
import { computed, ref, unref, watch } from "vue";
import { useNamespace, useLocale } from "@teek/hooks";
import { aliPayIcon, weChatPayIcon } from "@teek/assets";
import { useTeekConfig } from "@teek/configProvider";
import { TkIcon } from "@teek/components/common/Icon";

defineOptions({ name: "DocAfterAppreciation" });

const ns = useNamespace("article-appreciation");
const { t } = useLocale();

const { getTeekConfigRef } = useTeekConfig();

const appreciateConfig = getTeekConfigRef<Required<Appreciation<"doc-after">>>("appreciation", { position: "" });

const docAfterOptions = computed(() => unref(appreciateConfig).options || { expand: false });

const showContent = ref(unref(docAfterOptions).expand);

const icon = computed(() => {
  const { icon } = unref(docAfterOptions);
  if (icon === "aliPay") return aliPayIcon;
  if (icon === "weChatPay") return weChatPayIcon;

  return icon;
});

const toggleShowContent = () => {
  showContent.value = !showContent.value;
};

watch(
  () => unref(docAfterOptions).expand,
  (newValue: boolean | undefined) => {
    showContent.value = newValue;
  }
);
</script>

<template>
  <div :class="[ns.b(), ns.m('doc-after')]" :aria-label="t('tk.articleAppreciation.label')">
    <div
      v-if="docAfterOptions.buttonHtml"
      v-html="docAfterOptions.buttonHtml"
      role="button"
      :aria-expanded="showContent"
      :aria-controls="`${ns.e('content')}`"
    />
    <button
      v-else-if="docAfterOptions.expandTitle || docAfterOptions.collapseTitle"
      :class="ns.e('button')"
      @click="toggleShowContent"
      :aria-expanded="showContent"
      :aria-controls="`${ns.e('content')}`"
      aria-live="polite"
    >
      <TkIcon v-if="icon" :class="ns.e('button__icon')" :icon="icon" :size="16" aria-hidden="true" />

      <span v-if="showContent" v-html="docAfterOptions.collapseTitle" />
      <span v-else v-html="docAfterOptions.expandTitle" />
    </button>

    <transition :name="ns.joinNamespace('fade')">
      <div v-if="showContent" :class="ns.e('content')" :aria-label="t('tk.articleAppreciation.contentLabel')">
        <div :class="ns.e('content')" v-html="docAfterOptions.content" />
      </div>
    </transition>
  </div>
</template>
