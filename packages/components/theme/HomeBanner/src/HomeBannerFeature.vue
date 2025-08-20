<script setup lang="ts" name="HomeBannerFeature">
import type { Banner, Feature } from "@teek/config";
import { useData, withBase } from "vitepress";
import { computed, onBeforeUnmount, ref } from "vue";
import { useNamespace, useLocale, useWindowSize } from "@teek/composables";
import { useTeekConfig } from "@teek/components/theme/ConfigProvider";

defineOptions({ name: "HomeBannerFeature" });

const ns = useNamespace("banner-feature");
const { t } = useLocale();

const { getTeekConfigRef } = useTeekConfig();
const { frontmatter } = useData();

const bannerConfig = getTeekConfigRef<Required<Banner>>("banner", {
  features: frontmatter.value.tk?.features || [],
  featureCarousel: 4000,
});
// Features 配置项
const featuresConfig = getTeekConfigRef<Required<Feature[]>>("features", []);

const active = ref(0);
const isMobile = ref(false);
let timer: ReturnType<typeof setInterval> | null;

const features = computed(() => bannerConfig.value.features || featuresConfig.value || []);

const clearTimer = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
};

useWindowSize(width => {
  const { featureCarousel } = bannerConfig.value;
  if (width <= 719) {
    isMobile.value = true;
    clearTimer();
    // 移动端的 Feature 采用轮播模式
    timer = setInterval(() => {
      active.value = (active.value + 1) % features.value.length;
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
    v-if="features.length"
    :name="ns.join('slide-next')"
    tag="div"
    :class="[ns.b(), ns.join('wallpaper-outside'), 'flx-wrap-between']"
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
      <component
        :is="feature.link ? 'a' : 'div'"
        :href="withBase(feature.link ?? '')"
        class="flx-column-center hover-color"
        :aria-label="feature.title"
      >
        <img
          v-if="feature.image"
          class="feature-img"
          :src="withBase(feature.image)"
          :alt="feature.title"
          :aria-label="feature.title"
        />
        <p :id="`feature-title-${index}`" class="feature-title">{{ feature.title }}</p>
        <p class="feature-details">{{ feature.details }}</p>
      </component>
    </div>
  </TransitionGroup>
</template>
