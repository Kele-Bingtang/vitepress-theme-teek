import type { LoginInfo, Private } from "@teek/config";
import { watch } from "vue";
import { useData, useRouter } from "vitepress";
import { isClient } from "@teek/helper";
import { useTeekConfig, usePagePath } from "@teek/components/theme/ConfigProvider";
import { defaultPrivateConfig, getLoginStorageKey, loginUrlKeyMap, verifyModeMap } from "./login";

/**
 * 监听文章是否需要登录
 */
export const useWatchLogin = () => {
  const router = useRouter();
  const { frontmatter } = useData();
  const { loginPath } = usePagePath();
  const { siteLoginKey, pagesLoginKey, pageLoginKey, realmLoginKey } = getLoginStorageKey();
  const { getTeekConfigRef } = useTeekConfig();

  const privateConfig = getTeekConfigRef<Required<Private>>("private", defaultPrivateConfig);

  /**
   * 从浏览器 storage 获取登录信息
   */
  const getLoginInfo = (key: string) => {
    const infoStr = localStorage.getItem(key) || sessionStorage.getItem(key);
    return infoStr ? JSON.parse(infoStr) : null;
  };

  /**
   * 验证用户凭证
   */
  const isValidCredential = (credentialList: LoginInfo[], loginInfo: LoginInfo) => {
    const decrypt = privateConfig.value.decrypt;
    return credentialList.some(
      item =>
        item.username === loginInfo.username &&
        item.password === (decrypt ? decrypt(loginInfo.password, frontmatter) : loginInfo.password)
    );
  };

  /**
   * 检查登录信息是否过期
   */
  const isLoginExpired = (loginInfo: any, key: string) => {
    const { expire, loginTime, strategy } = loginInfo;
    // 如果登录策略是每次访问都要登录，则清除登录信息
    if (strategy === "always") {
      sessionStorage.removeItem(key);
      localStorage.removeItem(key);
    }
    return expire && loginTime && new Date().getTime() - loginTime > expire;
  };

  /**
   * 判断是否已经登录
   */
  const isLogin = (loginKey: string, credentialList: LoginInfo[], type: "site" | "pages" | "realm" | "page") => {
    const nativeValidate = () => {
      const loginInfo = getLoginInfo(loginKey);
      return !!(loginInfo && isValidCredential(credentialList, loginInfo) && !isLoginExpired(loginInfo, loginKey));
    };

    return privateConfig.value.doValidate
      ? privateConfig.value.doValidate(type, frontmatter.value, nativeValidate)
      : nativeValidate();
  };

  /**
   * 监听站点级别是否已登录认证
   */
  const watchSite = () => {
    if (!isClient) return;
    if (!privateConfig.value.enabled) return;
    if (!privateConfig.value.siteLogin || !loginPath.value || router.route.data.frontmatter.loginPage) return;

    const { verifyMode, toPath } = loginUrlKeyMap;
    const goLogin = `${loginPath.value}?${verifyMode}=${verifyModeMap.site}&${toPath}=${window.location.href}`;

    if (!isLogin(siteLoginKey, privateConfig.value.site || [], "site")) router.go(goLogin);
  };

  /**
   * 监听页面级别是否已登录认证
   *
   * 有 3 个页面级别认证：
   * 1、单页面级别：先校验单页面的登录信息，如果失败，则校验领域页面级别登录信息，如果失败，则跳转登录页面
   * 2、领域页面级别：一个领域就是一个登录信息组，支持多个文章在一个组里认证
   * 3、全局页面级别：一旦在任意文章登录过，则可以访问【非单页面级别、非领域页面级别】的其他任意文章
   */
  const watchPages = () => {
    if (!isClient) return;
    if (!privateConfig.value.enabled) return;

    watch(
      router.route,
      newVal => {
        if (!privateConfig.value.enabled) return;
        if (!frontmatter.value.private || !loginPath.value || newVal.data.frontmatter.loginPage) return;

        // 如果站点级别登录信息是 admin 角色，则无需继续验证，统统放行 ~
        if (isLogin(siteLoginKey, privateConfig.value.site || [], "site")) {
          const siteLoginInfo = getLoginInfo(siteLoginKey);
          if (siteLoginInfo.role === "admin") return;
        }

        const { verifyMode, toPath, realm: realmKey } = loginUrlKeyMap;
        // 跳转登录页面链接模板，实际需要替换 {verifyMode} 或补充其他参数
        const goLogin = `${loginPath.value}?${verifyMode}={verifyMode}&${toPath}=${newVal.path}`;
        const realm = frontmatter.value.privateRealm;

        const page = [
          ...(frontmatter.value.loginInfo || []),
          { username: frontmatter.value.username, password: frontmatter.value.password },
        ].filter(item => ![undefined, ""].includes(item.username) && ![undefined, ""].includes(item.password));

        // 单页面级别认证，如果登录信息失败，则继续往下校验 realm，如果还是失败，则跳转登录页面
        if (page.length) {
          const path = "/" + newVal.data.filePath.replace(".md", "");
          const key = pageLoginKey + path;
          if (isLogin(key, page, "page") || isLogin(`${key}.html`, page, "page")) return;
        }

        // 领域页面级别认证
        if (realm) {
          const goRealm = goLogin.replace("{verifyMode}", verifyModeMap.realm) + `&${realmKey}=${realm}`;

          if (!isLogin(realmLoginKey + realm, privateConfig.value.realm[realm] || [], "realm")) router.go(goRealm);
          return;
        }

        if (page.length) {
          // 来到此处，代表单页面级别认证和领域页面级别认证失败，则跳转到登录页
          const goPage = goLogin.replace("{verifyMode}", verifyModeMap.page);
          return router.go(goPage);
        }

        // 全局页面级别认证
        const goPages = goLogin.replace("{verifyMode}", verifyModeMap.pages);
        const pages = privateConfig.value.pages || [];
        if (!(isLogin(pagesLoginKey, pages, "pages") || isLogin(`${pagesLoginKey}.html`, pages, "pages"))) {
          router.go(goPages);
        }
      },
      { immediate: true }
    );
  };

  return { watchSite, watchPages };
};
