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
    let foundParams;

    for (const [expression, step] of this._steps.entries()) {
      const params = expression.match(text);

      if (params) {
        if (foundStep) {
          throw new Error(dedent`
            Found multiple step definitions for "${text}"
            - ${foundStep.pattern}
            - ${step.pattern}
            `);
        }

        foundStep = step;
        foundParams = params;
      }
    }

    if (!foundStep || !foundParams) {
      throw new Error(dedent`
        No step definition found for "${text}".
        Did you decorate your step definition with a Step decorator (@Given, @When, @Then, ...)?
        If you did, make sure you also decorate your class with the @Binding decorator.
      `);
    }

    if (foundStep.transformers) {
      if (foundParams.length < foundStep.transformers.length) {
        throw new Error(dedent`
          Found too many types in with @Types for "${text}".
            - Expected: ${foundParams.length} types at most.
        `);
      }

      for (let i = 0; i < foundParams.length; i++) {
        foundParams[i].parameterType.transform = (_, value) => foundStep.transformers[i](value as any);
      }
    }

    return {
      step: foundStep,
      params: foundParams,
    };
  }

  public set(stepDefinition: StepDefinition) {
    const stepExpression = this._expressionFactory.createExpression(stepDefinition.pattern);

    this._steps.set(stepExpression, cloneDeep(stepDefinition));
  }
}
