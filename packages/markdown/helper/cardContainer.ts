import type MarkdownIt from "markdown-it";
import type { Token } from "markdown-it";
import container from "markdown-it-container";
import yaml from "js-yaml";

export interface CardContainerOption<D extends Record<string, any>, C extends Record<string, any>> {
  /**
   * 容器类型
   */
  type: string;
  /**
   * 容器类名
   */
  className?: string;
  /**
   * 渲染 HTML 前端的回调，返回 false 则不渲染容器，返回 true 则继续渲染容器
   */
  beforeHtmlRender?: (
    props: { data: D[]; config: C },
    info: string,
    tokens: Token[],
    idx: number
  ) => boolean | undefined;
  /**
   * 渲染 HTML 的回调
   */
  htmlRender: (props: { data: D[]; config: C }, info: string, tokens: Token[], idx: number) => string;
  /**
   * 渲染 HTML 后的回调
   */
  afterHtmlRender?: (props: { data: D[]; config: C }, info: string, tokens: Token[], idx: number) => void;
  /**
   * HTML 转换回调，通过该函数修改最终生成的 HTML
   */
  transformHtml?: (html: string) => string;
}

/**
 * 创建多个卡片容器
 */
export const createCardContainers = <D extends Record<string, any>, C extends Record<string, any>>(
  md: MarkdownIt,
  option: CardContainerOption<C, D>[]
) => {
  option.forEach(item => createCardContainer(md, item));
};

/**
 * 创建单个卡片容器
 */
export const createCardContainer = <D extends Record<string, any>, C extends Record<string, any>>(
  md: MarkdownIt,
  option: CardContainerOption<D, C>
) => {
  const { type, className, beforeHtmlRender, htmlRender, afterHtmlRender, transformHtml } = option;

  // 注册容器
  md.use(container, type, {});

  // 注册成功后，就会监听到 container_xx_open，其中 xx 为注册的容器名
  md.renderer.rules[`container_${type}_open`] = (tokens, idx) => {
    const containerToken = tokens[idx];
    let html = `<div class="${className || `${type}-container`}">`;

    for (let i = idx; i < tokens.length; i++) {
      const token = tokens[i];

      // 如果来到 ${type} 的结束标签，则跳出循环
      if (token.type === `container_${type}_close`) break;
      if (!["yaml", "yml"].includes(token.info)) continue;

      // 解析 yaml 内容
      const yamlContent = yaml.load(token.content.trim()) as { config: C; data: D[] } | D[];

      let data: D[];
      let config = {} as C;
      if (Array.isArray(yamlContent)) data = yamlContent;
      else {
        data = yamlContent.data || [];
        config = yamlContent.config || {};
      }

      // 获取容器名后面的内容
      const info = containerToken.info.trim().slice(type.length).trim();

      const result = beforeHtmlRender?.({ data, config }, info, tokens, i);
      if (result === false) continue;

      // 获取 HTML
      html += htmlRender({ data, config }, info, tokens, i);
      afterHtmlRender?.({ data, config }, info, tokens, i);
    }
    html = transformHtml?.(html) ?? html;

    // 返回不能有 </div> 结尾
    return html;
  };
};
