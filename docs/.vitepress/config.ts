import { defineConfig } from "vitepress";
import { defineTeekConfig } from "../../packages/config";
import { version } from "../../packages/teek/version";

const description = ["vitepress-theme-teek 使用文档", "vitepress 主题"].toString();

const teekConfig = defineTeekConfig({
  author: { name: "Teeker", link: "https://github.com/Kele-Bingtang" },
  footerInfo: {
    theme: {
      name: `Theme By Teek@${version}`,
    },
    copyright: {
      createYear: 2025,
      suffix: "Teek",
    },
  },
  codeBlock: {
    copiedDone: TkMessage => TkMessage.success("复制成功！"),
  },
  post: {
    showCapture: true,
    captureRender: true,
  },
  articleShare: { enabled: true },
  vitePlugins: {
    sidebarOption: {
      initItems: false,
    },
  },
  markdown: {
    demo: {
      githubUrl: "https://github.com/Kele-Bingtang/vitepress-theme-teek/blob/master/docs",
    },
  },
  siteAnalytics: [
    {
      provider: "baidu",
      options: {
        id: "d5ee872d9aa1ef8021f4a3921b2e9c2a",
      },
    },
    {
      provider: "google",
      options: {
        id: "G-K5GNDW3L7K",
      },
    },
  ],
});

// https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: teekConfig,
  title: "vitepress-theme-teek",
  description: description,
  cleanUrls: true,
  lastUpdated: true,
  lang: "zh-CN",
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/teek-logo-mini.svg" }],
    ["link", { rel: "icon", type: "image/png", href: "/teek-logo-mini.png" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "zh-CN" }],
    ["meta", { property: "og:title", content: "Teek | VitePress Theme" }],
    ["meta", { property: "og:site_name", content: "Teek" }],
    ["meta", { property: "og:image", content: "" }],
    ["meta", { property: "og:url", content: "" }],
    ["meta", { name: "author", content: "Teek" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
      },
    ],
    [
      "meta",
      {
        name: "description",
        description,
      },
    ],
    ["meta", { name: "keywords", description }],
    ["meta", { name: "baidu-site-verification", content: "codeva-GdK2q9MO1i" }], // 百度收录
    ["meta", { name: "msvalidate.01", content: "48CABE70F538B8D117567176ABF325AF" }], // Bing 收录验证
    ["link", { rel: "stylesheet", href: "//at.alicdn.com/t/font_2989306_w303erbip9.css" }], // 阿里在线矢量库
    ["script", { charset: "UTF-8", id: "LA_COLLECT", src: "//sdk.51.la/js-sdk-pro.min.js" }], // 51.la
    [
      "script",
      {},
      `typeof LA !== 'undefined' && LA.init({ id: "3LqfP8Icg0GeEvtn", ck: "3LqfP8Icg0GeEvtn", hashMode: true })`,
    ], // 51.la
  ],
  markdown: {
    // 开启行号
    lineNumbers: true,
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true,
    },
    // 更改容器默认值标题
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
  sitemap: {
    hostname: "https://vp.teek.top",
    transformItems: items => {
      const permalinkItemBak: typeof items = [];
      // 使用永久链接生成 sitemap
      const permalinks = (globalThis as any).VITEPRESS_CONFIG.site.themeConfig.permalinks;
      items.forEach(item => {
        const permalink = permalinks?.map[item.url];
        if (permalink) permalinkItemBak.push({ url: permalink, lastmod: item.lastmod });
      });
      return [...items, ...permalinkItemBak];
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/teek-logo-mini.svg",
    darkModeSwitchLabel: "主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    lastUpdatedText: "上次更新时间",
    outline: {
      level: [2, 4],
      label: "本页导航",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/intro", activeMatch: "/01.指南/" },
      { text: "配置", link: "/reference/config", activeMatch: "/10.配置/" },
      { text: "开发", link: "/develop/intro", activeMatch: "/15.主题开发/" },
      { text: "常见问题", link: "/theme/qa", activeMatch: "/20.常见问题/" },
      { text: "案例", link: "/case" },
      {
        text: "生态",
        items: [
          { text: "Components", link: "/ecosystem/components" },
          { text: "Helper", link: "/ecosystem/helper" },
          { text: "Hooks", link: "/ecosystem/hooks" },
          { text: "Markdown 插件工具", link: "/ecosystem/md-plugin-utils" },
        ],
      },
      {
        text: version,
        items: [
          { text: "历史版本", link: "https://github.com/Kele-Bingtang/vitepress-theme-teek/releases" },
          { text: "更新日志", link: "https://github.com/Kele-Bingtang/vitepress-theme-teek/blob/dev/CHANGELOG.md" },
        ],
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/Kele-Bingtang/vitepress-theme-teek" }],

    search: {
      provider: "local",
    },
    editLink: {
      text: "在 GitHub 上编辑此页",
      pattern: "https://github.com/Kele-Bingtang/vitepress-theme-teek/edit/master/docs/:path",
    },
  },
});
