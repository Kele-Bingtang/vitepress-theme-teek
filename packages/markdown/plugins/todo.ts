import type MarkdownIt from "markdown-it";

const todoUncheck = "[ ] ";
const todoCheck = "[x] ";

/**
 * markdown TODO 列表插件
 *
 * 使用：
 * - [ ] 吃饭
 * - [ ] 睡觉
 * - [x] 打豆豆
 *
 * - 可以换成 1. 或 * 或 + 等列表的标记
 */
const todoPlugin = (md: MarkdownIt) => {
  md.renderer.rules.list_item_open = (tokens, idx, options, _: any, self) => {
    for (let i = idx + 1; i < tokens.length; i++) {
      const token = tokens[i];
      // 如果来到 </li> 标签，则结束循环
      if (token.type === "list_item_close") break;

      const content = token.content;

      if (content?.startsWith(todoUncheck) || content?.startsWith(todoCheck)) {
        const isChecked = content.startsWith(todoCheck);
        const checkbox = `<input class="todo-checkbox" type="checkbox" ${isChecked ? "checked" : ""} disabled />`;

        // 原内容移除 "[ ] " 或 "[x] "
        token.content = content.slice(4);
        if (token.children) token.children[0].content = token.children[0].content.slice(4);

        return `<li class="todo">${checkbox}`;
      }
    }
    // 如果不是 TODO 项，返回默认的渲染结果
    return self.renderToken(tokens, idx, options);
  };
};

export default todoPlugin;
