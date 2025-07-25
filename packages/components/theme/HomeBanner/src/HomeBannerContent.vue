<script setup lang="ts" name="HomeBannerContent">
import type { Banner } from "@teek/config";
import { computed, onMounted } from "vue";
import { useData } from "vitepress";
import { useNamespace, useLocale, useTextTypes, useSwitchData } from "@teek/composables";
import { useTeekConfig } from "@teek/components/theme/ConfigProvider";

defineOptions({ name: "HomeBannerContent" });

const ns = useNamespace("banner-content");
const { t } = useLocale();

const { getTeekConfigRef } = useTeekConfig();

const { site, frontmatter } = useData();
// Banner 配置项
const bannerConfig = getTeekConfigRef<Required<Banner>>("banner", {
  name: frontmatter.value.tk?.name || site.value.title || "",
  descStyle: "default",
  description: [],
  switchTime: 4000,
  switchShuffle: false,
  typesInTime: 200,
  typesOutTime: 100,
  typesNextTime: 800,
  typesShuffle: false,
});

const descArray = computed(() => [
  ...new Set(
    [frontmatter.value.tk?.description || bannerConfig.value.description || []].flat()?.filter((v: string) => !!v)
  ),
]);

// 文本描述默认风格
const isDefaultDescStyle = computed(() => bannerConfig.value.descStyle === "default");
// 文本描述打字机风格
const isTypesDescStyle = computed(() => bannerConfig.value.descStyle === "types");
// 文本描述切换风格
const isSwitchDescStyle = computed(() => bannerConfig.value.descStyle === "switch");

// 文字打印输入输出效果
const {
  text: typesText,
  isFinished,
  start: startTypes,
} = useTextTypes(descArray, {
  inputTime: bannerConfig.value.typesInTime,
  outputTime: bannerConfig.value.typesOutTime,
  nextTime: bannerConfig.value.typesNextTime,
  shuffle: bannerConfig.value.typesShuffle,
});

// 文字淡入淡出效果
const { data: text, start: startAutoSwitch } = useSwitchData(descArray, {
  timeout: bannerConfig.value.switchTime,
  shuffle: bannerConfig.value.switchShuffle,
  onUpdate: (data, newValue) => {
    // 重新渲染数据，同时触发动画
    data.value = "";
    setTimeout(() => {
      data.value = newValue;
    }, 100);
  },
});

onMounted(() => {
  if (isTypesDescStyle.value) startTypes();
  if (isSwitchDescStyle.value) startAutoSwitch();
});
</script>

<template>
  <div :class="ns.b()" :aria-label="t('tk.homeBanner.contentLabel')">
    <h1 :class="ns.e('content__title')" :aria-label="t('tk.homeBanner.titleLabel')">{{ bannerConfig.name }}</h1>

    <p :class="ns.e('content__desc')" :aria-label="t('tk.homeBanner.descLabel')">
      <template v-if="isDefaultDescStyle">
        <span>{{ descArray[0] }}</span>
      </template>
      <template v-else-if="isSwitchDescStyle">
        <span v-show="!!text" @click="startAutoSwitch" class="switch" :aria-label="t('tk.homeBanner.descSwitchLabel')">
          {{ text }}
        </span>
      </template>
      <template v-else-if="isTypesDescStyle && descArray.length">
        <span :aria-label="t('tk.homeBanner.descTypedLabel')">{{ typesText }}</span>
        <span :class="['typed', { 'is-animation': isFinished }]">|</span>
      </template>
    </p>
  </div>
</template>
