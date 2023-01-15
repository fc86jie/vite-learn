/**
 * @Author: wangrenjie86@gmail.com
 * @Date: 2023-01-15 16:58:23
 * @LastEditors: wangrenjie86@gmail.com
 * @LastEditTime: 2023-01-15 21:54:33
 * @FilePath: \vite.config.js
 * @Description:
 */

import { defineConfig, loadEnv } from 'vite';
import viteBaseConfig from './vite.base.config';
import viteDevConfig from './vite.dev.config';
import viteProdConfig from './vite.prod.config';

const envResolver = {
  // 开发环境
  serve: () => ({ ...viteBaseConfig, ...viteDevConfig }),
  // 生产环境
  build: () => ({ ...viteBaseConfig, ...viteProdConfig }),
};

export default defineConfig(({ command, mode }) => {
  // 读取 .env文件和.env.[mode]文件并合并生成需要的env
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '');
  return envResolver[command]();
});
