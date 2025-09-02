<script setup lang="ts" name="CodeBlockToggle">
import type { CodeBlock } from "@teek/config";
import { nextTick, watch } from "vue";
import { useEventListener, useNamespace } from "@teek/composables";
import { addUnit, isBoolean, isClient } from "@teek/helper";
import { arrowDownIcon } from "@teek/static";
import { TkMessage } from "@teek/components/common/Message";
import { useTeekConfig } from "@teek/components/theme/ConfigProvider";
import { createOverlay } from "./createOverlay";

defineOptions({ name: "CodeBlockToggle" });

const ns = useNamespace();
const { getTeekConfigRef } = useTeekConfig();

const codeBlockConfig = getTeekConfigRef<CodeBlock>("codeBlock", {
  enabled: true,
  collapseHeight: 700,
  copiedDone: undefined,
  overlay: false,
  overlayHeight: 400,
  langTextTransform: "",
});

const documentAttribute = "code-block";
const foldClass = "fold";
const arrowClass = "code-arrow";

watch(
  codeBlockConfig,
  newVal => {
    if (!isClient) return;

    const { enabled = true, langTextTransform } = newVal || {};
    if (!enabled) return document.documentElement.removeAttribute(documentAttribute);

    document.documentElement.setAttribute(documentAttribute, ns.namespace);
    if (langTextTransform) {
      document.documentElement.style.setProperty(ns.cssVarName("code-block-lang-transform"), langTextTransform);
    }
    nextTick(() => initCodeBlock());
  },
  { immediate: true }
);

/**
 * 初始化代码块
 */
const initCodeBlock = () => {
  const modes = document.querySelectorAll(".vp-doc div[class*='language-']") as unknown as HTMLElement[];

  Array.from(modes).forEach(item => {
    const copyDom = item.querySelector<HTMLElement>(`.copy`);

    copyDom?.addEventListener("click", () => {
      codeBlockConfig.value.copiedDone?.(TkMessage);
    });

    // 忽略部分 class：代码块父元素的 class 中包含 details、tk-vp-code 则跳过
    const className = item.parentElement?.className;
    if (className?.includes("details") || className?.includes(ns.join("vp-code"))) return;

    const arrowElement = item.querySelector<HTMLElement>(`.${arrowClass}`);

    // 手动创建箭头元素，然后添加点击事件，最后 append 到代码块元素的最后面
    if (arrowElement) return;

    const newArrowElement = document.createElement("div");
    newArrowElement.setAttribute("aria-hidden", "true");
    newArrowElement.classList.add(arrowClass);
    // 添加箭头图标
    newArrowElement.innerHTML = arrowDownIcon;

    // 如果开启遮罩层，则初始化遮罩层 HTML
    if (codeBlockConfig.value.overlay) {
      const overlay = createOverlay(() => newArrowElement.click());
      item.appendChild(overlay);
    }

    // 给箭头图标添加点击事件
    addClickEvent(newArrowElement, item);
    item.append(newArrowElement);
  });
};

/**
 * 给箭头图标添加点击事件（折叠/展开）
 *
 * @param arrowDom 箭头元素
 * @param codeDom 代码块元素
 */
const addClickEvent = (arrowDom: HTMLElement, codeDom: HTMLElement) => {
  // 获取代码块原来的高度
  const modeHeight = getElementHeight(codeDom);
  // 初始化代码块高度，确保第一次折叠时就有动画
  codeDom.style.height = addUnit(modeHeight);
  // 获取代码块的元素
  const preDom = codeDom.querySelector<HTMLElement>("pre");
  const lineNumbersWrapperDom = codeDom.querySelector<HTMLElement>(".line-numbers-wrapper");
  const codeBlockOverlayDom = codeDom.querySelector<HTMLElement>(".code-block-overlay");

  // 折叠/展开代码块的状态
  const codeBlockState = {
    expand: { height: addUnit(modeHeight), display: "block", overlayDisplay: "none", speed: 80 },
    fold: {
      height: codeBlockConfig.value.overlay
        ? (addUnit(codeBlockConfig.value.overlayHeight) ?? "400px")
        : ns.cssVar("code-block-fold-height"),
      display: codeBlockConfig.value.overlay ? "block" : "none",
      overlayDisplay: "flex",
      speed: 400,
    },
  };

  let timer: ReturnType<typeof setTimeout> | null;

  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  // 箭头点击事件
  const toggle = () => {
    const isFold = arrowDom.classList.contains(foldClass);
    // 如果是折叠状态，则需要展开
    const state = codeBlockState[isFold ? "expand" : "fold"];

    codeDom.style.height = state.height;

    clearTimer();

    if (preDom || lineNumbersWrapperDom) {
      timer = setTimeout(() => {
        if (preDom) preDom.style.display = state.display;
        if (lineNumbersWrapperDom) lineNumbersWrapperDom.style.display = state.display;
        if (codeBlockOverlayDom) codeBlockOverlayDom.style.display = state.overlayDisplay;
        clearTimer();
      }, state.speed);
    }

    arrowDom.classList.toggle(foldClass);
  };

  useEventListener(arrowDom, "click", toggle);

  const collapseHeight = codeBlockConfig.value.collapseHeight;

  if (isBoolean(collapseHeight)) {
    if (collapseHeight) toggle();
    else if (codeBlockOverlayDom) codeBlockOverlayDom.style.display = "none"; // 关闭默认折叠功能，则不显示遮罩层
  } else if (collapseHeight && modeHeight > collapseHeight) toggle();
  else if (codeBlockOverlayDom) codeBlockOverlayDom.style.display = "none"; // 如果不折叠，则默认不显示遮罩层
};

/**
 * 获取元素的高度
 */
const getElementHeight = (item: HTMLElement) => {
  const parentElementClass = item.parentElement?.className || "";
  // blocks 代表是代码组
  if (!parentElementClass.includes("blocks")) return item.offsetHeight;
  if (parentElementClass.includes("blocks") && item.className.includes("active")) return item.offsetHeight;

  // 如果元素 display none ，则 display block 后获取高度再 display none
  item.style.display = "block";
  const height = item.offsetHeight;
  item.style.display = "";
  return height;
};
</script>

<template></template>
