import { BindingRegistry } from "../registry";
import { Step } from "../decorators";

describe("Binding registry", () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  class TestBindings {
    @Step("I have a step")
    public stepA() {
      return "step";
    }

    @Step("I have a duplicate step")
    public stepB() {
      return "step";
    }

    @Step("I have a duplicate step")
    public stepC() {
      return "step";
    }
  }

  describe("getStep", () => {
    it("should return the step definition for the given text", () => {
      const { stepDefinition } = BindingRegistry.instance.getStep("I have a step");

      expect(stepDefinition).toBeDefined();
    });

    it("should throw an error if no step definition is found for the given text", () => {
      expect(() => BindingRegistry.instance.getStep("I have an unknown step")).toThrow();
    });

    it("should throw an error if multiple step definitions are found for the given text", () => {
      expect(() => BindingRegistry.instance.getStep("I have a duplicate step")).toThrow();
    });
  });
});
