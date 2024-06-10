import { Binding, Given, Then, Types, When } from "../decorators";
import type { DataTable } from "../gherkin";

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

  @Given("E is {int}")
  @Given("F is {int}")
  @Given(/[AB] is (\d)/)
  public stepIs(value: number) {
    this.calculator.add(value);
  }

  @Given(/[CD] is (\d)/)
  @Types([Number])
  public stepIs2(value: number) {
    this.calculator.add(value);
  }

  @Given("The numbers:")
  public stepIs3(data: DataTable) {
    for (const row of data) {
      this.calculator.add(Number(row.value));
    }
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

  @Then(/The result should be (\d)/)
  @Types([Number])
  public stepResult2(expectedResult: number) {
    expect(this.result).toStrictEqual(expectedResult);
  }
}
