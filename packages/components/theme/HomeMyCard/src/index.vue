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

defineOptions({ name: "HomeMyCard" });

const ns = useNamespace("my");
const { t } = useLocale();

const { getTeekConfigRef } = useTeekConfig();

const blogger = getTeekConfigRef<Required<Blogger>>("blogger", { shape: "square", circleBgMask: true });
const social = getTeekConfigRef<Social[]>("social", []);

const shape = computed(() => blogger.value.shape.replace(/-.*$/, "") as TkAvatarProps["shape"]);

const isCircleBgImg = computed(() => shape.value === "circle" && !!blogger.value.circleBgImg);
const avatarBgStyle = computed(() => ({ backgroundImage: `url(${withBase(blogger.value.circleBgImg)})` }));
const myCardColorStyle = computed(() => ({ color: blogger.value.color }));
</script>

<template>
  <TkPageCard
    v-if="blogger.name"
    :class="[ns.b(), ns.is('circle-bg', isCircleBgImg)]"
    :style="myCardColorStyle"
    :aria-label="t('tk.myCard.label')"
  >
    <div
      v-if="isCircleBgImg"
      :class="[ns.em('avatar__circle', 'bg'), ns.is('mask', blogger.circleBgMask)]"
      :style="avatarBgStyle"
    />

    <div :class="`${ns.e('avatar')} ${blogger.shape} flx-center`">
      <TkAvatar
        v-if="blogger.avatar"
        :src="withBase(blogger.avatar)"
        :size="blogger.shape === 'square' ? '100%' : 100"
        :shape
        bg-color="transparent"
        :alt="t('tk.myCard.avatarAlt')"
        :title="t('tk.myCard.avatarTitle')"
        aria-hidden="true"
      />
      <TkAvatar
        v-else
        :size="100"
        :shape
        :text="blogger.name"
        :text-size="50"
        :bg-color="ns.cssVar('theme-color')"
        aria-hidden="true"
      />
    </div>

    <div v-if="social.length" :class="`${ns.e('icons')} flx-justify-around`" :aria-label="t('tk.myCard.socialLabel')">
      <a
        v-for="(item, index) in social"
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
      <h3 class="name">{{ blogger.name }}</h3>
      <span class="slogan">{{ blogger.slogan }}</span>
    </div>
  </TkPageCard>
</template>
