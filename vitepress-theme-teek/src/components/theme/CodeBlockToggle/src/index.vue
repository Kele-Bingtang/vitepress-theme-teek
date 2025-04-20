<script setup lang="ts" name="CodeBlockToggle">
import { nextTick, unref, watch } from "vue";
import { useRoute, useData } from "vitepress";
import { useNamespace } from "@teek/hooks";
import { arrowDownIcon } from "@teek/assets";

defineOptions({ name: "CodeBlockToggle" });

const ns = useNamespace("");
const { frontmatter } = useData();

const documentAttribute = "code-block";
const foldClass = "fold";
const arrowClass = "code-arrow";

const route = useRoute();

watch(
  route,
  () => {
    const { codeBlock = true } = unref(frontmatter);
    if (codeBlock === false) return document.documentElement.removeAttribute(documentAttribute);

    document.documentElement.setAttribute(documentAttribute, ns.namespace);
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
    // 当支持自定义 class 来忽略，代码块父元素的 class 中包含 vp-code-block，则跳过
    if (item.parentElement?.className.includes(ns.joinNamespace("vp-code"))) return;

    const arrowElement: HTMLElement | null = item.querySelector(`.${arrowClass}`);
    // 手动创建箭头元素，然后添加点击事件，最后 append 到代码块元素的最后面
    if (arrowElement) return;

    const newArrowElement: HTMLElement | null = document.createElement("div");
    newArrowElement.classList.add(arrowClass);
    // 添加箭头图标
    newArrowElement.innerHTML = arrowDownIcon;
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
  codeDom.style.height = `${modeHeight}px`;
  // 获取代码块的元素
  const preDom: HTMLElement | null = codeDom.querySelector("pre");
  const lineNumbersWrapperDom: HTMLElement | null = codeDom.querySelector(".line-numbers-wrapper");

  const codeBlockState = {
    expand: { height: `${modeHeight}px`, display: "block", speed: 80 },
    fold: { height: ns.cssVar("code-block-fold-height"), display: "none", speed: 400 },
  };

  let timer: ReturnType<typeof setTimeout> | null;

  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  // 箭头点击事件
  const clickEvent = () => {
    const isFold = arrowDom.classList.contains(foldClass);
    // 如果是折叠状态，则需要展开
    const state = codeBlockState[isFold ? "expand" : "fold"];

    codeDom.style.height = state.height;

    clearTimer();

    if (preDom || lineNumbersWrapperDom) {
      timer = setTimeout(() => {
        if (preDom) preDom.style.display = state.display;
        if (lineNumbersWrapperDom) lineNumbersWrapperDom.style.display = state.display;
        if (timer) clearTimer();
      }, state.speed);
    }

    arrowDom.classList.toggle(foldClass);
  };

  arrowDom.addEventListener("click", clickEvent);
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
