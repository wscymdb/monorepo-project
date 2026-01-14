export default {
  arrowParens: "avoid",
  endOfLine: "lf",
  printWidth: 120,
  semi: false,
  tabWidth: 4,
  trailingComma: "none",

  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    // 1. react 相关
    "^react$",
    "^react-",
    "^react/",
    // 2. umi相关
    "^umi$",
    "^umi/",
    // 3. antd 相关
    "^antd$",
    "^antd/",
    "^@ant-design/",
    // 4. 其他三方包 (node_modules 中的包)
    "^[^@./]", // 非 @ 开头、非相对路径的包
    // 5. @ 开头的别名引入
    "^@/",
    // 6. 本地其他组件引入 (相对路径)
    "^[./](?!.*\\.(less|css)$)", // 相对路径，排除样式文件
    // 7. 样式文件引入 (放在最后)
    "^[./].*\\.(less|css)$",
  ],
  importOrderSeparation: false, // 自动在分组之间添加空行
  importOrderSortSpecifiers: true, //
};
