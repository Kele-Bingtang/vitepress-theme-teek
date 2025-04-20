<script setup lang="ts" name="HomeFriendLinkCard">
import type { FriendLink } from "@teek/config";
import { computed, ref, unref, onMounted } from "vue";
import { withBase } from "vitepress";
import { useNamespace, useLocale, useScrollData } from "@teek/hooks";
import { friendLinkIcon } from "@teek/assets";
import { isFunction } from "@teek/helper";
import { useTeekConfig } from "@teek/configProvider";
import { createImageViewer } from "@teek/components/common/ImageViewer";
import { TkHomeCard } from "@teek/components/theme/HomeCard";

defineOptions({ name: "HomeFriendLinkCard" });

const ns = useNamespace("friend-link");
const { t } = useLocale();
const { getTeekConfigRef } = useTeekConfig();

// 友情链接配置项
const friendLinkConfig = getTeekConfigRef<Required<FriendLink>>("friendLink", {
  list: [],
  limit: 4,
  title: t("tk.friendLinkCard.title", { icon: friendLinkIcon }),
  emptyLabel: t("tk.friendLinkCard.emptyLabel"),
  autoScroll: false,
  scrollSpeed: 2500,
  autoPage: false,
  pageSpeed: 4000,
  imageViewer: {},
});

// 使用上下滚动功能
const { data, start, stop } = useScrollData(unref(friendLinkConfig).list, 5, {
  intervalTime: unref(friendLinkConfig).scrollSpeed,
});

const pageNum = ref(1);
// 友情链接渲染数据
const currentFriendLinkList = computed(() => {
  const { list, limit, autoScroll } = unref(friendLinkConfig);

  // 如果使用上下滚动功能，则显示滚动数据
  if (autoScroll) return unref(data);

  // 分页功能
  const p = unref(pageNum);
  return list.slice((p - 1) * limit, p * limit);
});

const finalTitle = computed(() => {
  const { title } = unref(friendLinkConfig);
  if (isFunction(title)) return title(friendLinkIcon);
  return title;
});

onMounted(() => {
  if (unref(friendLinkConfig).autoScroll) start();
});

// 每一个 li 的 ref 元素，用于获取元素高度来计算实际的 top 位置
const itemRefs = ref<HTMLLIElement[]>([]);

const getLiStyle = (index: number) => {
  if (unref(friendLinkConfig).autoScroll) return {};
  const clientRect = unref(itemRefs)?.[index]?.getBoundingClientRect();

  // 分页动画需要指定 top，否则默认移动到 0px 位置
  return {
    top: `calc(${index} * (calc(${ns.cssVar("home-friend-link-gap")} + ${clientRect?.height || 0}px)))`,
  };
};

const handleViewImg = (imgSrc: string, e: MouseEvent) => {
  // @click.stop 不起作用，因此手动阻止冒泡到 a 标签
  e.preventDefault();

  createImageViewer({ ...unref(friendLinkConfig).imageViewer, urlList: [imgSrc] });
};
</script>

<template>
  <slot name="teek-home-friend-link-before" />

  <TkHomeCard
    :page="!friendLinkConfig.autoScroll"
    v-model="pageNum"
    :pageSize="friendLinkConfig.limit"
    :total="friendLinkConfig.list.length"
    :title="finalTitle"
    :autoPage="friendLinkConfig.autoPage"
    :pageSpeed="friendLinkConfig.pageSpeed"
    :class="ns.b()"
    :aria-label="t('tk.friendLinkCard.label')"
  >
    <template #default="{ transitionName, startAutoPage, closeAutoPage }">
      <TransitionGroup
        v-if="friendLinkConfig.list.length"
        :name="transitionName"
        tag="ul"
        mode="out-in"
        :class="`${ns.e('list')} flx-column`"
        @mouseenter="friendLinkConfig.autoScroll ? stop() : friendLinkConfig.autoPage ? closeAutoPage() : () => {}"
        @mouseleave="friendLinkConfig.autoScroll ? stop() : friendLinkConfig.autoPage ? startAutoPage() : () => {}"
        :aria-label="t('tk.friendLinkCard.listLabel')"
      >
        <li
          :ref="friendLinkConfig.autoScroll ? '' : 'itemRefs'"
          v-for="(item, index) in currentFriendLinkList"
          :key="item.name"
          :class="ns.e('list__item')"
          :style="getLiStyle(index)"
        >
          <a
            :href="item.link && withBase(item.link)"
            target="_blank"
            class="hover-color flx-align-center"
            :aria-label="item.name"
          >
            <img
              :src="item.avatar && withBase(item.avatar)"
              class="friend-avatar"
              :alt="item.name || item.alt"
              @click="handleViewImg(item.avatar, $event)"
              aria-hidden="true"
            />
            <div :class="ns.e('list__item__info')">
              <div class="friend-name sle">{{ item.name }}</div>
              <div class="friend-desc sle">{{ item.desc }}</div>
            </div>
          </a>
        </li>
      </TransitionGroup>

      <div v-else :class="ns.m('empty')" :aria-label="friendLinkConfig.emptyLabel">
        {{ friendLinkConfig.emptyLabel }}
      </div>
    </template>
  </TkHomeCard>

  <slot name="teek-home-friend-link-after" />
</template>
