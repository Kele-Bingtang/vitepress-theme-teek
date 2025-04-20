import { shallowReactive } from "vue";
import type { ComponentInternalInstance, VNode } from "vue";
import type { MessageHandler, MessageProps } from "./message";
import type MessageConstructor from "./index.vue";

export type MessageContext = {
  id: string;
  vnode: VNode;
  handler: MessageHandler;
  vm: ComponentInternalInstance;
  props: MessageProps;
};

export const instances: MessageContext[] = shallowReactive([]);

export type TkMessageInstance = InstanceType<typeof MessageConstructor> & unknown;

export const getInstance = (id: string) => {
  const idx = instances.findIndex(instance => instance.id === id);
  const current = instances[idx];
  let prev: MessageContext | undefined;
  if (idx > 0) {
    prev = instances[idx - 1];
  }
  return { current, prev };
};

export const getLastOffset = (id: string): number => {
  const { prev } = getInstance(id);
  if (!prev) return 0;
  return prev.vm.exposed!.bottom.value;
};

export const getOffsetOrSpace = (id: string, offset: number) => {
  const idx = instances.findIndex(instance => instance.id === id);
  return idx > 0 ? 16 : offset;
};
