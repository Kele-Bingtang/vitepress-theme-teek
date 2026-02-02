<script setup lang="ts" name="ThemeColor">
import type { ThemeEnhance } from "@teek/config";
import type { ThemeColorOption } from "./themeEnhance";
import { ref, watch, computed } from "vue";
import { useData } from "vitepress";
import { isClient } from "@teek/helper";
import { useStorage, useMediaQuery, useLocale, useThemeColor, varNameList } from "@teek/composables";
import { waterIcon } from "@teek/static";
import { useTeekConfig } from "@teek/components/theme/ConfigProvider";
import { ThemeColorName, mobileMaxWidthMedia, themeColorAttribute, themeColorList } from "./themeEnhance";
import { ns, themeColorStorageKey, themeBgColorStorageKey } from "./namespace";
import BaseTemplate from "./components/BaseTemplate.vue";
import Switch from "./components/Switch.vue";
import { useThemeColorList } from "./useThemeColorList";

defineOptions({ name: "ThemeColor" });

const { getTeekConfigRef } = useTeekConfig();
const themeEnhanceConfig = getTeekConfigRef<ThemeEnhance>("themeEnhance", {});
const { t } = useLocale();
const { frontmatter } = useData();
const isMobile = useMediaQuery(mobileMaxWidthMedia);

const themeColorName = useStorage<string>(
  themeColorStorageKey,
  themeEnhanceConfig.value.themeColor?.defaultColorName || ThemeColorName.vpDefault
);
const isSpread = useStorage(themeBgColorStorageKey, themeEnhanceConfig.value.themeColor?.defaultSpread || false);

const oldThemeColor = ref(themeColorName.value);

// 主题色
const primaryColor = ref("");
// 根据 primaryColor 计算其他 var 变量需要的颜色，并直接覆盖这些 var 变量的颜色
const { clear, updateSpread } = useThemeColor(primaryColor, () => {
  // 内置的 VP、EP 主题色需要忽略部分 var 变量，因为这些 var 变量已经固定，无需自动计算新的值替换（具体看 packages/theme-chalk/var/theme-color.scss 文件）
  if (themeColorList.includes(themeColorName.value)) {
    return [varNameList.vpBrand1, varNameList.vpBrand2, varNameList.vpBrand3, varNameList.vpBrandSoft];
  }
});

const themeColorSelectList = useThemeColorList();

/**
 * 更新主题色
 */
const update = (val: string) => {
  if (!isClient) return;

  const el = document.documentElement;

  if (el.getAttribute(themeColorAttribute) === val) return;
  el.setAttribute(themeColorAttribute, val);

  // includes 为 true 走内置主题色逻辑
  if (themeColorList.includes(val)) {
    // 先清除旧属性再获取新属性，否则一直获取的是旧属性
    clear();
    primaryColor.value = getComputedStyle(el).getPropertyValue(varNameList.vpBrand1);
  } else {
    const appendThemeColor = themeEnhanceConfig.value.themeColor?.append || [];
    // 扁平化 options 并获取 val 对应的 option
    const option = appendThemeColor
      .map(item => item.options)
      .flat()
      .filter(item => item.value === val);

    const color = option[0]?.color;

    // 如果 color 不存在，则默认从 css var 获取主题色，因此先清除旧属性再获取新属性，否则一直获取的是旧属性
    !color && clear();
    primaryColor.value = color || getComputedStyle(el).getPropertyValue(varNameList.vpBrand1);
  }

  themeEnhanceConfig.value.themeColor?.switchColorDone?.(val);
};

watch(themeColorName, update, { immediate: true });

// 文章单独设置主题色
watch(
  () => frontmatter.value.themeColorName,
  newVal => {
    if (newVal) {
      oldThemeColor.value = themeColorName.value;
      themeColorName.value = newVal;
    } else {
      // 还原
      themeColorName.value = oldThemeColor.value;
    }
  },
  { immediate: true }
);

// 扩散到其他 var 变量（useThemeColor composables）
watch(isSpread, updateSpread, { immediate: true, flush: "post" });

const tips = computed(() => [
  { title: t("tk.themeEnhance.themeColor.vpHelpTipTitle"), content: t("tk.themeEnhance.themeColor.vpHelpTipContent") },
  { title: t("tk.themeEnhance.themeColor.epHelpTipTitle"), content: t("tk.themeEnhance.themeColor.epHelpTipContent") },
]);

const handleChangePrimaryColor = (option: ThemeColorOption) => {
  themeColorName.value = option.value;
};

const getStyle = (color: string | undefined) => {
  return color ? { backgroundColor: color } : {};
};
</script>

<template>
  <BaseTemplate
    :class="ns.e('theme-color')"
    :icon="waterIcon"
    :title="t('tk.themeEnhance.themeColor.title')"
    :helper="!themeEnhanceConfig.themeColor?.disableHelp"
    :helper-desc="t('tk.themeEnhance.themeColor.helpDesc')"
    :tips
    :disabled="isMobile"
  >
    <template #title>
      <div class="flx-justify-between flx-1">
        {{ t("tk.themeEnhance.themeColor.title") }}
        <div class="flx-align-center">
          <span class="label">{{ t("tk.themeEnhance.themeColor.speedLabel") }}</span>
          <Switch v-model="isSpread" />
        </div>
      </div>
    </template>

    <template v-for="item in themeColorSelectList" :key="item.label">
      <h3 :title="item.tip" :aria-label="item.label">{{ item.label }}</h3>
      <ul class="color-list flx-justify-between flx-wrap">
        <li
          v-for="option in item.options"
          :key="item.label + option.value"
          class="flx-column-center"
          @click="handleChangePrimaryColor(option)"
          :title="option.title"
          :aria-label="option.ariaLabel ?? option.title ?? option.label"
        >
          <div class="color-wrapper flx-center" :class="ns.is('active', option.value === themeColorName)">
            <div class="color-bg" :style="getStyle(option.color)"></div>
          </div>
          <span>{{ option.label }}</span>
        </li>
      </ul>
    </template>
  </BaseTemplate>
</template>
