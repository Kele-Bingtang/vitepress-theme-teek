import type { PostData } from "@teek/config/post/types";
import type { WindowTransition, TeekConfig, ViewTransition } from "@teek/config";
import type { Component, Ref, InjectionKey } from "vue";
import { computed, defineComponent, h, inject, nextTick, provide, ref, unref, watch } from "vue";
import { useData, useRoute } from "vitepress";
import { useAnchorScroll, useMediaQuery, useViewTransition } from "@teek/composables";
import { emptyPost } from "@teek/config/post/helper";
import { isClient, isFunction, isObject } from "@teek/helper";

export const postsContext: InjectionKey<PostData> = Symbol("posts");
export const teekConfigContext: InjectionKey<TeekConfig | Ref<TeekConfig>> = Symbol("teekConfig");

/**
 * 创建 Layout 组件
 */
export const TeekConfigProvider = (layout: Component) => {
  return defineComponent({
    name: "TeekConfigProvider",
    setup(_, { slots }) {
      // 往主题注入数据
      provide(postsContext, useAllPosts());

      // 开启监听器
      useAnchorScroll().startWatch();

      const { getTeekConfig } = useTeekConfig();
      const viewTransitionConfig = getTeekConfig<ViewTransition>("viewTransition", {
        enabled: true,
        mode: "out-in",
        easing: "ease-in",
      });

      viewTransitionConfig.enabled && useViewTransition(viewTransitionConfig);

      return () => h(layout, null, slots);
    },
  });
};

/**
 * 获取 Teek 的主题配置数据
 * 支持（优先级） provide > frontmatter.tk.[key] > frontmatter.[key] > theme.[key] 4 种方式进行主题配置
 */
export const useTeekConfig = () => {
  const { theme, frontmatter } = useData();
  const teekConfigProvide = inject(teekConfigContext, {});

  /**
   * 获取 Teek 的主题配置数据
   *
   * @param key 配置项 key
   * @param defaultValue 如果读取 key 不存在时，则返回默认值
   */
  const getTeekConfig = <T = any>(key?: keyof TeekConfig | null, defaultValue?: any): T => {
    let dv = defaultValue;
    if (isFunction(defaultValue)) dv = defaultValue();

    // 返回所有 TeekConfig 数据
    if (!key) {
      return { ...dv, ...theme.value, ...frontmatter.value, ...frontmatter.value.tk, ...unref(teekConfigProvide) };
    }

    // 返回指定 key 的 TeekConfig 数据
    const valueFromTheme = theme.value[key];
    const valueFromFrontmatter = frontmatter.value.tk?.[key] ?? frontmatter.value[key];
    const valueFromInject = unref(teekConfigProvide)?.[key];

    // 对象格式，根据优先级合并里面的内容
    if (isObject(valueFromTheme) || isObject(valueFromFrontmatter) || isObject(valueFromInject)) {
      return { ...dv, ...valueFromTheme, ...valueFromFrontmatter, ...(valueFromInject as object) };
    }

    // 非对象格式，则根据优先级返回
    return valueFromInject ?? valueFromFrontmatter ?? valueFromTheme ?? dv;
  };

  /**
   * 获取 Teek 的主题配置数据（响应式）
   */
  const getTeekConfigRef = <T = any>(key?: keyof TeekConfig | null, defaultValue?: any) => {
    return computed(() => getTeekConfig<T>(key, defaultValue));
  };

  return { getTeekConfig, getTeekConfigRef };
};

/**
 * 返回功能页面状态
 */
export const usePageState = () => {
  const { frontmatter } = useData();

  // 当前页面是否为首页
  const isHomePage = computed(
    () => !isCategoriesPage.value && !isTagsPage.value && frontmatter.value.layout === "home"
  );
  // 当前页面是否为分类页
  const isCategoriesPage = computed(() => !!frontmatter.value.categoriesPage);
  // 当前页面是否为标签页
  const isTagsPage = computed(() => !!frontmatter.value.tagsPage);
  // 当前页面是否为归档页
  const isArchivesPage = computed(() => !!frontmatter.value.archivesPage);
  // 当前页面是否为目录页
  const isCataloguePage = computed(() => !!frontmatter.value.catalogue);
  // 当前页面是否为文章清单页
  const isArticleOverviewPage = computed(() => !!frontmatter.value.articleOverviewPage);
  // 当前页面是否为登录页
  const isLoginUrl = computed(() => !!frontmatter.value.loginPage);
  // 当前页面是否为风险链接页
  const isRiskLinkPage = computed(() => !!frontmatter.value.riskLinkPage);

  return {
    isHomePage,
    isCategoriesPage,
    isTagsPage,
    isArchivesPage,
    isCataloguePage,
    isArticleOverviewPage,
    isLoginUrl,
    isRiskLinkPage,
  };
};

/**
 * 获取自定义页的访问地址
 */
