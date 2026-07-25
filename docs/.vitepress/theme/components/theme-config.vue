<script setup lang="ts">
import type { Post, TeekConfig, SegmentedOption } from "vitepress-theme-teek";
import { useData } from "vitepress";
import { ref } from "vue";
import { TkSegmented, TkSwitch, TkMessage, useClipboard } from "vitepress-theme-teek";

interface ThemeEnhanceConfig {
  modelValue: any;
  title: string;
  options: SegmentedOption[];
  change: (value: any) => void;
}

export type ChangeType =
  | "bannerWallpaper"
  | "bannerDescStyle"
  | "bannerImgWaves"
  | "postStyle"
  | "postCoverImgMode"
  | "homeCardListPosition"
  | "pageStyle"
  | "themeSize"
  | "loading"
  | "comment";

const namespace = "theme-setting";
const teekConfig = ref<TeekConfig>({});

const { theme } = useData();

const bannerImgSrc = theme.value.banner?.imgSrc;
const bodyBgImgSrc = theme.value.bodyBgImg?.imgSrc;

const emit = defineEmits<{ change: [config: TeekConfig, type: ChangeType] }>();

// 首页壁纸模式
const bannerWallpaper: ThemeEnhanceConfig = {
  modelValue: "doc",
  title: "首页壁纸模式",
  options: [
    { value: "doc", label: "文档模式" },
    { value: "gridImg", label: "网格壁纸" },
    { value: "pureColor", label: "纯色壁纸" },
    { value: "partImg", label: "小图壁纸" },
    { value: "fullImg", label: "大图壁纸" },
    { value: "bodyBgImg", label: "全屏壁纸" },
  ],
  change(value: string) {
    // 初始化 Banner 图片，不存在时从 Body 获取
    const initBannerImgSrc = () => {
      // 如果首页 Banner 没有设置图片，则使用 Body 图片
      teekConfig.value.banner = { ...teekConfig.value.banner };
      teekConfig.value.banner.imgSrc = bannerImgSrc || (bodyBgImgSrc ?? []);
      // 清除 Body 图片
      clearImgSrc("bodyBgImg");
    };

    // 清空图片
    const clearImgSrc = (scope: "bannerImg" | "bodyBgImg" | "both" = "both") => {
      if (["bannerImg", "both"].includes(scope)) {
        teekConfig.value.banner = { ...teekConfig.value.banner, imgSrc: undefined };
      }
      if (["bodyBgImg", "both"].includes(scope)) {
        teekConfig.value.bodyBgImg = { ...teekConfig.value.bodyBgImg, imgSrc: undefined };
      }
    };

    // 文档风格
    if (value === "doc") {
      teekConfig.value.teekHome = false;
      teekConfig.value.vpHome = true;
      clearImgSrc();
      return change("bannerWallpaper");
    }

    // 博客风格
    teekConfig.value.teekHome = true;
    teekConfig.value.vpHome = false;

    teekConfig.value.banner = { ...teekConfig.value.banner };

    if (value === "gridImg") {
      clearImgSrc();
      teekConfig.value.banner.bgStyle = "partImg";
    } else if (value === "pureColor") {
      clearImgSrc();
      teekConfig.value.banner.bgStyle = "pure";
    } else if (value === "partImg") {
      initBannerImgSrc();
      teekConfig.value.banner.bgStyle = "partImg";
    } else if (value === "fullImg") {
      initBannerImgSrc();
      teekConfig.value.banner.bgStyle = "fullImg";
    } else if (value === "bodyBgImg") {
      teekConfig.value.bodyBgImg = { ...teekConfig.value.bodyBgImg };
      // 如果 Body 没有设置图片，则使用首页 Banner 图片
      teekConfig.value.bodyBgImg.imgSrc = bodyBgImgSrc || (bannerImgSrc ?? []);
      // 清除 Banner 图片
      clearImgSrc("bannerImg");
    }

    change("bannerWallpaper");
  },
};

// 首页描述切换模式
const bannerDescStyle = {
  modelValue: theme.value.banner.descStyle ?? "default",
  title: "首页描述切换模式",
  options: [
    { value: "default", label: "展示" },
    { value: "types", label: "打印机" },
    { value: "switch", label: "切换" },
  ],
  change(value: NonNullable<TeekConfig["banner"]>["descStyle"]) {
    teekConfig.value.banner = { ...teekConfig.value.banner };
    teekConfig.value.banner.descStyle = value;
    change("bannerDescStyle");
  },
};

// 首页文章布局
const postStyle: ThemeEnhanceConfig = {
  modelValue: theme.value.post.postStyle ?? "list",
  title: "首页文章布局",
  options: [
    { value: "list", label: "列表" },
    { value: "card", label: "卡片" },
  ],
  change(value: Post["postStyle"]) {
    teekConfig.value.post = { ...teekConfig.value.post };
    teekConfig.value.post.postStyle = value;
    change("postStyle");
  },
};

