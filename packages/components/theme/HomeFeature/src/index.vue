<script setup lang="ts">
import type { Feature } from "@teek/config";
import { onMounted, ref } from "vue";
import { withBase } from "vitepress";
import { useNamespace, useWindowTransition } from "@teek/composables";
import { useTeekConfig, useWindowTransitionConfig } from "@teek/components/theme/ConfigProvider";
import { TkIcon } from "@teek/components/common/Icon";

const ns = useNamespace("home-features");

const { getTeekConfigRef } = useTeekConfig();
// Features 配置项
const featuresConfig = getTeekConfigRef<Required<Feature[]>>("features", []);

// 屏幕加载元素时，开启过渡动画
const windowTransition = useWindowTransitionConfig(config => config.feature);
const textInstance = ref<HTMLLIElement[] | null>(null);
const { start } = useWindowTransition(textInstance as any, false);

onMounted(() => {
  windowTransition.value && start();
});
</script>

<template>
  <div :class="ns.b()" class="vp-doc" v-if="featuresConfig?.length">
    <template v-for="feature in featuresConfig" :key="feature.title">
      <div v-if="feature.features" :class="ns.e('feature-wrapper')" class="features-wrapper">
        <div :class="ns.e('feature__content')">
          <img :src="feature.image" class="image" />

          <div :class="ns.e('feature__header')" class="header">
            <h2 ref="textInstance" v-html="feature.title" />
            <p ref="textInstance" v-if="feature.details" v-html="feature.details" />
          </div>

          <div v-if="feature.features?.length" class="features">
            <component
              v-for="item in feature.features"
              :key="item.title"
              :is="item.link ? 'a' : 'div'"
              :href="withBase(item.link ?? '')"
              class="features__item item"
            >
              <h3 ref="textInstance" class="flx-align-center">
                <TkIcon v-if="item.icon" :icon="item.icon" class="feature-icon" />
                <span v-html="item.title" />
              </h3>
              <p v-if="item.details" ref="textInstance" v-html="item.details" />
            </component>
          </div>
        </div>
      </div>

      <div v-else-if="feature.highlights" :class="ns.e('highlight-wrapper')" class="features-wrapper">
        <div :class="ns.e('highlight')">
          <img :src="feature.image" class="image" />

          <div :class="ns.e('highlight__content')">
            <div :class="ns.e('highlight__header')" class="header">
              <h2 ref="textInstance" v-html="feature.title" />
              <p ref="textInstance" v-if="feature.details" v-html="feature.details" />
            </div>

            <div v-if="feature.highlights?.length" class="highlights">
              <component
                v-for="item in feature.highlights"
                :key="item.title"
                :is="item.link ? 'a' : 'div'"
                :href="withBase(item.link ?? '')"
                :class="{ 'no-details': !item.details }"
                class="highlights__item item"
              >
                <h3 ref="textInstance">
                  <TkIcon v-if="item.icon" :icon="item.icon" class="feature-icon" />
                  <span v-html="item.title" />
                </h3>
                <p v-if="item.details" ref="textInstance" v-html="item.details" />
              </component>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
