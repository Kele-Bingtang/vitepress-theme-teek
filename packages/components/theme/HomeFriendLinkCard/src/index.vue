<script setup lang="ts" name="HomeFriendLinkCard">
import type { FriendLink } from "@teek/config";
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vitepress";
import { useNamespace, useLocale, useScrollData } from "@teek/composables";
import { friendLinkIcon } from "@teek/static";
import { isFunction } from "@teek/helper";
import { useTeekConfig } from "@teek/components/theme/ConfigProvider";
import { TkPageCard } from "@teek/components/common/PageCard";
import ItemInfo from "./ItemInfo.vue";

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
  titleClick: undefined,
});

// 使用上下滚动功能
const { data, start, stop } = useScrollData(friendLinkConfig.value.list, 5, {
  intervalTime: friendLinkConfig.value.scrollSpeed,
});

const pageNum = ref(1);
// 友情链接渲染数据
const currentFriendLinkList = computed(() => {
  const { list, limit, autoScroll } = friendLinkConfig.value;

  // 如果使用上下滚动功能，则显示滚动数据
  if (autoScroll) return data.value;

  // 分页功能
  const p = pageNum.value;
  return list.slice((p - 1) * limit, p * limit);
});

const finalTitle = computed(() => {
  const { title } = friendLinkConfig.value;
  if (isFunction(title)) return title(friendLinkIcon);
  return title;
});

onMounted(() => {
  if (friendLinkConfig.value.autoScroll) start();
});

// 每一个 li 的 ref 元素，用于获取元素高度来计算实际的 top 位置
const itemRefs = ref<HTMLLIElement[]>([]);

const getLiStyle = (index: number) => {
  if (friendLinkConfig.value.autoScroll) return {};
  const clientRect = itemRefs.value?.[index]?.getBoundingClientRect();

  // 分页动画需要指定 top，否则默认移动到 0px 位置
  return {
    top: `calc(${index} * (calc(${ns.cssVar("home-friend-link-gap")} + ${clientRect?.height || 0}px)))`,
  };
};

const router = useRouter();

const handleTitleClick = () => {
  friendLinkConfig.value.titleClick?.(router);
};
</script>

<template>
  <TkPageCard
    :page="!friendLinkConfig.autoScroll"
    v-model="pageNum"
    :pageSize="friendLinkConfig.limit"
    :total="friendLinkConfig.list.length"
    :title="finalTitle"
    :titleClick="friendLinkConfig.titleClick ? handleTitleClick : undefined"
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
        @mouseleave="friendLinkConfig.autoScroll ? start() : friendLinkConfig.autoPage ? startAutoPage() : () => {}"
        :aria-label="t('tk.friendLinkCard.listLabel')"
      >
        <template v-if="friendLinkConfig.autoScroll">
          <li
            v-for="(item, index) in currentFriendLinkList"
            :key="item.name"
            :class="ns.e('list__item')"
            :style="getLiStyle(index)"
          >
            <ItemInfo :item :ns />
          </li>
        </template>
        <template v-else>
          <li
            ref="itemRefs"
            v-for="(item, index) in currentFriendLinkList"
            :key="item.name"
            :class="ns.e('list__item')"
            :style="getLiStyle(index)"
          >
            <ItemInfo :item :ns />
          </li>
        </template>
      </TransitionGroup>

      <div v-else :class="ns.m('empty')" :aria-label="friendLinkConfig.emptyLabel">
        {{ friendLinkConfig.emptyLabel }}
      </div>
    </template>
  </TkPageCard>
</template>
