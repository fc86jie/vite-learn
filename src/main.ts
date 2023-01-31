/*
 * @Author: wangrenjie86@gmail.com
 * @Date: 2023-01-30 12:05:27
 * @LastEditors: wangrenjie86@gmail.com
 * @LastEditTime: 2023-01-30 20:47:50
 * @FilePath: \src\main.ts
 * @Description:
 */
import { forEach } from 'lodash-es';

interface Person {
  name: string;
  age: number;
}

let p1: Person = {
  name: '张三',
  age: 18,
};

console.log(p1);

console.log(import.meta.env.VITE_APP_KEY);

let arr = [1, 2, 3];
forEach(arr, item => {
  console.log('------ttt--------', item);
});
