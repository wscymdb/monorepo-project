import { defineConfig } from "cspell"

/**
 * CSpell 配置文件
 * 用于检查项目中的单词拼写错误
 */
export default defineConfig({
    // 配置文件的版本号 (目前主流是 0.2)
    version: "0.2",

    // 拼写检查是否区分大小写
    // false: 不区分。例如 'cat', 'Cat', 'CAT' 都会被认为是同一个单词
    // true: 区分。通常代码里驼峰命名较多，建议设为 false 以避免误报
    caseSensitive: false,

    // 扫描范围：告诉 CSpell 需要检查哪些文件
    // 这里配置了 Monorepo 结构，检查 packages 和 apps 下的源码文件
    // 如果指定了files 里面的没有东西会报错
    // 假设我们下面packages和apps都没有内容就会报错 只要一个有命中的就不会报错
    files: ["packages/**/*.{js,ts,jsx,tsx}", "apps/**/*.{js,ts,jsx,tsx}"],

    /**
     * 自定义词典定义 (这里只是定义，还没启用)
     * 作用：告诉 CSpell 某个词典文件的具体位置和属性
     */
    dictionaryDefinitions: [
        {
            name: "custom-words", // 给这个词典起个名字 (ID)
            path: "./.cspell/custom-words.txt", // 词典文件的实际路径 (需手动创建此文件)

            // 关键配置：允许添加单词
            // 设置为 true 后，你在 VS Code 右键点击"Add to dictionary"时，
            // 单词会自动写入到上面的 custom-words.txt 文件中
            addWords: true
        }
    ],

    // 启用词典列表
    // 注意：上面只是定义了词典，必须在这里列出名字，CSpell 才会真正加载它
    dictionaries: ["custom-words"],

    // 忽略文件列表
    // 那些不仅不需要检查，甚至不需要去读取的文件
    ignorePaths: [
        "**/node_modules/**", // 忽略依赖包 (量大且非自己代码)
        "**/dist/**", // 忽略打包产物
        "**/lib/**", // 忽略编译后的库文件
        "**/docs/**", // 忽略文档 (如果有特殊需求可保留)
        "**/stats.html", // 忽略打包分析报告
        "**/language/**", // 忽略多语言配置 (通常包含拼音或非英语)
        "**/language.ts",
        "**/package.json", // 忽略包配置 (里面有很多包名不是标准单词)
        "eslint.config.js", // 忽略配置文件本身
        "pnpm-lock.yaml", // 忽略锁文件 (包含大量哈希值，会被误判为错词)
        "*.png", // 忽略图片
        "*.jpg"
    ]
})
