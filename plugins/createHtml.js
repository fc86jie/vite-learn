/**
 * @Author: wangrenjie86@gmail.com
 * @Date: 2023-01-29 18:18:57
 * @LastEditors: wangrenjie86@gmail.com
 * @LastEditTime: 2023-01-29 20:28:07
 * @FilePath: \plugins\createHtml.js
 * @Description:
 */

export default (options = {}) => ({
  name: options.name || 'myCreateHtmlPlugin',
  transformIndexHtml(html, ctx) {
    return html.replace(/<title>(.*?)<\/title>/, `<title>${options.title || 'title'}</title>`);
  },
});
