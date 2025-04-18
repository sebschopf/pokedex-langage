module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/$1",
    },
    testMatch: ["**/__tests__/**/*.test.ts?(x)"],
    collectCoverageFrom: ["lib/server/mapping/**/*.ts", "!**/node_modules/**", "!**/vendor/**"],
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  }
  