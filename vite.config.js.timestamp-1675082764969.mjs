// vite.config.js
import { defineConfig as defineConfig4, loadEnv } from "file:///D:/project/vite-learn/node_modules/.pnpm/vite@4.0.4_sass@1.57.1/node_modules/vite/dist/node/index.js";

// vite.base.config.js
import { dirname as dirname2, resolve as resolve2 } from "node:path";
import postcssPresetEnv from "file:///D:/project/vite-learn/node_modules/.pnpm/postcss-preset-env@7.8.3_postcss@8.4.21/node_modules/postcss-preset-env/dist/index.mjs";
import { fileURLToPath as fileURLToPath2 } from "url";
import { defineConfig } from "file:///D:/project/vite-learn/node_modules/.pnpm/vite@4.0.4_sass@1.57.1/node_modules/vite/dist/node/index.js";
import { ViteAliases } from "file:///D:/project/vite-learn/node_modules/.pnpm/vite-aliases@0.10.0_sass@1.57.1/node_modules/vite-aliases/dist/index.js";
import Inspect from "file:///D:/project/vite-learn/node_modules/.pnpm/vite-plugin-inspect@0.7.15_vite@4.0.4/node_modules/vite-plugin-inspect/dist/index.mjs";

// plugins/createHtml.js
var createHtml_default = (options = {}) => ({
  name: options.name || "myCreateHtmlPlugin",
  transformIndexHtml(html, ctx) {
    return html.replace(/<title>(.*?)<\/title>/, `<title>${options.title || "title"}</title>`);
  }
});

// plugins/viteAliases.js
import fs from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "url";
var __vite_injected_original_import_meta_url = "file:///D:/project/vite-learn/plugins/viteAliases.js";
var __filename = fileURLToPath(__vite_injected_original_import_meta_url);
var __dirname = dirname(__filename);
var basePath = "../src";
var getDirs = async () => {
  const result = {
    dirs: [],
    files: []
  };
  let res = await fs.readdir(resolve(__dirname, basePath));
  for (let item of res) {
    const stats = await fs.stat(resolve(__dirname, `${basePath}/${item}`));
    stats.isDirectory() ? result.dirs.push(item) : result.files.push(item);
  }
  return result;
};
var viteAliases_default = (options = {}) => ({
  name: options.name || "myVitePlugin",
  config: async (config, env) => {
    const prefix = options.prefix || "@";
    const { mode, command, ssrBuild } = env;
    let { dirs } = await getDirs();
    let result = {
      [prefix]: resolve(__dirname, `${basePath}`)
    };
    for (let dir of dirs) {
      let dirPath = resolve(__dirname, `${basePath}/${dir}`);
      result[`${prefix}${dir}`] = dirPath;
    }
    return {
      resolve: {
        alias: result
      }
    };
  }
});

// vite.base.config.js
import checker from "file:///D:/project/vite-learn/node_modules/.pnpm/vite-plugin-checker@0.5.5_gl4qsmwzp7wy5uclz4tx77gbli/node_modules/vite-plugin-checker/dist/esm/main.js";
var __vite_injected_original_import_meta_url2 = "file:///D:/project/vite-learn/vite.base.config.js";
var __filename2 = fileURLToPath2(__vite_injected_original_import_meta_url2);
var __dirname2 = dirname2(__filename2);
var vite_base_config_default = defineConfig({
  // resolve: {
  //   alias: {
  //     '@': resolve(__dirname, './src'),
  //   },
  // },
  // optimizeDeps: {
  //   exclude: ['lodash-es'], // ??????????????????????????????????????????
  // },
  css: {
    // ???css????????????
    // modules?????????????????????postcss-modules??????
    modules: {
      localsConvention: "camelCaseOnly",
      // ??????????????????????????????key??????????????????????????????????????????,
      scopeBehaviour: "local"
      // ????????????????????????????????????????????????????????????hash???????????????????????????????????????????????????hash??????????????????????????????
      // generateScopedName: '[name]_[local]_[hash:5]', // https://github.com/webpack/loader-utils#interpolatename
      // generateScopedName: (name, filename, css) => {
      //   // name???css???????????????filename???css?????????????????????css???????????????
      //   return `${name}_${Math.random().toString(36).substring(3, 8)}`;
      // },
      // hashPrefix: 'fc86', // ???????????????????????????hash???
      // globalModulePaths: ['./test.module.scss'], // ????????????css???????????????????????????
    },
    // preprocessorOptions: {
    //   scss: {
    //     additionalData: `$injectedColor: orange;`,
    //   },
    // },
    // devSourcemap: true, // ??????css???sourceMap
    postcss: {
      plugins: [
        postcssPresetEnv({
          importFrom: resolve2(__dirname2, "./variable.css")
        })
      ]
    }
  },
  plugins: [
    Inspect(),
    viteAliases_default(),
    // ViteAliases()
    createHtml_default({
      title: "my title"
    }),
    checker({
      // e.g. use TypeScript check
      typescript: true
    })
  ],
  build: {
    minify: false,
    rollupOptions: {
      output: {
        assetFileNames: "[hash].[name].[ext]",
        manualChunks: (id) => {
          console.log("id\uFF1A", id);
          if (id.includes("node_modules")) {
            return "vender";
          }
        }
      }
    }
  }
});

