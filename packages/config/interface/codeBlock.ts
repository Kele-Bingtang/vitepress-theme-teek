import type { Message } from "@teek/components/common/Message/src/message";

export interface CodeBlock {
  /**
   * 是否启用新版代码块
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * 超出高度后自动折叠，设置 true 则默认折叠，false 则默认不折叠
   *
   * @default 700
   */
  collapseHeight?: number | boolean;
  /**
   * 复制代码完成后的回调
   */
  copiedDone?: (TkMessage: Message) => void;
  /**
   * 代码块底部是否显示展开/折叠遮罩层
   *
   * @default false
   * @since 1.4.0
   */
  overlay?: boolean;
  /**
   * 当出现遮罩层时，指定代码块显示高度，当 overlay 为 true 时生效
   *
   * @default 400
   * @since 1.4.0
   */
  overlayHeight?: number;
  /**
   * 语言文本显示样式，为 text-transform 的值
   *
   * none：文本中的单词保持默认风格
   * capitalize：文本中的每个单词以大写字母开头
   * lowercase：文本中的每个单词全部转为小写
   * uppercase：定文本中的单次全部转为大写
   *
   * @default 'uppercase'
   */
  langTextTransform?: "none" | "capitalize" | "lowercase" | "uppercase";
}
