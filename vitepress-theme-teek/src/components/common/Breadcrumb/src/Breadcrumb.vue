<script setup lang="ts" name="Breadcrumb">
import type { BreadcrumbProps } from "./breadcrumb";
import { onMounted, provide, ref, unref } from "vue";
import { useLocale } from "@teek/hooks";
import { breadcrumbKey } from "./breadcrumb";
import { ns } from "./namespace";

defineOptions({ name: "Breadcrumb" });

const { t } = useLocale();

const { separator = "/" } = defineProps<BreadcrumbProps>();

const breadcrumb = ref<HTMLDivElement>();

provide(breadcrumbKey, { separator });

onMounted(() => {
  const items = unref(breadcrumb)?.querySelectorAll(`.${ns.e("item")}`);

  if (items?.length) {
    items[items.length - 1].setAttribute("aria-current", "page");
  }
});
</script>

<template>
  <div ref="breadcrumb" :class="ns.b()" role="navigation" :aria-label="t('tk.breadcrumb.label')">
    <slot />
  </div>
</template>
