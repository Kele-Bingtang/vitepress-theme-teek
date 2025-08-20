import { useRouter } from "vitepress";

export type VpRouter = ReturnType<typeof useRouter>;
export type VpRouterFn<fn extends keyof VpRouter> = NonNullable<VpRouter[fn]>;
export type BindPosition = "before" | "after";

/**
 * 绑定自定义函数到 Router 的钩子里，为了防止覆盖掉其他人已添加在 Router 钩子的逻辑，useVpRouter 不是直接覆盖，而是追加。
 *
 * @param stateFlag 为了防止重复添加，useVpRouter 会在 Router 中添加一个 state 对象，里面维护各个绑定自定义函数的唯一标识，防止重复绑定。
 * @remark 什么时候重复添加？当 useVpRouter 在某个组件使用，且组件会重新渲染时，如 404 组件。
 *
 * @param bindFn 要绑定的自定义函数
 * @param bindPosition 绑定的位置，before 为在原函数之前绑定，after 为在原函数之后绑定
 */
export const useVpRouter = () => {
  const router = useRouter() as VpRouter & { state: Record<string, any>; onAfterUrlLoad: (href: string) => void };

  const bindBeforeRouteChange = (
    stateFlag: string,
    bindFn: VpRouterFn<"onBeforeRouteChange">,
    bindPosition: BindPosition = "after"
  ) => {
    const { state = {}, onBeforeRouteChange } = router;
    if (state[stateFlag]) return;

    const beforeFn = bindPosition === "before" ? bindFn : onBeforeRouteChange;
    const afterFn = bindPosition === "after" ? bindFn : onBeforeRouteChange;

    router.onBeforeRouteChange = async href => {
      const res = await beforeFn?.(href);
      if (res === false) return false;
      return await afterFn?.(href);
    };

    router.state = { ...state, [stateFlag]: true };
  };

  const bindBeforePageLoad = (
    stateFlag: string,
    bindFn: VpRouterFn<"onBeforePageLoad">,
    bindPosition: BindPosition = "after"
  ) => {
    const { state = {}, onBeforePageLoad } = router;
    if (state[stateFlag]) return;

    const beforeFn = bindPosition === "before" ? bindFn : onBeforePageLoad;
    const afterFn = bindPosition === "after" ? bindFn : onBeforePageLoad;

    router.onBeforePageLoad = async href => {
      const res = await beforeFn?.(href);
      if (res === false) return false;
      return await afterFn?.(href);
    };

    router.state = { ...state, [stateFlag]: true };
  };

  const bindAfterPageLoad = (
    stateFlag: string,
    bindFn: VpRouterFn<"onAfterPageLoad">,
    bindPosition: BindPosition = "after"
  ) => {
    const { state = {}, onAfterPageLoad } = router;
    if (state[stateFlag]) return;

    const beforeFn = bindPosition === "before" ? bindFn : onAfterPageLoad;
    const afterFn = bindPosition === "after" ? bindFn : onAfterPageLoad;

    router.onAfterPageLoad = async href => {
      await beforeFn?.(href);
      await afterFn?.(href);
    };

    router.state = { ...state, [stateFlag]: true };
  };

  const bindAfterRouteChange = (
    stateFlag: string,
    bindFn: VpRouterFn<"onAfterRouteChange">,
    bindPosition: BindPosition = "after"
  ) => {
    const { state = {}, onAfterRouteChange } = router;
    if (state[stateFlag]) return;

    const beforeFn = bindPosition === "before" ? bindFn : onAfterRouteChange;
    const afterFn = bindPosition === "after" ? bindFn : onAfterRouteChange;
    router.onAfterRouteChange = async href => {
      await beforeFn?.(href);
      await afterFn?.(href);
    };

    router.state = { ...state, [stateFlag]: true };
  };

  const bindRouterFn = (stateFlag: string, bindFn: (router: VpRouter) => void) => {
    const { state = {} } = router;
    if (state[stateFlag]) return;

    bindFn(router);
    router.state = { ...state, [stateFlag]: true };
  };

  return {
    router,
    route: router.route,
    bindBeforeRouteChange,
    bindBeforePageLoad,
    bindAfterPageLoad,
    bindAfterRouteChange,
    bindRouterFn,
  };
};
