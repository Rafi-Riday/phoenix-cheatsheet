import katex from "katex";
export default function Katexify(expression, displayMode = false) {
    const options = {
        displayMode: displayMode,
        throwOnError: false
    };
    return katex.renderToString(expression.replace(/\\\\/g, "\\"), options);
}