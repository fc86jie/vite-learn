/// <reference types="vite/client" />

// 在客户端使用import.meta.env时候有提示信息
interface ImportMetaEnv {
  readonly VITE_APP_KEY: number;
}
