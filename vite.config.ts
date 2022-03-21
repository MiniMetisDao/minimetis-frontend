import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve, join } from "path";

import { readdirSync } from "fs";

const rootFolders: { [key: string]: string } = {};

const srcPath = resolve("./src");
const srcFolders = readdirSync(srcPath, { withFileTypes: true }).map((dirent) =>
  dirent.name.replace(/(\.ts){1}(x?)/, "")
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
});
