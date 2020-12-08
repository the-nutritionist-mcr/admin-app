const path = require("path");
module.exports = {
  output: {
    path: path.resolve(__dirname, "dist", "bundles", "backend"),
    libraryTarget: "commonjs2",
    filename: "index.js",
  },
  devtool: "source-map",
  entry: [path.resolve(__dirname, "src", "backend", "index.ts")],
  target: "node",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/u,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.backend.json",
            },
          },
        ],
        exclude: "/node_modules/",
      },
    ],
  },
};
