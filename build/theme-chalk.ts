import { parse, resolve } from "node:path";
import { tcOutput, pkgRoot, simplePkgName } from "./helper";
import glob from "fast-glob";
import { access, mkdir, writeFile } from "node:fs/promises";
import { compile } from "sass";
import postcss from "postcss";
import postcssNested from "postcss-nested";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import picocolors from "picocolors";
import { copy } from "fs-extra";

const isDev = process.env.THEME_CHALK_DEV === "true";

/** /packages/theme-chalk/src */
const styleRoot = resolve(pkgRoot, "theme-chalk/src");
/** ./dist/theme-chalk  */
const distRoot = resolve(__dirname, "dist/theme-chalk");

const buildStyle = async () => {
  // 获取所有 scss 文件
  const files = await glob([`**/*.scss`], {
    cwd: styleRoot,
    absolute: true,
    ignore: ["**/var/**", "**/module/**", "**/mixins/**", "**/common/**"],
  });

  // 生成 /dist 文件夹
  try {
    await access(distRoot);
  } catch {
    await mkdir(distRoot);
  }

  for (const item of files) {
    const content = compile(item);
    // 文件名，不包含后缀
    const { name } = parse(item);
    const plugins: any[] = [postcssNested, autoprefixer];
    // 生产环境开启压缩
    if (!isDev) plugins.push(cssnano);
    const result = await postcss(plugins).process(content.css, { from: undefined });
    const filename = name === "index" ? "index.css" : `${simplePkgName}-${name}.css`;
    // 在 ./dist/theme-chalk 创建 css 文件
    await writeFile(resolve(distRoot, filename), result.css);
  }
  // 复制源文件到 ./dist/theme-chalk/src
  await copy(styleRoot, resolve(distRoot, "src"));

  // 复制打包后的文件 ./dist/theme-chalk 到 /dist/vitepress-theme-teek/theme-chalk
  await copy(distRoot, resolve(tcOutput));

  // 复制打包后的 /dist/index.css 文件到 /dist/vitepress-theme-teek/index.css
  // await copy(resolve(distRoot, "index.css"), resolve(tkOutput, "index.css"));
};

buildStyle()
  .then(() => {
    console.log(picocolors.green(`Successfully build theme-chalk`));
  })
  .catch(err => {
    picocolors.red(err);
  });
