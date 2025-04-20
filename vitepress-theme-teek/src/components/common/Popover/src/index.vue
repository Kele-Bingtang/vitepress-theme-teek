<script setup lang="ts" name="Popover">
import { computed, nextTick, ref, useTemplateRef, watch } from "vue";
import { useNamespace, useElementHover, useWindowSize } from "@teek/hooks";
import type { PopoverProps } from "./popover";
import { addUnit, removeUnit } from "@teek/helper";

defineOptions({ name: "Popover" });

const {
  width,
  height,
  offset = 0,
  xOffset = 0,
  yOffset = 0,
  disabled = false,
  transition = true,
  virtualEl,
  beforePopup,
} = defineProps<PopoverProps>();

const ns = useNamespace("popover");

const popoverRef = useTemplateRef("popoverRef");
const popupElementRef = useTemplateRef("popupElementRef");
const isHovered = useElementHover(popoverRef);
const popupVisible = useElementHover(popupElementRef);
const { width: windowWidth, height: windowHeight } = useWindowSize();

const visible = defineModel({ default: false });

const popupCoordinatesX = ref(0);
const popupCoordinatesY = ref(0);

/**
 * 计算弹出框的位置
 */
const calculatePopupPosition = async (isHovered: boolean) => {
  if (!isHovered || !popoverRef.value || !popupElementRef.value) {
    visible.value = false;
    return;
  }
  await nextTick();

  const popoverElement = (virtualEl as any)?.$el || virtualEl || popoverRef.value;
  const {
    left,
    top,
    right,
    height: popoverHight,
    width: popoverWidth,
    bottom,
  } = popoverElement.getBoundingClientRect();

  const popupElement = popupElementRef.value;
  const pw = removeUnit(width) ?? popupElement.offsetWidth;
  const ph = removeUnit(height) ?? popupElement.offsetHeight;

  // 判断弹出框是否超出边界
  const hasFreeSpaceOnTheRight = right + pw < windowWidth.value;
  const hasFreeSpaceBelow = bottom + ph < windowHeight.value;
  const hasFreeSpaceOnTheLeft = left - pw > 0;
  const hasFreeSpaceAbove = top - ph > 0;

  const finalXOffset = offset || xOffset;
  let popupLeft = 0;
  let popupTop = 0;

  if (hasFreeSpaceOnTheRight) popupLeft = left + window.scrollX + finalXOffset;
  else if (hasFreeSpaceOnTheLeft) popupLeft = left + window.scrollX - pw + popoverWidth - finalXOffset;
  else {
    visible.value = false; // 如果左右都超出边界，则不显示弹出框
    return;
  }

  const finalYOffset = offset || yOffset;

  if (hasFreeSpaceBelow) popupTop = top + window.scrollY + popoverHight - 6 + finalYOffset;
  else if (hasFreeSpaceAbove) popupTop = top + window.scrollY - ph + 6 - finalYOffset;
  else {
    visible.value = false; // 如果上下都超出边界，则不显示弹出框
    return;
  }

  // 支持外界修改 left 和 top 位置
  const result = beforePopup?.({ popupLeft, popupTop, popoverElement, popupElement });

  popupCoordinatesX.value = result?.left ?? popupLeft;
  popupCoordinatesY.value = result?.top ?? popupTop;
};

// 鼠标悬停打开，离开关闭
watch(isHovered, newVal => {
  visible.value = newVal;
});
// 窗口打开，计算位置
watch(visible, calculatePopupPosition);
// 鼠标悬停在弹框内，不关闭弹框
watch(popupVisible, newVal => (visible.value = newVal));

const popupStyle = computed(() => {
  return {
    top: `${popupCoordinatesY.value}px`,
    left: `${popupCoordinatesX.value}px`,
    width: addUnit(width),
    height: addUnit(height),
  };
});
</script>

<template>
  <div ref="popoverRef" :class="ns.b()">
    <slot name="reference"></slot>
    <Teleport to="body">
      <Transition :name="transition ? ns.joinNamespace('fade-linear') : ''">
        <div
          v-if="!disabled"
          v-show="visible"
          ref="popupElementRef"
          :style="popupStyle"
          :class="ns.e('content')"
          @click.stop
          @touchstart.stop
        >
          <slot />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
