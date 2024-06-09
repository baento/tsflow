import { Binding, Given, Then, When } from "../decorators";

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

  @Given("X is {int}")
  @Given("Y is {int}")
  @Given(/[AB] is (\d)/)
  public stepIs(value: number) {
    this.calculator.add(value);
  }

  @When("I add the values", { timeout: 5000 })
  public stepAddValues() {
    this.result = this.calculator.sum();
  }

  @Then("The result equals {int}")
  @Then(/The result is (\w+)/)
  public stepResult(expectedResult: number) {
    expect(this.result).toStrictEqual(expectedResult);
  }
}
