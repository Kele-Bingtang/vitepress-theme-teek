<script setup lang="ts" name="ItemInfo">
import type { FriendLinkItem } from "@teek/config";
import type { UseNamespaceReturn } from "@teek/composables";
import { withBase } from "vitepress";

defineProps<{ item: FriendLinkItem; ns: UseNamespaceReturn }>();
</script>

<template>
  <a
    :href="item.link && withBase(item.link)"
    target="_blank"
    class="hover-color flx-align-center"
    :aria-label="item.name"
  >
    <img
      :src="item.avatar && withBase(item.avatar)"
      class="friend-avatar"
      :alt="item.alt || item.name"
      aria-hidden="true"
    />
    <div :class="ns.e('list__item__info')">
      <div class="friend-name sle" :title="item.name">{{ item.name }}</div>
      <div class="friend-desc sle" :title="item.desc">{{ item.desc }}</div>
    </div>
  </a>
</template>
