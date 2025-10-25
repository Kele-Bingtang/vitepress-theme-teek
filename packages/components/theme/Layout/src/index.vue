<script setup lang="ts" name="TeekLayout">
import type { TeekConfig } from "@teek/config";
import type { Language } from "@teek/locale";
import DefaultTheme from "vitepress/theme";
import { useData, onContentUpdated } from "vitepress";
import { computed, provide, ref, watch } from "vue";
import { useNamespace, localeContextKey } from "@teek/composables";
import { isBoolean, isClient } from "@teek/helper";
import { useTeekConfig, usePageState, useSidebar } from "@teek/components/theme/ConfigProvider";
import { TkHome } from "@teek/components/theme/Home";
import { TkHomeMyCardScreen } from "@teek/components/theme/HomeMyCard";
import { TkBodyBgImage } from "@teek/components/theme/BodyBgImage";
import { TkFooterGroup } from "@teek/components/theme/FooterGroup";
import { TkFooterInfo } from "@teek/components/theme/FooterInfo";
import { TkArticleImagePreview } from "@teek/components/theme/ArticleImagePreview";
import { TkArticleAnalyze } from "@teek/components/theme/ArticleAnalyze";
import { TkArticleShare } from "@teek/components/theme/ArticleShare";
import { TkArticleUpdate } from "@teek/components/theme/ArticleUpdate";
import { TkArticleHeadingHighlight } from "@teek/components/theme/ArticleHeadingHighlight";
import { TkArticlePageStyle } from "@teek/components/theme/ArticlePageStyle";
import {
  TkDocAfterAppreciation,
  TkAsideBottomAppreciation,
  TkDocAfterAppreciationPopper,
} from "@teek/components/theme/ArticleAppreciation";
import { TkCommentTwikoo } from "@teek/components/theme/CommentTwikoo";
import { TkCommentArtalk } from "@teek/components/theme/CommentArtalk";
import { TkCommentGiscus } from "@teek/components/theme/CommentGiscus";
import { TkCommentWaline } from "@teek/components/theme/CommentWaline";
import { TkCodeBlockToggle } from "@teek/components/theme/CodeBlockToggle";
import { TkRightBottomButton } from "@teek/components/theme/RightBottomButton";
import { TkNotice } from "@teek/components/theme/Notice";
import { TkThemeEnhance } from "@teek/components/theme/ThemeEnhance";
import { TkVpContainer } from "@teek/components/common/VpContainer";
import { TkArchivesPage } from "@teek/components/theme/ArchivesPage";
import { TkCataloguePage } from "@teek/components/theme/CataloguePage";
import { TkArticleOverviewPage } from "@teek/components/theme/ArticleOverviewPage";
import { TkLoginPage, useWatchLogin } from "@teek/components/theme/LoginPage";
import { TkRiskLinkPage, useRiskLink } from "@teek/components/theme/RiskLinkPage";
import { TkSidebarTrigger } from "@teek/components/theme/SidebarTrigger";
import { TkHomeFeature } from "@teek/components/theme/HomeFeature";
import { TkRouteLoading } from "@teek/components/theme/RouteLoading";
import { TkArticleBanner } from "@teek/components/theme/ArticleBanner";

defineOptions({ name: "TeekLayout" });

const props = defineProps<{ locale?: Language }>();

provide(
  localeContextKey,
  computed(() => props.locale)
);

const { Layout } = DefaultTheme;

const ns = useNamespace("layout");
const { getTeekConfigRef } = useTeekConfig();
const { isHomePage, isArchivesPage, isCataloguePage, isArticleOverviewPage } = usePageState();
const { frontmatter, localeIndex, page } = useData();
const { hasSidebar } = useSidebar();

// 支持 provide、frontmatter.tk、frontmatter、theme 配置
const teekConfig = getTeekConfigRef<Required<TeekConfig>>(null, {
  teekTheme: true,
  teekHome: true,
  vpHome: true,
  sidebarTrigger: false,
  loading: false,
  codeBlock: { enabled: true },
  themeSize: "",
  bodyBgImg: {},
  notice: {},
  comment: { provider: "" },
  articleUpdate: { enabled: true },
  articleTopTip: undefined,
  articleBottomTip: undefined,
  articleShare: {},
  appreciation: {},
  riskLink: { enabled: false },
  themeEnhance: { enabled: true },
  articleBanner: { enabled: false },
  pageStyle: "default",
});

const loading = ref(teekConfig.value.loading);

const commentConfig = computed(() => {
  const frontmatterComment = frontmatter.value.comment;
  const configComment = teekConfig.value.comment;
  let commentConfig = frontmatterComment ?? configComment;

  if (isBoolean(frontmatterComment)) {
    if (frontmatterComment === false) return { enabled: false };
    else commentConfig = configComment;
  }

  return {
    enabled: true,
    components: {
      twikoo: TkCommentTwikoo,
      waline: TkCommentWaline,
      giscus: TkCommentGiscus,
      artalk: TkCommentArtalk,
    },
    provider: commentConfig.provider,
    options: commentConfig.options,
  };
});

