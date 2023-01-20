/**
 * @Author: wangrenjie86@gmail.com
 * @Date: 2023-01-18 12:04:47
 * @LastEditors: wangrenjie86@gmail.com
 * @LastEditTime: 2023-01-18 12:25:56
 * @FilePath: \dev-server\index.js
 * @Description:
 */

import koa from 'koa';
import fs from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = new koa();

app.use(async (ctx, next) => {
  const { request: req, response: res } = ctx;

  // 根路径读取index.html
  if (req.url === '/') {
    let data = await fs.readFile(resolve(__dirname, `../index.html`));
    res.set('Content-Type', 'text/html');
    res.body = data.toString();
  }

  // 以.js结尾的读取js文件，.vue结尾的也以js文件格式返回（.vue在返回之前已经被编译为js文件）
  if (req.url.endsWith('.js') || req.url.endsWith('.vue')) {
    let data = await fs.readFile(resolve(__dirname, `..${req.url}`));
    res.set('Content-Type', 'text/javascript');
    res.body = data.toString();
  }
});

app.listen(5173, () => {
  console.log('vite dev server on 5173');
});
