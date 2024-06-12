import { HookEnum, type HookMetadata } from "./../types";
import type { HookDecorator } from "./decorators.types";

const HookFactory: (hookType: HookEnum) => HookDecorator =
  (hookType) =>
  (options = {}) =>
  (target) => {
    const hook: HookMetadata = {
      type: hookType,
      options,
    };

    Reflect.defineMetadata("hook", hook, target);
  };

export const BeforeStep = HookFactory(HookEnum.BEFORE_STEP);
export const AfterStep = HookFactory(HookEnum.AFTER_STEP);
