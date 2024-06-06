import { Class, StepOptions, StepPattern } from "../types";

type ClassDecorator = <T extends Class>(target: T, context: ClassDecoratorContext<T>) => void;

type MethodDecorator = <This, Args extends any[], Return>(
  target: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
) => void;

export type BindingDecorator = (dependencies?: Class[]) => ClassDecorator;

export type StepDecorator = (pattern: StepPattern, options?: StepOptions) => MethodDecorator;
