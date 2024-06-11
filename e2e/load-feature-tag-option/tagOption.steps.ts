import { Binding, Given, Then, When } from "../../src";

class Calculator {
  private readonly calculator: number[] = [];

  public add(value: number) {
    this.calculator.push(value);
  }

  public sum() {
    return this.calculator.reduce((prev, cur) => prev + cur, 0);
  }
}

@Binding([Calculator])
export default class CalculatorSteps {
  private result = 0;

  constructor(readonly calculator: Calculator) {}

  @Given("A/B is {int}")
  public stepIs(value: number) {
    this.calculator.add(value);
  }

  @When("I add the values")
  public stepAddValues() {
    this.result = this.calculator.sum();
  }

  @Then("The result equals {int}")
  public stepResult(expectedResult: number) {
    expect(this.result).toStrictEqual(expectedResult);
  }
}
