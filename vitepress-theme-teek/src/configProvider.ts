import type { PostData } from "./post/types";
import type { TeekConfig } from "./config/types";
import { computed, defineComponent, h, inject, InjectionKey, provide, Ref, unref, type Component } from "vue";
import { useData } from "vitepress";
import { useAnchorScroll, useViewTransition } from "./hooks";
import { emptyPost } from "./post/helper";
import { isFunction, isObject } from "./helper";
import usePermalink from "vitepress-plugin-permalink/usePermalink";

export const postsSymbol: InjectionKey<PostData> = Symbol("posts");
export const teekConfigSymbol: InjectionKey<TeekConfig | Ref<TeekConfig>> = Symbol("teekConfig");

/**
 * 创建 Layout 组件
 */
export const TeekConfigProvider = (Layout: Component) => {
  return defineComponent({
    name: "TeekConfigProvider",
    setup(_, { slots }) {
      // 往主题注入数据
      provide(postsSymbol, useAllPosts());

      // 开启监听器
      usePermalink().startWatch();
      useAnchorScroll().startWatch();
      useViewTransition();

      return () => h(Layout, null, slots);
    },
  });
};

/**
 * 返回自定义页面标识
 */
export const usePage = () => {
  const { frontmatter } = useData();

  // 当前页面是否为首页
  const isHomePage = computed(
    () => !unref(isCategoriesPage) && !unref(isTagsPage) && unref(frontmatter).layout === "home"
  );
  // 当前页面是否为分类页
  const isCategoriesPage = computed(() => unref(frontmatter).categoriesPage);
  // 当前页面是否为标签页
  const isTagsPage = computed(() => unref(frontmatter).tagsPage);
  // 当前页面是否为归档页
  const isArchivesPage = computed(() => unref(frontmatter).archivesPage);
  // 当前页面是否为目录页
  const isCataloguePage = computed(() => unref(frontmatter).catalogue);

  return { isHomePage, isCategoriesPage, isTagsPage, isArchivesPage, isCataloguePage };
};

/**
 * 返回全部 Posts 数据
 */
export const useAllPosts = (): PostData => {
  const { theme } = useData();
  const posts = unref(theme).posts;

  return posts || emptyPost;
};

/**
 * 返回 Posts 数据，当处于国际化环境时，返回对应语言的 Posts 数据，否则返回全部 Posts 数据
 */
export const usePosts = (): Ref<PostData> => {
  const { localeIndex } = useData();
  const posts = useAllPosts();

  // 兼容国际化功能，先从多语言下获取 posts 数据，获取不到说明没有使用多语言功能，则获取所有 posts 数据。因为多语言可以随时切换，因此使用 computed
  return computed(() => posts.locales?.[unref(localeIndex)] || posts);
};

/**
 * 获取默认背景色
 */
export const useBgColor = () => {
  const { getTeekConfigRef } = useTeekConfig();

  return getTeekConfigRef("bgColor", [
    "#e74c3c",
    "#409EFF",
    "#DAA96E",
    "#0C819F",
    "#27ae60",
    "#ff5c93",
    "#fd726d",
    "#f39c12",
    "#9b59b6",
  ]);
};

/**
 * 获取 Teek 的主题配置数据
 * 支持（优先级） provide > frontmatter.tk.[key] > frontmatter.[key] > theme.[key] 4 种方式进行主题配置
 */
export const useTeekConfig = () => {
  const { theme, frontmatter } = useData();
  const teekConfigProvide = inject(teekConfigSymbol, {});

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
      return { ...dv, ...unref(theme), ...unref(frontmatter), ...unref(frontmatter).tk, ...unref(teekConfigProvide) };
    }

    // 返回指定 key 的 TeekConfig 数据
    const valueFromTheme = unref(theme)[key];
    const valueFromFrontmatter = unref(frontmatter).tk?.[key] ?? unref(frontmatter)[key];
    const valueFromInject = unref(teekConfigProvide)[key];

    // 对象格式，根据优先级合并里面的内容
    if (isObject(valueFromTheme) || isObject(valueFromFrontmatter) || isObject(valueFromInject)) {
      return { ...dv, ...valueFromTheme, ...valueFromFrontmatter, ...(valueFromInject as object) };
    }

    // 非对象格式，则根据优先级返回
    return valueFromInject || valueFromFrontmatter || valueFromTheme || dv;
  };

  /**
   * 获取 Teek 的主题配置数据（响应式）
   */
  const getTeekConfigRef = <T = any>(key?: keyof TeekConfig | null, defaultValue?: any) => {
    return computed<T>(() => getTeekConfig(key, defaultValue));
  };

  return { getTeekConfig, getTeekConfigRef };
};
