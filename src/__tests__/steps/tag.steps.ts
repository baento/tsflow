import { Binding, Then } from "../../decorators";

@Binding()
class Tag {
  @Then("It should run")
  public getStep() {
    return "step";
  }
}
