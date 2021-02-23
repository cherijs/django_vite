import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import externalWatch from "./roolup-external-watch";
const { resolve } = require("path");
const rimraf = require("rimraf");

//delete static dir on launch
rimraf.sync(resolve(__dirname, "static"));

const fs = require("fs");

const django_proxy = {
  target: "0.0.0.0:8000",
  changeOrigin: true,
};

export default defineConfig({
  base: "/",
  publicDir: "public",
  watch: {
    clearScreen: false,
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
  build: {
    outDir: "static",
    assetsDir: "vite",
    // cssCodeSplit: false,
    manifest: true,
    rollupOptions: {
      input: {
        main: "index.html",
        // nested: resolve(__dirname, "index.html"),
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: "3333",
    strictPort: true,
    cors: true,
    // https: false, // https.ServerOptions
    https: false,
    proxy: {
      // "/": django_proxy,
      "/index.html": django_proxy,
    },
  },
  plugins: [
    externalWatch(["../jinja2/**/*.html", "../templates/**/*.html"], {
      log: true,
    }),
    vue({
      template: {
        compilerOptions: {
          // ...
        },
      },
    }),
  ],
});
