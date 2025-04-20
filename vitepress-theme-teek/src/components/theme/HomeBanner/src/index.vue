<script setup lang="ts" name="HomeBanner">
import type { Banner, BodyBgImg } from "@teek/config";
import { useData } from "vitepress";
import { computed, onMounted, onUnmounted, ref, unref } from "vue";
import { useTeekConfig } from "@teek/configProvider";
import { useNamespace, useLocale } from "@teek/hooks";
import { upperFirst } from "@teek/helper";
import HomeBannerBgPure from "./HomeBannerBgPure.vue";
import HomeBannerBgImage from "./HomeBannerBgImage.vue";
import HomeBannerContent from "./HomeBannerContent.vue";
import HomeBannerFeature from "./HomeBannerFeature.vue";
import HomeBannerWaves from "./HomeBannerWaves.vue";

defineOptions({ name: "HomeBanner" });

const ns = useNamespace("banner");
const { t } = useLocale();

const { getTeekConfigRef } = useTeekConfig();
const { frontmatter } = useData();

// Banner 配置项
const bannerConfig = getTeekConfigRef<Required<Banner>>("banner", {
  bgStyle: "pure",
  imgWaves: true,
  textColor: "#ffffff",
  titleFontSize: "3.2rem",
  descFontSize: "1.4rem",
  features: unref(frontmatter).tk?.features || [],
});
// bodyBgImg 配置项
const bodyBgImgConfig = getTeekConfigRef<Required<BodyBgImg>>("bodyBgImg", {
  imgSrc: "",
  bannerStyle: "full",
});

const currentBgStyle = computed(() => {
  const { bgStyle } = unref(bannerConfig);
  const { imgSrc, bannerStyle } = unref(bodyBgImgConfig);
  // 纯色背景风格
  const isBannerPureBgStyle = bgStyle === "pure";
  // 局部图片背景风格
  const isBannerPartImgBgStyle = bgStyle === "partImg";
  // 全屏图片背景风格
  const isBannerFullImgBgStyle = bgStyle === "fullImg";
  // 是否使用 bodyBgImg 配置
  const isBodyImgBgStyle = !!imgSrc;
  const isBodyPartImgBgStyle = isBodyImgBgStyle && bannerStyle === "part";
  const isBodyFullImgBgStyle = isBodyImgBgStyle && bannerStyle === "full";

  return {
    isBannerPureBgStyle,
    isBannerPartImgBgStyle,
    isBannerFullImgBgStyle,
    isBodyImgBgStyle,
    isBodyPartImgBgStyle,
    isBodyFullImgBgStyle,
  };
});

const getStyle = () => {
  const titleTextVar = ns.cssVarName("banner-title-text");
  const descTextVar = ns.cssVarName("banner-desc-text");
  const textColorVar = ns.cssVarName("banner-text-color");
  const { titleFontSize, descFontSize, textColor } = unref(bannerConfig);

  return { [titleTextVar]: titleFontSize, [descTextVar]: descFontSize, [textColorVar]: textColor };
};

const bannerRef = ref<HTMLElement | null>(null);

/**
 * 修改导航栏样式（透明化）
 */
const toggleClass = () => {
  const vPNavDom = document.querySelector(".VPNavBar");
  // 获取窗口高度
  const windowH = unref(bannerRef)?.clientHeight;

  if (!vPNavDom || !windowH) return;

  const offset = unref(currentBgStyle).isBodyImgBgStyle ? 0 : 100;
  if (unref(bannerRef) && document.documentElement.scrollTop + offset < windowH) {
    vPNavDom.classList.add("full-img-nav-bar");
  } else vPNavDom.classList.remove("full-img-nav-bar");
};

onMounted(() => {
  if (unref(currentBgStyle).isBannerFullImgBgStyle || unref(currentBgStyle).isBodyFullImgBgStyle) {
    // 全屏图片模式，监听滚轮，修改导航栏样式（透明化）
    toggleClass();
    window.addEventListener("scroll", toggleClass);
  }
});

onUnmounted(() => {
  document.querySelector(".VPNavBar")?.classList.remove("full-img-nav-bar");
  if (unref(currentBgStyle).isBannerFullImgBgStyle || unref(currentBgStyle).isBodyImgBgStyle) {
    window.removeEventListener("scroll", toggleClass);
  }
});

const className = computed(() => {
  const {
    isBannerPureBgStyle,
    isBannerPartImgBgStyle,
    isBannerFullImgBgStyle,
    isBodyPartImgBgStyle,
    isBodyFullImgBgStyle,
  } = unref(currentBgStyle);

  // body 优先级高
  if (isBodyPartImgBgStyle) return ns.is("part-img");
  if (isBodyFullImgBgStyle) return ns.is("full-img");
  if (isBannerPureBgStyle) return ns.is("pure");
  if (isBannerPartImgBgStyle) return ns.is("part-img");
  if (isBannerFullImgBgStyle) return ns.is("full-img");

  return "";
});

// full 模式（全屏图片模式）需要将内容和 Feature 居中，所以需要添加 class: center
const styleComponentMap: Record<string, any> = {
  bodyPart: { el: "div", props: { class: `body-pure` } },
  bodyFull: { el: "div", props: { class: `body-full` } },
  bannerPure: { el: HomeBannerBgPure },
  bannerPartImg: { el: HomeBannerBgImage },
  bannerFullImg: { el: HomeBannerBgImage },
};

const styleComponent = computed(() => {
  const { isBodyImgBgStyle } = unref(currentBgStyle);
  const { bgStyle } = unref(bannerConfig);
  const { bannerStyle } = unref(bodyBgImgConfig);
  const currentStyle = isBodyImgBgStyle ? `body${upperFirst(bannerStyle)}` : `banner${upperFirst(bgStyle)}`;

  return styleComponentMap[currentStyle];
});
</script>

<template>
  <slot name="teek-home-banner-before" />

  <div ref="bannerRef" :class="[ns.b(), className]" :style="getStyle()" :aria-label="t('tk.homeBanner.label')">
    <component :is="styleComponent.el" v-bind="styleComponent.props">
      <div :class="[ns.e('content'), { 'no-feature': !bannerConfig.features.length }]">
        <slot name="teek-home-banner-content-before" />
        <HomeBannerContent />
        <slot name="teek-home-banner-content-after" />

        <slot name="teek-home-banner-feature-before" />
        <HomeBannerFeature />
        <slot name="teek-home-banner-feature-after" />
      </div>
    </component>

    <HomeBannerWaves
      v-if="bannerConfig.imgWaves && currentBgStyle.isBannerFullImgBgStyle && !currentBgStyle.isBodyImgBgStyle"
      :aria-label="t('tk.homeBanner.wavesLabel')"
    />
  </div>

  <slot name="teek-home-banner-after" />
</template>
