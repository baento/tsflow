import { Config } from "jest";

export default {
  preset: "ts-jest",
  testMatch: ["<rootDir>/src/**/*.test.[jt]s"],
} satisfies Config;
