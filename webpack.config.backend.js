const path = require("path");
module.exports = {
  output: {
    path: path.resolve(__dirname, "dist", "bundles", "backend"),
    libraryTarget: "commonjs2",
    filename: "index",
  },
  entry: [path.resolve(__dirname, "dist", "src", "backend", "index.js")],
  target: "node",
};
