import { Binding, Given, Then, When } from "../../src";
import { Calculator } from "../../src/__tests__/classes/calculator";

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
