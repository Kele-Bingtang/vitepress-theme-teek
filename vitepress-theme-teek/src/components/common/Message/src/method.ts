import { createVNode, isVNode, render, type AppContext } from "vue";
import { isClient } from "@teek/helper";
import { isElement, isFunction, isString } from "@teek/helper";
import MessageConstructor from "./index.vue";
import { messageDefaults, messageTypes } from "./message";
import { instances, type MessageContext } from "./instance";
import type {
  Message,
  MessageFn,
  MessageHandler,
  MessageOptions,
  MessageParams,
  MessageParamsNormalized,
  MessageType,
} from "./message";

let seed = 1;

const normalizeOptions = (params?: MessageParams) => {
  const options: MessageOptions =
    !params || isString(params) || isVNode(params) || isFunction(params) ? { message: params } : params;

  const normalized = {
    ...messageDefaults,
    ...options,
  };

  if (!normalized.appendTo) normalized.appendTo = document.body;
  else if (isString(normalized.appendTo)) {
    let appendTo = document.querySelector<HTMLElement>(normalized.appendTo);

    if (!isElement(appendTo)) {
      console.warn("Message", "the appendTo option is not an HTMLElement. Falling back to document.body.");
      appendTo = document.body;
    }

    normalized.appendTo = appendTo;
  }

  return normalized as MessageParamsNormalized;
};

const closeMessage = (instance: MessageContext) => {
  const idx = instances.indexOf(instance);
  if (idx === -1) return;

  instances.splice(idx, 1);
  const { handler } = instance;
  handler.close();
};

const createMessage = (
  { appendTo, ...options }: MessageParamsNormalized,
  context?: AppContext | null
): MessageContext => {
  const id = `message_${seed++}`;
  const userOnClose = options.onClose;

  const container = document.createElement("div");

  const props = {
    ...options,
    // now the zIndex will be used inside the message.vue component instead of here.
    // zIndex: nextIndex() + options.zIndex
    id,
    onClose: () => {
      userOnClose?.();
      closeMessage(instance);
    },

    // clean message element preventing mem leak
    onDestroy: () => {
      // since the element is destroy, then the VNode should be collected by GC as well
      // we do not want cause any mem leak because we have returned vm as a reference to users
      // so that we manually set it to false.
      render(null, container);
    },
  };
  const vnode = createVNode(
    MessageConstructor,
    props,
    isFunction(props.message) || isVNode(props.message)
      ? {
          default: isFunction(props.message) ? props.message : () => props.message,
        }
      : null
  );
  vnode.appContext = context || message._context;

  render(vnode, container);
  // instances will remove this item when close function gets called. So we do not need to worry about it.
  appendTo.appendChild(container.firstElementChild!);

  const vm = vnode.component!;

  const handler: MessageHandler = {
    // instead of calling the onClose function directly, setting this value so that we can have the full lifecycle
    // for out component, so that all closing steps will not be skipped.
    close: () => {
      vm.exposed!.close();
    },
  };

  const instance: MessageContext = {
    id,
    vnode,
    vm,
    handler,
    props: (vnode.component as any).props,
  };

  return instance;
};

const message: MessageFn & Partial<Message> & { _context: AppContext | null } = (options = {}, context) => {
  if (!isClient) return { close: () => undefined };

  const normalized = normalizeOptions(options);

  if (normalized.grouping && instances.length) {
    const instance = instances.find(({ vnode: vm }) => vm.props?.message === normalized.message);
    if (instance) {
      instance.props.repeatNum! += 1;
      instance.props.type = normalized.type;
      return instance.handler;
    }
  }

  const instance = createMessage(normalized, context);

  instances.push(instance);
  return instance.handler;
};

messageTypes.forEach(type => {
  message[type] = (options = {}, appContext) => {
    const normalized = normalizeOptions(options);
    return message({ ...normalized, type }, appContext);
  };
});

export function closeAll(type?: MessageType): void {
  // Create a copy of instances to avoid modification during iteration
  const instancesToClose = [...instances];

  for (const instance of instancesToClose) {
    if (!type || type === instance.props.type) {
      instance.handler.close();
    }
  }
}

message.closeAll = closeAll;
message._context = null;

export default message as Message;
