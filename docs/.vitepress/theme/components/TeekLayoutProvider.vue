<script setup lang="ts" name="TeekLayoutProvider">
import type { TeekConfig } from "vitepress-theme-teek";
import Teek, { teekConfigContext, clockIcon } from "vitepress-theme-teek";
import { useData } from "vitepress";
import { watch, nextTick, ref, provide } from "vue";
import { teekDocConfig } from "../config/teekConfig";
import { useRibbon } from "../composables/useRibbon";
import { useRuntime } from "../composables/useRuntime";
import ConfigSwitch from "./ConfigSwitch.vue";
import ContributeChart from "./ContributeChart.vue";
import NotFound from "./404.vue";
import CalendarCard from "./CalendarCard.vue";

const ns = "layout-provider";
const { frontmatter } = useData();

// 默认文档风
const currentStyle = ref("doc");
const teekConfig = ref(teekDocConfig);
provide(teekConfigContext, teekConfig);

// 彩带背景
const { start: startRibbon, stop: stopRibbon } = useRibbon({ immediate: false, clickReRender: true });
// 页脚运行时间
const { start: startRuntime, stop: stopRuntime } = useRuntime("2021-10-19 00:00:00", {
  prefix: `<span style="width: 16px; display: inline-block; vertical-align: -3px; margin-right: 3px;">${clockIcon}</span>小破站已运行 `,
});

const watchRuntimeAndRibbon = async (layout: string, style: string) => {
  const isHome = layout === "home";
  const isDoc = [undefined, "doc"].includes(layout);
  const isBlog = style.startsWith("blog");

  // 博客类风格的首页显示运行时间
  await nextTick();
  if (isHome && isBlog) startRuntime();
  else stopRuntime();

  // 博客类风格的首页显示彩带 & 设置了 pageStyle 的文章页显示彩带
  if ((isHome && isBlog && style !== "blog-body") || (isDoc && teekConfig.value.pageStyle)) startRibbon();
  else stopRibbon();
};

watch(frontmatter, newVal => setTimeout(() => watchRuntimeAndRibbon(newVal.layout, currentStyle.value), 700), {
  immediate: true,
  flush: "post",
});

const handleConfigSwitch = (config: TeekConfig, style: string) => {
  teekConfig.value = config;

  setTimeout(() => watchRuntimeAndRibbon(frontmatter.value.layout, style), 700);
};
</script>

<template>
  <Teek.Layout>
    <template #teek-theme-enhance-bottom>
      <div :class="[ns, 'flx-align-center']">
        <ConfigSwitch v-model="currentStyle" @switch="handleConfigSwitch" />
      </div>
    </template>

    <template #teek-home-card-my-after>
      <CalendarCard />
    </template>

    <template #nav-screen-content-after>
      <ConfigSwitch v-model="currentStyle" @switch="handleConfigSwitch" />
    </template>

    <template #teek-archives-top-before>
      <ContributeChart />
    </template>

    <template #not-found>
      <NotFound />
    </template>
  </Teek.Layout>
</template>

<style lang="scss">
.tk-my.is-circle-bg {
  .tk-my__avatar.circle-rotate {
    margin-top: 200px;

    .tk-avatar:not(.avatar-sticker) {
      border: 5px solid var(--vp-c-bg-elv);
    }
  }
}
</style>
