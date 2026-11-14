// 本地 Teek 主题包引用（与 Teek 在线主题包引用 二选一）
import { defineTeekConfig } from "../../packages/config";
import { version } from "../../packages/teek/version";

// Teek 在线主题包引用（需安装 Teek 在线版本）
// import { defineTeekConfig } from "vitepress-theme-teek/config";
// import { version } from "vitepress-theme-teek/es/version";

export const teekConfig = defineTeekConfig({
  teekHome: false,
  vpHome: true,
  loading: false,
  sidebarTrigger: true,
  author: { name: "Teeker", link: "https://github.com/teekhub" },
  blogger: {
    name: "天客",
    slogan: "朝圣的使徒，正在走向编程的至高殿堂！",
    avatar: "https://testingcf.jsdelivr.net/gh/teekhub/static/user/avatar1.png",
    shape: "circle-rotate",
    circleBgImg: "/blog/bg4.webp",
    color: "#ffffff",
    circleSize: 120,
    status: {
      icon: "😪",
      size: 28,
      title: "困",
    },
  },
  articleAnalyze: {
    dateFormat: "yyyy-MM-dd hh:mm:ss",
  },
  banner: {
    name: "🎉 Teek Blog",
    bgStyle: "fullImg",
    imgSrc: ["/blog/bg1.webp", "/blog/bg2.webp", "/blog/bg3.webp"],
    description: [
      "故事由我书写，旅程由你见证，传奇由她聆听 —— 来自 Young Kbt",
      "积跬步以至千里，致敬每个爱学习的你 —— 来自 Evan Xu",
      "这一生波澜壮阔或是不惊都没问题 —— 来自 Weibw",
    ],
    descStyle: "types",
  },
  wallpaper: {
    enabled: true,
    hideBanner: true,
  },
  docAnalysis: {
    createTime: "2025-03-23",
    statistics: {
      provider: "busuanzi",
    },
  },
  codeBlock: {
    copiedDone: TkMessage => TkMessage.success("复制成功！"),
  },
  post: {
    showCapture: true,
  },
  articleBanner: {
    enabled: true,
  },
  articleShare: { enabled: true },
  vitePlugins: {
    sidebarOption: {
      initItems: false,
      ignoreIndexMd: true,
    },
  },
  footerInfo: {
    theme: {
      name: `Theme By Teek@${version}`,
    },
    copyright: {
      createYear: 2025,
      suffix: "Teek",
    },
    customHtml: `<span id="runtime"></span>`, // 需要搭配 .vitepress/theme/helper/useRuntime.ts 使用
    topMessage: [
      `<span><img alt="VitePress" src="https://liuyuyang.net/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fanimals.65eaf6e3.webp&w=750&q=75" style="width: 750px; height: 80px"><span/>`,

      `<a title="Github release" target="_blank" href="https://github.com/teekhub/vitepress-theme-teek/releases" style="margin-right: 10px;">
        <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/teekhub/vitepress-theme-teek?logo=github">
      </a>

      <a title="Npm Version" target="_blank" href="https://www.npmjs.com/package/vitepress-theme-teek" style="margin-right: 10px;">
        <img src="https://img.shields.io/npm/v/vitepress-theme-teek?logo=npm&color=%09%23bf00ff" alt="https://img.shields.io/npm/v/vitepress-theme-teek?color=%09%23bf00ff">
      </a>

      <img src="https://img.shields.io/badge/v18.x-x?logo=node.js&label=node" alt="node version" style="margin-right: 10px; margin-bottom: 10px;">
      <img src="https://img.shields.io/github/languages/code-size/teekhub/vitepress-theme-teek?logo=Visual Studio Code&logoColor=blue" alt="GitHub code size in bytes" style="margin-right: 10px; margin-bottom: 10px;">

      <a title="GitHub Discussions" target="_blank" href="https://github.com/teekhub/vitepress-theme-teek/discussions" style="margin-right: 10px;">
        <img src="https://img.shields.io/github/discussions/teekhub/vitepress-theme-teek?color=9cf&logo=github" alt="GitHub Discussions">
      </a>

      <a title="MIT License" target="_blank" href="https://github.com/teekhub/vitepress-theme-teek/blob/master/LICENSE" style="margin-right: 10px;">
        <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="MIT License">
      </a>`,
    ],
  },
  backTop: {
    enabled: true, // 是否启动回到顶部功能
    content: "progress", // 回到顶部按钮的显示内容，可选配置 progress | icon
    done: TkMessage => TkMessage.success("返回顶部成功"), // 回到顶部后的回调
  },
  footerGroup: [
    {
      title: "外部链接",
      links: [
        { name: "示例 1", link: "https://vp.teek.top" },
        { name: "示例 2", link: "https://vp.teek.top" },
        { name: "示例 3", link: "https://vp.teek.top" },
      ],
    },
    {
      title: "内部链接",
      links: [
        { name: "快速开始", link: "/guide/quickstart" },
        { name: "配置简介", link: "/reference/config" },
      ],
    },
  ],
  friendLink: {
    list: [
      {
        name: "Teeker",
        desc: "朝圣的使徒，正在走向编程的至高殿堂！",
        avatar: "https://testingcf.jsdelivr.net/gh/teekhub/static/user/avatar2.png",
        link: "http://notes.teek.top/",
      },
      {
        name: "vuepress-theme-vdoing",
        desc: "🚀一款简洁高效的VuePress 知识管理&博客 主题",
        avatar: "https://doc.xugaoyi.com/img/logo.png",
        link: "https://doc.xugaoyi.com/",
      },
      {
        name: "One",
        desc: "明心静性，爱自己",
        avatar: "https://onedayxyy.cn/img/xyy.webp",
        link: "https://onedayxyy.cn/",
      },
      {
        name: "Hyde Blog",
        desc: "人心中的成见是一座大山",
        avatar: "https://teek.seasir.top/avatar/avatar.webp",
        link: "https://teek.seasir.top/",
      },
      {
        name: "二丫讲梵",
        desc: "💻学习📝记录🔗分享",
        avatar: "https://wiki.eryajf.net/img/logo.png",
        link: " https://wiki.eryajf.net/",
      },
      {
        name: "粥里有勺糖",
        desc: "简约风的 VitePress 博客主题",
        avatar: "https://theme.sugarat.top/logo.png",
        link: "https://theme.sugarat.top/",
      },
      {
        name: "VitePress 快速上手中文教程",
        desc: "如果你也想搭建它，那跟我一起做吧",
        avatar: "https://avatars.githubusercontent.com/u/90893790?v=4",
        link: "https://vitepress.yiov.top/",
      },
      {
        name: "友人A",
        desc: "おとといは兎をみたの，昨日は鹿，今日はあなた",
        avatar: "http://niubin.site/logo.jpg",
        link: "http://niubin.site/",
      },
    ],
    autoScroll: true,
  },
  social: [
    {
      icon: "icon-github",
      name: "GitHub",
      link: "https://github.com/teekhub",
    },
    {
      icon: "icon-gitee",
      name: "Gitee",
      link: "https://gitee.com/teekhub",
    },
  ],
  themeEnhance: {
    themeColor: {
      append: [
        {
          label: "扩展主题色板",
          tip: "扩展主题色板",
          options: [
            // --- 活力与明亮系 --
            { label: "紫罗兰", value: "violet", color: "#7166f0" }, // 经典优雅，视觉舒适
            { label: "珊瑚粉", value: "coral-pink", color: "#ff6b6b" }, // 温暖活泼，亲和力强
            { label: "天蓝", value: "sky-blue", color: "#00bbf9" }, // 清新开阔，科技感初显
            { label: "蓝绿", value: "blue-green", color: "#00f5d4" }, // 独特醒目，现代感强
            { label: "粉红", value: "pink", color: "#f15bb5" }, // 浪漫柔和，女性化倾向
            { label: "黄绿", value: "yellow-green", color: "#8ac926" }, // 生机盎然，自然清新
            { label: "橙红", value: "orange-red", color: "#ff9e6b" }, // 热情洋溢，活力四射
            // --- 沉稳与专业系 ---
            { label: "石板灰", value: "slate-gray", color: "#708090" }, // 低调内敛，极简主义
            { label: "深海蓝", value: "ocean-blue", color: "#0077be" }, // 沉稳专业，信赖感强
            { label: "科技蓝", value: "tech-blue", color: "#0056b3" }, // 经典商务，理性冷静
            { label: "靛青色", value: "indigo", color: "#4b0082" }, // 深邃神秘，高端大气
            { label: "炭灰色", value: "charcoal", color: "#36454f" }, // 极致暗黑，专注阅读
            // --- 自然与清新系 ---
            { label: "薄荷绿", value: "mint", color: "#3eb489" }, // 清新护眼，缓解疲劳
            { label: "松石绿", value: "turquoise", color: "#40e0d0" }, // 晶莹剔透，清凉夏日
            { label: "橄榄绿", value: "olive-green", color: "#808000" }, // 复古自然，大地气息
            { label: "柠檬黄", value: "lemon", color: "#ffd700" }, // 明亮欢快，警示提醒
            // --- 浪漫与柔和系 ---
            { label: "薰衣草", value: "lavender", color: "#967bb6" }, // 梦幻柔美，宁静安神
            { label: "玫瑰金", value: "rose-gold", color: "#b76e79" }, // 时尚轻奢，精致优雅
            { label: "豆沙红", value: "bean-paste-red", color: "#d27d7d" }, // 温柔知性，低调奢华
            { label: "雾霾蓝", value: "haze-blue", color: "#6699cc" }, // 莫兰迪色系，高级耐看
            // --- 霓虹与赛博系 ---
            { label: "霓虹紫", value: "neon-purple", color: "#bc13fe" }, // 赛博朋克，未来感十足
            { label: "极光绿", value: "aurora-green", color: "#00ff9d" }, // 高亮荧光，极客风格
            // --- 温暖与丰收系 ---
            { label: "日落橙", value: "sunset-orange", color: "#ff7f50" }, // 温暖热烈，黄昏意境
            { label: "琥珀色", value: "amber", color: "#ffbf00" }, // 珍贵通透，古典韵味
          ],
        },
      ],
    },
  },
  markdown: {
    demo: {
      githubUrl: "https://github.com/teekhub/vitepress-theme-teek/blob/master/docs",
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
