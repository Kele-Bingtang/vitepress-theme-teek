<script setup lang="ts" name="CodeBlockToggle">
import type { CodeBlock } from "@teek/config";
import { nextTick, watch } from "vue";
import { useNamespace } from "@teek/composables";
import { isClient } from "@teek/helper";
import { arrowDownIcon } from "@teek/static";
import { TkMessage } from "@teek/components/common/Message";
import { useTeekConfig } from "@teek/components/theme/ConfigProvider";
import { createOverlay } from "./createOverlay";

defineOptions({ name: "CodeBlockToggle" });

const ns = useNamespace();
const { getTeekConfigRef } = useTeekConfig();

const codeBlockConfig = getTeekConfigRef<CodeBlock>("codeBlock", {
  collapseHeight: 700,
  copiedDone: undefined,
});

const documentAttribute = "code-block";
const foldClass = "fold";
const arrowClass = "code-arrow";

watch(
  codeBlockConfig,
  newVal => {
    if (!isClient) return;

    const { disabled } = newVal || {};
    if (disabled) return document.documentElement.removeAttribute(documentAttribute);

    document.documentElement.setAttribute(documentAttribute, ns.namespace);
    nextTick(() => initCodeBlock());
  },
  { immediate: true }
);

/**
 * 获取元素高度
 */
const getElementHeight = (item: HTMLElement) => {
  const parentClass = item.parentElement?.className || "";
  if (!parentClass.includes("blocks")) return item.offsetHeight;
  if (parentClass.includes("blocks") && item.className.includes("active")) return item.offsetHeight;

  item.style.display = "block";
  const height = item.offsetHeight;
  item.style.display = "";
  return height;
};

/**
 * 安全获取元素高度
 */
const getSafeElementHeight = (item: HTMLElement) => {
  const originalDisplay = item.style.display;
  const originalHeight = item.style.height;
  item.style.display = "block";
  const height = getElementHeight(item);
  item.style.display = originalDisplay;
  item.style.height = originalHeight;
  return height;
};

/**
 * 初始化代码块
 */
const initCodeBlock = () => {
  const modes = document.querySelectorAll(".vp-doc div[class*='language-']") as unknown as HTMLElement[];

  Array.from(modes).forEach(item => {
    const copyDom = item.querySelector<HTMLElement>(`.copy`);

    copyDom?.addEventListener("click", e => {
      codeBlockConfig.value.copiedDone?.(TkMessage);
    });

    // 忽略部分 class：代码块父元素的 class 中包含 details、tk-vp-code 则跳过
    const className = item.parentElement?.className;
    if (className?.includes("details") || className?.includes(ns.joinNamespace("vp-code"))) return;

    const arrowElement = item.querySelector<HTMLElement>(`.${arrowClass}`);
    const modeHeight = getSafeElementHeight(item);

    // 手动创建箭头元素，然后添加点击事件，最后 append 到代码块元素的最后面
    if (arrowElement) return;

    const newArrowElement = document.createElement("div");
    newArrowElement.classList.add(arrowClass);
    // 添加箭头图标
    newArrowElement.innerHTML = arrowDownIcon;

    if (modeHeight > 400) {
      // 默认设置为折叠状态
      item.style.maxHeight = "400px";
      item.style.overflow = "hidden";
      item.style.position = "relative";

      const overlay = createOverlay(() => {
        overlay.remove();
        item.style.maxHeight = modeHeight + "px";
        if (newArrowElement) {
          newArrowElement.classList.remove(foldClass);
        }
      });

      item.appendChild(overlay);

      // 如果有箭头元素，初始状态设为折叠
      if (newArrowElement) {
        newArrowElement.classList.add(foldClass);
      }
    }

    // 给箭头图标添加点击事件
    if (newArrowElement) {
      addClickEvent(newArrowElement, item, modeHeight);
    }

    item.append(newArrowElement);
  });
};

/**
 * 添加点击事件
 */
const addClickEvent = (arrowDom: HTMLElement, codeDom: HTMLElement, modeHeight: number) => {
  const clickEvent = () => {
    const isFold = arrowDom.classList.contains(foldClass);

    if (isFold) {
      codeDom.style.maxHeight = modeHeight + "px";
      arrowDom.classList.remove(foldClass);
      const overlay = codeDom.querySelector(".code-block-overlay");
      if (overlay) overlay.remove();
    } else {
      if (modeHeight < 400) {
        codeDom.style.maxHeight = "40px";
      } else if (modeHeight <= 700) {
        codeDom.style.maxHeight = modeHeight + "px";
      } else {
        codeDom.style.maxHeight = "400px";
      }

      arrowDom.classList.add(foldClass);

      if (modeHeight > 400) {
        let overlay = codeDom.querySelector(".code-block-overlay") as HTMLElement | null;
        if (!overlay) {
          overlay = createOverlay(() => {
            overlay?.remove();
            codeDom.style.maxHeight = modeHeight + "px";
            arrowDom.classList.remove(foldClass);
          });
          codeDom.appendChild(overlay);
        }
      }
    }
  };

  arrowDom.addEventListener("click", clickEvent);
};
</script>

<template></template>
