import callsites from "callsites";
import path from "path";
import fs from "fs";

import { GherkinParser } from "./parser";
import { BindingRegistry } from "../registry";

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
          for (const step of pickle.steps) {
            const { stepDefinition } = BindingRegistry.instance.getStep(step.text);

            console.log(stepDefinition.pattern, step.text);
            // TODO
          }
        });
      }
    });
  } else {
    throw new Error(`No feature defined in ${uri}`);
  }
};
