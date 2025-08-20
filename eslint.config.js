import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import projectGlobals from "./eslintrc-globals.js";
import configPrettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";
import pluginTypeScript from "@typescript-eslint/eslint-plugin";
import * as parserVue from "vue-eslint-parser";
import * as parserTypeScript from "@typescript-eslint/parser";

export default defineConfig([
  eslint.configs.recommended,
  { ignores: ["**/.*", "**/dist/*", "*.d.ts", "**/static/*"] }, // 忽略文件配置单独放在一个对象，否则不生效
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es6,
        ...globals.node,
        ...projectGlobals,
      },
    },
    plugins: {
      prettier: pluginPrettier,
    },
    // 不指定 files，则默认是所有文件生效
    rules: {
      ...configPrettier.rules,
      ...pluginPrettier.configs.recommended.rules,
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off", // 禁用 debugger
      "no-unused-vars": [process.env.NODE_ENV === "production" ? "warn" : "warn", { vars: "all", args: "none" }], // 禁止出现未使用的变量，函数和函数的参数
      "no-undef": process.env.NODE_ENV === "production" ? "warn" : "warn", // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
      "no-console": "off", // 禁用 console
      "accessor-pairs": "error", // 强制 getter 和 setter 在对象中成对出现
      eqeqeq: ["error", "always", { null: "ignore" }], // 要求使用 === 和 !==
      "no-class-assign": "error", // 禁止修改类声明的变量
      "no-cond-assign": "error", // 禁止条件表达式中出现赋值操作符
      "no-const-assign": "error", // 禁止修改 const 声明的变量
      "no-dupe-keys": "error", // 禁止对象字面量中出现重复的 key
      "no-empty-pattern": "error", // 禁止使用空解构模式
      "no-extra-boolean-cast": "error", // 禁止不必要的布尔转换
      "no-func-assign": "error", // 禁止对 function 声明重新赋值
      "no-irregular-whitespace": "error", // 禁止不规则的空白
      "no-label-var": "error", // 不允许标签与变量同名
      "no-labels": ["error", { allowLoop: false, allowSwitch: false }], // 禁用标签语句
      "no-lone-blocks": "error", // 禁用不必要的嵌套块
      "no-multi-str": "error", // 禁止多行字符串
      "no-global-assign": "error", // 不允许修改只读全局变量
      "no-new-native-nonconstructor": "error", // 禁止 new Symbol、new Array、new Map 等
      "no-new-wrappers": "error", // 禁止对 String，Number 和 Boolean 使用 new 操作符
      "no-obj-calls": "error", // 禁止把全局对象作为函数调用
      "no-redeclare": "error", // 禁止多次声明同一变量
      "no-return-assign": ["error", "except-parens"], // 禁止在 return 语句中使用赋值语句
      "no-self-assign": "error", // 禁止自我赋值
      "no-self-compare": "error", // 禁止自身比较
      "no-sequences": "error", // 禁用逗号操作符
      "func-call-spacing": "error", // 要求或禁止在函数标识符和其调用之间有空格
      "no-undef-init": "error", // 禁止将变量初始化为 undefined
      "no-unmodified-loop-condition": "error", // 该规则查找循环条件内的引用，然后检查这些引用的变量是否在循环中被修改
      "no-unneeded-ternary": ["error", { defaultAssignment: false }], // 当存在更简单的选择时，此规则不允许三元运算符
      "no-unreachable": "error", // 禁止在 return、throw、continue 和 break 语句后出现不可达代码
      "no-unreachable-loop": "error", // 禁止循环体允许一次迭代的循环
      "prefer-const": "error", // 要求使用 const 声明那些声明后不再被修改的变量
      "no-useless-escape": "off", // 取消不必要的转义字符
    },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: "latest",
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: [".vue"],
        sourceType: "module",
      },
    },
    plugins: {
      vue: pluginVue,
    },
    processor: pluginVue.processors[".vue"],
    rules: {
      ...pluginVue.configs.base.rules,
      ...pluginVue.configs["essential"].rules,
      ...pluginVue.configs["recommended"].rules,

      // vue (https://eslint.vuejs.org/rules)
      "vue/v-slot-style": "error", // 强制执行 v-slot 指令样式
      "vue/no-mutating-props": "off", // 不允许组件 prop 的改变
      "vue/custom-event-name-casing": "off", // 为自定义事件名称强制使用特定大小写
      "vue/attributes-order": "off", // vue api 使用顺序，强制执行属性顺序
      "vue/one-component-per-file": "off", // 强制每个组件都应该在自己的文件中
      "vue/html-closing-bracket-newline": "off", // 在标签的右括号之前要求或禁止换行
      "vue/max-attributes-per-line": "off", // 强制每行的最大属性数
      "vue/attribute-hyphenation": "off", // 对模板中的自定义组件强制执行属性命名样式
      "vue/require-default-prop": "off", // 此规则要求为每个 prop 为必填时，必须提供默认值
      "vue/multi-word-component-names": "off", // 要求组件名称始终为 “-” 链接的单词
      "vue/valid-template-root": "off",
      "vue/singleline-html-element-content-newline": "off", // 在单行元素的内容之前和之后需要换行符
      "vue/multiline-html-element-content-newline": "off", // 在多行元素的内容之前和之后需要换行符
      "vue/no-v-html": "off", // 禁止使用 v-html 来防止 XSS 攻击
    },
  },
  {
    files: ["**/*.?([cm])ts", "**/*.?([cm])tsx"],
    languageOptions: {
      // 使用了 @typescript-eslint/parser 解析器，下面 parserOptions 是该解析器的配置信息，官网参考：https://typescript.eslint.org.cn/packages/parser/#jsxpragma
      parser: parserTypeScript,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    plugins: {
      "@typescript-eslint": pluginTypeScript,
    },
    rules: {
      ...pluginTypeScript.configs.strict.rules,
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-redeclare": "error",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/prefer-as-const": "warn",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-wrapper-object-types": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/consistent-type-imports": [
        "off",
        { disallowTypeAnnotations: false, fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/prefer-literal-enum-member": ["error", { allowBitwiseExpressions: true }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-dynamic-delete": "off",
    },
  },
  {
    files: ["**/*.d.ts"],
    rules: {
      "import/no-duplicates": "off",
    },
  },
  {
    files: ["**/*.?([cm])js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },
]);
