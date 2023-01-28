/**
 * @Author: wangrenjie86@gmail.com
 * @Date: 2023-01-28 19:08:37
 * @LastEditors: wangrenjie86@gmail.com
 * @LastEditTime: 2023-01-28 19:23:45
 * @FilePath: \src\utils\index.js
 * @Description:
 */

export const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a),
    {}
  );
