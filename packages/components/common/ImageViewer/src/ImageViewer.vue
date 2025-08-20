<script lang="ts" setup name="ImageViewer">
import type { ImageViewerEmits, ImageViewerProps, ImageViewerAction, ImageViewerMode } from "./imageViewer";
import { computed, effectScope, nextTick, onMounted, ref, shallowRef, watch } from "vue";
import { useNamespace, useLocale, useDebounce, useEventListener, useZIndex } from "@teek/composables";
import {
  arrowLeftIcon,
  arrowRightIcon,
  closeIcon,
  fullscreenIcon,
  refreshLeftIcon,
  refreshRightIcon,
  scaleToOriginalIcon,
  zoomInIcon,
  zoomOutIcon,
} from "@teek/static";
import { TkFocusTrap } from "@teek/components/common/FocusTrap";
import { TkIcon } from "@teek/components/common/Icon";

defineOptions({ name: "ImageViewer" });

const modes: Record<"CONTAIN" | "ORIGINAL", ImageViewerMode> = {
  CONTAIN: {
    name: "contain",
    icon: fullscreenIcon,
  },
  ORIGINAL: {
    name: "original",
    icon: scaleToOriginalIcon,
  },
};

const props = withDefaults(defineProps<ImageViewerProps>(), {
  urlList: () => [],
  initialIndex: 0,
  infinite: true,
  hideOnClickModal: false,
  teleport: false,
  zoomRate: 1.2,
  minScale: 0.2,
  maxScale: 7,
  closeOnPressEscape: true,
  showProgress: false,
});
const emit = defineEmits<ImageViewerEmits>();

let prevOverflow = "";

const ns = useNamespace("image-viewer");
const { t } = useLocale();
const { nextZIndex } = useZIndex();
const wrapper = ref<HTMLDivElement>();
const imgRefs = ref<HTMLImageElement[]>([]);

const scopeEventListener = effectScope();

const loading = ref(true);
const activeIndex = ref(props.initialIndex);
const mode = shallowRef<ImageViewerMode>(modes.CONTAIN);
const transform = ref({
  scale: 1,
  deg: 0,
  offsetX: 0,
  offsetY: 0,
  enableTransition: false,
});
const zIndex = ref(props.zIndex ?? nextZIndex());

const isSingle = computed(() => {
  const { urlList } = props;
  return urlList.length <= 1;
});

const isFirst = computed(() => activeIndex.value === 0);
const isLast = computed(() => activeIndex.value === props.urlList.length - 1);
const currentImg = computed(() => props.urlList[activeIndex.value]);
const arrowPrevKls = computed(() => [ns.e("btn"), ns.e("prev"), ns.is("disabled", !props.infinite && isFirst.value)]);
const arrowNextKls = computed(() => [ns.e("btn"), ns.e("next"), ns.is("disabled", !props.infinite && isLast.value)]);

const imgStyle = computed(() => {
  const { scale, deg, offsetX, offsetY, enableTransition } = transform.value;
  let translateX = offsetX / scale;
  let translateY = offsetY / scale;

  const radian = (deg * Math.PI) / 180;
  const cosRadian = Math.cos(radian);
  const sinRadian = Math.sin(radian);
  translateX = translateX * cosRadian + translateY * sinRadian;
  translateY = translateY * cosRadian - (offsetX / scale) * sinRadian;

  const style: Record<string, string> = {
    transform: `scale(${scale}) rotate(${deg}deg) translate(${translateX}px, ${translateY}px)`,
    transition: enableTransition ? "transform .3s" : "",
  };
  if (mode.value.name === modes.CONTAIN.name) {
    style.maxWidth = style.maxHeight = "100%";
  }
  return style;
});

const progress = computed(() => `${activeIndex.value + 1} / ${props.urlList.length}`);

const hide = () => {
  unregisterEventListener();
  stopWheelListener?.();
  document.body.style.overflow = prevOverflow;
  emit("close");
};

