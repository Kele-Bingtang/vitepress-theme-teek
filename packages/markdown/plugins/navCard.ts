import type MarkdownIt from "markdown-it";
import type { SiteConfig } from "vitepress";
import type { NavCard } from "../types";
import { isStringNumber, withBase } from "@teek/helper";
import { createCardContainer } from "../helper";

const rootClass = "nav-card";

/**
 * 生成导航卡片容器
 *
 * @param md MarkdownIt 实例
 */
const navCardPlugin = (md: MarkdownIt) => {
  const siteConfig: SiteConfig = (globalThis as any).VITEPRESS_CONFIG;
  const { base = "/" } = siteConfig.userConfig;

  createCardContainer<NavCard.Item, NavCard.Config>(md, {
    type: "navCard",
    className: `container ${rootClass}-container`,
    htmlRender: (props, info) => getNavCardHtml(props, info, base),
    afterHtmlRender: (props, _, tokens, idx) => {
      // 删除 yaml 代码块
      if (props.config.showCode !== true) {
        tokens[idx].type = "";
        tokens[idx].tag = "";
        tokens[idx].hidden = true;
      }
    },
  });
};

/**
 * 获取导航卡片 HTML 标签
 *
 * @param navCard 导航卡片数据
 * @param base 根路径
 */
const getNavCardHtml = (navCard: { data: NavCard.Item[]; config: NavCard.Config }, info: string, base: string) => {
  const { data = [], config = {} } = navCard;
  if (!data.length) return "";

  const { cardNum = "auto", cardGap = 20, lineClamp = 2, target = "_blank" } = config;
  const cardNumValue = info || cardNum + "";
  // 默认卡片数量为 4
  let num = 4;

  if (cardNumValue && isStringNumber(cardNumValue)) {
    const value = Number(cardNumValue);
    if (value >= 1 && value <= 4) num = value;
  }

  const index = cardNumValue === "auto" ? "auto" : num;

  return `
    <div
      class="${rootClass} index-${index}"
      style="--row-gap: ${cardGap}px; --column-gap: ${cardGap}px; --column-min-width: calc(100% / ${num} - ${cardGap * (num - 1)}px);"
    >
      ${data
        .map(
          card => `
            <${card.link ? "a" : "span"}
              href="${card.link}" target="${target}"
              class="${rootClass}__item ${num ? `row-${num}` : ""}"
              style="--desc-line-clamp: ${lineClamp}"
            >
              <div class="${rootClass}__item__info">
                  ${
                    card.img
                      ? `<div class="${rootClass}__item__img skeleton-image">
                          <img src="${withBase(base, card.img)}" class="no-preview" onload="this.classList.add('loaded')" onerror="this.classList.add('loaded')">
                         </div>`
                      : ""
                  }
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
