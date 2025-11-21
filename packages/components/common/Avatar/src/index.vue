<script setup lang="ts" name="Avatar">
import type { AvatarProps, AvatarEmit } from "./avatar";
import type { CSSProperties } from "vue";
import { computed, ref, watch } from "vue";
import { useNamespace } from "@teek/composables";
import { addUnit, isString } from "@teek/helper";
import { TkIcon } from "@teek/components/common/Icon";

defineOptions({ name: "Avatar" });

const {
  size,
  shape = "circle",
  icon,
  src,
  alt,
  srcSet,
  fit = "cover",
  bgColor,
  textColor,
  textSize,
  iconSize,
  text,
} = defineProps<AvatarProps>();
const emit = defineEmits<AvatarEmit>();

const ns = useNamespace("avatar");

const hasLoadError = ref(false);

const avatarClass = computed(() => {
  const classList = [ns.b()];

  if (isString(size)) classList.push(ns.m(size));
  if (icon) classList.push(ns.m("icon"));
  if (shape) classList.push(ns.m(shape));
  return classList;
});

const avatarStyle = computed(() => {
  return {
    [ns.cssVarName("avatar-size")]: addUnit(size),
    [ns.cssVarName("avatar-bg-color")]: bgColor,
    [ns.cssVarName("avatar-text-color")]: textColor,
    [ns.cssVarName("avatar-text-size")]: addUnit(textSize),
    [ns.cssVarName("avatar-icon-size")]: addUnit(iconSize),
  };
});

const imgStyle = computed(() => ({ objectFit: fit }) as CSSProperties);

watch(
  () => src,
  () => (hasLoadError.value = false)
);

const handleError = (e: Event) => {
  hasLoadError.value = true;
  emit("error", e);
};

/**
 * 截取字符串首字符（中文）或者截取两个单词首字母（英文）
 */
const captureText = (text: string | undefined) => {
  if (!text) return "";
  const isChinese = /^[\u4e00-\u9fa5]+$/.test(text.charAt(0));

  // 如果是中文，截取第一个字符
  if (isChinese) return text.charAt(0);
  // 如果是英文，截取前两个单词的首字母转大写
  const words = text.split(/\s+/).filter(word => word.length > 0);
  if (words.length >= 2) {
    return words
      .slice(0, 2)
      .map(word => word.charAt(0).toUpperCase())
      .join("");
  }
  // 如果只有一个单词，只截取第一个字母转大写
  if (words.length === 1) return words[0].charAt(0).toUpperCase();

  return "";
};
</script>

<template>
  <span :class="avatarClass" :style="avatarStyle">
    <img v-if="(src || srcSet) && !hasLoadError" :src :alt :srcSet :style="imgStyle" @error="handleError" />
    <TkIcon v-else-if="icon" :icon="icon" />
    <span v-else-if="text">{{ captureText(text) }}</span>
    <slot v-else />
  </span>
</template>
