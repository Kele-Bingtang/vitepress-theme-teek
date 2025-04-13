/**
 * 防抖函数
 *
 * @param func 回调函数
 * @param delay 延迟时间
 * @param immediate 是否立即执行，如果为 true，则立即执行回调函数，否则在延迟时间后执行
 */
export const useDebounce = <T extends (...args: any[]) => any>(
  func: T,
  delay = 0,
  immediate = true
): ((...args: Parameters<T>) => void) => {
  let timer: NodeJS.Timeout | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const callNow = immediate && !timer;
    if (callNow) func.apply(this, args);

    const later = () => {
      timer = null;
      if (!immediate) func.apply(this, args);
    };

    if (timer) clearTimeout(timer);
    timer = setTimeout(later, delay);
  };
};
