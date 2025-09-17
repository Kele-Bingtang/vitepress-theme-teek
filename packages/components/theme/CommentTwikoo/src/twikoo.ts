import type { InjectionKey } from "vue";
import type { CommentProvider } from "@teek/config";

export const twikooContext: InjectionKey<(el: string | HTMLElement, options: CommentProvider["twikoo"]) => any> =
  Symbol("twikoo");
