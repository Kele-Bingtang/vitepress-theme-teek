<script setup lang="ts" name="CatalogueItem">
import { withBase } from "vitepress";
import type { CatalogueItem } from "vitepress-plugin-catalogue";
import { useNamespace } from "../../../hooks";

defineOptions({ name: "CatalogueItem" });

const nsSub = useNamespace("sub-catalogue");
const nsItem = useNamespace("catalogue-item");

defineProps<{ item: CatalogueItem; index: number | string }>();
</script>

<template>
  <li :class="item.children ? nsSub.b() : nsItem.b()">
    <a v-if="!item.children" :href="item.link && withBase(item.link)">{{ index }}. {{ item.title }}</a>

    <template v-else>
      <div :id="item.title" :class="nsSub.e('title')">
        <a :href="`#${item.title}`" class="anchor">#</a>
        <span>{{ `${index}. ${item.title}` }}</span>
      </div>

      <ul v-if="item.children" :class="`${nsSub.e('inline')} flx-wrap-between`">
        <!-- 递归自己 -->
        <CatalogueItem v-for="(item, i) in item.children" :key="i" :item :index="`${index}-${i + 1}`" />
      </ul>
    </template>
  </li>
</template>
