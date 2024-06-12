import { type HookDefinition, HookEnum } from "./types";

const sortFunction = (a: HookDefinition, b: HookDefinition) => {
  const orderA = a.options.order ?? Number.MAX_SAFE_INTEGER;
  const orderB = b.options.order ?? Number.MAX_SAFE_INTEGER;

  return orderA - orderB;
};

export const getHooks = (hooks: HookDefinition[]) => {
  return {
    beforeHooks: hooks.filter((hook) => hook.type === HookEnum.BEFORE_STEP).sort(sortFunction),
    afterHooks: hooks.filter((hook) => hook.type === HookEnum.AFTER_STEP).sort(sortFunction),
  };
};
