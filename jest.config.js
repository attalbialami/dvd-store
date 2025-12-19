const { createDefaultPreset } = require('ts-jest');

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: 'node',
  transform: {
    ...tsJestTransformCfg,
  },
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'text-summary', 'html'],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 80,
      functions: 90,
      lines: 90,
    },
  },
  clearMocks: true,
  restoreMocks: true,
  resetMocks: true,
  testTimeout: 10000,
  verbose: true,
};
