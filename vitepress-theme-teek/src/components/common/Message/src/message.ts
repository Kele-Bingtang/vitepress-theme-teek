import type { AppContext, VNode } from "vue";
import { isClient } from "@teek/helper";
import type { TkIconProps } from "@teek/components/common/Icon";

export const messageTypes = ["success", "info", "warning", "error"] as const;

export type MessageType = (typeof messageTypes)[number];

export interface MessageConfigContext {
  max?: number;
  grouping?: boolean;
  duration?: number;
  offset?: number;
  showClose?: boolean;
}

export const messagePropsDefaults = {
  customClass: "",
  center: false,
  dangerouslyUseHTMLString: false,
  duration: 3000,
  icon: undefined,
  id: "",
  message: "",
  onClose: undefined,
  showClose: false,
  type: "info",
  plain: false,
  offset: 16,
  zIndex: 0,
  grouping: false,
  repeatNum: 1,
};

export const messageDefaults = {
  ...messagePropsDefaults,
  appendTo: isClient ? document.body : (undefined as never),
};

export interface MessageProps {
  customClass?: string;
  center?: boolean;
  dangerouslyUseHTMLString?: boolean;
  duration?: number;
  icon?: TkIconProps["icon"];
  id?: string;
  message?: string | VNode | (() => VNode);
  onClose?: () => void;
  showClose?: boolean;
  type?: MessageType;
  plain?: boolean;
  offset?: number;
  zIndex?: number;
  grouping?: boolean;
  repeatNum?: number;
}

export const messageEmits = {
  destroy: () => true,
};
export interface MessageEmits {
  destroy: [];
}

export type MessageOptions = Partial<
  Omit<MessageProps, "id"> & {
    appendTo?: HTMLElement | string;
  }
>;
export type MessageParams = MessageOptions | MessageOptions["message"];
export type MessageParamsNormalized = Omit<MessageProps, "id"> & {
  /**
   * 设置消息的根元素，默认为`document.body`
   */
  appendTo: HTMLElement;
};
export type MessageOptionsWithType = Omit<MessageOptions, "type">;
export type MessageParamsWithType = MessageOptionsWithType | MessageOptions["message"];

export interface MessageHandler {
  /**
   * 关闭消息
   */
  close: () => void;
}

export type MessageFn = {
  (options?: MessageParams, appContext?: null | AppContext): MessageHandler;
  closeAll(type?: MessageType): void;
};
export type MessageTypedFn = (options?: MessageParamsWithType, appContext?: null | AppContext) => MessageHandler;

export type Message = MessageFn & {
  [K in MessageType]: MessageTypedFn;
};
