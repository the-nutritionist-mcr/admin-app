const webpackPreprocessor = require("@cypress/webpack-preprocessor");
const config = (on) => {
  const options = {
    webpackOptions: require("../webpack.config"),
    watchOptions: {},
  };

  on("file:preprocessor", webpackPreprocessor(options));
};

module.exports = config;
