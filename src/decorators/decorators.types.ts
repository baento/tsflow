import type { Class, Method, StepOptions, StepPattern } from "../types";

type ClassDecorator = <T extends Class>(target: T, context: ClassDecoratorContext) => void;

type MethodDecorator = <T extends Method>(target: T, context: ClassMethodDecoratorContext) => void;

export type BindingDecorator = (dependencies?: Class[]) => ClassDecorator;
export type StepDecorator = (pattern: StepPattern, options?: StepOptions) => MethodDecorator;