// vite.dev.config.js
import { defineConfig as defineConfig2 } from "file:///D:/project/vite-learn/node_modules/.pnpm/vite@4.0.4_sass@1.57.1/node_modules/vite/dist/node/index.js";
var vite_dev_config_default = defineConfig2({});

// vite.prod.config.js
import { defineConfig as defineConfig3 } from "file:///D:/project/vite-learn/node_modules/.pnpm/vite@4.0.4_sass@1.57.1/node_modules/vite/dist/node/index.js";
var vite_prod_config_default = defineConfig3({});

// vite.config.js
var envResolver = {
  // ????????????
  serve: () => ({ ...vite_base_config_default, ...vite_dev_config_default }),
  // ????????????
  build: () => ({ ...vite_base_config_default, ...vite_prod_config_default })
};
var vite_config_default = defineConfig4(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return envResolver[command]();
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAidml0ZS5iYXNlLmNvbmZpZy5qcyIsICJwbHVnaW5zL2NyZWF0ZUh0bWwuanMiLCAicGx1Z2lucy92aXRlQWxpYXNlcy5qcyIsICJ2aXRlLmRldi5jb25maWcuanMiLCAidml0ZS5wcm9kLmNvbmZpZy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHByb2plY3RcXFxcdml0ZS1sZWFyblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxccHJvamVjdFxcXFx2aXRlLWxlYXJuXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9wcm9qZWN0L3ZpdGUtbGVhcm4vdml0ZS5jb25maWcuanNcIjsvKipcclxuICogQEF1dGhvcjogd2FuZ3JlbmppZTg2QGdtYWlsLmNvbVxyXG4gKiBARGF0ZTogMjAyMy0wMS0xNSAxNjo1ODoyM1xyXG4gKiBATGFzdEVkaXRvcnM6IHdhbmdyZW5qaWU4NkBnbWFpbC5jb21cclxuICogQExhc3RFZGl0VGltZTogMjAyMy0wMS0xNSAyMTo1NDozM1xyXG4gKiBARmlsZVBhdGg6IFxcdml0ZS5jb25maWcuanNcclxuICogQERlc2NyaXB0aW9uOlxyXG4gKi9cclxuXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgdml0ZUJhc2VDb25maWcgZnJvbSAnLi92aXRlLmJhc2UuY29uZmlnJztcclxuaW1wb3J0IHZpdGVEZXZDb25maWcgZnJvbSAnLi92aXRlLmRldi5jb25maWcnO1xyXG5pbXBvcnQgdml0ZVByb2RDb25maWcgZnJvbSAnLi92aXRlLnByb2QuY29uZmlnJztcclxuXHJcbmNvbnN0IGVudlJlc29sdmVyID0ge1xyXG4gIC8vIFx1NUYwMFx1NTNEMVx1NzNBRlx1NTg4M1xyXG4gIHNlcnZlOiAoKSA9PiAoeyAuLi52aXRlQmFzZUNvbmZpZywgLi4udml0ZURldkNvbmZpZyB9KSxcclxuICAvLyBcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcclxuICBidWlsZDogKCkgPT4gKHsgLi4udml0ZUJhc2VDb25maWcsIC4uLnZpdGVQcm9kQ29uZmlnIH0pLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfSkgPT4ge1xyXG4gIC8vIFx1OEJGQlx1NTNENiAuZW52XHU2NTg3XHU0RUY2XHU1NDhDLmVudi5bbW9kZV1cdTY1ODdcdTRFRjZcdTVFNzZcdTU0MDhcdTVFNzZcdTc1MUZcdTYyMTBcdTk3MDBcdTg5ODFcdTc2ODRlbnZcclxuICAvLyBcdThCQkVcdTdGNkVcdTdCMkNcdTRFMDlcdTRFMkFcdTUzQzJcdTY1NzBcdTRFM0EgJycgXHU2NzY1XHU1MkEwXHU4RjdEXHU2MjQwXHU2NzA5XHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXHVGRjBDXHU4MDBDXHU0RTBEXHU3QkExXHU2NjJGXHU1NDI2XHU2NzA5IGBWSVRFX2AgXHU1MjREXHU3RjAwXHUzMDAyXHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJyk7XHJcbiAgcmV0dXJuIGVudlJlc29sdmVyW2NvbW1hbmRdKCk7XHJcbn0pO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHByb2plY3RcXFxcdml0ZS1sZWFyblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxccHJvamVjdFxcXFx2aXRlLWxlYXJuXFxcXHZpdGUuYmFzZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3Byb2plY3Qvdml0ZS1sZWFybi92aXRlLmJhc2UuY29uZmlnLmpzXCI7LyoqXHJcbiAqIEBBdXRob3I6IHdhbmdyZW5qaWU4NkBnbWFpbC5jb21cclxuICogQERhdGU6IDIwMjMtMDEtMTUgMjA6MTA6MzZcclxuICogQExhc3RFZGl0b3JzOiB3YW5ncmVuamllODZAZ21haWwuY29tXHJcbiAqIEBMYXN0RWRpdFRpbWU6IDIwMjMtMDEtMzAgMTI6MTI6NThcclxuICogQEZpbGVQYXRoOiBcXHZpdGUuYmFzZS5jb25maWcuanNcclxuICogQERlc2NyaXB0aW9uOlxyXG4gKi9cclxuXHJcbmltcG9ydCB7IGRpcm5hbWUsIHJlc29sdmUgfSBmcm9tICdub2RlOnBhdGgnO1xyXG5pbXBvcnQgcG9zdGNzc1ByZXNldEVudiBmcm9tICdwb3N0Y3NzLXByZXNldC1lbnYnO1xyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAndXJsJztcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB7IFZpdGVBbGlhc2VzIH0gZnJvbSAndml0ZS1hbGlhc2VzJztcclxuaW1wb3J0IEluc3BlY3QgZnJvbSAndml0ZS1wbHVnaW4taW5zcGVjdCc7XHJcbmltcG9ydCBteUNyZWF0ZUh0bWwgZnJvbSAnLi9wbHVnaW5zL2NyZWF0ZUh0bWwnO1xyXG5pbXBvcnQgbXlWaXRlQWxpYXNlcyBmcm9tICcuL3BsdWdpbnMvdml0ZUFsaWFzZXMnO1xyXG5cclxuaW1wb3J0IGNoZWNrZXIgZnJvbSAndml0ZS1wbHVnaW4tY2hlY2tlcic7XHJcblxyXG5jb25zdCBfX2ZpbGVuYW1lID0gZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpO1xyXG5jb25zdCBfX2Rpcm5hbWUgPSBkaXJuYW1lKF9fZmlsZW5hbWUpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAvLyByZXNvbHZlOiB7XHJcbiAgLy8gICBhbGlhczoge1xyXG4gIC8vICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcclxuICAvLyAgIH0sXHJcbiAgLy8gfSxcclxuICAvLyBvcHRpbWl6ZURlcHM6IHtcclxuICAvLyAgIGV4Y2x1ZGU6IFsnbG9kYXNoLWVzJ10sIC8vIFx1NTIzNlx1NUI5QVx1NjU3MFx1N0VDNFx1NEUyRFx1NzY4NFx1NEY5RFx1OEQ1Nlx1NEUwRFx1OEZEQlx1ODg0Q1x1OTg4NFx1Njc4NFx1NUVGQVxyXG4gIC8vIH0sXHJcbiAgY3NzOiB7XHJcbiAgICAvLyBcdTVCRjljc3NcdThGREJcdTg4NENcdTkxNERcdTdGNkVcclxuICAgIC8vIG1vZHVsZXNcdTY3MDBcdTdFQzhcdTRGMUFcdTg4QUJcdTRGMjBcdTkwMTJcdTdFRDlwb3N0Y3NzLW1vZHVsZXNcdTU5MDRcdTc0MDZcclxuICAgIG1vZHVsZXM6IHtcclxuICAgICAgbG9jYWxzQ29udmVudGlvbjogJ2NhbWVsQ2FzZU9ubHknLCAvLyBcdTRGRUVcdTY1MzlcdTc1MUZcdTYyMTBcdTc2ODRcdTkxNERcdTdGNkVcdTVCRjlcdThDNjFcdTc2ODRrZXlcdTc2ODRcdTVDNTVcdTczQjBcdTVGNjJcdTVGMEZcdUZGMDhcdTlBN0NcdTVDRjBcdThGRDhcdTY2MkZcdTRFMkRcdTZBMkFcdTdFQkZcdUZGMDksXHJcbiAgICAgIHNjb3BlQmVoYXZpb3VyOiAnbG9jYWwnLCAvLyBcdTkxNERcdTdGNkVcdTVGNTNcdTUyNERcdTZBMjFcdTU3NTdcdTUzMTZcdTg4NENcdTRFM0FcdTY2MkZcdTZBMjFcdTU3NTdcdTUzMTZcdThGRDhcdTY2MkZcdTUxNjhcdTVDNDBcdTUzMTZcdUZGMDhcdTY3MDloYXNoXHU1QzMxXHU2NjJGXHU1RjAwXHU1NDJGXHU0RTAwXHU0RTJBXHU2QTIxXHU1NzU3XHU1MzE2XHU2ODA3XHU1RkQ3XHVGRjBDXHU0RkREXHU4QkMxXHU0RTBEXHU1NDBDXHU3Njg0aGFzaFx1Njc2NVx1NjNBN1x1NTIzNlx1NjgzN1x1NUYwRlx1NEUwRFx1ODhBQlx1ODk4Nlx1NzZENlx1RkYwOVxyXG4gICAgICAvLyBnZW5lcmF0ZVNjb3BlZE5hbWU6ICdbbmFtZV1fW2xvY2FsXV9baGFzaDo1XScsIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrL2xvYWRlci11dGlscyNpbnRlcnBvbGF0ZW5hbWVcclxuICAgICAgLy8gZ2VuZXJhdGVTY29wZWROYW1lOiAobmFtZSwgZmlsZW5hbWUsIGNzcykgPT4ge1xyXG4gICAgICAvLyAgIC8vIG5hbWVcdUZGMUFjc3NcdTRFMkRcdTc2ODRcdTdDN0JcdTU0MERcdUZGMENmaWxlbmFtZVx1RkYxQWNzc1x1NjU4N1x1NEVGNlx1N0VERFx1NUJGOVx1OERFRlx1NUY4NFx1RkYwQ2Nzc1x1RkYxQVx1NUY1M1x1NTI0RFx1NjgzN1x1NUYwRlxyXG4gICAgICAvLyAgIHJldHVybiBgJHtuYW1lfV8ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygzLCA4KX1gO1xyXG4gICAgICAvLyB9LFxyXG4gICAgICAvLyBoYXNoUHJlZml4OiAnZmM4NicsIC8vIFx1NkI2NFx1NUI1N1x1NkJCNVx1NjcwMFx1N0VDOFx1NEYxQVx1NTNDMlx1NEUwRVx1NTIzMGhhc2hcdTRFMkRcclxuICAgICAgLy8gZ2xvYmFsTW9kdWxlUGF0aHM6IFsnLi90ZXN0Lm1vZHVsZS5zY3NzJ10sIC8vIFx1NEUwRFx1NTNDMlx1NEUwRVx1NTIzMGNzc1x1NkEyMVx1NTc1N1x1NTMxNlx1NEUyRFx1NzY4NFx1NjU4N1x1NEVGNlx1OERFRlx1NUY4NFxyXG4gICAgfSxcclxuICAgIC8vIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgIC8vICAgc2Nzczoge1xyXG4gICAgLy8gICAgIGFkZGl0aW9uYWxEYXRhOiBgJGluamVjdGVkQ29sb3I6IG9yYW5nZTtgLFxyXG4gICAgLy8gICB9LFxyXG4gICAgLy8gfSxcclxuICAgIC8vIGRldlNvdXJjZW1hcDogdHJ1ZSwgLy8gXHU1RjAwXHU1NDJGY3NzXHU3Njg0c291cmNlTWFwXHJcbiAgICBwb3N0Y3NzOiB7XHJcbiAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICBwb3N0Y3NzUHJlc2V0RW52KHtcclxuICAgICAgICAgIGltcG9ydEZyb206IHJlc29sdmUoX19kaXJuYW1lLCAnLi92YXJpYWJsZS5jc3MnKSxcclxuICAgICAgICB9KSxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBwbHVnaW5zOiBbXHJcbiAgICBJbnNwZWN0KCksXHJcbiAgICBteVZpdGVBbGlhc2VzKCksXHJcbiAgICAvLyBWaXRlQWxpYXNlcygpXHJcbiAgICBteUNyZWF0ZUh0bWwoe1xyXG4gICAgICB0aXRsZTogJ215IHRpdGxlJyxcclxuICAgIH0pLFxyXG4gICAgY2hlY2tlcih7XHJcbiAgICAgIC8vIGUuZy4gdXNlIFR5cGVTY3JpcHQgY2hlY2tcclxuICAgICAgdHlwZXNjcmlwdDogdHJ1ZSxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIG1pbmlmeTogZmFsc2UsXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAnW2hhc2hdLltuYW1lXS5bZXh0XScsXHJcbiAgICAgICAgbWFudWFsQ2h1bmtzOiBpZCA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnaWRcdUZGMUEnLCBpZCk7XHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAndmVuZGVyJztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXHZpdGUtbGVhcm5cXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxccHJvamVjdFxcXFx2aXRlLWxlYXJuXFxcXHBsdWdpbnNcXFxcY3JlYXRlSHRtbC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovcHJvamVjdC92aXRlLWxlYXJuL3BsdWdpbnMvY3JlYXRlSHRtbC5qc1wiOy8qKlxyXG4gKiBAQXV0aG9yOiB3YW5ncmVuamllODZAZ21haWwuY29tXHJcbiAqIEBEYXRlOiAyMDIzLTAxLTI5IDE4OjE4OjU3XHJcbiAqIEBMYXN0RWRpdG9yczogd2FuZ3JlbmppZTg2QGdtYWlsLmNvbVxyXG4gKiBATGFzdEVkaXRUaW1lOiAyMDIzLTAxLTI5IDIwOjI4OjA3XHJcbiAqIEBGaWxlUGF0aDogXFxwbHVnaW5zXFxjcmVhdGVIdG1sLmpzXHJcbiAqIEBEZXNjcmlwdGlvbjpcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCAob3B0aW9ucyA9IHt9KSA9PiAoe1xyXG4gIG5hbWU6IG9wdGlvbnMubmFtZSB8fCAnbXlDcmVhdGVIdG1sUGx1Z2luJyxcclxuICB0cmFuc2Zvcm1JbmRleEh0bWwoaHRtbCwgY3R4KSB7XHJcbiAgICByZXR1cm4gaHRtbC5yZXBsYWNlKC88dGl0bGU+KC4qPyk8XFwvdGl0bGU+LywgYDx0aXRsZT4ke29wdGlvbnMudGl0bGUgfHwgJ3RpdGxlJ308L3RpdGxlPmApO1xyXG4gIH0sXHJcbn0pO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHByb2plY3RcXFxcdml0ZS1sZWFyblxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXHZpdGUtbGVhcm5cXFxccGx1Z2luc1xcXFx2aXRlQWxpYXNlcy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovcHJvamVjdC92aXRlLWxlYXJuL3BsdWdpbnMvdml0ZUFsaWFzZXMuanNcIjsvKipcclxuICogQEF1dGhvcjogd2FuZ3JlbmppZTg2QGdtYWlsLmNvbVxyXG4gKiBARGF0ZTogMjAyMy0wMS0yOCAxNzoyMjoyOFxyXG4gKiBATGFzdEVkaXRvcnM6IHdhbmdyZW5qaWU4NkBnbWFpbC5jb21cclxuICogQExhc3RFZGl0VGltZTogMjAyMy0wMS0yOSAxODozNDoxMFxyXG4gKiBARmlsZVBhdGg6IFxccGx1Z2luc1xcdml0ZUFsaWFzZXMuanNcclxuICogQERlc2NyaXB0aW9uOlxyXG4gKi9cclxuXHJcbmltcG9ydCBmcyBmcm9tICdub2RlOmZzL3Byb21pc2VzJztcclxuaW1wb3J0IHsgZGlybmFtZSwgcmVzb2x2ZSB9IGZyb20gJ25vZGU6cGF0aCc7XHJcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnO1xyXG5cclxuY29uc3QgX19maWxlbmFtZSA9IGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKTtcclxuY29uc3QgX19kaXJuYW1lID0gZGlybmFtZShfX2ZpbGVuYW1lKTtcclxuY29uc3QgYmFzZVBhdGggPSAnLi4vc3JjJztcclxuXHJcbmNvbnN0IGdldERpcnMgPSBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgcmVzdWx0ID0ge1xyXG4gICAgZGlyczogW10sXHJcbiAgICBmaWxlczogW10sXHJcbiAgfTtcclxuXHJcbiAgbGV0IHJlcyA9IGF3YWl0IGZzLnJlYWRkaXIocmVzb2x2ZShfX2Rpcm5hbWUsIGJhc2VQYXRoKSk7XHJcbiAgZm9yIChsZXQgaXRlbSBvZiByZXMpIHtcclxuICAgIGNvbnN0IHN0YXRzID0gYXdhaXQgZnMuc3RhdChyZXNvbHZlKF9fZGlybmFtZSwgYCR7YmFzZVBhdGh9LyR7aXRlbX1gKSk7XHJcbiAgICBzdGF0cy5pc0RpcmVjdG9yeSgpID8gcmVzdWx0LmRpcnMucHVzaChpdGVtKSA6IHJlc3VsdC5maWxlcy5wdXNoKGl0ZW0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChvcHRpb25zID0ge30pID0+ICh7XHJcbiAgbmFtZTogb3B0aW9ucy5uYW1lIHx8ICdteVZpdGVQbHVnaW4nLFxyXG4gIGNvbmZpZzogYXN5bmMgKGNvbmZpZywgZW52KSA9PiB7XHJcbiAgICBjb25zdCBwcmVmaXggPSBvcHRpb25zLnByZWZpeCB8fCAnQCc7XHJcbiAgICBjb25zdCB7IG1vZGUsIGNvbW1hbmQsIHNzckJ1aWxkIH0gPSBlbnY7XHJcbiAgICBsZXQgeyBkaXJzIH0gPSBhd2FpdCBnZXREaXJzKCk7XHJcbiAgICBsZXQgcmVzdWx0ID0ge1xyXG4gICAgICBbcHJlZml4XTogcmVzb2x2ZShfX2Rpcm5hbWUsIGAke2Jhc2VQYXRofWApLFxyXG4gICAgfTtcclxuICAgIGZvciAobGV0IGRpciBvZiBkaXJzKSB7XHJcbiAgICAgIGxldCBkaXJQYXRoID0gcmVzb2x2ZShfX2Rpcm5hbWUsIGAke2Jhc2VQYXRofS8ke2Rpcn1gKTtcclxuICAgICAgcmVzdWx0W2Ake3ByZWZpeH0ke2Rpcn1gXSA9IGRpclBhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgIGFsaWFzOiByZXN1bHQsXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gIH0sXHJcbn0pO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHByb2plY3RcXFxcdml0ZS1sZWFyblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxccHJvamVjdFxcXFx2aXRlLWxlYXJuXFxcXHZpdGUuZGV2LmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovcHJvamVjdC92aXRlLWxlYXJuL3ZpdGUuZGV2LmNvbmZpZy5qc1wiOy8qKlxyXG4gKiBAQXV0aG9yOiB3YW5ncmVuamllODZAZ21haWwuY29tXHJcbiAqIEBEYXRlOiAyMDIzLTAxLTE1IDIwOjEwOjM2XHJcbiAqIEBMYXN0RWRpdG9yczogd2FuZ3JlbmppZTg2QGdtYWlsLmNvbVxyXG4gKiBATGFzdEVkaXRUaW1lOiAyMDIzLTAxLTE1IDIwOjEzOjQwXHJcbiAqIEBGaWxlUGF0aDogXFx2aXRlLmRldi5jb25maWcuanNcclxuICogQERlc2NyaXB0aW9uOlxyXG4gKi9cclxuXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHt9KTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXHZpdGUtbGVhcm5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHByb2plY3RcXFxcdml0ZS1sZWFyblxcXFx2aXRlLnByb2QuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9wcm9qZWN0L3ZpdGUtbGVhcm4vdml0ZS5wcm9kLmNvbmZpZy5qc1wiOy8qKlxyXG4gKiBAQXV0aG9yOiB3YW5ncmVuamllODZAZ21haWwuY29tXHJcbiAqIEBEYXRlOiAyMDIzLTAxLTE1IDIwOjEwOjM2XHJcbiAqIEBMYXN0RWRpdG9yczogd2FuZ3JlbmppZTg2QGdtYWlsLmNvbVxyXG4gKiBATGFzdEVkaXRUaW1lOiAyMDIzLTAxLTE1IDIwOjEzOjM1XHJcbiAqIEBGaWxlUGF0aDogXFx2aXRlLnByb2QuY29uZmlnLmpzXHJcbiAqIEBEZXNjcmlwdGlvbjpcclxuICovXHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7fSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFTQSxTQUFTLGdCQUFBQSxl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QUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sZ0JBQWdCO0FBQUEsUUFDaEIsY0FBYyxRQUFNO0FBQ2xCLGtCQUFRLElBQUksWUFBTyxFQUFFO0FBQ3JCLGNBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixtQkFBTztBQUFBLFVBQ1Q7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzs7O0FHN0VELFNBQVMsZ0JBQUFHLHFCQUFvQjtBQUU3QixJQUFPLDBCQUFRQyxjQUFhLENBQUMsQ0FBQzs7O0FDRjlCLFNBQVMsZ0JBQUFDLHFCQUFvQjtBQUU3QixJQUFPLDJCQUFRQyxjQUFhLENBQUMsQ0FBQzs7O0FMRzlCLElBQU0sY0FBYztBQUFBO0FBQUEsRUFFbEIsT0FBTyxPQUFPLEVBQUUsR0FBRywwQkFBZ0IsR0FBRyx3QkFBYztBQUFBO0FBQUEsRUFFcEQsT0FBTyxPQUFPLEVBQUUsR0FBRywwQkFBZ0IsR0FBRyx5QkFBZTtBQUN2RDtBQUVBLElBQU8sc0JBQVFDLGNBQWEsQ0FBQyxFQUFFLFNBQVMsS0FBSyxNQUFNO0FBR2pELFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUMzQyxTQUFPLFlBQVksT0FBTyxFQUFFO0FBQzlCLENBQUM7IiwKICAibmFtZXMiOiBbImRlZmluZUNvbmZpZyIsICJkaXJuYW1lIiwgInJlc29sdmUiLCAiZmlsZVVSTFRvUGF0aCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsIiwgIl9fZmlsZW5hbWUiLCAiZmlsZVVSTFRvUGF0aCIsICJfX2Rpcm5hbWUiLCAiZGlybmFtZSIsICJyZXNvbHZlIiwgImRlZmluZUNvbmZpZyIsICJkZWZpbmVDb25maWciLCAiZGVmaW5lQ29uZmlnIiwgImRlZmluZUNvbmZpZyIsICJkZWZpbmVDb25maWciXQp9Cg==