const topTipConfig = computed(() => {
  if (isBoolean(teekConfig.value.articleTopTip)) return teekConfig.value.articleTopTip;
  return teekConfig.value.articleTopTip?.(frontmatter.value, localeIndex.value, page.value);
});
const bottomTipConfig = computed(() => {
  if (isBoolean(teekConfig.value.articleBottomTip)) return teekConfig.value.articleBottomTip;
  return teekConfig.value.articleBottomTip?.(frontmatter.value, localeIndex.value, page.value);
});

// 是否显示 Article Banner（使用条件：开启该功能、没有侧边栏的文章页）
const showArticleBanner = computed(
  () =>
    frontmatter.value.articleBanner !== false &&
    teekConfig.value.articleBanner.enabled &&
    !hasSidebar.value &&
    frontmatter.value.article !== false &&
    (!frontmatter.value.layout || frontmatter.value.layout === "doc") &&
    teekConfig.value.pageStyle === "default"
);

const themeSizeAttribute = ns.join("theme-size");
watch(
  () => teekConfig.value.themeSize,
  newValue => {
    if (!isClient) return;
    // 设置或删除主题尺寸
    if (newValue) document.documentElement.setAttribute(themeSizeAttribute, newValue);
    else document.documentElement.removeAttribute(themeSizeAttribute);
  },
  { immediate: true, flush: "post" }
);

const { watchSite, watchPages } = useWatchLogin();
const { restart } = useRiskLink({
  whitelist: teekConfig.value.riskLink.whitelist,
  blacklist: teekConfig.value.riskLink.blacklist,
});

watchSite();
watchPages();

onContentUpdated(() => {
  if (teekConfig.value.riskLink.enabled) restart();
});

// 维护已使用的插槽，防止外界传来的插槽覆盖已使用的插槽
const usedSlots = [
  "home-hero-before",
  "home-features-after",
  "nav-bar-content-after",
  "layout-top",
  "layout-bottom",
  "doc-footer-before",
  "doc-before",
  "doc-after",
  "aside-bottom",
  "page-top",
  "aside-outline-before",
  "sidebar-nav-before",
];
</script>

