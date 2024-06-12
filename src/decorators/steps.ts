import type { StepMetadata } from "../types";
import type { StepDecorator, TypesDecorator } from "./types";

export const Step: StepDecorator =
  (pattern, options = {}) =>
  (target) => {
    let steps = Reflect.getMetadata("steps", target) as StepMetadata[];

    if (!steps) {
      steps = [];
      Reflect.defineMetadata("steps", steps, target);
    }

    steps.push({
      pattern,
      options,
    });
  };

export const Given = Step;
export const When = Step;
export const Then = Step;
export const And = Step;
export const But = Step;

export const Types: TypesDecorator = (transformers) => (target) => {
  Reflect.defineMetadata("transformers", transformers, target);
};
