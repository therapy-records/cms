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
        "react/prop-types": ["error", { ignore: ['store']}]
    },
    "env": {
        "jest": true
    }
};
