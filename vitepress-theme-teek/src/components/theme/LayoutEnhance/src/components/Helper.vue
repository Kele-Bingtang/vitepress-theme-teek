<script setup lang="ts" name="Helper">
import type { PopoverProps } from "@teek/components/common/Popover";
import { questionFilledIcon } from "@teek/assets";
import { TkIcon } from "@teek/components/common/Icon";
import { TkPopover } from "@teek/components/common/Popover";
import { ns } from "../namespace";

defineOptions({ name: "Helper" });

defineProps<{ virtualEl?: HTMLDivElement; offset?: number }>();

const visible = defineModel({ type: Boolean, default: false });

const beforePopup: PopoverProps["beforePopup"] = options => {
  const { popupLeft, popoverElement } = options;
  const rect = popoverElement.getBoundingClientRect();
  return {
    left: popupLeft - rect.width,
  };
};
</script>

<template>
  <TkPopover :class="ns.e('helper')" v-model="visible" :virtual-el :offset="12" :before-popup>
    <template #reference>
      <TkIcon :icon="questionFilledIcon" :size="16" />
    </template>
    <div :class="ns.e('helper__popup')">
      <slot />
    </div>
  </TkPopover>
</template>
