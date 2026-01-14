import js from "@eslint/js"
import pluginReact from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import unusedImports from "eslint-plugin-unused-imports"
import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import path from "node:path"
import tseslint from "typescript-eslint"

// 引入插件

// eslint9xx中采用的是flat模式 每个item都是一个规则
// 下面的item如果相同规则可以被覆盖
export default defineConfig([
    // 全局过滤
    globalIgnores(["dist", "**/.dumi/tmp/**", "**/.dumi/tmp-production/**", "es/**"]),

    // 定义一个规则(每个item都是一个规则，如果有多个item 那么下面的相同的规则会覆盖上面的)
    {
        /**
         * 这个规则要匹配的文件
         */
        files: ["**/*.{ts,tsx,js,jsx}"],

        // 继承规则
        extends: [
            js.configs.recommended, // 基础 JS 规则
            tseslint.configs.recommended, // tseslint内置规则
            reactHooks.configs.flat.recommended, // 专门针对 React Hooks
            pluginReact.configs.flat.recommended // 通用 React 规则
        ],

        plugins: {
            "unused-imports": unusedImports
        },

        // 语言环境设置 定义了 ESLint 如何解析和理解你的 JavaScript/TypeScript 代码
        languageOptions: {
            /**
             * ECMAScript版本
             * 告诉解析器运行使用哪一版本的js语法特性
             */
            ecmaVersion: 2020,

            /**
             * 声明代码运行在浏览器环境中
             * globals.browser 包含了所有浏览器全局变量
             * 如: window, document, localStorage 等
             *
             * ESLint 默认是禁止使用未定义变量的 (no-undef)。如果你不加这一行，当你在代码里写 window.location 时，ESLint 会报错：'window' is not defined
             */
            globals: globals.browser,

            /**
             * 专门为了 TypeScript 服务的。
             */
            parserOptions: {
                /**
                 * 作用：这告诉 ESLint：“去读这些 tsconfig.json 文件，理解我的项目结构和类型定义”。
                 *
                 * 为啥需要：
                 * 普通的 ESLint 只是把代码当文本看。但有了这个配置，ESLint 就能利用 TypeScript 的编译器（TSC）来分析代码。
                 * 没有它：ESLint 只能检查格式，比如“变量有没有定义”、“是否用了 let”。
                 * 有了它：ESLint 可以检查逻辑和类型。比如@typescript-eslint/await-thenable：会检查你 await 的东西到底是不是一个 Promise。如果不是 Promise 你还 await，它会报错。
                 *
                 *
                 * 虽然 extends 中继承了 tseslint 的推荐规则，
                 * 但必须配置 project 才能让 ESLint 读取 tsconfig.json 里的【类型信息】，
                 * 从而启用那些需要“类型感知”的高级规则。
                 */
                project: [
                    "packages/*/tsconfig.json", // 匹配 packages 下的包
                    "apps/*/tsconfig.json", // 匹配 apps 下的应用
                    "./tsconfig.json" // 根目录的 tsconfig
                ].filter(Boolean),

                /**
                 * 作用： 适配 Monorepo 指向 monorepo 根目录
                 *
                 * 为啥需要：
                 * 你的项目是 Monorepo（多包架构）。ESLint 需要一个“基准目录”来找到project中配置的tsconfig.json。如果没有这行，ESLint 可能会在子目录里迷路，找不到 tsconfig 文件，从而导致解析失败。
                 */
                tsconfigRootDir: path.resolve(process.cwd())
            }
        },

        // 自定义规则
        rules: {
            // 禁止未使用的表达式（如函数调用但没有使用返回值）
            "@typescript-eslint/no-unused-expressions": [
                "error",
                {
                    allowShortCircuit: true, // 允许短路求值：a && b()
                    allowTernary: true, // 允许三元表达式：a ? b() : c()
                    allowTaggedTemplates: true // 允许标记模板字符串
                }
            ],

            // 允许使用 any 类型
            "@typescript-eslint/no-explicit-any": "off",

            // 关闭 TypeScript ESLint 的未使用变量检查（防止与下面的插件重复报错）
            "@typescript-eslint/no-unused-vars": "off",

            // 检查未使用的 import 语句并自动标记为错误
            "unused-imports/no-unused-imports": "error",

            // 统一检查未使用的变量、参数、导入等
            "unused-imports/no-unused-vars": [
                "error",
                {
                    vars: "all",
                    varsIgnorePattern: "^_", // 处理以下划线开头的变量
                    args: "after-used", // 只检查使用后的参数
                    argsIgnorePattern: "^_", // 处理以下划线开头的参数
                    ignoreRestSiblings: true, // 忽略剩余运算符的兄弟属性
                    caughtErrorsIgnorePattern: "^_" // 以下划线开头的 catch 错误参数不视为未使用
                }
            ]
        }
    }
])
