<script setup lang="ts" name="CommentWaline">
import type { CommentProvider } from "@teek/config";
import type { WalineInstance } from "./waline";
import { inject, onMounted } from "vue";
import { useNamespace, useVpRouter } from "@teek/hooks";
import { useTeekConfig } from "@teek/configProvider";
import { walineSymbol } from "./waline";

defineOptions({ name: "CommentWaline" });

const ns = useNamespace("");
const vpRouter = useVpRouter();

const { getTeekConfig } = useTeekConfig();
const walineOptions = getTeekConfig<CommentProvider["waline"]>("comment", {}).options;

const { serverURL, jsLink, cssLink, dark = "html[class='dark']", cssIntegrity, ...options } = walineOptions;

let waline: WalineInstance | null = null;
const walineId = "waline";

const initWalineByInject = () => {
  // 尝试从上下文获取 waline 实例
  const getWalineInstance = inject(walineSymbol, () => null);
  if (getWalineInstance) waline = getWalineInstance?.(walineOptions, `#${walineId}`);

  return waline;
};

const initWalineByJs = async () => {
  if (!jsLink) return;

  // 异步加载 js 文件
  const { init } = await import(/* @vite-ignore */ jsLink);
  waline = init({ dark, ...options, serverURL, el: `#${walineId}` });
};

/**
 * 默认点击个人头像会滚动到页面顶部，因为个人头像由 a 标签包裹，且 href="#"，所以删除 href 属性
 */
const preventJump = () => {
  const loginNickLink = document.querySelector<HTMLAnchorElement>(".wl-login-nick");
  loginNickLink && loginNickLink.removeAttribute("href");
};

onMounted(async () => {
  // 尝试从上下文初始化 waline 实例，如果初始化失败，则尝试通过在线 JS 文件初始化 waline 实例
  if (!initWalineByInject() && serverURL && jsLink) {
    await initWalineByJs();
    preventJump();

    // 路由切换后更新评论内容
    return vpRouter.bindAfterRouteChange(ns.joinNamespace("waline"), () => waline?.update());
  }

  console.error(
    "[Teek Error] Waline initialization failed. Please configure the 'jsLink' and 'serverURL' or provide the waline instance"
  );
});
</script>

<template>
  <div class="waline-container">
    <link v-if="cssLink" rel="stylesheet" :href="cssLink" :integrity="cssIntegrity" crossorigin="anonymous" />
    <div :id="walineId" />
  </div>
</template>
