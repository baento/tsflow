import type { GherkinDocument, Pickle, PickleStep } from "@cucumber/messages";

interface Prototype {
  [key: string | symbol]: any;
}

export type Class = {
  new (...args: any[]): any;
  prototype: Prototype;
};

export type Method = (...args: any[]) => any;

export type StepPattern = string | RegExp;

export type StepOptions = {
  timeout?: number;
};

export type StepMetadata = {
  pattern: StepPattern;
  options: StepOptions;
};

export type StepDefinition = StepMetadata & {
  method: Method;
  binding: Class;
  transformers?: TransformerMetadata;
  hooks: HookDefinition[];
};

export type Transformer<T> = (value: string) => T;

export type TransformerMetadata = Transformer<any>[];

export type HookOptions = {
  order?: number;
};

export enum HookEnum {
  BEFORE_STEP = "beforeStep",
  AFTER_STEP = "afterStep",
}

export type HookMetadata = {
  type: HookEnum;
  options: HookOptions;
};

export type HookDefinition = HookMetadata & {
  method: (args?: {
    pickle?: Pickle;
    pickleStep?: PickleStep;
    gherkinDocument?: GherkinDocument;
    testCaseStartedId?: string;
    testStepId?: string;
  }) => Promise<void>;
};
