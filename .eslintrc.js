module.exports = {
  extends: "airbnb",
  installedESLint: true,
  plugins: ["import"],
  "env": {
    "jest": true
  },
  "rules": {
    "comma-dangle": ["error", {
        "arrays": "never",
        "objects": "never",
        "imports": "never",
        "exports": "never",
        "functions": "ignore",
    }]
  }
};
