import MarkdownIt from "markdown-it";
import container from "markdown-it-container";
import yaml from "js-yaml";
import { withBase } from "../../helper/util";
import { NavCard, NavCardConfig, NavCardItem } from "../types";

const navCardName = "navCard";
const rootClass = "nav-card";

/**
 * 生成导航卡片容器
 *
 * @param md MarkdownIt 实例
 * @param base 根路径
 */
const navCardPlugin = (md: MarkdownIt, base = "") => {
  // 注册容器
  md.use(container, navCardName, {});

  // 注册成功后，就会监听到 container_xx_open，其中 xx 为注册的容器名
  md.renderer.rules[`container_${navCardName}_open`] = (tokens, idx, options, _: any, self) => {
    const token = tokens[idx];
    // 如果不是 ${navCardName} 开头，则返回原内容
    if (!token.info.trim().startsWith(navCardName)) return self.renderToken(tokens, idx, options);

    let html = `<div class="${rootClass}-container">`;

    for (let i = idx; i < tokens.length; i++) {
      const contentToken = tokens[i];

      // 循环到 ${navCardName} 的结束标签，则跳出
      if (contentToken.type === `container_${navCardName}_close`) break;
      if (!["yaml", "yml"].includes(contentToken.info)) continue;

      // 解析 yaml 内容
      const yamlContent = yaml.load(contentToken.content.trim()) as NavCard | NavCardItem[];

      let data: NavCardItem[] = [];
      let config: NavCardConfig = {};
      if (Array.isArray(yamlContent)) data = yamlContent;
      else {
        data = yamlContent.data || [];
        config = yamlContent.config || {};
      }

      // 获取容器名后面的卡片数量
      const cardNum = token.info.trim().slice(navCardName.length).trim();
      config.cardNum = config.cardNum || Number(cardNum || 3) || 3;

      html += getNavCardHtml({ config, data }, base);

      // 删除 yaml 代码块
      if (config.showCode !== true) {
        contentToken.type = "";
        contentToken.tag = "";
        contentToken.hidden = true;
      }
    }

    // 返回不能有 </div> 结尾
    return html;
  };
};

/**
 * 获取导航卡片 HTML 标签
 *
 * @param navCard 导航卡片数据
 * @param base 根路径
 */
const getNavCardHtml = (navCard: NavCard, base: string) => {
  const { data = [], config = {} } = navCard;
  if (!data.length) return "";

  const { cardGap = 20, lineClamp = 2, target = "_blank" } = config;
  let { cardNum = 3 } = config;
  if (!cardNum || cardNum > 4 || cardNum < 1) cardNum = 3;

  return `
    <div
      class="${rootClass} index-${cardNum}"
      style="--row-gap: ${cardGap}px; --column-gap: ${cardGap}px; --column-min-width: calc(100% / ${cardNum} - ${cardGap * (cardNum - 1)}px);"
    >
      ${data
        .map(
          card => `
            <${card.link ? "a" : "span"}
              href="${card.link}" target="${target}"
              class="${rootClass}__item"
              style="--desc-line-clamp: ${lineClamp}"
            >
              <div class="${rootClass}__item__info">
                ${card.img ? `<img src="${withBase(base, card.img)}">` : ""}
                <span class="name">${card.name}</span>
              </div>

              <p class="desc">${card.desc}</p>
              ${card.badge ? `<span class="VPBadge ${card.badgeType || "info"} badge">${card.badge}</span>` : ""}
            </${card.link ? "a" : "span"}>
        `
        )
        .join("")}
      </div>`;
};

export default navCardPlugin;
