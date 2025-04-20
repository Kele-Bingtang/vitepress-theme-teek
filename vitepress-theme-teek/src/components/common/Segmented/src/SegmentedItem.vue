<script setup lang="ts" name="SegmentedItem">
import { useNamespace } from "@teek/hooks";
import { TkIcon } from "@teek/components/common/Icon";

defineOptions({ name: "SegmentedItem" });

export type ModelType = string | number | object | boolean;

defineProps<{
  name?: string;
  icon?: string;
  text?: string;
  title: string;
  value?: ModelType;
  disabled?: boolean;
}>();

const ns = useNamespace("segmented-item");

const model = defineModel<ModelType>();
</script>

<template>
  <label
    :class="[ns.b(), ns.is('active', model === value && !disabled), ns.is('disabled', disabled)]"
    :title="title"
    :disabled="disabled"
  >
    <input
      v-model="model"
      type="radio"
      :value="value"
      :name="name"
      :checked="model === value"
      :aria-checked="model === value"
      :disabled="disabled"
      role="radio"
      style="display: none"
    />
    <span :class="ns.e('content')">
      <TkIcon v-if="icon" :icon="icon" aria-hidden="true" />
      <span v-if="text">{{ text }}</span>
    </span>
  </label>
</template>
