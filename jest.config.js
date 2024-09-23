export default {
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
    testEnvironment: 'node',
    extensionsToTreatAsEsm: [],
    globals: {
        'ts-jest': {
            useESM: true,
        },
    },
};
