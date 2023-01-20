/**
 * @Author: wangrenjie86@gmail.com
 * @Date: 2023-01-20 10:46:22
 * @LastEditors: wangrenjie86@gmail.com
 * @LastEditTime: 2023-01-20 11:06:41
 * @FilePath: \postcss.config.js
 * @Description:
 */

const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [postcssPresetEnv()],
};
