const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",

  entry: {
    entry: resolve("src/index.ts"),
  },
  //出口文件的配置项
  output: {
    path: resolve("dist"),
    filename: "bundle.js",
    environment: {
      // 兼容IE11取消webpack中箭头函数——可选
      arrowFunction: false,
      // 兼容IE10取消webpack中const——可选
      const: false,
    },
    publicPath: "/Ts_Snake/",
  },

  resolve: {
    extensions: [".ts", ".js", "scss", "css"],
    alias: {
      "@": resolve("src"),
      "@css": resolve("src/css"),
    },
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      //指定要用到的模板文件
      template: resolve("src/index.html"),
      filename: "index.html",
    }),
  ],

  module: {
    rules: [
      // scss文件的处理
      {
        test: /.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "postcss-loader" },
          { loader: "sass-loader" },
          // 处理全局变量的加载器
          {
            loader: "sass-resources-loader",
            options: {
              resources: [
                resolve("src/css/_var.scss"),
                resolve("src/css/_minxin.scss"),
              ],
            },
          },
        ],
      },
      // Ts文件的处理
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      chrome: "58",
                      ie: "11",
                    },
                  },
                ],
              ],
            },
          },
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
};
