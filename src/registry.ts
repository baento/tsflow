import { type Expression, ExpressionFactory, ParameterTypeRegistry } from "@cucumber/cucumber-expressions";

import type { Class, BindingDefinition, StepDefinition } from "./types";

export class BindingRegistry {
  private static _instance: BindingRegistry;

  private _parameterTypeRegistry = new ParameterTypeRegistry();
  private _expressionFactory = new ExpressionFactory(this._parameterTypeRegistry);

  private _dependencies = new Map<Class, Class[]>();
  private _steps = new Map<Expression, StepDefinition>();

  private constructor() {}

  public static get instance(): BindingRegistry {
    if (!BindingRegistry._instance) {
      BindingRegistry._instance = new BindingRegistry();
    }

    return BindingRegistry._instance;
  }

  public getDependencies(binding: Class) {
    return this._dependencies.get(binding) || [];
  }

  public registerBinding({ binding, dependencies }: BindingDefinition) {
    let bindingDependencies = this._dependencies.get(binding);

    if (!bindingDependencies) {
      bindingDependencies = [];
      this._dependencies.set(binding, bindingDependencies);
    }

    if (dependencies) {
      bindingDependencies.push(...dependencies);
    }
  }

  public getStep(text: string) {
    let foundStepDefinition;
    let foundArgs;

    for (const [expression, stepDefinition] of this._steps.entries()) {
      const args = expression.match(text);

      if (args) {
        if (foundStepDefinition) {
          throw new Error(`Found multiple step definitions for "${text}"`);
        }

        foundStepDefinition = stepDefinition;
        foundArgs = args;
      }
    }

    if (!foundStepDefinition || !foundArgs) {
      throw new Error(
        `No step definition found for "${text}".\nDid you decorate your step definition with a Step decorator (@Given, @When, @Then, ...)?\nIf you did, make sure you also decorate your class with the @Binding decorator.`,
      );
    }

    return { stepDefinition: foundStepDefinition, args: foundArgs };
  }

  public registerStep({ pattern, binding, method: definition, options }: StepDefinition) {
    const stepExpression = this._expressionFactory.createExpression(pattern);

    const step: StepDefinition = {
      pattern,
      binding,
      method: definition,
      options,
    };

    this._steps.set(stepExpression, step);
  }
}
