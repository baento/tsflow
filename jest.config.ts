import type { Config } from "jest";

export default {
  preset: "ts-jest",
  testMatch: ["<rootDir>/src/**/*.test.[jt]s"],
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage",
} satisfies Config;
