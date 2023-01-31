/**
 * @Author: wangrenjie86@gmail.com
 * @Date: 2023-01-15 20:10:36
 * @LastEditors: wangrenjie86@gmail.com
 * @LastEditTime: 2023-01-30 20:48:26
 * @FilePath: \vite.base.config.js
 * @Description:
 */

import { dirname, resolve } from 'node:path';
import postcssPresetEnv from 'postcss-preset-env';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import { ViteAliases } from 'vite-aliases';
import Inspect from 'vite-plugin-inspect';
import myCreateHtml from './plugins/createHtml';
import myViteAliases from './plugins/viteAliases';

import checker from 'vite-plugin-checker';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  // resolve: {
  //   alias: {
  //     '@': resolve(__dirname, './src'),
  //   },
  // },
  // optimizeDeps: {
  //   exclude: ['lodash-es'], // 制定数组中的依赖不进行预构建
  // },
  css: {
    // 对css进行配置
    // modules最终会被传递给postcss-modules处理
    modules: {
      localsConvention: 'camelCaseOnly', // 修改生成的配置对象的key的展现形式（驼峰还是中横线）,
      scopeBehaviour: 'local', // 配置当前模块化行为是模块化还是全局化（有hash就是开启一个模块化标志，保证不同的hash来控制样式不被覆盖）
      // generateScopedName: '[name]_[local]_[hash:5]', // https://github.com/webpack/loader-utils#interpolatename
      // generateScopedName: (name, filename, css) => {
      //   // name：css中的类名，filename：css文件绝对路径，css：当前样式
      //   return `${name}_${Math.random().toString(36).substring(3, 8)}`;
      // },
      // hashPrefix: 'fc86', // 此字段最终会参与到hash中
      // globalModulePaths: ['./test.module.scss'], // 不参与到css模块化中的文件路径
    },
    // preprocessorOptions: {
    //   scss: {
    //     additionalData: `$injectedColor: orange;`,
    //   },
    // },
    // devSourcemap: true, // 开启css的sourceMap
    postcss: {
      plugins: [
        postcssPresetEnv({
          importFrom: resolve(__dirname, './variable.css'),
        }),
      ],
    },
  },
  plugins: [
    Inspect(),
    myViteAliases(),
    // ViteAliases()
    myCreateHtml({
      title: 'my title',
    }),
    checker({
      // e.g. use TypeScript check
      typescript: true,
    }),
  ],
  build: {
    minify: false,
    rollupOptions: {
      output: {
        assetFileNames: '[hash].[name].[ext]',
        manualChunks: id => {
          // node_modules的package分包
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
