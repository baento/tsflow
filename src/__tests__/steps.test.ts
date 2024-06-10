import { Binding, Step, Types } from "../decorators";
import { Steps } from "../steps";

describe("Steps", () => {
  @Binding()
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

    @Step("I have a step with more types than arguments")
    @Types([Number])
    public stepD() {
      return "step";
    }
  }

  class TestBindings2 {
    @Step("I have a new step")
    public stepA() {
      return "step";
    }
  }

  describe("get", () => {
    it("should return the step definition for the given text", () => {
      const { step: stepDefinition } = Steps.instance.get("I have a step");

      expect(stepDefinition).toBeDefined();
    });

    it("should throw an error if no step definition is found for the given text", () => {
      expect(() => Steps.instance.get("I have an unknown step")).toThrow();
    });

    it("should throw an error if multiple step definitions are found for the given text", () => {
      expect(() => Steps.instance.get("I have a duplicate step")).toThrow();
    });

    it("should have the same step function when there's multiple pattern", () => {
      const { step: definition1 } = Steps.instance.get("I have a step");
      const { step: definition2 } = Steps.instance.get("I have a second pattern");
      expect(definition1.method).toBe(definition2.method);
    });

    it("should throw en error if the class is not decorated with @Binding", () => {
      expect(() => Steps.instance.get("I have a new step")).toThrow();
    });

    it("should throw an error if the number of types is greater than the number of arguments", () => {
      expect(() => Steps.instance.get("I have a step with more types than arguments")).toThrow();
    });
  });
});