const registerEventListener = () => {
  const keydownHandler = useDebounce((e: KeyboardEvent) => {
    switch (e.code) {
      // ESC
      case "Escape":
        props.closeOnPressEscape && hide();
        break;
      // SPACE
      case "Space":
        toggleMode();
        break;
      // LEFT_ARROW
      case "ArrowLeft":
        prev();
        break;
      // UP_ARROW
      case "ArrowUp":
        handleActions("zoomIn");
        break;
      // RIGHT_ARROW
      case "ArrowRight":
        next();
        break;
      // DOWN_ARROW
      case "ArrowDown":
        handleActions("zoomOut");
        break;
    }
  });
  const mousewheelHandler = useDebounce((e: WheelEvent) => {
    const delta = e.deltaY || e.deltaX;
    handleActions(delta < 0 ? "zoomIn" : "zoomOut", {
      zoomRate: props.zoomRate,
      enableTransition: false,
    });
  });

  scopeEventListener.run(() => {
    useEventListener(document, "keydown", keydownHandler);
    useEventListener(document, "wheel", mousewheelHandler);
  });
};

const unregisterEventListener = () => {
  scopeEventListener.stop();
};

const handleImgLoad = () => {
  loading.value = false;
};

const handleImgError = (e: Event) => {
  loading.value = false;
  (e.target as HTMLImageElement).alt = t("tk.image.error");
};

const handleMouseDown = (e: MouseEvent) => {
  if (loading.value || e.button !== 0 || !wrapper.value) return;
  transform.value.enableTransition = false;

  const { offsetX, offsetY } = transform.value;
  const startX = e.pageX;
  const startY = e.pageY;

  const dragHandler = useDebounce((ev: MouseEvent) => {
    transform.value = {
      ...transform.value,
      offsetX: offsetX + ev.pageX - startX,
      offsetY: offsetY + ev.pageY - startY,
    };
  });

  const removeDragHandler = () => {
    document.removeEventListener("mousemove", dragHandler);
    // 清除自己
    document.removeEventListener("mouseup", removeDragHandler);
  };

  document.addEventListener("mousemove", dragHandler);
  document.addEventListener("mouseup", removeDragHandler);

  e.preventDefault();
};

const reset = () => {
  transform.value = {
    scale: 1,
    deg: 0,
    offsetX: 0,
    offsetY: 0,
    enableTransition: false,
  };
};

const toggleMode = () => {
  if (loading.value) return;

  const modeNames = Object.keys(modes);
  const modeValues = Object.values(modes);
  const currentMode = mode.value.name;
  const index = modeValues.findIndex(i => i.name === currentMode);
  const nextIndex = (index + 1) % modeNames.length;
  mode.value = modes[modeNames[nextIndex] as keyof typeof modes];
  reset();
};

const setActiveItem = (index: number) => {
  const len = props.urlList.length;
  activeIndex.value = (index + len) % len;
};

const prev = () => {
  if (isFirst.value && !props.infinite) return;
  setActiveItem(activeIndex.value - 1);
};

const next = () => {
  if (isLast.value && !props.infinite) return;
  setActiveItem(activeIndex.value + 1);
};

const handleActions = (action: ImageViewerAction, options = {}) => {
  if (loading.value) return;
  const { minScale, maxScale } = props;
  const { zoomRate, rotateDeg, enableTransition } = {
    zoomRate: props.zoomRate,
    rotateDeg: 90,
    enableTransition: true,
    ...options,
  };
  switch (action) {
    case "zoomOut":
      if (transform.value.scale > minScale) {
        transform.value.scale = Number.parseFloat((transform.value.scale / zoomRate).toFixed(3));
      }
      break;
    case "zoomIn":
      if (transform.value.scale < maxScale) {
        transform.value.scale = Number.parseFloat((transform.value.scale * zoomRate).toFixed(3));
      }
      break;
    case "clockwise":
      transform.value.deg += rotateDeg;
      emit("rotate", transform.value.deg);
      break;
    case "anticlockwise":
      transform.value.deg -= rotateDeg;
      emit("rotate", transform.value.deg);
      break;
  }
  transform.value.enableTransition = enableTransition;
};

