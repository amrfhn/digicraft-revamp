const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

let mode = process.env.NODE_ENV === "production" ? "production" : "development";
let target = mode === "production" ? "browserslist" : "web";

module.exports = {
  mode: mode,
  target: target,

  output: {
    assetModuleFilename: "images/[hash][ext][query]", //store images to folder in dist
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource", //inline (small sizes images and stored in js) or resource (big size images)
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
  plugins: [new MiniCSSExtractPlugin()],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devtool: "source-map",
  devServer: {
    static: "./dist",
    hot: true,
  },
};
