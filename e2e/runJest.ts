/**
 * This file is based on how Jest themselves run their tests in their own repository.
 */

import type { CommonOptions, ExecaSyncReturnValue } from "execa";
import execa from "execa";
import fs from "node:fs";
import path from "node:path";

const JEST_PATH = path.resolve(__dirname, "../node_modules/jest-cli/bin/jest.js");

export default function runJest(dir: string) {
  const result = spawnJest(dir);

  if (result.killed) {
    throw new Error(`
        Spawned process was killed.
        DETAILS:
          ${JSON.stringify(result, null, 2)}
    `);
  }

  return normalizeStdoutAndStderrOnResult(result);
}

function spawnJest(dir: string): ExecaSyncReturnValue {
  const isRelative = !path.isAbsolute(dir);

  let dirPath = dir;

  if (isRelative) {
    dirPath = path.resolve(__dirname, dir);
  }

  const localPackageJson = path.resolve(dirPath, "package.json");

  if (!fs.existsSync(localPackageJson)) {
    throw new Error(`
          Make sure you have a local package.json file at
            "${localPackageJson}".
          Otherwise Jest will try to traverse the directory tree and find the global package.json, which will send Jest into infinite loop.
    `);
  }

  const env: NodeJS.ProcessEnv = {
    ...process.env,
    FORCE_COLOR: "0",
    NO_COLOR: "1",
  };

  const spawnArgs = [JEST_PATH];
  const spawnOptions: CommonOptions<"string"> = {
    cwd: dirPath,
    env,
    reject: false,
  };

  return execa.sync(process.execPath, spawnArgs, spawnOptions);
}

function normalizeStdoutAndStderrOnResult(result: ExecaSyncReturnValue) {
  const stdout = normalizeIcons(result.stdout);
  const stderr = normalizeIcons(result.stderr);

  return { ...result, stderr, stdout };
}

export function normalizeIcons(str: string): string {
  if (!str) {
    return str;
  }

  // Make sure to keep in sync with `jest-util/src/specialChars`
  return str.replaceAll(/\u00D7/gu, "\u2715").replaceAll(/\u221A/gu, "\u2713");
}