const onFocusoutPrevented = (event: CustomEvent) => {
  if (event.detail?.focusReason === "pointer") {
    event.preventDefault();
  }
};

const onCloseRequested = () => {
  if (props.closeOnPressEscape) {
    hide();
  }
};

const wheelHandler = (e: WheelEvent) => {
  if (!e.ctrlKey) return;

  if (e.deltaY < 0) {
    e.preventDefault();
    return false;
  } else if (e.deltaY > 0) {
    e.preventDefault();
    return false;
  }
};

watch(currentImg, () => {
  nextTick(() => {
    const $img = imgRefs.value[0];
    if (!$img?.complete) {
      loading.value = true;
    }
  });
});

watch(activeIndex, val => {
  reset();
  emit("switch", val);
});

registerEventListener();
const stopWheelListener = useEventListener(document, "wheel", wheelHandler, { passive: false });

onMounted(() => {
  // 阻止 body 滚动
  prevOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
});

defineExpose({
  /**
   * 手动切换图片
   */
  setActiveItem,
});
</script>

<template>
  <teleport :disabled="!teleported" to="body">
    <Transition name="viewer-fade" appear>
      <div ref="wrapper" :tabindex="-1" :class="ns.e('wrapper')" :style="{ zIndex }">
        <TkFocusTrap
          loop
          trapped
          :focus-trap-el="wrapper"
          focus-start-el="container"
          @focusout-prevented="onFocusoutPrevented"
          @release-requested="onCloseRequested"
        >
          <div :class="ns.e('mask')" @click.self="hideOnClickModal && hide()" />

          <!-- CLOSE -->
          <span :class="[ns.e('btn'), ns.e('close')]" @click="hide">
            <TkIcon :icon="closeIcon" />
          </span>

          <!-- ARROW -->
          <template v-if="!isSingle">
            <span :class="arrowPrevKls" @click="prev">
              <TkIcon :icon="arrowLeftIcon" />
            </span>
            <span :class="arrowNextKls" @click="next">
              <TkIcon :icon="arrowRightIcon" />
            </span>
          </template>
          <div v-if="$slots.progress || showProgress" :class="[ns.e('btn'), ns.e('progress')]">
            <slot name="progress" :active-index="activeIndex" :total="urlList.length">
              {{ progress }}
            </slot>
          </div>
          <!-- ACTIONS -->
          <div :class="[ns.e('btn'), ns.e('actions')]">
            <div :class="ns.e('actions__inner')">
              <slot
                name="toolbar"
                :actions="handleActions"
                :prev="prev"
                :next="next"
                :reset="toggleMode"
                :active-index="activeIndex"
                :set-active-item="setActiveItem"
              >
                <TkIcon :icon="zoomOutIcon" @click="handleActions('zoomOut')" />
                <TkIcon :icon="zoomInIcon" @click="handleActions('zoomIn')" />
                <i :class="ns.e('actions__divider')" />
                <TkIcon :icon="mode.icon" @click="toggleMode" />
                <i :class="ns.e('actions__divider')" />
                <TkIcon :icon="refreshLeftIcon" @click="handleActions('anticlockwise')" />
                <TkIcon :icon="refreshRightIcon" @click="handleActions('clockwise')" />
              </slot>
            </div>
          </div>
          <!-- CANVAS -->
          <div :class="ns.e('canvas')">
            <img
              v-for="(url, i) in urlList"
              v-show="i === activeIndex"
              :ref="el => (imgRefs[i] = el as HTMLImageElement)"
              :key="url"
              :src="url"
              :style="imgStyle"
              :class="ns.e('img')"
              class="image-viewer__img"
              :crossorigin="crossorigin"
              @load="handleImgLoad"
              @error="handleImgError"
              @mousedown="handleMouseDown"
            />
          </div>
          <slot />
        </TkFocusTrap>
      </div>
    </Transition>
  </teleport>
</template>
