const PnpWebpackPlugin = require("pnp-webpack-plugin");
module.exports = {
  resolve: {
    plugins: [PnpWebpackPlugin],
    extensions: [".tsx", ".ts", ".js", ".jsx"],
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
              configFile: path.resolve(__dirname, "tsconfig.json"),
            },
          },
        ],
        exclude: "/node_modules/",
      },
    ],
  },
};
