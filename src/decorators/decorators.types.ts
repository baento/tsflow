import { BindingDependency, StepOptions, StepPattern } from "../types";

interface Constructor<T = {}> {
  new (...args: any[]): T;
  prototype: T;
}

type ClassDecorator = <Class extends Constructor>(
  target: Class,
  context: ClassDecoratorContext<Class>
) => void;

type MethodDecorator = <This, Args extends any[], Return>(
  target: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<
    This,
    (this: This, ...args: Args) => Return
  >
) => void;

export type BindingDecorator = (
  dependencies?: BindingDependency[]
) => ClassDecorator;

export type StepDecorator = (
  pattern: StepPattern,
  options?: StepOptions
) => MethodDecorator;
