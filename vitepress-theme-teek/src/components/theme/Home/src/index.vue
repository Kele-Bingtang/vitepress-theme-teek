<script setup lang="ts" name="Home">
import type { TkHomePostListInstance } from "@teek/components";
import { ref, unref, provide } from "vue";
import { useNamespace, useLocale } from "@teek/hooks";
import { useTeekConfig, usePage } from "@teek/configProvider";
import { TkHomeFullscreenWallpaper } from "@teek/components/theme/HomeFullscreenWallpaper";
import { TkHomePostList } from "@teek/components/theme/HomePostList";
import { TkHomeBanner } from "@teek/components/theme/HomeBanner";
import { TkHomeRightInfo } from "@teek/components/theme/HomeRightInfo";
import { postDataUpdateSymbol } from "./home";

defineOptions({ name: "Home" });

const ns = useNamespace("home");
const { t } = useLocale();

const { isHomePage } = usePage();
const { getTeekConfigRef } = useTeekConfig();

const teekConfig = getTeekConfigRef(null, { teekHome: true, banner: {}, wallpaper: {}, bodyBgImg: {} });

const homePostListInstance = ref<TkHomePostListInstance | null>(null);

provide(postDataUpdateSymbol, () => unref(homePostListInstance)?.updateData());
</script>

<template>
  <div :class="ns.b()" role="main" :aria-label="t('tk.home.label')">
    <TkHomeBanner v-if="isHomePage && (teekConfig.banner.enabled ?? true)">
      <template v-for="(_, name) in $slots" :key="name" #[name]>
        <slot :name="name" />
      </template>
    </TkHomeBanner>

    <div :class="[ns.e('content'), ns.joinNamespace('wallpaper-outside'), 'flx-start-justify-center']">
      <div :class="ns.e('content__post')" :aria-label="t('tk.home.postLabel')">
        <slot name="teek-home-post-before" />
        <TkHomePostList ref="homePostListInstance" />
        <slot name="teek-home-post-after" />
      </div>

      <div :class="ns.e('content__info')" :aria-label="t('tk.home.cardLabel')">
        <TkHomeRightInfo>
          <template v-for="(_, name) in $slots" :key="name" #[name]>
            <slot :name="name" />
          </template>
        </TkHomeRightInfo>
      </div>
    </div>

    <TkHomeFullscreenWallpaper
      v-if="teekConfig.wallpaper.enabled && (teekConfig.banner.bgStyle === 'fullImg' || teekConfig.bodyBgImg.imgSrc)"
    />
  </div>
</template>
