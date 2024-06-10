import { type Expression, ExpressionFactory, ParameterTypeRegistry } from "@cucumber/cucumber-expressions";
import dedent from "dedent";
import cloneDeep from "lodash.clonedeep";

import type { StepDefinition } from "./types";

export class Steps {
  private static _instance: Steps;

  private _parameterTypeRegistry = new ParameterTypeRegistry();
  private _expressionFactory = new ExpressionFactory(this._parameterTypeRegistry);

  private _steps = new Map<Expression, StepDefinition>();

  private constructor() {}

  public static get instance(): Steps {
    if (!Steps._instance) {
      Steps._instance = new Steps();
    }

    return Steps._instance;
  }

  public get(text: string) {
    let foundStep;
    let foundArgs;

    for (const [expression, step] of this._steps.entries()) {
      const args = expression.match(text);

      if (args) {
        if (foundStep) {
          throw new Error(dedent`
            Found multiple step definitions for "${text}"
            - ${foundStep.pattern}
            - ${step.pattern}
            `);
        }

        foundStep = step;
        foundArgs = args;
      }
    }

    if (!foundStep || !foundArgs) {
      throw new Error(dedent`
        No step definition found for "${text}".
        Did you decorate your step definition with a Step decorator (@Given, @When, @Then, ...)?
        If you did, make sure you also decorate your class with the @Binding decorator.
      `);
    }

    if (foundStep.transformers) {
      if (foundArgs.length < foundStep.transformers.length) {
        throw new Error(dedent`
          Found too many types in with @Types for "${text}".
            - Expected: ${foundArgs.length} types at most.
        `);
      }

      for (let i = 0; i < foundArgs.length; i++) {
        foundArgs[i].parameterType.transform = (_, value) => foundStep.transformers[i](value as any);
      }
    }

    return {
      step: foundStep,
      args: foundArgs,
    };
  }

  public set(stepDefinition: StepDefinition) {
    const stepExpression = this._expressionFactory.createExpression(stepDefinition.pattern);

    this._steps.set(stepExpression, cloneDeep(stepDefinition));
  }
}
