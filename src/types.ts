export type BindingDependency = new () => any;

export type ClassBinding = {
  class: any;
  dependencies?: BindingDependency[];
};

export type StepPattern = string | RegExp;

export type StepOptions = {
  timeout?: number;
};

export type StepDefinition = {
  pattern: StepPattern;
  definition: Function;
  options?: StepOptions;
};
