<script setup lang="ts" name="CatalogueItem">
import type { CatalogueItem } from "@teek/config";
import { withBase } from "vitepress";
import { useNamespace } from "@teek/composables";
import { TkTitleTag } from "@teek/components/common/TitleTag";

defineOptions({ name: "CatalogueItem" });

const nsSub = useNamespace("sub-catalogue");
const nsItem = useNamespace("catalogue-item");

defineProps<{ item: CatalogueItem; index: number | string }>();
</script>

<template>
  <li :class="item.children ? nsSub.b() : nsItem.b()">
    <a v-if="!item.children" :href="item.url && withBase(item.url)" :aria-label="`${index}. ${item.title}`">
      {{ index }}.
      <span v-html="item.title" />
      <TkTitleTag
        v-if="item.frontmatter?.titleTag"
        :text="item.frontmatter?.titleTag"
        position="right"
        size="small"
        :aria-label="item.frontmatter?.titleTag"
      />
    </a>

    <template v-else-if="item.children.length">
      <div :id="item.title" :class="nsSub.e('title')" role="group" :aria-labelledby="`${item.title}-label`">
        <a :href="`#${item.title}`" class="anchor" :aria-label="item.title">#</a>
        <span :id="`${item.title}-label`">{{ `${index}. ${item.title}` }}</span>
      </div>

      <ul v-if="item.children" :class="`${nsSub.e('inline')} flx-wrap-between`" :aria-label="item.title">
        <!-- 递归自己 -->
        <CatalogueItem v-for="(item, i) in item.children" :key="i" :item :index="`${index}-${i + 1}`" />
      </ul>
    </template>
  </li>
</template>
