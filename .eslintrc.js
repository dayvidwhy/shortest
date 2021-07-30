module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "jest/globals": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "ignorePatterns": ["**/dist/*"],
    "rules": {
        "indent": ["error", 4]
    },
    "plugins": [
        "jest"
    ],
    "settings": {
        "react": {
            "version": "detect"
        }
    }
};
