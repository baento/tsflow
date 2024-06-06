import { BindingRegistry } from "../registry";
import { Binding, Step } from "../decorators";

describe("Binding registry", () => {
  @Binding()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  class TestBindings {
    @Step("I have a second pattern")
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  class TestBindings2 {
    @Step("I have a new step")
    public stepA() {
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

    it("should have the same step function when there's multiple pattern", () => {
      const { stepDefinition: definition1 } = BindingRegistry.instance.getStep("I have a step");
      const { stepDefinition: definition2 } = BindingRegistry.instance.getStep("I have a second pattern");
      expect(definition1.definition).toBe(definition2.definition);
    });

    it("should throw en error if the class is not decorated with @Binding", () => {
      expect(() => BindingRegistry.instance.getStep("I have a new step")).toThrow();
    });
  });
});
