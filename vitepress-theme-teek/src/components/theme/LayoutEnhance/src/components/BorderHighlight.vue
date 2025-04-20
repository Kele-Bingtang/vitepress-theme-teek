<script setup lang="ts" name="BorderHighlight">
import { useNamespace } from "@teek/hooks";

defineOptions({ name: "BorderHighlight" });

defineProps<{ active: boolean }>();

const ns = useNamespace("border-highlight");
</script>

<template>
  <div :class="[ns.b(), ns.is('active', Boolean(active))]">
    <slot />
  </div>
</template>
