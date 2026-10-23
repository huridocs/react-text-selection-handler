/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          esModuleInterop: true,
          module: 'commonjs',
          moduleResolution: 'node',
          strict: true,
          target: 'ES2020',
          lib: ['dom', 'es2020'],
          jsx: 'react',
          types: ['jest', 'node'],
        },
      },
    ],
  },
};
