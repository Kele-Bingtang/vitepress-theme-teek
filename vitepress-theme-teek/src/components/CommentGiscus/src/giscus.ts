import type { Component, InjectionKey } from "vue";
import type { CommentProvider } from "@teek/config/types";

export const giscusSymbol: InjectionKey<(options: CommentProvider["giscus"]) => Component | null> = Symbol("giscus");
