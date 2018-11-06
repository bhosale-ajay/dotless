const { resolve } = require("path");
const { CheckerPlugin } = require("awesome-typescript-loader");

const config = {
  mode: "production",
  devtool: "hidden-source-map",
  entry: {
    dotless : "./dotless.ts"
  },
  output: {
    library: "[name]",
    libraryTarget: "umd",
    umdNamedDefine: true,
    filename: "[name].js",
    path: resolve(__dirname, "dist"),
    globalObject: "typeof self !== \'undefined\' ? self : this",
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              configFileName: resolve(__dirname, "./tsconfig.json")
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CheckerPlugin()
  ]
};

module.exports = config;