// 首页文章封面图模式
const postCoverImgMode: ThemeEnhanceConfig = {
  modelValue: theme.value.post.coverImgMode ?? "full",
  title: "首页文章封面图模式",
  options: [
    { value: "small", label: "缩略图" },
    { value: "full", label: "填充图" },
  ],
  change(value: Post["coverImgMode"]) {
    teekConfig.value.post = { ...teekConfig.value.post };
    teekConfig.value.post.coverImgMode = value;
    change("postCoverImgMode");
  },
};

// 首页卡片栏布局
const homeCardListPosition: ThemeEnhanceConfig = {
  modelValue: theme.value.homeCardListPosition ?? "right",
  title: "首页卡片栏布局",
  options: [
    { value: "left", label: "左侧" },
    { value: "right", label: "右侧" },
    { value: false, label: "隐藏" },
  ],
  change: (value: TeekConfig["homeCardListPosition"]) => {
    teekConfig.value.homeCardListPosition = value;
    change("homeCardListPosition");
  },
};

// 首页尺寸
const themeSize: ThemeEnhanceConfig = {
  modelValue: theme.value.themeSize ?? "",
  title: "首页尺寸",
  options: [
    { value: "small", label: "Small" },
    { value: "", label: "Default" },
    { value: "large", label: "Large" },
    { value: "wide", label: "Wide" },
  ],
  change(value: TeekConfig["themeSize"]) {
    teekConfig.value.themeSize = value;
    change("themeSize");
  },
};

// 文章页背景风格
const pageStyle: ThemeEnhanceConfig = {
  modelValue: theme.value.pageStyle ?? "default",
  title: "文章页背景风格",
  options: [
    { value: "default", label: "默认" },
    { value: "card", label: "书本" },
    { value: "card-nav", label: "书本翻阅" },
    { value: "segment", label: "书页" },
    { value: "segment-nav", label: "书页翻阅" },
  ],
  change(value: TeekConfig["pageStyle"]) {
    teekConfig.value.pageStyle = value;
    teekConfig.value.themeEnhance = { ...teekConfig.value.themeEnhance, layoutSwitch: { defaultMode: "original" } };
    change("pageStyle");
  },
};

// 首页壁纸标题
const bannerTitle = {
  modelValue: Boolean(theme.value.banner.name),
  title: "首页壁纸标题",
  options: [
    { value: true, label: "ON" },
    { value: false, label: "OFF" },
  ],
  change(value: boolean) {
    if (!document) return;
    const el = document.querySelector(".tk-banner-content") as HTMLElement | null;

    // DOM 操作隐藏元素
    el && (el.style.display = value ? "block" : "none");
  },
};

// 首页壁纸波浪纹
const bannerImgWaves = {
  modelValue: Boolean(theme.value.banner.imgWaves ?? true),
  title: "首页壁纸波浪纹",
  options: [
    { value: true, label: "ON" },
    { value: false, label: "OFF" },
  ],
  change(value: NonNullable<TeekConfig["banner"]>["imgWaves"]) {
    teekConfig.value.banner = { ...teekConfig.value.banner };
    teekConfig.value.banner.imgWaves = value;
    change("bannerImgWaves");
  },
};

// 路由加载动画
const loading: ThemeEnhanceConfig = {
  modelValue: Boolean(theme.value.loading ?? false),
  title: "路由加载动画",
  options: [
    { value: true, label: "ON" },
    { value: false, label: "OFF" },
  ],
  change(value: TeekConfig["loading"]) {
    teekConfig.value.loading = value;
    change("loading");
  },
};

// Giscus 评论区
const comment: ThemeEnhanceConfig = {
  modelValue: Boolean(theme.value.comment ?? false),
  title: "Giscus 评论区",
  options: [
    { value: true, label: "ON" },
    { value: false, label: "OFF" },
  ],
  change(value: boolean) {
    teekConfig.value.comment = value
      ? {
          provider: "giscus",
          options: {
            repo: "Kele-Bingtang/vitepress-theme-teek",
            repoId: "R_kgDONpVfBA",
            category: "Announcements",
            categoryId: "DIC_kwDONpVfBM4Cm3v9",
          },
        }
      : value;

    change("comment");
  },
};

const ribbon = {
  modelValue: false,
  title: "彩带背景",
  options: [
    { value: true, label: "ON" },
    { value: false, label: "OFF" },
  ],
  change(value: boolean) {
    change("ribbon", value);
  },
};

const change = (type: ChangeType, value?: any) => {
  emit("change", value ?? teekConfig.value, type);
};

const { copy, copied } = useClipboard();

// 复制配置项
const handleCopy = async () => {
  await copy(JSON.stringify({ ...teekConfig.value }, null, 2));
  copied.value
    ? TkMessage.success({ message: "复制成功！", plain: true })
    : TkMessage.error({ message: "复制失败！", plain: true });
};
</script>

