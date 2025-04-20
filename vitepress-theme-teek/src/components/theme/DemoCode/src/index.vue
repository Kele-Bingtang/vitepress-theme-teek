<script setup lang="ts" name="DemoCode">
import type { DemoCodeProps } from "./demoCode";
import { ref, computed, unref, defineAsyncComponent } from "vue";
import { useData } from "vitepress";
import { useNamespace, useLocale, useClipboard } from "@teek/hooks";
import { playgroundIcon, githubIcon, copyIcon, codeIcon, caretTopIcon } from "@teek/assets";
import { TkMessage } from "@teek/components/common/Message";
import { TkTransitionCollapse } from "@teek/components/common/TransitionCollapse";
import { TkIcon } from "@teek/components/common/Icon";

defineOptions({ name: "DemoCode" });

const props = defineProps<DemoCodeProps>();

const ns = useNamespace("demo-code");
const { t } = useLocale();
const { copy, copied, isSupported } = useClipboard();
const { frontmatter, isDark } = useData();

const {
  playgroundUrl = "",
  playgroundMainFileName = "App.vue",
  githubUrl = "",
  playgroundButtonTip = t("tk.demoCode.playground"),
  githubButtonTip = t("tk.demoCode.github"),
  copyButtonTip = t("tk.demoCode.copy"),
  collapseSourceButtonTip = t("tk.demoCode.collapseSource"),
  expandSourceButtonTip = t("tk.demoCode.expandSource"),
} = { ...JSON.parse(decodeURIComponent(props.demo)), ...unref(frontmatter).demo };

const decodeSource = computed(() => decodeURIComponent(props.source));
const decodeRawSource = computed(() => decodeURIComponent(props.rawSource));
const decodedDescription = computed(() => decodeURIComponent(props.description));

// 预加载 Demo 组件，防止 VitePress 打包时不包含 Demo 组件
const moduleFiles = (import.meta as any).glob("/examples/**/*.vue", { eager: true });

const DemoComponent = defineAsyncComponent(async () => {
  try {
    const key = Object.keys(moduleFiles).find(i => i.endsWith(`/${props.path}`)) as string;
    return moduleFiles[key];
  } catch (error) {
    console.error(`[Teek Error] Failed to load component: '/${props.path}'`, error);
  }
});

const sourceVisible = ref(false);

/**
 * 切换源代码显示状态
 */
const handleToggleSourceVisible = (bol?: boolean) => {
  if (bol !== undefined) sourceVisible.value = bol;
  else sourceVisible.value = !sourceVisible.value;
};

/**
 * 去 Playground 编辑
 */
const handleEditPlayground = () => {
  const encoded = getPlaygroundEncoded(props.source);
  const darkParam = unref(isDark) ? "?theme=dark" : "";
  const link = playgroundUrl.includes("?")
    ? `${playgroundUrl}${darkParam.replace("?", "&")}`
    : `${playgroundUrl}${darkParam}`;

  const url = `${link.replace(/\/$/, "")}/#${encoded}`;
  window.open(url, "_blank");
};

const getPlaygroundEncoded = (source: string) => {
  const code = decodeURIComponent(source);
  const originCode = {
    [playgroundMainFileName]: code,
  };
  const encoded = btoa(JSON.stringify(originCode));
  return encoded;
};

/**
 * 去 Github 编辑
 */
const handleEditGithub = () => {
  const url = `${githubUrl}/${props.path}`;
  window.open(url, "_blank");
};

/**
 * 复制源代码
 */
const copyCode = async () => {
  if (!isSupported) console.error(t("tk.demoCode.notSupport"));

  await copy(unref(decodeRawSource));

  unref(copied)
    ? TkMessage.success({
        message: t("tk.demoCode.copySuccess"),
        plain: true,
      })
    : TkMessage.error({
        message: t("tk.demoCode.copyFail"),
        plain: true,
      });
};
</script>

<template>
  <div :class="ns.b('description')" v-html="decodedDescription" />

  <div :class="ns.b()">
    <div :class="ns.e('effect')">
      <component :is="DemoComponent" />
    </div>

    <div :class="ns.e('button-group')">
      <slot name="teek-demo-code-button-left" />

      <TkIcon
        v-if="playgroundUrl"
        :title="playgroundButtonTip"
        @click="handleEditPlayground"
        :icon="playgroundIcon"
        role="link"
        :aria-label="playgroundButtonTip"
      />
      <TkIcon
        v-if="githubUrl"
        :title="githubButtonTip"
        @click="handleEditGithub"
        :icon="githubIcon"
        role="link"
        :aria-label="githubUrl"
      />
      <TkIcon :title="copyButtonTip" :icon="copyIcon" @click="copyCode" role="button" :aria-label="copyButtonTip" />
      <TkIcon
        :title="sourceVisible ? expandSourceButtonTip : collapseSourceButtonTip"
        @click="handleToggleSourceVisible()"
        :icon="codeIcon"
        role="button"
        :aria-label="sourceVisible ? expandSourceButtonTip : collapseSourceButtonTip"
      />

      <slot name="teek-demo-code-button-right" />
    </div>

    <TkTransitionCollapse>
      <div v-show="sourceVisible" :class="ns.joinNamespace('vp-code')" v-html="decodeSource" />
    </TkTransitionCollapse>

    <Transition :name="ns.joinNamespace('fade-linear')">
      <div
        v-show="sourceVisible"
        :class="ns.e('float-control')"
        @click="handleToggleSourceVisible(false)"
        role="button"
      >
        <TkIcon :icon="caretTopIcon" />
        <span>{{ expandSourceButtonTip }}</span>
      </div>
    </Transition>
  </div>
</template>
