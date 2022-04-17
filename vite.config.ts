/// <reference types="vitest" />
/// <reference types="vite/client" />

import { readdirSync } from "fs";
import { join, resolve } from "path";

import react from "@vitejs/plugin-react";
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
  resolve: {
    alias: { ...rootFolders },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/utils/testUtils/setup.ts"],
  },
});
