import "reflect-metadata";

import cloneDeep from "lodash.clonedeep";

import { Dependencies } from "../dependencies";
import { Steps } from "../steps";
import type { StepMetadata, TransformerMetadata } from "../types";

import type { BindingDecorator, StepDecorator, TypesDecorator } from "./decorators.types";

export const Binding: BindingDecorator =
  (dependencies = []) =>
  (target) => {
    const propertyKeys = Reflect.ownKeys(target.prototype);

    for (const key of propertyKeys) {
      const steps = Reflect.getMetadata("steps", target.prototype[key]) as StepMetadata[];
      const transformers = Reflect.getMetadata("transformers", target.prototype[key]) as TransformerMetadata;

      if (steps) {
        for (const step of steps) {
          Steps.instance.set({
            ...cloneDeep(step),
            binding: target,
            method: target.prototype[key],
            transformers,
          });
        }
      }
    }

    Dependencies.instance.set(target, dependencies);
  };

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

export const Types: TypesDecorator = (transformers) => (target) => {
  Reflect.defineMetadata("transformers", transformers, target);
};
