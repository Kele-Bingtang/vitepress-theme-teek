<script setup lang="ts" name="Home">
import type { TeekConfig } from "@teek/config";
import type { TkHomePostListInstance } from "@teek/components";
import { ref, provide } from "vue";
import { useNamespace, useLocale } from "@teek/composables";
import { useTeekConfig, usePageState } from "@teek/components/theme/ConfigProvider";
import { TkHomeFullscreenWallpaper } from "@teek/components/theme/HomeFullscreenWallpaper";
import { TkHomePostList } from "@teek/components/theme/HomePostList";
import { TkHomeBanner } from "@teek/components/theme/HomeBanner";
import { TkHomeCardList } from "@teek/components/theme/HomeCardList";
import { postDataUpdateSymbol } from "./home";

defineOptions({ name: "Home" });

const ns = useNamespace("home");
const { t } = useLocale();

const { isHomePage } = usePageState();
const { getTeekConfigRef } = useTeekConfig();

const teekConfig = getTeekConfigRef<Required<TeekConfig>>(null, {
  teekHome: true,
  homeCardListPosition: "right",
  banner: {},
  wallpaper: {},
  bodyBgImg: {},
});

const homePostListInstance = ref<TkHomePostListInstance | null>(null);

provide(postDataUpdateSymbol, () => homePostListInstance.value?.updateData());

// 翻页 > 1 则隐藏 Banner
const isPaging = ref(false);
</script>

<template>
  <div :class="ns.b()" role="main" :aria-label="t('tk.home.label')">
    <div v-if="isHomePage && (teekConfig.banner.enabled ?? true)" v-show="!isPaging">
      <TkHomeBanner :disabled="isPaging">
        <template v-for="(_, name) in $slots" :key="name" #[name]="scope">
          <slot :name="name" v-bind="scope" />
        </template>
      </TkHomeBanner>
    </div>

    <div :class="ns.e('container')">
      <div :class="[ns.e('content'), ns.join('wallpaper-outside'), 'flx-start-justify-center']">
        <div :class="ns.e('content__post')" :aria-label="t('tk.home.postLabel')">
          <slot name="teek-home-post-before" />
          <TkHomePostList v-model="isPaging" ref="homePostListInstance">
            <template v-for="(_, name) in $slots" :key="name" #[name]="scope">
              <slot :name="name" v-bind="scope" />
            </template>
          </TkHomePostList>
          <slot name="teek-home-post-after" />
        </div>

        <div
          :class="[ns.e('content__info'), teekConfig.homeCardListPosition === 'left' ? ns.is('left') : ns.is('right')]"
          :aria-label="t('tk.home.cardLabel')"
        >
          <TkHomeCardList>
            <template v-for="(_, name) in $slots" :key="name" #[name]="scope">
              <slot :name="name" v-bind="scope" />
            </template>
          </TkHomeCardList>
        </div>
      </div>
    </div>

    <TkHomeFullscreenWallpaper
      v-if="teekConfig.wallpaper.enabled && (teekConfig.banner.bgStyle === 'fullImg' || teekConfig.bodyBgImg.imgSrc)"
    />
  </div>
</template>
