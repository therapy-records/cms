module.exports = {
    "extends": [
        "standard",
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "settings": {
        "react": {
            "version": "15.6"
        }
    },
    "rules": {
        "semi": 0,
        "space-before-function-paren": ["error", "never"],
        "no-console": 0,
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": 1,
        "react/jsx-indent": 0,
        "react/prop-types": ["error", { ignore: ['store']}],
        "no-async-promise-executor": 0,
        "no-misleading-character-class": 0,
        "no-useless-catch": 0
    },
    "globals": {
        "localStorage": true,
        "Headers": true
    },
    "env": {
        "jest": true,
        "browser": 1
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
};
