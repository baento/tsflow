import callsites from "callsites";
import fs from "fs";
import path from "path";

import { Argument } from "@cucumber/cucumber-expressions";
import { InstanceManager } from "../instanceManager";
import { BindingRegistry } from "../registry";
import { GherkinParser } from "./parser";

export const loadFeature = (relativePath: string) => {
  const callSite = callsites()[1];
  const fileName = callSite.getFileName()!;
  const dirName = path.dirname(fileName);

  const uri = path.resolve(dirName, relativePath);
  const source = fs.readFileSync(uri, { encoding: "utf-8" });

  const parser = new GherkinParser();

  const document = parser.parseDocument(source);
  const pickles = parser.compileDocument(document, uri);

  if (document.feature) {
    describe(document.feature.name, () => {
      for (const pickle of pickles) {
        test(pickle.name, async () => {
          const instanceManager = new InstanceManager();

          for (const step of pickle.steps) {
            const { stepDefinition, args } = BindingRegistry.instance.getStep(step.text);

            const instance = instanceManager.getOrSaveInstance(stepDefinition.binding);

            await stepDefinition.method.apply(instance, parseArguments(args));
          }
          instanceManager.clear();
        });
      }
    });
  } else {
    throw new Error(`No feature defined in ${uri}`);
  }
};

const parseArguments = <T>(args: readonly Argument[]): (T | null)[] => {
  return args.map((arg) => {
    return arg.getValue(this);
  });
};
