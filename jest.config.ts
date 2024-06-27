/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
    roots: ['<rootDir>/src'],
    moduleDirectories: ['node_modules', './src'],
    transformIgnorePatterns: ['node_modules/(?!(.*\\.mjs$|pdfjs-dist))'],
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    }
};