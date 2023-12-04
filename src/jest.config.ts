export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  bail: 1,
  verbose: true,
  rootDir: 'src',
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
  setupFilesAfterEnv: ['<rootDir>/jestSetup.ts'],
  moduleNameMapper: {
    '^src/(.+)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
