import "reflect-metadata";

import { BindingRegistry } from "../registry";
import { StepMetadata } from "../types";
import { BindingDecorator, StepDecorator } from "./decorators.types";

const propertyKeys = <T>(target: T): (keyof T)[] => Object.getOwnPropertyNames(target) as (keyof T)[];

export const Binding: BindingDecorator = (dependencies) => (target) => {
  for (const key of propertyKeys(target.prototype)) {
    const steps = Reflect.getMetadata("steps", target.prototype[key]) as StepMetadata[];

    if (steps) {
      for (const step of steps) {
        BindingRegistry.instance.registerStep(target, {
          pattern: step.pattern,
          definition: target.prototype[key],
          options: step.options,
        });
      }
    }
  }

  BindingRegistry.instance.registerBinding({
    class: target,
    dependencies,
  });
};

export const Step: StepDecorator = (pattern, options) => (target) => {
  let steps = Reflect.getMetadata("steps", target);

  const step: StepMetadata = {
    pattern,
    options,
  };

  if (!steps) {
    Reflect.defineMetadata("steps", (steps = []), target);
  }

  steps.push(step);
};

export const Given = Step;
export const When = Step;
export const Then = Step;
