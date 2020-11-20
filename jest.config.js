process.env.JEST_PUPPETEER_CONFIG = require.resolve(
  './src/e2e/jest-puppeteer.config.ts'
)

module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  preset: 'jest-puppeteer',
  testEnvironment: 'jsdom',
}
