<script setup lang="ts" name="LoginPage">
import type { LoginInfo, Private } from "@teek/config";
import type { LoginForm, LoginFormItem } from "./login";
import { markRaw, reactive, ref } from "vue";
import { useData, useRouter, withBase } from "vitepress";
import { isClient } from "@teek/helper";
import { useNamespace, useLocale } from "@teek/composables";
import { userIcon, lockIcon, successFilledIcon, refreshRightIcon, warningFilledIcon } from "@teek/static";
import { useTeekConfig, usePosts } from "@teek/components/theme/ConfigProvider";
import { TkIcon } from "@teek/components/common/Icon";
import { TkMessage } from "@teek/components/common/Message";
import { TkVerifyCode } from "@teek/components/common/VerifyCode";
import { getLoginStorageKey, verifyModeMap, loginUrlKeyMap, defaultPrivateConfig } from "./login";

defineOptions({ name: "LoginPage" });

const ns = useNamespace("login");
const router = useRouter();
const { frontmatter } = useData();
const posts = usePosts();
const { t } = useLocale();
const { getTeekConfigRef } = useTeekConfig();
const privateConfig = getTeekConfigRef<Private>("private", defaultPrivateConfig);

const { siteLoginKey, pagesLoginKey, pageLoginKey, realmLoginKey } = getLoginStorageKey();

const imgCode = ref("");

const loginForm = reactive<LoginForm>({
  username: {
    model: "",
    focusModel: false,
    errorModel: false,
    icon: userIcon,
    placeholder: t("tk.login.usernamePlaceholder"),
    type: "text",
  },
  password: {
    model: "",
    focusModel: false,
    errorModel: false,
    icon: lockIcon,
    placeholder: t("tk.login.passwordPlaceholder"),
    type: "password",
  },
  verifyCode: {
    model: "",
    focusModel: false,
    errorModel: false,
    icon: warningFilledIcon,
    placeholder: t("tk.login.verifyCodePlaceholder"),
    type: "text",
    append: markRaw(TkVerifyCode),
    appendModel: imgCode,
  },
});

/**
 * 校验登录表单
 */
const checkLoginForm = () => {
  if (loginForm.verifyCode.model === "") {
    loginForm.verifyCode.errorModel = true;
    TkMessage.warning({ message: t("tk.login.verifyCodeNonNull"), plain: true });
    return false;
  }

  if (loginForm.verifyCode.model !== imgCode.value) {
    loginForm.verifyCode.errorModel = true;
    TkMessage.error({ message: t("tk.login.verifyCodeError"), plain: true });
    return false;
  }

  if (loginForm.username.model === "" || loginForm.password.model === "") {
    loginForm.username.errorModel = true;
    TkMessage.warning({ message: t("tk.login.loginInfoNonNull"), plain: true });
    return false;
  }
  if (loginForm.password.model === "") {
    loginForm.password.errorModel = true;
    TkMessage.warning({ message: t("tk.login.loginInfoNonNull"), plain: true });
    return false;
  }
  return true;
};

/**
 * 获取过期时间，单位毫秒
 */
const getExpire = (expire?: string) => {
  // 默认 1 天
  if (!expire) return 86400000;

  if (expire.indexOf("d") !== -1) return parseInt(expire.replace("d", "")) * 24 * 60 * 60 * 1000; // 天
  if (expire.indexOf("h") !== -1) return parseInt(expire.replace("h", "")) * 60 * 60 * 1000; // 小时
  // 不加单位则为秒
  return parseInt(expire) * 1000;
};

/**
 * 重置表单
 */
const resetForm = () => {
  Object.values(loginForm).forEach(form => {
    form.model = "";
    form.focusModel = false;
  });
};

/**
 * 获取当前级别的登录逻辑处理器
 */
