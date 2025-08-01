const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge( common, {
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
        watchFiles: ["./src/template.html"],
        static: "./dist",
        open: true,
        hot: true,
    },
});