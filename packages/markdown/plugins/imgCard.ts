import type MarkdownIt from "markdown-it";
import type { SiteConfig } from "vitepress";
import type { ImgCard } from "../types";
import { isStringNumber, withBase } from "@teek/helper";
import { createCardContainer } from "../helper";

const rootClass = "img-card";

/**
 * 生成图片卡片容器
 *
 * @param md MarkdownIt 实例
 * @param base 根路径
 */
const imgCardPlugin = (md: MarkdownIt) => {
  const siteConfig: SiteConfig = (globalThis as any).VITEPRESS_CONFIG;
  const { base = "/" } = siteConfig.userConfig;

  createCardContainer<ImgCard.Item, ImgCard.Config>(md, {
    type: "imgCard",
    className: `container ${rootClass}-container`,
    htmlRender: (props, info) => renderImgCard(props, info, base),
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
 * 获取图片卡片 HTML 标签
 *
 * @param imgCard 图片卡片数据
 * @param base 根路径
 */
const renderImgCard = (imgCard: { data: ImgCard.Item[]; config: ImgCard.Config }, info: string, base: string) => {
  const { data = [], config = {} } = imgCard;
  if (!data.length) return "";

  const {
    cardNum = "auto",
    cardGap = 20,
    lineClamp = 2,
    target = "_blank",
    objectFit = "cover",
    imgHeight = "auto",
  } = config;
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
              href="${withBase(base, card.link)}"
              target="${target}"
              class="${rootClass}__item ${num ? `row-${num}` : ""}"
              style="--img-height: ${imgHeight}; --img-object-fit: ${objectFit}; --desc-line-clamp: ${lineClamp}"
            >
              <div class="${rootClass}__item__img skeleton-image">
                <img src="${withBase(base, card.img)}" class="no-preview" onload="this.classList.add('loaded')" onerror="this.classList.add('loaded')">
              </div>
              <div class="${rootClass}__item__info">
                  <p class="name">${card.name}</p>
                  ${card.desc ? `<p class="desc">${card.desc}</p>` : ""}
              </div>
              ${
                card.avatar || card.author
                  ? `<div class="${rootClass}__item__footer">
                      ${card.avatar ? `<img src="${withBase(base, card.avatar)}">` : ""}
                      ${card.author ? `<span>${card.author}</span>` : ""}
                    </div>`
                  : ""
              }
            </${card.link ? "a" : "span"}>
          `
        )
        .join("")}
    </div>
  `;
};

export default imgCardPlugin;
