/**
 * @Author: wangrenjie86@gmail.com
 * @Date: 2023-01-15 15:00:38
 * @LastEditors: wangrenjie86@gmail.com
 * @LastEditTime: 2023-01-20 11:42:04
 * @FilePath: \main.js
 * @Description:
 */

import './App.vue';
import styleObj from './index.module.scss';
import './variable.css';
// import { count } from './counter.js';
const ele = document.createElement('div');
// 此处styleObj中默认的是'footer-container',可以通过修改vite中的css.modules.localsConvention的配置修改，支持驼峰
ele.classList.add(styleObj.footerContainer);

document.body.appendChild(ele);
