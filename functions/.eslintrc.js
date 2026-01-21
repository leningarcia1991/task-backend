module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json"],
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ["/lib/**/*", "/generated/**/*", ".eslintrc.js"],
  plugins: ["@typescript-eslint", "import"],
  rules: {
    "quotes": ["error", "double"],
    "indent": ["error", 2],
    "object-curly-spacing": ["error", "always"],
    "import/no-unresolved": "off",
    "max-len": ["warn", { code: 120 }],
    "linebreak-style": 0,
    "new-cap": "off",
    "require-jsdoc": "off",
    "valid-jsdoc": "off",
    "eol-last": ["error", "always"],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^next$" }]
  },
};

