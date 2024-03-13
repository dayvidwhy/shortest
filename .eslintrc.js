module.exports = {
    "root": true,
    "parser": "@typescript-eslint/parser",
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "jest/globals": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "ignorePatterns": ["**/dist/*"],
    "rules": {
        "indent": ["error", 4],
        "@typescript-eslint/no-var-requires": 0,
        "quotes": ["error", "double"]
    },
    "plugins": [
        "jest",
        "@typescript-eslint"
    ],
    "settings": {
        "react": {
            "version": "detect"
        }
    }
};
