module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**',
    '!**/__fixtures__/**',
    '!<rootDir>/src/index.js'
  ],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    }
  },
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.spec.js'],
  transform: { '.js$': 'babel-jest' },
  transformIgnorePatterns: ['/node_modules/']
};
