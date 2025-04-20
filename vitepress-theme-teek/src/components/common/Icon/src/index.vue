<script setup lang="ts" name="Icon">
import type { IconProps } from "./icon";
import { useSlots, computed } from "vue";
import { useNamespace } from "@teek/hooks";
import { addUnit, isString } from "@teek/helper";
import SvgIcon from "./components/SvgIcon.vue";
import FontIcon from "./components/FontIcon.vue";
import IconifyOffline from "./components/IconifyOffline.vue";
import IconifyOnline from "./components/IconifyOnline.vue";

defineOptions({ name: "Icon" });

const ns = useNamespace("icon");

const { icon, iconType, color, hover = false, hoverColor, ...props } = defineProps<IconProps & { icon: any }>();

const slot = useSlots();

const getStyle = () => {
  return {
    ...props.style,
    "--icon-color": color,
    "--icon-size": props.size && addUnit(props.size),
    "--icon-color-hover": hoverColor || ns.cssVar("theme-color"),
  };
};

/**
 * 当 props.icon 为字符串时，支持传入修饰符来代替 props.iconType
 *
 * 1、icon 为 if- 或 IF- 开头，则默认为 iconfont
 * 2、icon 为 uni- 或 UNI- 开头，则默认为 unicode
 * 3、icon 为 sym- 或 SYM- 开头，则默认为 symbol
 * 4、icon 为 img- 或 IMG- 开头，则默认为 img
 */
const finalIcon = computed<any>(() => {
  if (isString(icon)) return icon.replace(/^(if-|uni-|sym-|img-)/, "");
  return icon;
});

const getFontIconType = () => {
  if (iconType && ["unicode", "iconfont", "symbol"].includes(iconType)) {
    return iconType as unknown as "unicode" | "iconfont" | "symbol";
  }

  if (icon.toLowerCase().startsWith("if-")) return "iconfont";
  if (icon.toLowerCase().startsWith("uni-")) return "unicode";
  if (icon.toLowerCase().startsWith("sym-")) return "symbol";
};

const isSvgIcon = () => isString(icon) && (iconType === "svg" || icon.startsWith("<svg"));
const isFontIcon = () => isString(icon) && getFontIconType();
const isComponent = () => !isString(icon) && (iconType === "component" || icon.name || icon.setup);
const isIconifyOffline = () => !isString(icon) && (iconType === "iconifyOffline" || icon.body);
const isIconifyOnline = () => isString(icon) && (iconType === "iconifyOnline" || icon.includes(":"));
const isImg = () => isString(icon) && (iconType === "img" || icon.toLowerCase().startsWith("img-"));
</script>

<template>
  <span :class="[ns.b(), ns.is('hover', hover)]" :style="getStyle()">
    <template v-if="slot.default">
      <slot />
    </template>

    <template v-else-if="isComponent()">
      <component :is="finalIcon" :size />
    </template>

    <SvgIcon v-else-if="isSvgIcon()" :icon="finalIcon" />

    <FontIcon v-else-if="isFontIcon()" :icon="finalIcon" :iconType="getFontIconType()!" />

    <IconifyOffline v-else-if="isIconifyOffline()" :icon="finalIcon" />

    <IconifyOnline v-else-if="isIconifyOnline()" :icon="finalIcon" />

    <img v-else-if="isImg()" :src="finalIcon" :alt="imgAlt" />
  </span>
</template>
