const { defineConfig } = require('@vue/cli-service');
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 全局less变量存储路径 -- > 当然 这里的 ImportLessFile 是我封装的方法
        // ImportLessFile(`${BASELESSFIlEPATH}/variable.less`),
        // ImportLessFile(`${BASELESSFIlEPATH}/mxins.less`)
        // 你可以
        path.resolve(__dirname, './src/assets/styles/base.less')
      ]
    }
  },
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            'text-color': '#111',
            'border-color': '#eee',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${ path.resolve(__dirname, './src/assets/styles/theme.less')}";`,
          },
        },
      },
    },
  },

});

