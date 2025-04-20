<script setup lang="ts" name="ThemeSize">
import type { ThemeSetting } from "@teek/config";
import { computed, unref, ref, watch } from "vue";
import { useData } from "vitepress";
import { useLocale, useStorage } from "@teek/hooks";
import { sizeIcon } from "@teek/assets";
import { useTeekConfig } from "@teek/configProvider";
import { TkIcon } from "@teek/components/common/Icon";
import { ns } from "./namespace";

defineOptions({ name: "ThemeSize" });

const { t } = useLocale();

const { frontmatter } = useData();
const { getTeekConfigRef } = useTeekConfig();

const themeSettingConfig = getTeekConfigRef<Required<ThemeSetting>>("themeSetting", {
  themeSize: "default",
  themeSizeAppend: [],
  themeSizeLabel: {},
  titleTip: {},
});

const themeSizeStorageKey = ns.joinNamespace("themeSize");

// 主题尺寸
const showThemeSizeItem = ref(false);
const currentThemeSize = useStorage(themeSizeStorageKey, unref(themeSettingConfig).themeSize);
const themeSizeList = computed(() => {
  const { themeSizeLabel, themeSizeAppend } = unref(themeSettingConfig);
  return [
    { name: themeSizeLabel.wide ?? "Wide", size: "wide" },
    { name: themeSizeLabel.large ?? "Large", size: "large" },
    { name: themeSizeLabel.default ?? "Default", size: "default" },
    { name: themeSizeLabel.small ?? "Small", size: "small" },
    ...themeSizeAppend,
  ];
});

const attribute = "theme-size";

/**
 * 修改主题尺寸
 */
const changeTheme = (value: string) => {
  if ([document.documentElement.getAttribute(attribute)].includes(value)) return;

  currentThemeSize.value = value;
  document.documentElement.setAttribute(attribute, value);
};

watch(
  () => unref(themeSettingConfig).themeSize,
  (newValue: string) => changeTheme(newValue)
);

/**
 * 修改文章页的主题尺寸，仅当 frontmatter.themeSize 存在时生效
 */
watch(
  () => unref(frontmatter).themeSize,
  (docThemeSize: string) => {
    if (docThemeSize) changeTheme(docThemeSize);
  },
  { immediate: true }
);
</script>

<template>
  <div
    :title="themeSettingConfig.titleTip.themeSize ?? t('tk.rightBottomButton.themeSizeTitle')"
    :class="`${ns.e('button')} size-change`"
    @mouseenter="showThemeSizeItem = true"
    @mouseleave="showThemeSizeItem = false"
    @click="showThemeSizeItem = true"
    role="button"
    :aria-label="themeSettingConfig.titleTip.themeSize ?? t('tk.rightBottomButton.themeSizeTitle')"
  >
    <TkIcon :icon="sizeIcon" aria-hidden="true" />
    <transition :name="ns.joinNamespace('fade-scale')">
      <ul :class="`${ns.e('button__size')} dropdown`" v-show="showThemeSizeItem" @click.stop @touchstart.stop>
        <li
          v-for="item in themeSizeList"
          :key="item.size"
          title=""
          :class="['dropdown-item', 'sle', { active: item.size === currentThemeSize }]"
          @click="changeTheme(item.size)"
          role="button"
          :aria-label="item.name"
        >
          {{ item.name }}
        </li>
      </ul>
    </transition>
  </div>
</template>
