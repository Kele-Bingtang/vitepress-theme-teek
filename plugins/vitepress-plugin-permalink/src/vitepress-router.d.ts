/// <reference types="vitepress" />

declare module "vitepress" {
  interface Router {
    onAfterUrlLoad: (href: string) => Promise<void> | void;
    state: Record<string, any>;
  }
}

export {};

// 对所有以 virtual-dates: 开头的模块声明共同的类型
declare module "virtual:not-found-option" {}
