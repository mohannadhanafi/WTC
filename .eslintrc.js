module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: "babel-eslint",
  plugins: [
    'react',
  ],
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "linebreak-style": 0,
    "eslint linebreak-style": [0, "error", "windows"],
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/interactive-supports-focus": 0,
    "no-nested-ternary": 0,
    "react/jsx-props-no-spreading": 0,
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true, "optionalDependencies": false, "peerDependencies": false, "bundledDependencies": false }]
  },
};
