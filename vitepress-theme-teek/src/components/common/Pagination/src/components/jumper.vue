<script lang="ts" setup>
import type { PaginationJumperProps } from "./jumper";
import { ref } from "vue";
import { useNamespace, useLocale } from "@teek/hooks";
import { usePagination } from "../usePagination";

defineOptions({ name: "PaginationJumper" });

const { size = "default" } = defineProps<PaginationJumperProps>();

const ns = useNamespace("pagination");
const { t } = useLocale();
const { pageCount, disabled, currentPage, changeEvent } = usePagination();
const userInput = ref<number | string>(currentPage?.value || 1);

const handleChange = (event: Event) => {
  let value = (event.target as any)?.value || userInput.value;
  if (value < 1) value = 1;
  if (pageCount?.value && value > pageCount.value) value = pageCount.value;
  const val = Math.trunc(+value);
  changeEvent?.(val);
  userInput.value = val;
};
</script>

<template>
  <span :class="ns.e('jump')" :disabled="disabled">
    <span :class="[ns.e('goto')]">{{ t("tk.pagination.goto") }}</span>
    <input
      type="number"
      v-model="userInput"
      :disabled="disabled"
      @change="handleChange"
      :aria-label="t('tk.pagination.page')"
      :class="[ns.e('input'), ns.em('input', size)]"
    />
    <span :class="[ns.e('classifier')]">{{ t("tk.pagination.pageClassifier") }}</span>
  </span>
</template>
