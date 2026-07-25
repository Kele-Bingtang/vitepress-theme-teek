<script setup lang="ts" name="TeekLayoutProvider">
import type { TeekConfig } from "vitepress-theme-teek";
import Teek, { teekConfigContext, clockIcon, TkMessage } from "vitepress-theme-teek";
import { useData } from "vitepress";
import { watch, nextTick, ref, provide } from "vue";
import { useRibbon } from "../composables/use-ribbon";
import { useRuntime } from "../composables/use-runtime";
import ContributeChart from "./contribute-chart.vue";
import NotFound from "./404.vue";
import CalendarCard from "./calendar-card.vue";
import ThemeConfig, { type ChangeType } from "./theme-config.vue";

const { frontmatter } = useData();

// 默认文档风
const currentStyle = ref("doc");
const teekConfig = ref<TeekConfig>({});
provide(teekConfigContext, teekConfig);

// 彩带背景
const { start: startRibbon, stop: stopRibbon } = useRibbon({ immediate: false, clickReRender: true });
// 页脚运行时间
const { start: startRuntime, stop: stopRuntime } = useRuntime("2021-10-19 00:00:00", {
  prefix: `<span style="width: 16px; display: inline-block; vertical-align: -3px; margin-right: 3px;">${clockIcon}</span>小破站已运行 `,
});

// 监听运行时间
const watchRuntime = async (layout: string, style: string) => {
  const isHome = layout === "home";
  const isDoc = [undefined, "doc"].includes(layout);
  const isBlog = style.startsWith("blog");

  // 博客类风格的首页显示运行时间
  await nextTick();
  if (isHome && isBlog) startRuntime();
  else stopRuntime();
};

watch(frontmatter, newVal => setTimeout(() => watchRuntime(newVal.layout, currentStyle.value), 700), {
  immediate: true,
  flush: "post",
});

// 主题配置切换
const handleThemeConfigChange = (config: TeekConfig, type: ChangeType) => {
  // 首页壁纸模式
  if (type === "bannerWallpaper") {
    teekConfig.value.teekHome = config.teekHome;
    teekConfig.value.vpHome = config.vpHome;
    teekConfig.value.banner = { ...teekConfig.value.banner, ...config.banner };
    teekConfig.value.bodyBgImg = { ...teekConfig.value.bodyBgImg, ...config.bodyBgImg };

    if (config.teekHome) setTimeout(() => watchRuntime(frontmatter.value.layout, "blog"), 700);
    else setTimeout(() => watchRuntime(frontmatter.value.layout, ""), 700);
  }
  // 首页描述切换模式
  else if (type === "bannerDescStyle") teekConfig.value.banner = { ...teekConfig.value.banner, ...config.banner };
  // 首页文章布局
  else if (type === "postStyle") teekConfig.value.post = { ...teekConfig.value.post, ...config.post };
  // 首页卡片列表位置
  else if (type === "homeCardListPosition") teekConfig.value.homeCardListPosition = config.homeCardListPosition;
  // 页面样式
  else if (type === "pageStyle") {
    teekConfig.value.pageStyle = config.pageStyle;
    teekConfig.value.themeEnhance = { ...teekConfig.value.themeEnhance, ...config.themeEnhance };
  }
  // 文章封面图片模式
  else if (type === "postCoverImgMode") teekConfig.value.post = { ...teekConfig.value.post, ...config.post };
  // 主题尺寸
  else if (type === "themeSize") teekConfig.value.themeSize = config.themeSize;
  // 首页 Banner 图片波浪
  else if (type === "bannerImgWaves") teekConfig.value.banner = { ...teekConfig.value.banner, ...config.banner };
  // 加载动画
  else if (type === "loading") teekConfig.value.loading = config.loading;
  // 评论
  else if (type === "comment") teekConfig.value.comment = config.comment;
  // 彩带背景
  else if (type === "ribbon") {
    if (config) startRibbon();
    else stopRibbon();
  }

  TkMessage.success({
    message: "切换配置成功！",
    customClass: "antd",
  });
};
</script>

<template>
  <Teek.Layout>
    <template #teek-theme-enhance-bottom>
      <ThemeConfig @change="handleThemeConfigChange" />
    </template>

    <template #teek-home-card-my-after>
      <CalendarCard />
    </template>

    <template #nav-screen-content-after>
      <ThemeConfig @change="handleThemeConfigChange" />
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
