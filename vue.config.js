const pkg = require('./package.json');


process.env.VUE_APP_NAME = pkg.name;
process.env.VUE_APP_VERSION = pkg.version;


module.exports = {
  lintOnSave: false,
  publicPath: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: true,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined,
};
