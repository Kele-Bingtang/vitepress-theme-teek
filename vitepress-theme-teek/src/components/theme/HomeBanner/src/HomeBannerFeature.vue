<script setup lang="ts" name="HomeBannerFeature">
import type { Banner } from "@teek/config";
import { useData, withBase } from "vitepress";
import { onBeforeUnmount, ref, unref } from "vue";
import { useNamespace, useLocale, useWindowSize } from "@teek/hooks";
import { useTeekConfig } from "@teek/configProvider";

defineOptions({ name: "HomeBannerFeature" });

const ns = useNamespace("banner-feature");
const { t } = useLocale();

const { getTeekConfigRef } = useTeekConfig();
const { frontmatter } = useData();

const bannerConfig = getTeekConfigRef<Required<Banner>>("banner", {
  features: unref(frontmatter).tk?.features || [],
  featureCarousel: 4000,
});

const active = ref(0);
const isMobile = ref(false);
let timer: ReturnType<typeof setInterval> | null;

const clearTimer = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
};

useWindowSize(width => {
  const { features, featureCarousel } = unref(bannerConfig);
  if (width <= 719) {
    isMobile.value = true;
    clearTimer();
    // 移动端的 Feature 采用轮播模式
    timer = setInterval(() => {
      active.value = (active.value + 1) % features.length;
    }, featureCarousel);
  } else {
    isMobile.value = false;
    clearTimer();
  }
});

onBeforeUnmount(() => {
  clearTimer();
});
</script>

<template>
  <TransitionGroup
    v-if="bannerConfig.features.length"
    :name="ns.joinNamespace('slide-next')"
    tag="div"
    :class="[ns.b(), ns.joinNamespace('wallpaper-outside'), 'flx-wrap-between']"
    :aria-label="t('tk.homeBanner.featureLabel')"
  >
    <div
      :class="ns.e('feature__item')"
      v-for="(feature, index) in bannerConfig.features"
      :key="index"
      v-show="!isMobile || active === index"
      role="group"
      :aria-labelledby="`feature-title-${index}`"
    >
      <a
        v-if="feature.link"
        :href="withBase(feature.link)"
        class="flx-column-center hover-color"
        :aria-label="feature.title"
      >
        <img
          v-if="feature.imgUrl"
          class="feature-img"
          :src="withBase(feature.imgUrl)"
          :alt="feature.title"
          :aria-label="feature.title"
        />
        <p :id="`feature-title-${index}`" class="feature-title">{{ feature.title }}</p>
        <p class="feature-description">{{ feature.description }}</p>
      </a>
    </div>
  </TransitionGroup>
</template>
