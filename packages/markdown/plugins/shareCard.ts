import type MarkdownIt from "markdown-it";
import type { SiteConfig } from "vitepress";
import type { ShareCard } from "../types";
import { isStringNumber, withBase } from "@teek/helper";
import { createCardContainer } from "../helper";

const rootClass = "share-card";

/**
 * 生成分享卡片容器
 *
 * @param md MarkdownIt 实例
 */
const shareCardPlugin = (md: MarkdownIt) => {
  const siteConfig: SiteConfig = (globalThis as any).VITEPRESS_CONFIG;
  const { base = "/" } = siteConfig.userConfig;

  createCardContainer<ShareCard.Item, ShareCard.Config>(md, {
    type: "shareCard",
    className: `container ${rootClass}-container`,
    htmlRender: (props, info) => renderShareCard(props, info, base),
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
 * 获取分享卡片 HTML 标签
 *
 * @param navCard 分享卡片数据
 * @param base 根路径
 */
const renderShareCard = (
  shareCard: { data: ShareCard.Item[]; config: ShareCard.Config },
  info: string,
  base: string
) => {
  const { data = [], config = {} } = shareCard;
  if (!data.length) return "";

  const { cardNum = "auto", cardGap = 20, target = "_blank" } = config;
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
              href="${withBase(base, card.link)}" target=${target}
              class="${rootClass}__item ${num ? `row-${num}` : ""}"
              style="--item-bg-color: ${card.bgColor || "var(--vp-c-gray-1)"}; --item-text-color: ${card.textColor || "var(--vp-c-text-1)"};"
             >
              ${
                card.avatar
                  ? `<div class="${rootClass}__item__img skeleton-image">
                      <img src="${withBase(base, card.avatar)}" alt="${card.name}" class="no-preview" onload="this.classList.add('loaded')" onerror="this.classList.add('loaded')">
                     </div>`
                  : ""
              }
              <div class="${rootClass}__item__content">
                <p class="name">${card.name}</p>
                <p class="desc">${card.desc}</p>
              </div>
            </${card.link ? "a" : "span"}>
          `
        )
        .join("")}
    </div>
  `;
};

export default shareCardPlugin;
