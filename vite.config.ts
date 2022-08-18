/// <reference types="vitest" />
/// <reference types="vite/client" />

import { readdirSync } from "fs";
import { join, resolve } from "path";

import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import react from "@vitejs/plugin-react";
import polyfillNodeRollupPlugin from "rollup-plugin-polyfill-node";
import { defineConfig } from "vite";

const rootFolders: { [key: string]: string } = {};

const srcPath = resolve("./src");

const srcFolders = readdirSync(srcPath, { withFileTypes: true }).map((dir) =>
  dir.name.replace(/(\.ts){1}(x?)|(\.svg)|(\.png)|(\.pdf)/, "")
);

srcFolders.forEach((folder) => {
  rootFolders[folder] = join(srcPath, folder);
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
  resolve: {
    alias: { ...rootFolders },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [NodeGlobalsPolyfillPlugin({ buffer: true, process: true })],
    },
  },
  build: {
    rollupOptions: {
      plugins: [polyfillNodeRollupPlugin()],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  server: {
    port: 3001,
    host: true,
  },
});
