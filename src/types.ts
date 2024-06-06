interface Prototype {
  [key: string | symbol]: any;
}

export type Class<T = Prototype> = {
  new (...args: any[]): any;
  prototype: T;
};

export type BindingDefinition = {
  binding: Class;
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

export type StepDefinition = StepMetadata & {
  method: Function;
  binding: Class;
};
