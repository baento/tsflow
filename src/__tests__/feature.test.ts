import { loadFeature } from "../gherkin/feature";

describe("Feature loading", () => {
  it("should throw when trying to load a non-feature file", () => {
    expect(() => loadFeature("./features/empty.feature")).toThrow();
  });

  it("should throw when trying to load an inexistent file", () => {
    expect(() => loadFeature("./features/inexistent.feature")).toThrow();
  });
});
