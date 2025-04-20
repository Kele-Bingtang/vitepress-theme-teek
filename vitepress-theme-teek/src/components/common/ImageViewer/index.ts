import ImageViewer from "./src/index.vue";
import { createVNode, render, type VNode } from "vue";
import type { ImageViewerProps } from "./src/imageViewer";

export { ImageViewer as TkImageViewer };

let instance: VNode | null = null;

export const createImageViewer = (options: Partial<ImageViewerProps> & { modelValue?: boolean }) => {
  if (typeof window === "undefined") return;

  const { modelValue = true } = options;

  options.modelValue = modelValue;

  document.body.style.overflow = "hidden";
  const container = document.createElement("div");
  document.body.appendChild(container);
  instance = createVNode(ImageViewer, options);
  render(instance, container);
};

export type { ImageViewerProps as TkImageViewerProps, ImageViewerEmits as TkImageViewerEmits } from "./src/imageViewer";
export * from "./src/instance";
