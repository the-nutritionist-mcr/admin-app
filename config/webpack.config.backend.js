const path = require("path");
const PnpWebpackPlugin = require("pnp-webpack-plugin");

module.exports = {
  output: {
    path: path.resolve(__dirname, "..", "dist", "bundles", "backend"),
    libraryTarget: "commonjs2",
    filename: "index.js",
  },
  devtool: "source-map",
  entry: [path.resolve(__dirname, "..", "src", "backend", "index.ts")],
  target: "node",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],

    plugins: [PnpWebpackPlugin],
  },

  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/u,
        use: [
          {
            loader: require.resolve("ts-loader"),
            options: {
              configFile: path.resolve(__dirname, "tsconfig.backend.json"),
            },
          },
        ],
        exclude: "/node_modules/",
      },
    ],
  },
};
