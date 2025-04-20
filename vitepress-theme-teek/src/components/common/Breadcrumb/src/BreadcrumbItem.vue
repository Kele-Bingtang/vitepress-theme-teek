<script setup lang="ts" name="BreadcrumbItem">
import { inject } from "vue";
import { breadcrumbKey } from "./breadcrumb";
import { ns } from "./namespace";

defineOptions({ name: "BreadcrumbItem" });

const breadcrumbContext = inject(breadcrumbKey, undefined);
</script>

<template>
  <span :class="ns.e('item')">
    <span ref="link" :class="ns.e('inner')" role="link">
      <slot />
    </span>
    <span :class="ns.e('separator')" role="presentation">
      {{ breadcrumbContext?.separator }}
    </span>
  </span>
</template>
