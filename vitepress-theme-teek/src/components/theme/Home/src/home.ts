import type { InjectionKey } from "vue";

export const postDataUpdateSymbol: InjectionKey<() => void> = Symbol("postDataUpdate");
