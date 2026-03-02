// 本地 Teek 主题包引用（与 Teek 在线主题包引用 二选一）
import { defineTeekConfig } from "../../packages/config";
import { version } from "../../packages/teek/version";

// Teek 在线主题包引用（需安装 Teek 在线版本）
// import { defineTeekConfig } from "vitepress-theme-teek/config";
// import { version } from "vitepress-theme-teek/es/version";

export const teekConfig = defineTeekConfig({
  sidebarTrigger: true,
  author: { name: "Teeker", link: "https://github.com/Kele-Bingtang" },
  blogger: {
    name: "天客",
    slogan: "朝圣的使徒，正在走向编程的至高殿堂！",
    avatar: "https://testingcf.jsdelivr.net/gh/Kele-Bingtang/static/user/avatar1.png",
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
  // 🔗 私密文章功能配置
  // 注释以下配置代码则关闭功能
  private: {
    enabled: true, // ◀️ 启用私密文章功能
    expire: "1d", // ◀️ 登录过期时间，1d 代表 1 天，1h 代表 1 小时
    session: false, // ◀️ 关闭网页后是否清除登录状态，true 表示关闭后清除，false 表示保持登录状态
    siteLogin: false, // ◀️ 是否开启站点级别登录，true 表示进入站点需要登录，false 表示不需要
    // 全局页面级别登录信息 - 登录一次后可访问所有全局私密文章
    // 每个对象表示一个账号，username 为账号名，password 为密码
    pages: [{ username: "teek", password: "teek123" }],
    // 领域页面级别登录信息 - 按领域分组
    // 每个领域（如 test、guide）对应一个数组，数组中每个对象表示一个账号，username 为账号名，password 为密码
    realm: {
      test: [{ username: "test", password: "test123" }],
      guide: [{ username: "guide", password: "guide123" }],
    },
  },
});
