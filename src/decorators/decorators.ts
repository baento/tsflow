import "reflect-metadata";

import { BindingRegistry } from "../registry";
import { StepMetadata } from "../types";
import { BindingDecorator, StepDecorator } from "./decorators.types";

export const Binding: BindingDecorator = (dependencies) => (target) => {
  const propertyKeys = Reflect.ownKeys(target.prototype);

  for (const key of propertyKeys) {
    const steps = Reflect.getMetadata("steps", target.prototype[key]) as StepMetadata[];

    if (steps) {
      for (const step of steps) {
        BindingRegistry.instance.registerStep({
          ...step,
          binding: target,
          method: target.prototype[key],
        });
      }
    }
  }

  BindingRegistry.instance.registerBinding({
    binding: target,
    dependencies,
  });
};

export const Step: StepDecorator = (pattern, options) => (target) => {
  let steps = Reflect.getMetadata("steps", target) as StepMetadata[];

  if (!steps) {
    Reflect.defineMetadata("steps", (steps = []), target);
  }

  steps.push({
    pattern,
    options,
  });
};

export const Given = Step;
export const When = Step;
export const Then = Step;
