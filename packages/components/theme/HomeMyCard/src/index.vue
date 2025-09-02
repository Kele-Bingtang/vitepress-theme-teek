<script setup lang="ts" name="HomeMyCard">
import type { Blogger, Social } from "@teek/config";
import type { TkAvatarProps } from "@teek/components/common/Avatar";
import { withBase } from "vitepress";
import { computed } from "vue";
import { useNamespace, useLocale } from "@teek/composables";
import { useTeekConfig } from "@teek/components/theme/ConfigProvider";
import { TkPageCard } from "@teek/components/common/PageCard";
import { TkAvatar } from "@teek/components/common/Avatar";
import { TkIcon } from "@teek/components/common/Icon";
import { isValidURL } from "@teek/helper";

defineOptions({ name: "HomeMyCard" });

const ns = useNamespace("my");
const { t } = useLocale();

const { getTeekConfigRef } = useTeekConfig();

const bloggerConfig = getTeekConfigRef<Required<Blogger>>("blogger", { shape: "square", circleBgMask: true });
const socialConfig = getTeekConfigRef<Social[]>("social", []);

const shape = computed(() => bloggerConfig.value.shape.replace(/-.*$/, "") as TkAvatarProps["shape"]);

const isCircleBgImg = computed(() => shape.value === "circle" && !!bloggerConfig.value.circleBgImg);
const avatarBgStyle = computed(() => ({ backgroundImage: `url(${withBase(bloggerConfig.value.circleBgImg)})` }));
const myCardColorStyle = computed(() => ({ color: bloggerConfig.value.color }));
const isSrc = computed(() => {
  const icon = bloggerConfig.value.status?.icon;
  if (!icon) return false;
  return isValidURL(icon) || icon.startsWith("/");
});
</script>

<template>
  <TkPageCard
    v-if="bloggerConfig.name"
    :class="[ns.b(), ns.is('circle-bg', isCircleBgImg)]"
    :style="myCardColorStyle"
    :aria-label="t('tk.myCard.label')"
  >
    <div
      v-if="isCircleBgImg"
      :class="[ns.em('avatar__circle', 'bg'), ns.is('mask', bloggerConfig.circleBgMask)]"
      :style="avatarBgStyle"
    />

    <div :class="`${ns.e('avatar')} ${bloggerConfig.shape} flx-center`">
      <div>
        <TkAvatar
          v-if="bloggerConfig.avatar"
          :src="withBase(bloggerConfig.avatar)"
          :size="bloggerConfig.shape === 'square' ? '100%' : (bloggerConfig.circleSize ?? 100)"
          :shape
          bg-color="transparent"
          :alt="t('tk.myCard.avatarAlt')"
          :title="t('tk.myCard.avatarTitle')"
          aria-hidden="true"
        />
        <TkAvatar
          v-else
          :size="bloggerConfig.circleSize ?? 100"
          :shape
          :text="bloggerConfig.name"
          :text-size="50"
          :bg-color="ns.cssVar('theme-color')"
          aria-hidden="true"
        />
        <TkAvatar
          v-if="bloggerConfig.status?.icon && shape?.startsWith('circle')"
          :src="isSrc ? bloggerConfig.status.icon : ''"
          :text="bloggerConfig.status.icon"
          :size="bloggerConfig.status.size ?? 26"
          :icon-size="bloggerConfig.status.size ?? 26"
          :text-size="bloggerConfig.status.size ?? 26"
          :title="bloggerConfig.status.title"
          circle
          bg-color="transparent"
          class="avatar-sticker"
          aria-hidden="true"
        />
      </div>
    </div>

    <div
      v-if="socialConfig.length"
      :class="`${ns.e('icons')} flx-justify-around`"
      :aria-label="t('tk.myCard.socialLabel')"
    >
      <a
        v-for="(item, index) in socialConfig"
        :key="index"
        :href="item.link && withBase(item.link)"
        :title="item.name"
        target="_blank"
        :aria-label="item.name"
      >
        <template v-if="item.icon">
          <TkIcon
            :iconType="item.iconType"
            :icon="item.icon"
            size="20px"
            hover
            :imgAlt="item.imgAlt"
            aria-hidden="true"
          />
        </template>
      </a>
    </div>

    <div :class="ns.e('blogger')" :aria-label="t('tk.myCard.bloggerLabel')">
      <h3 class="name">{{ bloggerConfig.name }}</h3>
      <span class="slogan">{{ bloggerConfig.slogan }}</span>
    </div>
  </TkPageCard>
</template>
