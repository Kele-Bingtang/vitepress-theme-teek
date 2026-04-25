<script setup lang="ts" name="ItemInfo">
import type { FriendLinkItem } from "@teek/config";
import type { UseNamespaceReturn } from "@teek/composables";
import { onMounted, useTemplateRef } from "vue";
import { withBase } from "vitepress";

defineProps<{ item: FriendLinkItem; ns: UseNamespaceReturn }>();

const imgInstance = useTemplateRef("imgInstance");

const addLoadedClass = (e?: Event) => {
  if (e?.target) (e.target as HTMLImageElement).classList.add("loaded");
  else if (imgInstance.value) imgInstance.value.classList.add("loaded");
};

onMounted(() => {
  const img = imgInstance.value;
  if (!img) return;

  // 图片加载成功，则直接添加类名，不再等待事件
  if (img.complete) addLoadedClass();
  else {
    // 如果还没加载完，则绑定事件监听
    img.addEventListener("load", () => addLoadedClass());
    img.addEventListener("error", () => addLoadedClass());
  }
});
</script>

<template>
  <a
    :href="item.link && withBase(item.link)"
    target="_blank"
    class="hover-color flx-align-center"
    :aria-label="item.name"
  >
    <div class="friend-avatar skeleton-image">
      <img
        ref="imgInstance"
        :src="item.avatar && withBase(item.avatar)"
        class="avatar"
        :alt="item.alt || item.name"
        aria-hidden="true"
        @load="addLoadedClass"
        @error="addLoadedClass"
      />
    </div>
    <div :class="ns.e('list__item__info')">
      <div class="friend-name sle" :title="item.name">{{ item.name }}</div>
      <div class="friend-desc sle" :title="item.desc">{{ item.desc }}</div>
    </div>
  </a>
</template>
