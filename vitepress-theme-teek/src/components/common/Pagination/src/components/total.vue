<script lang="ts" setup>
import type { PaginationTotalProps } from "./total";
import { useNamespace, useLocale } from "@teek/hooks";
import { usePagination } from "../usePagination";

defineOptions({ name: "PaginationTotal" });

defineProps<PaginationTotalProps>();

const ns = useNamespace("pagination");
const { t } = useLocale();
const { disabled } = usePagination();
</script>

<template>
  <span :class="ns.e('total')" :disabled="disabled">
    {{
      t("tk.pagination.total", {
        total,
      })
    }}
  </span>
</template>
