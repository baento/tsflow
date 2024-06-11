import fs from "node:fs";
import path from "node:path";
import callsites from "callsites";
import { globSync } from "fast-glob";

import type { Argument } from "@cucumber/cucumber-expressions";

import { Container } from "../dependencies";
import { Steps } from "../steps";

import { extractArgument } from "./argument";
import { GherkinParser } from "./parser";

export const loadFeature = (pattern: string | string[]) => {
  const callSite = callsites()[1];
  const fileName = callSite.getFileName()!;
  const dirName = path.dirname(fileName);

  const featureFiles = globSync(pattern, { cwd: dirName, absolute: true });

  if (featureFiles.length === 0) {
    const patterns = Array.isArray(pattern) ? pattern.join(", ") : pattern;
    throw new Error(`No feature file found for ${patterns}`);
  }

  for (const featureFile of featureFiles) {
    const source = fs.readFileSync(featureFile, { encoding: "utf-8" });

    const parser = new GherkinParser();

    const document = parser.parseDocument(source);
    const pickles = parser.compileDocument(document, featureFile);

    if (!document.feature) {
      throw new Error(`No feature defined in ${featureFile}`);
    }

    describe(document.feature.name, () => {
      for (const { name, steps } of pickles) {
        test(name, async () => {
          const container = new Container();

          for (const { text, argument } of steps) {
            const { step, params } = Steps.instance.get(text);

            const instance = container.get(step.binding);

            let promise = step.method.apply(instance, [...transformParams(params), extractArgument(argument)]);

            if (step.options.timeout) {
              promise = wrapTimeout(promise, step.options.timeout);
            }

            await promise;
          }

          container.clear();
        });
      }
    });
  }
};

const wrapTimeout = async <T>(promise: Promise<T>, ms: number) => {
  let timer;

  const timeoutPromise = new Promise((_, reject) => {
    timer = setTimeout(reject, ms, new Error(`Step timed out after ${ms}ms`));
  });

  await Promise.race([promise, timeoutPromise]);

  clearTimeout(timer);
};

const transformParams = <T>(params: readonly Argument[]): (T | null)[] => {
  return params.map((param) => {
    return param.getValue(this);
  });
};
