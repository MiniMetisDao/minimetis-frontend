module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    es6: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["import", "prettier"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "."],
      },
    },
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        tabWidth: 2,
        semi: true,
        singleQuote: false,
        endOfLine: "auto",
      },
    ],
    "no-unused-vars": "off",
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "multiline-const", next: "multiline-const" },
      { blankLine: "always", prev: "expression", next: "multiline-const" },
      { blankLine: "always", prev: "multiline-const", next: "expression" },
      { blankLine: "always", prev: "const", next: "multiline-const" },
      { blankLine: "always", prev: "multiline-const", next: "const" },
      { blankLine: "always", prev: "*", next: "return" },
    ],
    "sort-imports": ["error", { ignoreDeclarationSort: true }],
    "import/newline-after-import": ["error", { count: 1 }],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
        alphabetize: { order: "asc" },
      },
    ],
    "@typescript-eslint/no-explicit-any": "off",
  },
};
