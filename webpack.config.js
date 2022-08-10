const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

let mode = process.env.NODE_ENV === "production" ? "production" : "development";
let target = process.env.NODE_ENV === "production" ? "browserslist" : "web";

const pages = fs
  .readdirSync(path.resolve(__dirname, "src"))
  .filter((fileName) => fileName.endsWith(".twig"));

module.exports = {
  mode: mode,
  target: target,
  entry: "./src/js/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[hash][ext]", //store images to folder in dist
    // filename: "js/[name].[hash].js",
  },

  module: {
    rules: [
      {
        test: /\.twig$/,
        use: [
          {
            loader: "html-loader",
            options: {
              attrs: [":src"],
            },
          },
          "twig-html-loader",
        ],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        type: "asset",
        generator: {
          filename: "assets/fonts/[name][ext]",
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource", //inline (small sizes images and stored in js) or resource (big size images)
        generator: {
          filename: "assets/images/[hash][ext][query]",
        },
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
            options: { publicPath: "" },
          },
          "css-loader",
          "postcss-loader",
          { loader: "resolve-url-loader", options: { sourceMap: true } },
          "sass-loader",
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCSSExtractPlugin(),
    ...pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: "src/" + page,
          fileName: page.replace(".twig", ".html"),
          inject: true,
        })
    ),
    // new HtmlWebpackPlugin({
    //   template: "./src/index.html",
    // }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".twig"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
  },
  devtool: "source-map",
  devServer: {
    static: path.resolve(__dirname, './src'),
    hot: true, //hot set to true to only detect changes made upon save, hot has bug in webpack 5, so alternative gotta use livereload
    // static: "./dist",
    // liveReload: true, //livereload will auto reload all files even the file has no changes
  },
};
