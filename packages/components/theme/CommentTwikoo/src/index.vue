<script setup lang="ts" name="CommentTwikoo">
import type { CommentProvider } from "@teek/config";
import { ref, onMounted, inject } from "vue";
import { isClient } from "@teek/helper";
import { useNamespace, useVpRouter } from "@teek/composables";
import { useTeekConfig } from "@teek/components/theme/ConfigProvider";
import { twikooContext } from "./twikoo";

defineOptions({ name: "CommentTwikoo" });

const ns = useNamespace();
const vpRouter = useVpRouter();

const { getTeekConfig } = useTeekConfig();
const twikooOptions = getTeekConfig<CommentProvider["twikoo"]>("comment", {}).options;

const {
  envId,
  jsLink = "https://cdn.jsdelivr.net/npm/twikoo@{version}/dist/twikoo.nocss.js",
  jsIntegrity,
  cssLink = "https://cdn.jsdelivr.net/npm/twikoo@{version}/dist/twikoo.css",
  version = "1.6.44",
  katex,
  timeout = 700,
  ...options
} = twikooOptions;

const initTwikoo = () => {
  if (!isClient) return console.error("[Teek Error] Not in a client");
  if (!envId) return console.error("[Teek Error] Twikoo initialization failed. Please configure the 'envId'");

  // 尝试从上下文获取 waline 实例
  const getTwikooInstance = inject(twikooContext, () => null);
  const twikooOption = { ...options, envId };

  if (getTwikooInstance) getTwikooInstance("#twikoo", twikooOption);
  else if ((window as any).twikoo) (window as any).twikoo.init({ ...twikooOption, el: "#twikoo" });
};

const twikooJs = ref<HTMLScriptElement | null>(null);

const initJs = () => {
  const t = twikooJs.value;
  if (t) t.onload = initTwikoo;
};

const reloadTwikoo = (to: string) => {
  if (to) setTimeout(initTwikoo, timeout);
};

const initCss = () => {
  fetch(cssLink.replace("{version}", version))
    .then(response => {
      if (!response.ok) throw new Error("[Teek Error] Twikoo Css Link Network response was not ok");
      return response.text();
    })
    .then(data => {
      // 如果已经存在，则不重复添加
      if (document.getElementById("twikoo-css")) return;

      const style = document.createElement("style");
      style.type = "text/css";
      style.id = "twikoo-css";
      // 添加命名空间
      style.textContent = `.${ns.b("twikoo")} {${data}}`;
      document.head.appendChild(style);
    });
};

onMounted(() => {
  initJs();
  // 手动初始化 css 内容并添加命名空间，防止样式全局污染
  initCss();
  // 路由切换后更新评论内容
  twikooJs.value && vpRouter.bindAfterRouteChange(ns.join("twikoo"), href => reloadTwikoo(href));
});
</script>

<template>
  <div :class="ns.b('twikoo')">
    <!-- KaTeX -->
    <template v-if="katex">
      <link rel="stylesheet" :href="katex.cssLink" :integrity="katex.cssIntegrity" crossorigin="anonymous" />
      <component
        :is="'script'"
        defer
        :src="katex.coreJsLink"
        :integrity="katex.coreJsIntegrity"
        crossorigin="anonymous"
      />
      <component
        :is="'script'"
        defer
        :src="katex.renderJsLink"
        :integrity="katex.renderJsIntegrity"
        crossorigin="anonymous"
      />
    </template>

    <div id="twikoo" />

    <component
      :is="'script'"
      :src="jsLink.replace('{version}', version)"
      :integrity="jsIntegrity"
      crossorigin="anonymous"
      ref="twikooJs"
    />
  </div>
</template>
