import { AfterStep, BeforeStep, Binding, Then } from "../../decorators";

let number1 = 0;

@Binding()
class TestMultipleHooksWithSingleStep {
  public number = 0;

  @BeforeStep()
  public async beforeStep1() {
    // This will be the last beforeStep to run
    expect(number1).toBe(2);
  }

  @BeforeStep({ order: 3 })
  public async beforeStep3() {
    // This will be the second beforeStep to run
    expect(number1).toBe(1);
    number1++;
  }

  @BeforeStep({ order: 2 })
  public async beforeStep2() {
    // This will be the first beforeStep to run
    expect(number1).toBe(0);
    number1++;
  }

  @Then("Set the number to 50")
  public async returnNumber() {
    number1 = 50;
  }

  @AfterStep({ order: 2 })
  public async afterStep2() {
    // This will be the first afterStep to run
    expect(number1).toBe(50);
    number1 = 15;
  }

  @AfterStep()
  public async afterStep1() {
    // This will be the last afterStep to run
    expect(number1).toBe(15);
  }
}

let number2 = 0;

@Binding()
class TestHooksWithMultipleStep {
  @BeforeStep()
  public async beforeStep() {
    expect([0, 1]).toContain(number2);
  }

  @Then("Increase by 1")
  public async increaseByOne() {
    number2++;
  }

  @Then("Increase by 10")
  public async increaseByTen() {
    number2 = number2 + 10;
  }

  @AfterStep()
  public async afterStep() {
    expect([1, 11]).toContain(number2);
  }
}
