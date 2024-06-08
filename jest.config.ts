import type { Config } from "jest";

export default {
  testMatch: ["<rootDir>/src/**/*.test.[jt]s"],
  transform: {
    "^.+\\.[jt]s$": "ts-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.[jt]s", "!<rootDir>/src/**/*.(test|steps).[jt]s"],
  coverageDirectory: "<rootDir>/coverage",
  clearMocks: true,
  watchPathIgnorePatterns: ["<rootDir>/node_modules"],
} satisfies Config;
