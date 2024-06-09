import { Binding, Then } from "../../../src/decorators";

@Binding()
class TestTimeoutOption {
  @Then("Should throw", { timeout: 250 })
  public async takingMoreThanTimeoutOption() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
