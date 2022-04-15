/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { resolve, join } from "path";
import { defineConfig } from "vite";

import { readdirSync } from "fs";

const rootFolders: { [key: string]: string } = {};

const srcPath = resolve("./src");
const srcFolders = readdirSync(srcPath, { withFileTypes: true }).map((dirent) =>
  dirent.name.replace(/(\.ts){1}(x?)|(\.svg)|(\.png)/, "")
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
