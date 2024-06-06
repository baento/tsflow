export type Class = new (...args: any[]) => any;

export type ClassBinding = {
  class: Class;
  dependencies?: Class[];
};

export type StepPattern = string | RegExp;

export type StepOptions = {
  timeout?: number;
};

export type StepMetadata = {
  pattern: StepPattern;
  options?: StepOptions;
};

export type StepDetails = StepMetadata & {
  definition: Function;
};

export type StepDefinition = StepDetails & {
  classPrototype: Class;
};
