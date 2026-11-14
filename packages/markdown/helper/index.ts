export * from "./simple-container";
export * from "./card-container";

/**
 * 转义 HTML 属性值中的特殊字符
 */
export const escapeHtmlAttr = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