const getLoginHandler = () => {
  // 获取地址栏参数
  const { searchParams } = new URL(window.location.href);
  const verifyModeValue = searchParams.get(loginUrlKeyMap.verifyMode);
  const toPath = searchParams.get(loginUrlKeyMap.toPath);
  const realmValue = searchParams.get(loginUrlKeyMap.realm);
  const { site = [], pages = [], realm = {} } = privateConfig.value;

  return [
    {
      // 单页面级别登录
      condition: () => verifyModeValue === verifyModeMap.page && toPath,
      handle: () => execLogin([], pageLoginKey, { toPath: toPath! }),
    },
    {
      // 单页面级别登录
      condition: () => verifyModeValue === verifyModeMap.realm && realmValue,
      handle: () => execLogin(realm[realmValue!] || [], realmLoginKey, { isRealm: true, realm: realmValue! }),
    },
    {
      // 全局页面级别登录
      condition: () => verifyModeValue === verifyModeMap.pages,
      handle: () => execLogin(pages, pagesLoginKey),
    },
    {
      // 站点级别登录
      condition: () => verifyModeValue === verifyModeMap.site,
      handle: () => execLogin(site, siteLoginKey, { isSite: true }),
    },
  ].find(item => item.condition());
};

/**
 * 执行登录操作
 */
const login = () => {
  if (!isClient) return;

  const { enabled = false } = privateConfig.value;
  // 如果登录功能成功，则默认登录成功，且直接跳转首页
  if (!enabled) {
    TkMessage.success({ message: t("tk.login.loginSuccess"), plain: true });
    return router.go("/");
  }

  if (!checkLoginForm()) return;

  // 获取地址栏参数
  const { searchParams } = new URL(window.location.href);
  const toPath = searchParams.get(loginUrlKeyMap.toPath);

  let isLogin: boolean | undefined = false;

  const handler = getLoginHandler();

  if (handler) {
    const { doLogin } = privateConfig.value;
    const loginInfo = { username: loginForm.username.model, password: loginForm.password.model };
    const nativeLogin = handler.handle;

    isLogin = doLogin ? doLogin(loginInfo, "page", nativeLogin) : nativeLogin();
  }

  if (isLogin === undefined) return;

  if (isLogin) {
    TkMessage.success({ message: t("tk.login.loginSuccess"), plain: true });

    if (toPath) router.go(toPath);
  } else TkMessage.error({ message: t("tk.login.loginError"), plain: true });
};

/**
 * 执行登录逻辑
 */
const execLogin = (
  loginInfo: (LoginInfo & { role?: string })[],
  storageKey: string,
  options: { isRealm?: boolean; realm?: string; isSite?: boolean; toPath?: string } = {}
) => {
  const { toPath } = options;

  // 此处为单页面级别的登录认证
  if (toPath) return execSinglePageLogin(toPath, storageKey);
  // 此处为领域页面级别、全局页面级别的登录认证
  const credential = loginInfo.find(
    item => item.username === loginForm.username.model && item.password === loginForm.password.model
  );

  if (!credential) return false;

  return storeLoginInfo(credential, storageKey, options);
};

/**
 * 指定单页面登录逻辑
 */
const execSinglePageLogin = (toPath: string, storageKey: string) => {
  // 处理 toPath 可能是完整 URL 的情况，提取 pathname
  const normalizePath = (path: string) => {
    try {
      // 如果是完整 URL，提取 pathname
      if (path.startsWith("http")) {
        return new URL(path).pathname;
      }
    } catch (e) {
      // 忽略解析错误，返回原始路径
    }
    return path;
  };

  const normalizedToPath = normalizePath(toPath);

  const post = posts.value.originPosts.find(post => {
    const permalink = post.frontmatter.permalink;
    const url = post.url;
    // 支持匹配完整 URL 或 pathname
    return [permalink, url].some(p => p && (p === toPath || p === normalizedToPath));
  });
  if (!post) return false;

  const { username, password, session, expire, strategy, realm } = post.frontmatter || {};
  const loginInfoList = [
    ...(post.frontmatter.loginInfo || []),
    { username, password, session, expire, strategy, realm },
  ].filter(item => ![undefined, ""].includes(item.username) && ![undefined, ""].includes(item.password));

  const loginInfo = loginInfoList.find(
    item => item.username === loginForm.username.model && item.password === loginForm.password.model
  );

  if (loginInfo) {
    return storeLoginInfo({ ...loginInfo, realm: undefined }, storageKey + post.url);
  }

  if (realm && privateConfig.value.realm) {
    const nativeLogin = () => execLogin(privateConfig.value.realm![realm], realmLoginKey, { isRealm: true, realm });
    return privateConfig.value.doLogin
      ? privateConfig.value.doLogin({ username, password }, "realm", nativeLogin)
      : nativeLogin();
  }
  return false;
};

