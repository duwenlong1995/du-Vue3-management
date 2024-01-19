import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0", //使用当前的IP地址，没有这个就是以localhost作为本地地址
    port: 3000, //端口号为3000
    open: false, //是否在默认浏览器中自动打开该地址
    proxy: {
      //使用代理
      "/api": {
        //当有 /api开头的地址是，代理到target地址
        target: "http://192.168.1.100:8080", // 需要跨域代理的本地路径
        changeOrigin: true, //是否改变请求源头
        rewrite: (path) => path.replace(/^\/api/, ""), // 路径重写
      },
    },
  },
});
