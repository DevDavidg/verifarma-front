const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  chainWebpack: config => {
    config.module
      .rule('ts')
      .use('ts-loader', 'sass-loader')
      .loader('ts-loader')
      .tap(options => {
        options.appendTsSuffixTo = [/\.vue$/];
        return options;
      });
  },
  transpileDependencies: true
})
