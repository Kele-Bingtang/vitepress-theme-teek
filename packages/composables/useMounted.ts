import { getCurrentInstance, nextTick, onMounted, shallowRef } from "vue";

export interface UseMountedOptions {
  /**
   * 是否在非 onMounted 下执行
   *
   * @default false
   */
  sync?: boolean;
  /**
   * 是否在 nextTick 后执行
   *
   * @default true
   */
  nexTick?: boolean;
}
export const useMounted = (fn?: () => void, options: UseMountedOptions = {}) => {
  const { sync = false, nexTick = true } = options;
  const isMounted = shallowRef(false);
  const instance = getCurrentInstance();

  if (instance) {
    onMounted(() => {
      isMounted.value = true;
      fn?.();
    }, instance);
  } else if (sync) fn?.();
  else if (nexTick) nextTick(() => fn?.());

  return isMounted;
};
