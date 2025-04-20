<script setup lang="ts" name="InputSlide">
import { onMounted, ref, useTemplateRef, watch } from "vue";
import { useElementHover, useEventListener, useNamespace } from "@teek/hooks";

defineOptions({ name: "InputSlide" });

const ns = useNamespace("input-slide");

interface InputSlideProps {
  name?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  format?: (val: number) => string;
}

const { name = "Slider", min = 0, max = 100, step = 1 } = defineProps<InputSlideProps>();

const inputValue = defineModel<number>({ type: Number, default: 0 });

const inputSliderRef = useTemplateRef<HTMLInputElement>("inputSliderRef");
const inputSliderTooltipRef = useTemplateRef<HTMLDivElement>("inputSliderTooltipRef");
const hovering = useElementHover(inputSliderRef);
const positioning = ref(false);

const sliderValueVar = ns.cssVarName("slider-value");
const sliderMinVar = ns.cssVarName("slider-min");
const sliderMaxVar = ns.cssVarName("slider-max");

useEventListener(inputSliderRef, "input", () => {
  if (!inputSliderRef.value) return;

  inputSliderRef.value.style.setProperty(sliderValueVar, inputSliderRef.value.value.toString());
});

onMounted(() => {
  if (!inputSliderRef.value) return;
  const inputSliderStyle = inputSliderRef.value.style;

  inputSliderStyle.setProperty(sliderValueVar, inputValue.value.toString());
  inputSliderStyle.setProperty(sliderMinVar, min?.toString() ?? "0");
  inputSliderStyle.setProperty(sliderMaxVar, max?.toString() ?? "100");
});

const calTipPosition = (inputElement: HTMLInputElement, inputTooltipElement: HTMLDivElement) => {
  const finalMax = max || 100;
  const finalMin = min || 0;
  const ratio = (inputValue.value - finalMin) / (finalMax - finalMin);

  const rect = inputElement.getBoundingClientRect();
  const tooltipRect = inputTooltipElement.getBoundingClientRect();

  const centeringShift = (tooltipRect.width - 32) / 2;
  inputTooltipElement.style.setProperty("left", `${ratio * (rect.width - 32) - centeringShift}px`);
};

watch(hovering, () => {
  positioning.value = true;

  setTimeout(() => {
    if (!hovering.value) {
      positioning.value = false;
      return;
    }
    if (!inputSliderRef.value) {
      positioning.value = false;
      return;
    }
    if (!inputSliderTooltipRef.value) {
      positioning.value = false;
      return;
    }

    calTipPosition(inputSliderRef.value, inputSliderTooltipRef.value);
    positioning.value = false;
  }, 50);
});

watch(inputValue, val => {
  if (val < min) val = min;
  if (val > max) val = max;

  if (!inputSliderRef.value || !inputSliderTooltipRef.value) return;
  calTipPosition(inputSliderRef.value, inputSliderTooltipRef.value);
});

watch(
  () => min,
  val => {
    if (inputValue.value >= val) return;
    inputValue.value = val;
  }
);

watch(
  () => max,
  val => {
    if (inputValue.value <= val) return;
    inputValue.value = val;
  }
);
</script>

<template>
  <div :class="ns.b()">
    <label :class="ns.e('label')">
      <input
        ref="inputSliderRef"
        v-model.number="inputValue"
        type="range"
        :name="name"
        :min="min"
        :max="max"
        :disabled="disabled"
        :step="step"
        :class="[ns.e('label__input'), ns.e('label__input-progress'), ns.is('disabled', disabled)]"
      />
      <Transition name="fade">
        <span
          v-show="hovering"
          ref="inputSliderTooltipRef"
          :class="[ns.e('label__tooltip'), ns.is('opacity-0', hovering && positioning)]"
        >
          {{ !!format ? format(inputValue) : inputValue }}
        </span>
      </Transition>
    </label>
  </div>
</template>
