<script lang="ts" setup>
import type { PaginationNextProps } from "./next";
import { computed } from "vue";
import { useLocale } from "@teek/hooks";
import { TkIcon } from "@teek/components/common/Icon";

defineOptions({ name: "PaginationNext" });

const props = defineProps<PaginationNextProps>();

defineEmits(["click"]);

const { t } = useLocale();

const internalDisabled = computed(
  () => props.disabled || props.currentPage === props.pageCount || props.pageCount === 0
);
</script>

<template>
  <button
    type="button"
    class="btn-next"
    :disabled="internalDisabled"
    :aria-label="nextText || t('tk.pagination.next')"
    :aria-disabled="internalDisabled"
    @click="$emit('click', $event)"
  >
    <span v-if="nextText">{{ nextText }}</span>
    <TkIcon v-else-if="nextIcon" :icon="nextIcon" />
  </button>
</template>
