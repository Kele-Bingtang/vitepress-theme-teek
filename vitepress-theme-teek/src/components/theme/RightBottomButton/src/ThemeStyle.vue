<script setup lang="ts" name="ThemeStyle">
import type { ThemeSetting } from "@teek/config";
import { computed, unref, ref, watch } from "vue";
import { useData } from "vitepress";
import { useTeekConfig } from "@teek/configProvider";
import { TkIcon } from "@teek/components/common/Icon";
import { useLocale, useStorage } from "@teek/hooks";
import { magicIcon } from "@teek/assets";
import { ns } from "./namespace";

defineOptions({ name: "ThemeStyle" });

const { t } = useLocale();

const { frontmatter } = useData();
const { getTeekConfigRef } = useTeekConfig();

const themeSettingConfig = getTeekConfigRef<Required<ThemeSetting>>("themeSetting", {
  themeStyle: "vp-default",
  themeStyleAppend: [],
  themeStyleLabel: {},
  titleTip: {},
});

const themeStyleStorageKey = ns.joinNamespace("themeStyle");
// 主题样式
const showThemeStyleItem = ref(false);
const currentThemeStyle = useStorage(themeStyleStorageKey, unref(themeSettingConfig).themeStyle);

const themeStyleList = computed(() => {
  const { themeStyleLabel, themeStyleAppend } = unref(themeSettingConfig);
  return [
    {
      label: themeStyleLabel.vpLabel ?? t("tk.rightBottomButton.vpLabel"),
      tip: themeStyleLabel.vpTip ?? t("tk.rightBottomButton.vpTip"),
      options: [
        { name: themeStyleLabel.default ?? t("tk.rightBottomButton.default"), style: "vp-default" },
        { name: themeStyleLabel.vpGreen ?? t("tk.rightBottomButton.vpGreen"), style: "vp-green" },
        { name: themeStyleLabel.vpYellow ?? t("tk.rightBottomButton.vpYellow"), style: "vp-yellow" },
        { name: themeStyleLabel.vpRed ?? t("tk.rightBottomButton.vpRed"), style: "vp-red" },
      ],
    },
    {
      label: themeStyleLabel.epLabel ?? t("tk.rightBottomButton.epLabel"),
      tip: themeStyleLabel.epTip ?? t("tk.rightBottomButton.epTip"),
      options: [
        { name: themeStyleLabel.epBlue ?? t("tk.rightBottomButton.epBlue"), style: "el-blue" },
        { name: themeStyleLabel.epGreen ?? t("tk.rightBottomButton.epGreen"), style: "el-green" },
        { name: themeStyleLabel.epYellow ?? t("tk.rightBottomButton.epYellow"), style: "el-yellow" },
        { name: themeStyleLabel.epRed ?? t("tk.rightBottomButton.epRed"), style: "el-red" },
      ],
    },
    ...themeStyleAppend,
  ];
});

const attribute = "layout-color";

/**
 * 修改主题风格
 */
const changeTheme = (value: string) => {
  if ([document.documentElement.getAttribute(attribute)].includes(value)) return;

  currentThemeStyle.value = value;
  document.documentElement.setAttribute(attribute, value);
};

watch(
  () => unref(themeSettingConfig).themeStyle,
  (newValue: string) => changeTheme(newValue)
);

/**
 * 修改文章页的主题风格，仅当 frontmatter.themeStyle 存在时生效
 */
watch(
  () => unref(frontmatter).themeStyle,
  (docThemeStyle: string) => {
    if (docThemeStyle) changeTheme(docThemeStyle);
  },
  { immediate: true }
);
</script>

<template>
  <div
    :title="themeSettingConfig.titleTip.themeStyle ?? t('tk.rightBottomButton.themeStyleTitle')"
    :class="ns.e('button')"
    @mouseenter="showThemeStyleItem = true"
    @mouseleave="showThemeStyleItem = false"
    @click="showThemeStyleItem = true"
    role="button"
    :aria-label="themeSettingConfig.titleTip.themeStyle ?? t('tk.rightBottomButton.themeStyleTitle')"
  >
    <TkIcon :icon="magicIcon" aria-hidden="true" />
    <transition :name="ns.joinNamespace('fade-scale')">
      <div :class="`${ns.e('button__style')} dropdown`" v-show="showThemeStyleItem" @click.stop @touchstart.stop>
        <ul v-for="item in themeStyleList" :key="item.label">
          <li :class="`${ns.e('button__style__title')} sle`" :title="item.tip || ''" :aria-label="item.label">
            {{ item.label }}
          </li>
          <li>
            <ul>
              <li
                v-for="option in item.options"
                :key="item.label + option.style"
                title=""
                :class="['dropdown-item', 'sle', { active: option.style === currentThemeStyle }]"
                @click="changeTheme(option.style)"
                role="button"
                :aria-label="option.name"
              >
                {{ option.name }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
