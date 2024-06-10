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
};

export type Transformer<T> = (value: string) => T;

export type TransformerMetadata = Transformer<any>[];
