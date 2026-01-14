/** @type {import("stylelint").Config} */
export default {
    /**
     * 继承规则集
     *
     * "stylelint-config-standard" 是官方推荐的标准配置
     * 它是 CSS 界的 "Airbnb 规范"，非常流行。
     *
     * 它包含了一大堆默认规则，比如：
     * - 禁止空的样式块 block-no-empty
     * - 颜色值要用小写 color-hex-case
     * - 禁止重复的选择器
     * - 强制标准的 CSS 格式（空格、换行等）
     */
    extends: ["stylelint-config-standard"]
}
