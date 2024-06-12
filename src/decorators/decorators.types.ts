import type { Class, HookOptions, Method, StepOptions, StepPattern, Transformer } from "../types";

type ClassDecorator = <T extends Class>(target: T, context: ClassDecoratorContext) => void;

type MethodDecorator = <T extends Method>(target: T, context: ClassMethodDecoratorContext) => void;

export type BindingDecorator = (dependencies?: Class[]) => ClassDecorator;
export type StepDecorator = (pattern: StepPattern, options?: StepOptions) => MethodDecorator;
export type TypesDecorator = (types: Transformer<any>[]) => MethodDecorator;
export type HookDecorator = (options?: HookOptions) => MethodDecorator;
