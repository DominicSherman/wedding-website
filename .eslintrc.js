module.exports = {
    parser: 'babel-eslint',
    extends: 'get-off-my-lawn',
    rules: {
        'jsx-a11y/click-events-have-key-events': 'off',
        'max-params': ['error', 4],
        'react/prop-types': 'off',
        'node/no-unpublished-import': 0
    }
};
