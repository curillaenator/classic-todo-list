/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpeg|jpg|gif|webp|svg|png)$': 'identity-obj-proxy',
    '^@src(.*)$': '<rootDir>/src$1',
  },
};
