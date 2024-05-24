/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    // globals: {
    //     'ts-jest': {
    //         tsconfig: 'tsconfig.spec.json',
    //         stringifyContentPathRegex: '\\.html$',
    //     },
    // },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
    moduleFileExtensions: ['ts', 'html', 'js', 'json'],
    coverageReporters: ['html'],
    collectCoverageFrom: ['src/**/*.ts'],
};

export default config;
