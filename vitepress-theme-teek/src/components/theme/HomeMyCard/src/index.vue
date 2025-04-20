<script setup lang="ts" name="HomeMyCard">
import type { Blogger, Social } from "@teek/config";
import type { TkAvatarProps } from "@teek/components/common/Avatar";
import { withBase } from "vitepress";
import { computed, unref } from "vue";
import { useNamespace, useLocale } from "@teek/hooks";
import { useTeekConfig } from "@teek/configProvider";
import { TkHomeCard } from "@teek/components/theme/HomeCard";
import { TkAvatar } from "@teek/components/common/Avatar";
import { TkIcon } from "@teek/components/common/Icon";

defineOptions({ name: "HomeMyCard" });

const ns = useNamespace("my");
const { t } = useLocale();

const { getTeekConfigRef } = useTeekConfig();

const blogger = getTeekConfigRef<Required<Blogger>>("blogger", { shape: "square" });
const social = getTeekConfigRef<Social[]>("social", []);

const shape = computed(() => unref(blogger).shape.replace("-rotate", "") as TkAvatarProps["shape"]);
</script>

<template>
  <slot name="teek-home-my-before" />

  <TkHomeCard :class="ns.b()" :aria-label="t('tk.myCard.label')">
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
        v-else-if="blogger.name"
        :size="100"
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
      <span class="name">{{ blogger.name }}</span>
      <span class="slogan">{{ blogger.slogan }}</span>
    </div>
  </TkHomeCard>

  <slot name="teek-home-my-after" />
</template>
