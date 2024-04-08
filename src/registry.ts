import {
  Expression,
  ExpressionFactory,
  ParameterTypeRegistry,
} from "@cucumber/cucumber-expressions";

import { BindingDependency, ClassBinding, StepDefinition } from "./types";

export class BindingRegistry {
  private static _instance: BindingRegistry;

  private _parameterTypeRegistry = new ParameterTypeRegistry();

  private _expressionFactory = new ExpressionFactory(
    this._parameterTypeRegistry
  );

  private _dependencies = new Map<any, BindingDependency[]>();
  private _steps = new Map<Expression, StepDefinition>();

  private constructor() {}

  public static get instance(): BindingRegistry {
    if (!this._instance) {
      this._instance = new BindingRegistry();
    }

    return this._instance;
  }

  public registerBinding({ class: prototype, dependencies }: ClassBinding) {
    let bindingDependencies = this._dependencies.get(prototype);

    if (!bindingDependencies) {
      bindingDependencies = [];

      this._dependencies.set(prototype, bindingDependencies);
    }

    if (dependencies) {
      bindingDependencies.push(...dependencies);
    }
  }

  public getStep(text: string) {
    let foundStepDefinition;

    for (const [expression, stepBinding] of this._steps.entries()) {
      if (expression.match(text)) {
        if (foundStepDefinition) {
          throw new Error(`Found multiple step definitions for "${text}"`);
        }

        foundStepDefinition = stepBinding;
      }
    }

    return foundStepDefinition;
  }

  public registerStep({ pattern, definition, options }: StepDefinition) {
    const stepExpression = this._expressionFactory.createExpression(pattern);

    const step = {
      pattern,
      definition,
      options,
    };

    this._steps.set(stepExpression, step);
  }
}
