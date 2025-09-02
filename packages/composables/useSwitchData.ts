import { computed, MaybeRefOrGetter, Ref, ref, toValue, watch } from "vue";
import { useScopeDispose } from "./useScopeDispose";

export interface UseSwitchDataOption {
  /**
   * 切换间隔时间，单位：毫秒
   */
  timeout?: number;
  /**
   * 是否随机切换数据
   */
  shuffle?: boolean;
  /**
   * data 发生变化，是否重新加载
   *
   * @default false
   */
  reloadWhenDataChanged?: boolean;
  /**
   * 切换数据之前执行的回调函数
   */
  onBeforeUpdate?: (newValue: string) => void;
  /**
   * 自定义切换逻辑
   */
  onUpdate?: (data: Ref<string>, newValue: string) => void;
  /**
   * 切换数据之后执行的回调函数
   */
  onAfterUpdate?: (newValue: string) => void;
}

/**
 * 从数据列表里按顺序/随机获取一笔数据
 *
 * @param dataList 数据列表
 * @param options 选项
 */
export const useSwitchData = (dataList: MaybeRefOrGetter<any[]>, options: UseSwitchDataOption = {}) => {
  const {
    timeout = 4000,
    shuffle = false,
    reloadWhenDataChanged = false,
    onBeforeUpdate,
    onUpdate,
    onAfterUpdate,
  } = options;
  const dataListComputed = computed(() => toValue(dataList) || []);

  const index = ref(-1);
  let timer: ReturnType<typeof setTimeout> | null;

  /**
   * 随机吐出一个的值
   */
  const splitOutRandom = (dataList: any[]) => {
    let newIndex: number;
    do {
      newIndex = Math.floor(Math.random() * dataList.length);
    } while (newIndex === index.value); // 确保不会获取到相同的数据

    index.value = newIndex;
    return dataList[newIndex];
  };

  const data = ref(shuffle ? splitOutRandom(dataListComputed.value) : dataListComputed.value[0]);

  /**
   * 按顺序吐出下一个值
   */
  const splitOutOrder = (dataList: any[]) => {
    index.value = (index.value + 1) % dataList.length;
    return dataList[index.value];
  };

  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  const startTimer = () => {
    clearTimer();
    if (timeout > 0) {
      timer = setTimeout(start, timeout);
    }
  };

  /**
   * 开启数据切换
   */
  const start = () => {
    const dataListConst = dataListComputed.value;

    if (dataListConst.length < 1) return;
    if (dataListConst.length === 1) {
      data.value = dataListConst[0];
      return;
    }

    // 启动定时器
    startTimer();

    let newValue: string;

    if (shuffle) newValue = splitOutRandom(dataListConst);
    else newValue = splitOutOrder(dataListConst);

    if (newValue === data.value) return;

    onBeforeUpdate?.(newValue);

    if (onUpdate) return onUpdate(data, newValue);

    data.value = newValue;
    onAfterUpdate?.(newValue);
  };

  /**
   * 关闭数据切换
   *
   * @param restore 是否还原数据为开始状态
   */
  const stop = (restore = false) => {
    clearTimer();
    if (restore) index.value = -1;
  };

  /**
   * 重启数据切换
   */
  const restart = () => {
    stop(true);
    start();
  };

  if (reloadWhenDataChanged) watch(dataListComputed, () => restart());

  useScopeDispose(stop);

  return { data, index, start, stop, restart };
};

export type UseSwitchDataReturn = ReturnType<typeof useSwitchData>;
