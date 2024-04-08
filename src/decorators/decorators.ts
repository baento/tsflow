import { BindingDecorator, StepDecorator } from "./decorators.types";

import { BindingRegistry } from "../registry";

export const Binding: BindingDecorator = (dependencies) => (target) => {
  BindingRegistry.instance.registerBinding({
    class: target,
    dependencies,
  });
};

export const Step: StepDecorator = (pattern, options) => (target) => {
  BindingRegistry.instance.registerStep({
    pattern,
    definition: target,
    options,
  });
};

export const Given = Step;
export const When = Step;
export const Then = Step;
