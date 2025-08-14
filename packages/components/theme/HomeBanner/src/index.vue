<script setup lang="ts" name="HomeBanner">
import type { Banner, BodyBgImg } from "@teek/config";
import { useData } from "vitepress";
import { computed, onMounted, onUnmounted, ref, nextTick, watch } from "vue";
import { useTeekConfig } from "@teek/components/theme/ConfigProvider";
import { useNamespace, useLocale, useEventListener } from "@teek/composables";
import { isClient, upperFirst } from "@teek/helper";
import HomeBannerBgPure from "./HomeBannerBgPure.vue";
import HomeBannerBgImage from "./HomeBannerBgImage.vue";
import HomeBannerContent from "./HomeBannerContent.vue";
import HomeBannerFeature from "./HomeBannerFeature.vue";
import HomeBannerWaves from "./HomeBannerWaves.vue";

defineOptions({ name: "HomeBanner" });

const { disabled = false } = defineProps<{ disabled?: boolean }>();

const fullImgNavBarKey = "full-img-nav-bar";

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
  features: frontmatter.value.tk?.features || [],
});
// bodyBgImg 配置项
const bodyBgImgConfig = getTeekConfigRef<Required<BodyBgImg>>("bodyBgImg", {
  imgSrc: "",
  bannerStyle: "full",
});

const currentBgStyle = computed(() => {
  const { bgStyle } = bannerConfig.value;
  const { imgSrc, bannerStyle } = bodyBgImgConfig.value;
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
  const { titleFontSize, descFontSize, textColor } = bannerConfig.value;

  return { [titleTextVar]: titleFontSize, [descTextVar]: descFontSize, [textColorVar]: textColor };
};

const getAfterContainerStyle = () => {
  let style = "";
  if (currentBgStyle.value.isBannerPartImgBgStyle) {
    const height = ns.cssVarName("home-banner-part-min-height");
    style = `margin-top: var(${height})`;
  }
  return style;
};

const bannerRef = ref<HTMLElement | null>(null);

/**
 * 根据参数决定添加或删除大图导航 class
 */
const toggleFullImgNavBarClass = (add = true) => {
  const vPNavDom = document.querySelector(".VPNavBar");

  if (add) vPNavDom?.classList.add(fullImgNavBarKey);
  else vPNavDom?.classList.remove(fullImgNavBarKey);
};

/**
 * 修改导航栏样式（透明化）
 */
const toggleClass = async () => {
  if (!bannerRef.value || disabled) return;

  const current = currentBgStyle.value;
  // onMounted 已经校验一次，这里再次校验是防止 bannerStyle 配置项动态修改导致兼容性问题
  if (!current.isBannerFullImgBgStyle && !current.isBodyFullImgBgStyle) return;
  await nextTick();

  const offset = current.isBodyImgBgStyle ? 0 : 100;
  const windowInBanner = document.documentElement.scrollTop + offset < document.documentElement.clientHeight;
  toggleFullImgNavBarClass(windowInBanner);
};

// 如果禁用 Banner，则删除 full-img-nav-bar
watch(
  () => disabled,
  () => toggleFullImgNavBarClass(!disabled)
);

watch(
  currentBgStyle,
  style => {
    // 仅在客户端执行document操作
    if (!isClient) return;
    // 监听主题变化调整首页背景色
    if (style.isBodyImgBgStyle) {
      document.body.style.setProperty("--tk-home-bg-color", "transparent");
    } else {
      // 更清晰的方式：直接移除内联设置
      document.body.style.removeProperty("--tk-home-bg-color");
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (currentBgStyle.value.isBannerFullImgBgStyle || currentBgStyle.value.isBodyFullImgBgStyle) {
    // 全屏图片模式，监听滚轮，修改导航栏样式（透明化）
    toggleClass();
    useEventListener(window, "scroll", toggleClass);
  }
});

onUnmounted(() => {
  toggleFullImgNavBarClass(false);
});

const className = computed(() => {
  const {
    isBannerPureBgStyle,
    isBannerPartImgBgStyle,
    isBannerFullImgBgStyle,
    isBodyPartImgBgStyle,
    isBodyFullImgBgStyle,
  } = currentBgStyle.value;

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
  const { isBodyImgBgStyle } = currentBgStyle.value;
  const { bgStyle } = bannerConfig.value;
  const { bannerStyle } = bodyBgImgConfig.value;
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
        <HomeBannerContent>
          <template v-for="(_, name) in $slots" :key="name" #[name]="scope">
            <slot :name="name" v-bind="scope" />
          </template>
        </HomeBannerContent>
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

  <div :class="ns.e('after-container')" :style="getAfterContainerStyle()">
    <slot name="teek-home-banner-after" />
  </div>
</template>