/**
 * 缓存登录信息
 */
const storeLoginInfo = (
  loginInfo: LoginInfo & { role?: string },
  storageKey: string,
  options: { isRealm?: boolean; realm?: string; isSite?: boolean } = {}
): boolean => {
  const { session, expire, strategy = "once", role = "common" } = loginInfo;
  const { isSite = false, isRealm = false, realm } = options;

  const storage = session || privateConfig.value.session ? sessionStorage : localStorage;
  const key = isRealm ? `${storageKey}${realm}` : storageKey;
  const encrypt = privateConfig.value.encrypt;

  // 将登录信息存储到 sessionStorage 或 localStorage 中
  try {
    storage.setItem(
      key,
      JSON.stringify({
        username: loginForm.username.model,
        password: encrypt ? encrypt(loginForm.password.model, frontmatter) : loginForm.password.model,
        loginTime: new Date().getTime(),
        expire:
          strategy === "always" ? new Date().getTime() + 30 * 1000 : getExpire(expire || privateConfig.value.expire),
        strategy: strategy || "once",
        ...(isSite && { role }), // 站点级别登录信息需要存储角色，如果为 admin，代表后续有所有的文章页面权限
      })
    );
    return true;
  } catch (error) {
    console.error("[Teek Error] Failed to store credentials:", error);
    return false;
  }
};

const handleFocus = (item: LoginFormItem, formName: "username" | "password" | "verifyCode") => {
  item.focusModel = true;
  item.errorModel = false;
  privateConfig.value.onFocus?.(item.model, formName);
};

const handleBlur = (item: LoginFormItem, formName: "username" | "password" | "verifyCode") => {
  item.focusModel = false;
  if (item.model === "") item.errorModel = true;
  privateConfig.value.onBlur?.(item.model, formName);
};
</script>

<template>
  <div :class="ns.b()" :aria-label="t('tk.login.label')">
    <div :class="ns.e('wrapper')">
      <div v-if="frontmatter.leftImg" :class="ns.e('left')">
        <img :src="withBase(frontmatter.leftImg)" alt="login" />
      </div>

      <div :class="ns.e('right')">
        <div :class="[ns.e('right__header'), 'flx-center']">
          <img v-if="frontmatter.logo" :src="frontmatter.logo" alt="logo" />
          <span class="title">{{ frontmatter.name ?? "VitePress Theme Teek" }}</span>
        </div>

        <form class="flx-space-y-20 login-form">
          <div v-for="(item, key) in loginForm" :key class="flx login-form-item">
            <div :class="[ns.e('right__form'), ns.is('focus', item.focusModel), ns.is('error', item.errorModel)]">
              <TkIcon :icon="item.icon" />
              <label :for="'input-' + key" class="sr-only">{{ item.placeholder }}</label>
              <input
                v-model="item.model"
                :type="item.type"
                :class="ns.em('right__form', 'control')"
                :placeholder="item.placeholder"
                @focus="handleFocus(item, key)"
                @blur="handleBlur(item, key)"
                @keydown.enter="login"
              />
            </div>
            <component v-if="item.append" :is="item.append" v-model="item.appendModel" />
          </div>

          <div :class="ns.e('right__form__btn')">
            <button type="button" @click="resetForm()" class="flx-center" :aria-label="t('tk.login.reset')">
              <TkIcon :icon="refreshRightIcon" />
              <span>{{ t("tk.login.reset") }}</span>
            </button>
            <button type="button" @click="login()" class="flx-center primary" :aria-label="t('tk.login.login')">
              <TkIcon :icon="successFilledIcon" />
              <span>{{ t("tk.login.login") }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
