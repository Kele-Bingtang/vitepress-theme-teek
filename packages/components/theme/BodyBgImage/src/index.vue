<script setup lang="ts" name="BodyBgImage">
import type { BodyBgImg } from "@teek/config";
import { computed, onMounted } from "vue";
import { withBase } from "vitepress";
import { useNamespace, useSwitchData } from "@teek/composables";
import { isFunction, isString } from "@teek/helper";
import { useTeekConfig } from "@teek/components/theme/ConfigProvider";

defineOptions({ name: "BodyBgImage" });

const ns = useNamespace("body-bg-image");

const { getTeekConfigRef } = useTeekConfig();

const bodyBgImgConfig = getTeekConfigRef<BodyBgImg>("bodyBgImg", {
  imgSrc: undefined,
  imgOpacity: 1,
  imgInterval: 15000,
  imgShuffle: false,
  mask: false,
  maskBg: "rgba(0, 0, 0, 0.2)",
});

const dataArray = computed(() => {
  const imgSrc = bodyBgImgConfig.value.imgSrc;
  return [isFunction(imgSrc) ? imgSrc() : imgSrc || []].flat().map(item => item && withBase(item));
});
// body 背景图片定时轮播
const {
  data: imageSrc,
  start,
  index,
} = useSwitchData(dataArray, {
  timeout: bodyBgImgConfig.value.imgInterval,
  shuffle: bodyBgImgConfig.value.imgShuffle,
  onAfterUpdate: () => {
    // 预加载下一张图片
    const nextIndex = (index.value + 1) % dataArray.value.length;
    const newValue = dataArray.value[nextIndex];
    if (newValue) {
      const img = new Image();
      img.src = newValue;
    }
  },
});

onMounted(() => {
  start();
});

const getStyle = () => {
  const { imgSrc, imgOpacity, maskBg } = bodyBgImgConfig.value;
  const imgBgVar = ns.cssVarName("body-bg-img");
  const imgBgOpacityVar = ns.cssVarName("body-bg-img-opacity");
  const maskBgColorVar = ns.cssVarName("body-mask-bg-color");

  // 如果没有传入图片，则加载默认图片
  if (!imgSrc?.length) return { [imgBgVar]: ns.cssVar("bg-img-default") };

  return {
    [imgBgVar]: `url(${imageSrc.value}) center center / cover no-repeat`,
    [imgBgOpacityVar]: imgOpacity,
    [maskBgColorVar]: isString(maskBg) ? maskBg : `rgba(0, 0, 0, ${maskBg})`,
  };
};
</script>

<template>
  <div :class="ns.b()" :style="getStyle()">
    <div v-if="bodyBgImgConfig.mask" class="mask" />
  </div>
</template>
