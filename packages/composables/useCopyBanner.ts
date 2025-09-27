import { isClient } from "@teek/helper";
import { useEventListener } from "./useEventListener";
import { useNamespace } from "./useNamespace";

import "@teek/theme-chalk/tk-plus/copy-banner.scss";

export const useCopyBanner = (text = "复制成功，复制和转载请标注本文地址", timeout = 3000) => {
  if (!isClient) return;

  const ns = useNamespace("copy-banner");

  const listenerCopy = () => {
    // 如果没有选中文本，则不显示提示
    if (!window.getSelection()?.toString().trim()) return;

    hideAllCopyBanner();

    const slideClass = ns.e("slide");
    const banner = document.createElement("div");
    const slide = document.createElement("div");

    banner.className = ns.b();
    banner.innerHTML = `
      <div class="${ns.e("content")}">
        <p class="${ns.e("desc")}">${text}</p>
      </div>
    `;

    slide.className = slideClass;
    banner.appendChild(slide);
    document.body.appendChild(banner);

    // 出现动画
    setTimeout(() => {
      banner.classList.add("is-show");
      slide.style.width = "100%";
    }, 10);

    setTimeout(() => {
      banner.classList.add("is-hide");
    }, timeout);
  };

  const hideAllCopyBanner = () => {
    const banner = document.querySelector(`.${ns.b()}`) as HTMLElement;
    if (!banner) return;

    banner.remove();
  };

  useEventListener(document, "copy", listenerCopy, { passive: true });
};