<template>
  <template v-if="teekConfig.teekTheme">
    <TkRouteLoading v-if="teekConfig.loading ?? false" v-model="loading">
      <template #default="scope">
        <slot name="teek-loading" v-bind="scope" />
      </template>
    </TkRouteLoading>

    <template v-if="frontmatter.loginPage === true">
      <slot name="teek-login-page"><TkLoginPage v-show="!loading" /></slot>
    </template>
    <template v-if="frontmatter.riskLinkPage === true">
      <slot name="teek-risk-link-page"><TkRiskLinkPage v-show="!loading" /></slot>
    </template>

    <template v-if="frontmatter.layout !== false">
      <TkBodyBgImage v-if="teekConfig.bodyBgImg?.imgSrc" />
      <TkArticleHeadingHighlight />
      <TkNotice v-if="teekConfig.notice?.enabled">
        <template v-for="(_, name) in $slots" :key="name" #[name]="scope">
          <slot :name="name" v-bind="scope" />
        </template>
      </TkNotice>
      <TkRightBottomButton>
        <!-- 通用插槽 -->
        <template v-for="(_, name) in $slots" :key="name" #[name]="scope">
          <slot :name="name" v-bind="scope" />
        </template>
      </TkRightBottomButton>
    </template>

    <Layout
      v-show="!loading"
      :class="[
        ns.b(),
        { [ns.m('hide-vp-home')]: !teekConfig.vpHome },
        ns.has('sidebar-trigger', teekConfig.sidebarTrigger),
      ]"
    >
      <template #home-hero-before>
        <slot name="home-hero-before" />
        <slot name="teek-home-before" />

        <!-- 自定义首页 -->
        <TkHome v-if="teekConfig.teekHome">
          <template v-for="(_, name) in $slots" :key="name" #[name]="scope">
            <slot :name="name" v-bind="scope" />
          </template>
        </TkHome>

        <slot name="teek-home-after" />
      </template>

      <template #home-features-after>
        <template v-if="!teekConfig.teekHome">
          <slot name="teek-home-features-before" />
          <TkHomeFeature />
          <slot name="teek-home-features-after" />
        </template>

        <slot name="home-features-after" />
      </template>

      <template #nav-bar-content-after>
        <slot name="nav-bar-content-after" />

        <TkThemeEnhance v-if="teekConfig.themeEnhance.enabled ?? true">
          <template v-for="(_, name) in $slots" :key="name" #[name]="scope">
            <slot :name="name" v-bind="scope" />
          </template>
        </TkThemeEnhance>
      </template>

      <template #layout-top>
        <slot name="layout-top" />

        <template v-if="showArticleBanner">
          <slot name="teek-article-banner-before" />
          <TkArticleBanner>
            <template v-for="(_, name) in $slots" :key="name" #[name]="scope">
              <slot :name="name" v-bind="scope" />
            </template>
          </TkArticleBanner>
          <slot name="teek-article-banner-after" />
        </template>
      </template>

      <template #layout-bottom>
        <template v-if="isHomePage">
          <slot name="teek-footer-group-before" />
          <TkFooterGroup />
          <slot name="teek-footer-group-after" />

          <slot name="teek-footer-info-before" />
          <slot name="teek-footer-info">
            <TkFooterInfo />
          </slot>
          <slot name="teek-footer-info-after" />
        </template>

        <slot name="layout-bottom" />
      </template>

      <template #sidebar-nav-before>
        <TkHomeMyCardScreen />
      </template>

      <template #doc-before>
        <slot name="doc-before" />

        <template v-if="frontmatter.article !== false && !showArticleBanner">
          <slot name="teek-article-analyze-before" />
          <TkArticleAnalyze />
          <slot name="teek-article-analyze-after" />
        </template>

        <TkArticleImagePreview />
        <TkArticlePageStyle />
        <TkCodeBlockToggle v-if="teekConfig.codeBlock.enabled ?? true" />
        <TkVpContainer v-if="topTipConfig" v-bind="isBoolean(topTipConfig) ? {} : topTipConfig" />
        <TkSidebarTrigger v-if="teekConfig.sidebarTrigger">
          <template #default="scope">
            <slot name="teek-sidebar-trigger" v-bind="scope" />
          </template>
        </TkSidebarTrigger>
      </template>

      <template #doc-footer-before>
        <slot name="doc-footer-before" />

        <template v-if="bottomTipConfig">
          <slot name="teek-article-bottom-tip-before" />
          <TkVpContainer v-bind="isBoolean(bottomTipConfig) ? {} : bottomTipConfig" />
          <slot name="teek-article-bottom-tip-after" />
        </template>
      </template>

      <template #doc-after>
        <slot name="doc-after" />

        <template v-if="(teekConfig.articleUpdate.enabled ?? true) && frontmatter.articleUpdate !== false">
          <slot name="teek-doc-update-before" />
          <TkArticleUpdate />
          <slot name="teek-doc-update-after" />
        </template>

        <template v-if="['doc-after', 'doc-after-popper'].includes(teekConfig.appreciation.position)">
          <slot name="teek-doc-after-appreciation-before" />
          <TkDocAfterAppreciation v-if="teekConfig.appreciation.position === 'doc-after'" />
          <TkDocAfterAppreciationPopper v-else-if="teekConfig.appreciation.position === 'doc-after-popper'" />
          <slot name="teek-doc-after-appreciation-after" />
        </template>

        <!-- 评论区 -->
        <template v-if="commentConfig.enabled && commentConfig.provider">
          <slot name="teek-comment-before" />
          <template v-if="commentConfig.provider === 'render'"><slot name="teek-comment" /></template>
          <component
            v-else
            :is="commentConfig.components?.[commentConfig.provider]"
            :id="`${ns.namespace}-comment`"
            :class="ns.e('comment')"
          />
          <slot name="teek-comment-after" />
        </template>
      </template>

      <template #aside-bottom>
        <slot name="aside-bottom" />

        <template v-if="teekConfig.appreciation.position === 'aside-bottom'">
          <slot name="teek-aside-bottom-appreciation-before" />
          <TkAsideBottomAppreciation />
          <slot name="teek-aside-bottom-appreciation-after" />
        </template>
      </template>

      <template #page-top>
        <slot name="page-top" />

        <template v-if="isArchivesPage || isCataloguePage || isArticleOverviewPage">
          <slot name="teek-page-top-before" />
          <TkArchivesPage v-if="isArchivesPage">
            <template v-for="(_, name) in $slots" :key="name" #[name]="scope">
              <slot :name="name" v-bind="scope" />
            </template>
          </TkArchivesPage>
          <TkCataloguePage v-else-if="isCataloguePage">
            <template v-for="(_, name) in $slots" :key="name" #[name]="scope">
              <slot :name="name" v-bind="scope" />
            </template>
          </TkCataloguePage>
          <TkArticleOverviewPage v-else-if="isArticleOverviewPage" />
          <slot name="teek-page-top-after" />
        </template>
      </template>

      <template #aside-outline-before>
        <template v-if="teekConfig.articleShare.enabled">
          <slot name="teek-article-share-before" />
          <TkArticleShare />
          <slot name="teek-article-share-after" />
        </template>

        <slot name="aside-outline-before" />
      </template>

      <!-- 其他 VP 插槽 -->
      <template
        v-for="name in Object.keys($slots).filter(name => !usedSlots.includes(name))"
        :key="name"
        #[name]="slotData"
      >
        <slot :name="name" v-bind="slotData"></slot>
      </template>
    </Layout>
  </template>

  <template v-else>
    <Layout>
      <template v-for="(_, name) in $slots" :key="name" #[name]="slotData">
        <slot :name="name" v-bind="slotData"></slot>
      </template>
    </Layout>
  </template>
</template>
