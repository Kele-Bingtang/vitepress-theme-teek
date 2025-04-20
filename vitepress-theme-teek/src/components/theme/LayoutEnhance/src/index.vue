<script setup lang="ts" name="LayoutEnhance">
import { computed } from "vue";
import { readingIcon } from "@teek/assets";
import { ns } from "./namespace";
import { useTeekConfig } from "@teek/configProvider";
import { TkIcon } from "@teek/components/common/Icon";
import { TkPopover } from "@teek/components/common/Popover";
import LayoutSwitch from "./LayoutSwitch.vue";
import LayoutPageWidthSlide from "./LayoutPageWidthSlide.vue";
import LayoutDocWidthSlide from "./LayoutDocWidthSlide.vue";
import LayoutThemeColor from "./LayoutThemeColor.vue";
import Spotlight from "./Spotlight.vue";
import SpotlightStyle from "./SpotlightStyle.vue";

const { getTeekConfigRef } = useTeekConfig();
const layoutEnhanceConfig = getTeekConfigRef("layoutEnhance", {});

const disabledList = computed(() => {
  return {
    layoutSwitch: layoutEnhanceConfig.value.layoutSwitch?.disabled ?? false,
    layoutThemeColor: layoutEnhanceConfig.value.layoutThemeColor?.disabled ?? false,
    spotlight: layoutEnhanceConfig.value.spotlight?.disabled ?? false,
  };
});
</script>

<template>
  <TkPopover :class="ns.b()" :x-offset="-14">
    <template #reference>
      <TkIcon :icon="readingIcon" :size="20" />
    </template>
    <div :class="ns.e('content')">
      <template v-if="!disabledList.layoutSwitch">
        <LayoutSwitch />
        <LayoutPageWidthSlide />
        <LayoutDocWidthSlide />
      </template>

      <template v-if="!disabledList.layoutThemeColor">
        <LayoutThemeColor />
      </template>

      <template v-if="!disabledList.spotlight">
        <Spotlight />
        <SpotlightStyle />
      </template>
    </div>
  </TkPopover>
</template>