export const usePagePath = () => {
  const { getTeekConfigRef } = useTeekConfig();
  const { localeIndex, site } = useData();
  const posts = usePosts();

  const categoryConfig = getTeekConfigRef<NonNullable<TeekConfig["category"]>>("category", { path: "/categories" });
  const tagConfig = getTeekConfigRef<NonNullable<TeekConfig["tag"]>>("tag", { path: "/tags" });

  const categoryPath = computed(() => {
    const localeIndexConst = localeIndex.value;
    const localeName = localeIndexConst !== "root" ? `/${localeIndexConst}` : "";
    // 兼容国际化功能，如果没有配置多语言
    return `${localeName}${categoryConfig.value.path}${site.value.cleanUrls ? "" : ".html"}`;
  });

  const tagPath = computed(() => {
    // 兼容国际化功能，如果没有配置国际化
    const localeIndexConst = localeIndex.value;
    const localeName = localeIndexConst !== "root" ? `/${localeIndexConst}` : "";
    return `${localeName}${tagConfig.value.path}${site.value.cleanUrls ? "" : ".html"}`;
  });

  const postPagePath = computed(() => {
    let archivesUrl = "";
    let articleOverviewUrl = "";
    let loginUrl = "";
    let riskLinkUrl = "";

    // 一次性循环寻找多个文章相关的自定义页面，避免重复对 posts.value.allPosts 循环
    posts.value.allPosts.forEach(item => {
      const {
        frontmatter: { layout, archivesPage, articleOverviewPage, loginPage, riskLinkPage },
        url,
      } = item;

      const isPageLayout = layout === "page";

      if (layout === "TkCataloguePage" || (isPageLayout && archivesPage === true)) archivesUrl = url;
      if (layout === "TkArticleOverviewPage" || (isPageLayout && articleOverviewPage === true)) {
        articleOverviewUrl = url;
      }
      if (layout === false && loginPage === true) loginUrl = url;
      if (layout === false && riskLinkPage === true) riskLinkUrl = url;
    });

    return { archivesUrl, articleOverviewUrl, loginUrl, riskLinkUrl };
  });

  return {
    categoryPath,
    tagPath,
    archivesPath: computed(() => postPagePath.value.archivesUrl),
    articleOverviewPath: computed(() => postPagePath.value.articleOverviewUrl),
    loginPath: computed(() => postPagePath.value.loginUrl),
    riskLinkPath: computed(() => postPagePath.value.riskLinkUrl),
  };
};

/**
 * 返回全部文章数据
 */
export const useAllPosts = (): PostData => {
  const { theme } = useData();
  const posts = theme.value.posts;

  return posts || emptyPost;
};

/**
 * 返回文章数据，当处于国际化环境时，返回对应语言的 Posts 数据，否则返回全部 Posts 数据
 */
export const usePosts = (): Ref<PostData> => {
  const { localeIndex } = useData();
  const posts = useAllPosts();

  // 兼容国际化功能，先从多语言下获取 posts 数据，获取不到说明没有使用多语言功能，则获取所有 posts 数据。因为多语言可以随时切换，因此使用 computed
  return computed(() => posts.locales?.[localeIndex.value] || posts);
};

/**
 * 获取默认背景色
 */
export const useTagColor = () => {
  const { getTeekConfigRef } = useTeekConfig();

  return getTeekConfigRef<NonNullable<TeekConfig["tagColor"]>>("tagColor", [
    { border: "#bfdbfe", bg: "#eff6ff", text: "#2563eb" },
    { border: "#e9d5ff", bg: "#faf5ff", text: "#9333ea" },
    { border: "#fbcfe8", bg: "#fdf2f8", text: "#db2777" },
    { border: "#a7f3d0", bg: "#ecfdf5", text: "#059669" },
    { border: "#fde68a", bg: "#fffbeb", text: "#d97706" },
    { border: "#a5f3fc", bg: "#ecfeff", text: "#0891b2" },
    { border: "#c7d2fe", bg: "#eef2ff", text: "#4f46e5" },
  ]);
};

/**
 * 视图渐入过渡效果的响应式配置项获取
 */
export const useWindowTransitionConfig = (condition?: (windowTransition: WindowTransition) => boolean | undefined) => {
  const { getTeekConfigRef } = useTeekConfig();
  const windowTransitionConfig = getTeekConfigRef<WindowTransition>("windowTransition", true);

  return computed(() => {
    const windowTransition = windowTransitionConfig.value;
    if (windowTransition === undefined) return true;

    return isObject(windowTransition) ? (condition?.(windowTransition) ?? true) : windowTransition !== false;
  });
};

/**
 * 获取常用响应式变量
 */
export const useCommon = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return { isMobile };
};

/**
 * 侧边栏相关属性
 */
export const useSidebar = () => {
  const hasSidebar = ref(true);
  const route = useRoute();

  watch(
    () => route.path,
    async () => {
      if (!isClient) return;

      await nextTick();
      // 检查是否存在侧边栏
      const sidebarDom = document.querySelector(".VPSidebar");
      if (sidebarDom) hasSidebar.value = true;
      else hasSidebar.value = false;
    },
    { immediate: true, flush: "post" }
  );

  return { hasSidebar };
};
