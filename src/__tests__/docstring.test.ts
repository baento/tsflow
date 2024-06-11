import { Binding, Given, Then } from "../decorators";
import { loadFeature } from "../gherkin";

@Binding()
export class DocStringSteps {
  private docString?: string;

  @Given("I have a simple docstring")
  public aDocstring(content: string) {
    this.docString = content;
  }

  @Then("I should see the docstring")
  public seeDocstring() {
    expect(this.docString).toStrictEqual("Hello, World!");
  }
}

loadFeature("./features/docstring.feature");
