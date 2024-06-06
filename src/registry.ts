import { Expression, ExpressionFactory, ParameterTypeRegistry } from "@cucumber/cucumber-expressions";

import { Class, ClassBinding, StepDefinition, StepDetails } from "./types";

export class BindingRegistry {
  private static _instance: BindingRegistry;

  private _parameterTypeRegistry = new ParameterTypeRegistry();

  private _expressionFactory = new ExpressionFactory(this._parameterTypeRegistry);

  private _dependencies = new Map<any, Class[]>();
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

  public registerStep(classPrototype: Class, { pattern, definition, options }: StepDetails) {
    const stepExpression = this._expressionFactory.createExpression(pattern);

    const step: StepDefinition = {
      pattern,
      classPrototype,
      definition,
      options,
    };

    this._steps.set(stepExpression, step);
  }
}
