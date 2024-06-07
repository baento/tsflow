import callsites from "callsites";
import path from "path";
import fs from "fs";
import { globSync } from "fast-glob";

import { Argument } from "@cucumber/cucumber-expressions";

import { InstanceManager } from "../instanceManager";
import { BindingRegistry } from "../registry";
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

    if (document.feature) {
      describe(document.feature.name, () => {
        for (const pickle of pickles) {
          test(pickle.name, async () => {
            const instanceManager = new InstanceManager();

            for (const step of pickle.steps) {
              const { stepDefinition, args } = BindingRegistry.instance.getStep(step.text);

              const instance = instanceManager.getOrSaveInstance(stepDefinition.binding);

              const calls: Promise<unknown>[] = [stepDefinition.method.apply(instance, parseArguments(args))];

              if (stepDefinition.options?.timeout) {
                const timeoutPromise = new Promise(() => {
                  setTimeout(() => {
                    throw new Error(`Step timed out after ${stepDefinition.options!.timeout}ms`);
                  }, stepDefinition.options!.timeout);
                });
                calls.push(timeoutPromise);
              }

              await Promise.race(calls);
            }
            instanceManager.clear();
          });
        }
      });
    } else {
      throw new Error(`No feature defined in ${featureFile}`);
    }
  }
};

const parseArguments = <T>(args: readonly Argument[]): (T | null)[] => {
  return args.map((arg) => {
    return arg.getValue(this);
  });
};
