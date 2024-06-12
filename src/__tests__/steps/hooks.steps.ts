import { AfterStep, BeforeStep, Binding, Then } from "../../decorators";

let text = "";

@Binding()
class TestHooks {
  @BeforeStep()
  public async beforeStep3() {
    // This will be the last beforeStep to run
    text += "c";
  }

  @BeforeStep({ order: 3 })
  public async beforeStep2() {
    // This will be the second beforeStep to run
    text += "b";
  }

  @BeforeStep({ order: 2 })
  public async beforeStep1() {
    // This will be the first beforeStep to run
    text += "a";
  }

  @Then("The text should be abc")
  public async textIsABC() {
    expect(text).toBe("abc");
  }

  @Then("The text should be abcdeabc")
  public async textABCDEABC() {
    expect(text).toBe("abcdeabc");
  }

  @AfterStep({ order: 2 })
  public async afterStep1() {
    // This will be the first afterStep to run
    text += "d";
  }

  @AfterStep()
  public async afterStep2() {
    // This will be the last afterStep to run
    text += "e";
  }
}
