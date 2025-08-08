<script setup lang="ts" name="TeekLayout">
import type { TeekConfig } from "@teek/config";
import type { Language } from "@teek/locale";
import DefaultTheme from "vitepress/theme";
import { useData, onContentUpdated } from "vitepress";
import { computed, provide, watch } from "vue";
import { useNamespace, localeContextKey } from "@teek/composables";
import { isBoolean, isClient } from "@teek/helper";
import { useTeekConfig, usePageState } from "@teek/components/theme/ConfigProvider";
import { TkHome } from "@teek/components/theme/Home";
import { TkHomeMyCardScreen } from "@teek/components/theme/HomeMyCard";
import { TkBodyBgImage } from "@teek/components/theme/BodyBgImage";
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
import { FooterContainer } from "@teek/components/theme/FooterContainer";

defineOptions({ name: "TeekLayout" });

const props = defineProps<{ locale?: Language }>();

provide(
  localeContextKey,
  computed(() => props.locale)
);

const { Layout } = DefaultTheme;

const ns = useNamespace("layout");
const { getTeekConfigRef } = useTeekConfig();
const { isArchivesPage, isCataloguePage, isArticleOverviewPage, topTip, bottomTip } = usePageState();
const { frontmatter, localeIndex, page } = useData();

// 支持 provide、frontmatter.tk、frontmatter、theme 配置
const teekConfig = getTeekConfigRef<Required<TeekConfig>>(null, {
  teekTheme: true,
  teekHome: true,
  vpHome: true,
  codeBlock: { disabled: false },
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
});

const commentConfig = computed(() => {
  const comment = frontmatter.value.comment ?? teekConfig.value.comment;
  if (isBoolean(comment)) return { enabled: comment };

  return {
    enabled: true,
    components: {
      twikoo: TkCommentTwikoo,
      waline: TkCommentWaline,
      giscus: TkCommentGiscus,
      artalk: TkCommentArtalk,
    },
    provider: comment.provider,
    options: comment.options,
  };
});

const topTipConfig = computed(() => {
  return teekConfig.value.articleTopTip?.(frontmatter.value, localeIndex.value, page.value);
});
const bottomTipConfig = computed(() => {
  return teekConfig.value.articleBottomTip?.(frontmatter.value, localeIndex.value, page.value);
});

const themeSizeAttribute = ns.joinNamespace("theme-size");
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
  "nav-bar-content-after",
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
    <template v-if="frontmatter.loginPage === true">
      <slot name="teek-login-page"><TkLoginPage /></slot>
    </template>
    <template v-if="frontmatter.riskLinkPage === true">
      <slot name="teek-risk-link-page"><TkRiskLinkPage /></slot>
    </template>

    <template v-if="frontmatter.layout !== false">
      <TkBodyBgImage v-if="teekConfig.bodyBgImg?.imgSrc" />
      <TkArticleHeadingHighlight />
      <TkNotice v-if="teekConfig.notice?.enabled">
        <template v-for="(_, name) in $slots" :key="name" #[name]><slot :name="name" /></template>
      </TkNotice>
      <TkRightBottomButton>
        <!-- 通用插槽 -->
        <template v-for="(_, name) in $slots" :key="name" #[name]><slot :name="name" /></template>
      </TkRightBottomButton>
    </template>

    <Layout :class="[ns.b(), { [ns.m('hide-vp-home')]: !teekConfig.vpHome }]">
      <template #home-hero-before>
        <slot name="home-hero-before" />
        <slot name="teek-home-before" />

        <!-- 自定义首页 -->
        <TkHome v-if="teekConfig.teekHome">
          <template v-for="(_, name) in $slots" :key="name" #[name]><slot :name="name" /></template>
        </TkHome>

        <slot name="teek-home-after" />
      </template>

      <template #nav-bar-content-after>
        <slot name="nav-bar-content-after" />

        <TkThemeEnhance position="top">
          <template v-for="(_, name) in $slots" :key="name" #[name]><slot :name="name" /></template>
        </TkThemeEnhance>
      </template>

      <template #layout-bottom>
        <FooterContainer />
      </template>

      <template #sidebar-nav-before>
        <TkHomeMyCardScreen />
      </template>

      <template #doc-footer-before>
        <TkVpContainer v-if="bottomTipConfig && bottomTip" v-bind="bottomTipConfig" />
      </template>

      <template #doc-before>
        <slot name="doc-before" />
        <slot name="teek-article-analyze-before" />
        <TkArticleAnalyze v-if="frontmatter.article !== false" />
        <slot name="teek-article-analyze-after" />

        <TkArticleImagePreview />
        <TkArticlePageStyle />
        <TkCodeBlockToggle v-if="!teekConfig.codeBlock.disabled" />
        <TkVpContainer v-if="topTipConfig && topTip" v-bind="topTipConfig" />
      </template>

      <template #doc-after>
        <slot name="doc-after" />

        <slot name="teek-doc-update-before" />
        <TkArticleUpdate v-if="teekConfig.articleUpdate.enabled && frontmatter.articleUpdate !== false" />
        <slot name="teek-doc-update-after" />

        <slot name="teek-doc-after-appreciation-before" />
        <TkDocAfterAppreciation v-if="teekConfig.appreciation.position === 'doc-after'" />
        <TkDocAfterAppreciationPopper v-else-if="teekConfig.appreciation.position === 'doc-after-popper'" />
        <slot name="teek-doc-after-appreciation-after" />

        <slot name="teek-comment-before" />

        <!-- 评论区 -->
        <template v-if="commentConfig.enabled && commentConfig.provider">
          <template v-if="commentConfig.provider === 'render'"><slot name="teek-comment" /></template>
          <component
            v-else
            :is="commentConfig.components?.[commentConfig.provider]"
            :id="`${ns.namespace}-comment`"
            :class="ns.e('comment')"
          />
        </template>

        <slot name="teek-comment-after" />
      </template>

      <template #aside-bottom>
        <slot name="aside-bottom" />

        <slot name="teek-aside-bottom-appreciation-before" />
        <TkAsideBottomAppreciation v-if="teekConfig.appreciation.position === 'aside-bottom'" />
        <slot name="teek-aside-bottom-appreciation-after" />
      </template>

      <template #page-top>
        <slot name="page-top" />
        <slot name="teek-page-top-before" />

        <TkArchivesPage v-if="isArchivesPage">
          <template v-for="(_, name) in $slots" :key="name" #[name]><slot :name="name" /></template>
        </TkArchivesPage>
        <TkCataloguePage v-if="isCataloguePage">
          <template v-for="(_, name) in $slots" :key="name" #[name]><slot :name="name" /></template>
        </TkCataloguePage>
        <TkArticleOverviewPage v-if="isArticleOverviewPage" />

        <slot name="teek-page-top-after" />
      </template>

      <template #aside-outline-before>
        <slot name="teek-article-share-before" />

        <TkArticleShare v-if="teekConfig.articleShare.enabled" />

        <slot name="teek-article-share-after" />
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
