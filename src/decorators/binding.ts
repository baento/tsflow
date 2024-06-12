import "reflect-metadata";

import cloneDeep from "lodash.clonedeep";

import { Dependencies } from "../dependencies";
import { Steps } from "../steps";
import type { HookDefinition, HookMetadata, StepMetadata, TransformerMetadata } from "../types";

import type { BindingDecorator } from "./decorators.types";

export const Binding: BindingDecorator =
  (dependencies = []) =>
  (target) => {
    const hooks: HookDefinition[] = [];

    const propertyKeys = Reflect.ownKeys(target.prototype);

    for (const key of propertyKeys) {
      const steps = Reflect.getMetadata("steps", target.prototype[key]) as StepMetadata[];
      const transformers = Reflect.getMetadata("transformers", target.prototype[key]) as TransformerMetadata;

      const hook = Reflect.getMetadata("hook", target.prototype[key]) as HookMetadata;

      if (steps) {
        for (const step of steps) {
          Steps.instance.set({
            ...cloneDeep(step),
            binding: target,
            method: target.prototype[key],
            transformers,
            hooks,
          });
        }
      }

      if (hook) {
        hooks.push({
          ...hook,
          method: target.prototype[key],
        });
      }
    }

    Dependencies.instance.set(target, dependencies);
  };
