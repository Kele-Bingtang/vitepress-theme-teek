import type { InjectionKey } from "vue";
import type { CommentProvider } from "@teek/config/types";

export const artalkSymbol: InjectionKey<(options: CommentProvider["artalk"], el: string | HTMLElement) => any> =
  Symbol("artalk");