<template>
  <div :class="namespace">
    <div class="divider">
      <div class="divider-text is-center">
        <span>主题配置</span>
        <button @click="handleCopy">COPY</button>
      </div>
    </div>

    <div class="wrapper mw-70">
      <span class="tk-theme-enhance__title">{{ bannerWallpaper.title }}</span>
      <TkSegmented v-bind="bannerWallpaper" @change="bannerWallpaper.change" />
    </div>

    <div class="wrapper">
      <span class="tk-theme-enhance__title">{{ bannerDescStyle.title }}</span>
      <TkSegmented v-bind="bannerDescStyle" @change="bannerDescStyle.change" />
    </div>

    <div class="wrapper">
      <span class="tk-theme-enhance__title">{{ postStyle.title }}</span>
      <TkSegmented v-bind="postStyle" @change="postStyle.change" />
    </div>

    <div class="wrapper">
      <span class="tk-theme-enhance__title">{{ homeCardListPosition.title }}</span>
      <TkSegmented v-bind="homeCardListPosition" @change="homeCardListPosition.change" />
    </div>

    <div class="wrapper">
      <span class="tk-theme-enhance__title">{{ themeSize.title }}</span>
      <TkSegmented v-bind="themeSize" @change="themeSize.change" />
    </div>

    <div class="wrapper mw-70">
      <span class="tk-theme-enhance__title">{{ pageStyle.title }}</span>
      <TkSegmented v-bind="pageStyle" @change="pageStyle.change" />
    </div>

    <div class="wrapper">
      <span class="tk-theme-enhance__title">{{ postCoverImgMode.title }}</span>
      <TkSegmented v-bind="postCoverImgMode" @change="postCoverImgMode.change" />
    </div>

    <div class="wrapper flx-justify-between">
      <span>{{ bannerTitle.title }}</span>
      <TkSwitch :model-value="bannerTitle.modelValue" @change="bannerTitle.change" />

      <!-- <span class="tk-theme-enhance__title">{{ bannerTitle.title }}</span> -->
      <!-- <TkSegmented v-bind="bannerTitle" @change="bannerTitle.change" /> -->
    </div>

    <div class="wrapper flx-justify-between">
      <span>{{ bannerImgWaves.title }}</span>
      <TkSwitch :model-value="bannerImgWaves.modelValue" @change="bannerImgWaves.change" />

      <!-- <span class="tk-theme-enhance__title">{{ bannerImgWaves.title }}</span> -->
      <!-- <TkSegmented v-bind="bannerImgWaves" @change="bannerImgWaves.change" /> -->
    </div>

    <div class="wrapper flx-justify-between">
      <span>{{ loading.title }}</span>
      <TkSwitch :model-value="loading.modelValue" @change="loading.change" />

      <!-- <span class="tk-theme-enhance__title">{{ loading.title }}</span> -->
      <!-- <TkSegmented v-bind="loading" @change="loading.change" /> -->
    </div>

    <div class="wrapper flx-justify-between">
      <span>{{ comment.title }}</span>
      <TkSwitch :model-value="comment.modelValue" @change="comment.change" />

      <!-- <span class="tk-theme-enhance__title">{{ comment.title }}</span> -->
      <!-- <TkSegmented v-bind="comment" @change="comment.change" /> -->
    </div>

    <div class="wrapper flx-justify-between">
      <span>{{ ribbon.title }}</span>
      <TkSwitch :model-value="ribbon.modelValue" @change="ribbon.change" />

      <!-- <span class="tk-theme-enhance__title">{{ comment.title }}</span> -->
      <!-- <TkSegmented v-bind="comment" @change="comment.change" /> -->
    </div>
  </div>
</template>

<style lang="scss">
$namespace: theme-setting;

.#{$namespace} {
  .divider {
    position: relative;
    display: block;
    height: 1px;
    width: 100%;
    margin: 24px 0;
    border-top: 1px var(--vp-c-border) solid;

    &-text {
      position: absolute;
      background-color: var(--tk-popover-bg-color);
      padding: 0 15px;
      font-weight: 500;
      color: var(--vp-c-text-1);
      font-size: 14px;

      &.is-left {
        left: 20px;
        transform: translateY(-50%);
      }

      &.is-center {
        left: 50%;
        transform: translate(-50%) translateY(-50%);
      }

      &.is-right {
        right: 20px;
        transform: translateY(-50%);
      }
    }
  }

  button {
    font-size: 14px;
    font-weight: 500;
    outline: none;
    transition: 0.1s;
    color: var(--vp-c-brand-3);
    margin-left: 10px;

    &:hover {
      color: var(--vp-c-brand-1);
      border-color: var(--vp-c-brand-1);
    }
  }

  .wrapper {
    margin-bottom: 10px;

    > span {
      font-size: 14px;
    }

    .tk-segmented {
      margin-top: 8px;
    }
  }

  .mw-70 .tk-segmented-item {
    min-width: 70px;
  }
}
</style>
