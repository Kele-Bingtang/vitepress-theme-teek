/// <reference types="vite/client" />

declare module "*.data.ts" {
  export const data: any;
}

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<object, object, any>;
  export default component;
}

declare module "*.scss" {
  const scss: Record<string, string>;
  export default scss;
}

declare module "*.css" {
  const css: Record<string, string>;
  export default css;
}
