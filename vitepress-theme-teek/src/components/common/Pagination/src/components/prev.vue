<script lang="ts" setup>
import type { PaginationPrevEmits, PaginationPrevProps } from "./prev";
import { computed } from "vue";
import { useLocale } from "@teek/hooks";
import { TkIcon } from "@teek/components/common/Icon";

defineOptions({ name: "PaginationPrev" });

const props = defineProps<PaginationPrevProps>();
defineEmits<PaginationPrevEmits>();

const { t } = useLocale();

const internalDisabled = computed(() => props.disabled || props.currentPage <= 1);
</script>

<template>
  <button
    type="button"
    class="btn-prev"
    :disabled="internalDisabled"
    :aria-label="prevText || t('tk.pagination.prev')"
    :aria-disabled="internalDisabled"
    @click="$emit('click', $event)"
  >
    <span v-if="prevText">{{ prevText }}</span>
    <TkIcon v-else-if="prevIcon" :icon="prevIcon" />
  </button>
</template>
