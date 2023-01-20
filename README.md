# Vite 学习

### 依赖预构建

vite 首次启动时会执行依赖预构建，预构建后文件存放在`node_modules/.vite/deps/`下，预构建的目的

- **CommonJS 和 UMD 兼容性**：开发阶段中，Vite 的开发服务器将所有代码视为原生 ES 模块。因此，Vite 必须先将作为 CommonJS 或 UMD 发布的依赖项转换为 ESM。
- **性能**：将有许多内部模块的 ESM 依赖关系转换为单个模块（把引入模块语句直接变成引入源代码，多个请求变成单个请求），以提高后续页面加载性能。大量的请求会在浏览器端造成网络拥塞，导致页面的加载速度相当慢

<font color="red">注意：依赖预构建仅会在开发模式下应用，并会使用 esbuild 将依赖转为 ESM 模块。在生产构建中则会使用
@rollup/plugin-commonjs</font>

### vite.config.js 为什么可以使用 esm？

vite 读取 vite.config.js 时，优先使用 node 去解析文件。如果发现是 esm 模块就替换成 cjs

### 环境变量

`pnpm run dev` 默认等价于 `pnpm run dev --mode development`
`pnpm run build` 默认等价于 `pnpm run dev --mode production`

- .env：所有环境都使用配置
- .env.development：开发环境配置（默认为.env.development）
- .env.production：生产环境配置（默认为.env.production）

**服务端**：使用 loadEnv 读取配置，读取.env 文件、.env.[mode]文件、process.env 合并返回最新的 env，通过第三个参数控制导出变量前缀，默认`VITE_`，使用方法`loadEnv(mode, process.cwd(), '')`
**客户端**： env 会被注入到`import.meta.env`中，通过 envPrefix 控制导出变量前缀，默认是 `VITE_`，不能设置为''，防止敏感配置信息外泄

### Vite 处理 css

普通以.css 结尾的文件处理方式：

1. Vite 读取 js 中引入的 css 文件
2. 读取 css 文件内容，并创建一个 style 标签将内容防止到 style 标签内
3. 将 style 标签插入到 head 中
4. 将 css 文件中的内容直接替换成 js 脚本（方便热更新或 css 模块化），同时设置 Content-Type 为 js，让浏览器以 js 的方式执行 css 后缀的文件

.module.css（任何以 .module.css 为后缀名的 CSS 文件都被认为是一个 CSS modules 文件） 结尾的文件处理方式：

1. 将 .module.css 中的类名做一个替换 `footer->\_footer_de3d345_1`
2. 同时创建一个映射的对象`{"footer": "\_footer_de3d345_1"}`
3. 将替换过后的内容放入 style 标签内，在把 style 放入 head 里面
4. 将.module.css 中的内容替换成 js 脚本
5. 将创建的映射对象在脚本中默认导出
