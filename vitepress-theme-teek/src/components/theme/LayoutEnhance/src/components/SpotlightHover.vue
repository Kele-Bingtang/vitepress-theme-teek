<script setup lang="ts" name="SpotlightHover">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vitepress";
import { useEventListener, useStorage } from "@teek/hooks";
import { SpotlightStyle } from "../layoutEnhance";
import { spotlightStyleStorageKey } from "../namespace";

defineOptions({ name: "SpotlightHover" });

const props = defineProps<{ enabled: boolean }>();

const shouldRecalculate = ref(false);
const boxStyles = ref<Record<string, string | number>>({ display: "none" });
const vpDocElement = ref<HTMLDivElement>();
const highlightedElement = ref<HTMLElement>();

const spotlightStyle = useStorage<SpotlightStyle>(spotlightStyleStorageKey, SpotlightStyle.Aside);

const mousePosition = ref<{ x: number; y: number }>({ x: 0, y: 0 });

const computeBoxStyles = (bounding: { height: number; left: number; top: number; width: number }) => {
  return {
    display: "block",
    width: `${bounding.width + 8}px`,
    height: `${bounding.height + 8}px`,
    left: `${bounding.left - 4}px`,
    top: `${bounding.top - 4}px`,
    transition: "all 0.2s ease",
    borderRadius: "8px",
  };
};

const findChildElementUnderVPDocElement = (element: HTMLElement | null) => {
  if (element === null) return null;

  if (element.parentElement === document.querySelector(".VPDoc main .vp-doc > div")) return element;
  else return findChildElementUnderVPDocElement(element.parentElement);
};

const watchHandler = () => {
  const element = document.elementFromPoint(mousePosition.value.x, mousePosition.value.y) as HTMLElement | null;

  if (!(element && vpDocElement.value?.contains(element))) return;

  const el = findChildElementUnderVPDocElement(element);
  highlightedElement.value = el || undefined;

  if (highlightedElement.value && highlightedElement.value.tagName === "P") {
    const val = highlightedElement.value;
    const style = window.getComputedStyle(val);
    const lineHeight = Number.parseFloat(style.lineHeight);
    const lines = Math.floor(val.offsetHeight / lineHeight);

    const rect = val.getBoundingClientRect();
    const relativeY = mousePosition.value.y - rect.top;

    for (let i = 0; i < lines; i++) {
      const top = i * lineHeight;
      const height = lineHeight;
      const left = val.offsetLeft;
      const width = val.offsetWidth;

      if (relativeY >= top && relativeY < top + height) {
        boxStyles.value = computeBoxStyles({
          top: top + rect.top,
          left: left + rect.left,
          width,
          height,
        });

        break;
      }
    }
  } else {
    if (highlightedElement.value) {
      const rect = highlightedElement.value.getBoundingClientRect();

      boxStyles.value = computeBoxStyles({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }
  }
};

useEventListener(document, "mousemove", (event: MouseEvent) => {
  mousePosition.value = { x: event.clientX, y: event.clientY };
});
useEventListener(document, "scroll", watchHandler, true);

onMounted(() => {
  vpDocElement.value = document.querySelector(".VPDoc main .vp-doc") as HTMLDivElement;
});

const route = useRoute();
watch(
  route,
  () => {
    vpDocElement.value = document.querySelector(".VPDoc main .vp-doc") as HTMLDivElement;

    shouldRecalculate.value = true;
    boxStyles.value = { display: "none" };

    watchHandler();
    shouldRecalculate.value = false;
  },
  { flush: "post" }
);

watch([() => mousePosition.value.x, () => mousePosition.value.y], () => {
  if (props.enabled) watchHandler();
});

watch(
  () => props.enabled,
  val => {
    if (!val) boxStyles.value = { display: "none" };
  }
);
</script>

<template>
  <Teleport to="body">
    <div
      v-if="props.enabled && !shouldRecalculate"
      :style="boxStyles"
      :class="[
        'tk-spotlight-hover',
        spotlightStyle === SpotlightStyle.Under ? 'tk-spotlight-hover__under' : '',
        spotlightStyle === SpotlightStyle.Aside ? 'tk-spotlight-hover__aside' : '',
      ]"
      aria-hidden="true"
      focusable="false"
    />
  </Teleport>
</template>
