import { defineBuildConfig } from "unbuild";
import { copy } from "fs-extra";

export default defineBuildConfig({
  entries: [
    "src/index",
    "src/usePermalink",
    "src/rewrites",
    { builder: "mkdist", input: "src/components", outDir: "dist/components", pattern: ["**/*.vue"], loaders: ["vue"] },
  ],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    output: {
      exports: "named",
    },
  },
  externals: ["vitepress", "vue", "vite", "fs-extra"],
  failOnWarn: false,
  hooks: {
    "build:done": async () => {
      await copy("src/vitepress-router.d.ts", "dist/vitepress-router.d.ts");
    },
  },
});
