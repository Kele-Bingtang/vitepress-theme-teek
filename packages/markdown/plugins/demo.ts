import type MarkdownIt from "markdown-it";
import type { Renderer, Token } from "markdown-it";
import type { SiteConfig } from "vitepress";
import type { Demo } from "@teek/config";
import { readFileSync } from "fs";
import { join, resolve, posix } from "path";
import container from "markdown-it-container";
import yaml from "js-yaml";

interface ContainerOpts {
  marker?: string | undefined;
  validate?(params: string): boolean;
  render?(tokens: Token[], index: number, options: any, env: any, self: Renderer): string;
}

const demoPlugin = (md: MarkdownIt, option: Demo = {}) => {
  const siteConfig: SiteConfig = (globalThis as any).VITEPRESS_CONFIG;
  const srcDir = siteConfig.srcDir;
  const path = "examples";
  const demoPath = join(srcDir, path);

  const options: ContainerOpts = {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/);
    },

    render(tokens, idx) {
      const desc = tokens[idx].info.trim().match(/^demo\s*(.*)$/);

      if (tokens[idx].nesting === 1 /* 标签打开 */) {
        let description = desc && desc.length > 1 ? desc[1].trim() : "";
        const effect = description.startsWith("effect");
        if (effect) description = description.replace("effect", "").trim();

        const sourceFileToken = tokens[idx + 2];
        const yamlToken = tokens[idx + 1];

        const { sourceFile, effectPath, sourceFileExtension } = getDemoFile(sourceFileToken, yamlToken);

        let source = "";
        if (sourceFile) source = readFileSync(resolve(demoPath, sourceFile), "utf-8");
        if (!source) throw new Error(`Incorrect source file path: ${sourceFile}`);

        return `<TkDemoCode effect="${effect}" source="${encodeURIComponent(
          md.render(`\`\`\` ${sourceFileExtension}\n${source}\n\`\`\``)
        )}" path="${posix.join(path, effectPath)}" raw-source="${encodeURIComponent(
          source
        )}" description="${encodeURIComponent(md.render(description))}" options="${encodeURIComponent(JSON.stringify(option))}">`;
      } else return "</TkDemoCode>";
    },
  };

  md.use(container, "demo", options);
};

const getDemoFile = (sourceFileToken: Token, yamlToken: Token) => {
  // 需要复制其内容的源码文件路径
  let sourceFile = "";
  // 需要渲染效果的源码文件路径
  let effectPath = "";

  if (["yaml", "yml"].includes(yamlToken.info)) {
    // yaml 格式，分别指定源码文件路径和效果文件路径
    const yamlContent = yaml.load(yamlToken.content.trim()) as { effect: string; file: string };
    effectPath = yamlContent.effect || yamlContent.file || "";
    sourceFile = yamlContent.file || yamlContent.effect || "";
  } else {
    // 如果容器内容只填写路径，则源码文件路径和效果文件路径一致
    sourceFile = sourceFileToken.children?.[0].content ?? "";
    effectPath = sourceFile;
  }

  // 确保文件路径带 .vue 后缀
  sourceFile = sourceFile ? (sourceFile.includes(".") ? sourceFile : `${sourceFile.replace(/.vue$/, "")}.vue`) : "";
  effectPath = effectPath ? `${effectPath.replace(/.vue$/, "")}.vue` : "";

  // 源码文件后缀，默认为 vue
  const sourceFileExtension = sourceFile.includes(".") ? sourceFile.split(".").pop() : "vue";

  return { sourceFile, effectPath, sourceFileExtension };
};

export default demoPlugin;
