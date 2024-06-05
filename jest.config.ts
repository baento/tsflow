import type { Config } from "jest";

import fs from "fs";

const swcConfig = JSON.parse(fs.readFileSync(`${__dirname}/.swcrc`, "utf-8"));

export default {
  testMatch: ["<rootDir>/src/**/*.test.[jt]s"],
  transform: {
    "^.+\\.[jt]s$": ["@swc/jest", { ...swcConfig, exclude: [], swcrc: false }],
  },
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.[jt]s", "!<rootDir>/src/**/*.(test|steps).[jt]s"],
  coverageDirectory: "<rootDir>/coverage",
  clearMocks: true,
  watchPathIgnorePatterns: ["<rootDir>/node_modules"],
} satisfies Config;
