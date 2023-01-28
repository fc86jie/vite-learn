/**
 * @Author: wangrenjie86@gmail.com
 * @Date: 2023-01-28 17:22:28
 * @LastEditors: wangrenjie86@gmail.com
 * @LastEditTime: 2023-01-28 19:20:20
 * @FilePath: \plugins\viteAliases.js
 * @Description:
 */

import fs from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basePath = '../src';

const getDirs = async () => {
  const result = {
    dirs: [],
    files: [],
  };

  let res = await fs.readdir(resolve(__dirname, basePath));
  for (let item of res) {
    const stats = await fs.stat(resolve(__dirname, `${basePath}/${item}`));
    stats.isDirectory() ? result.dirs.push(item) : result.files.push(item);
  }

  return result;
};

export default (options = {}) => ({
  name: options.name || 'myVitePlugin',
  config: async (config, env) => {
    const prefix = options.prefix || '@';
    const { mode, command, ssrBuild } = env;
    let { dirs } = await getDirs();
    let result = {
      [prefix]: resolve(__dirname, `${basePath}`),
    };
    for (let dir of dirs) {
      let dirPath = resolve(__dirname, `${basePath}/${dir}`);
      result[`${prefix}${dir}`] = dirPath;
    }

    return {
      resolve: {
        alias: result,
      },
    };
  },
});
