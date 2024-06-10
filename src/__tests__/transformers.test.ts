import { Transformers } from "../transfomers";

describe("Boolean transformer", () => {
  it("should transform 'true' to true", () => {
    expect(Transformers.Boolean("true")).toBe(true);
  });

  it("should transform 'false' to false", () => {
    expect(Transformers.Boolean("false")).toBe(false);
  });

  it("should throw when transforming an invalid boolean", () => {
    expect(() => Transformers.Boolean("invalid")).toThrow();
  });
});

describe("Booleanish transformer", () => {
  it("should transform 'yes' to true", () => {
    expect(Transformers.Booleanish("yes", "no")("yes")).toBe(true);
  });

  it("should transform 'no' to false", () => {
    expect(Transformers.Booleanish("yes", "no")("no")).toBe(false);
  });

  it("should throw when transforming an invalid boolean", () => {
    expect(() => Transformers.Booleanish("yes", "no")("invalid")).toThrow();
  });
});

describe("JSON transformer", () => {
  it("should transform a JSON string to an object", () => {
    expect(Transformers.Json('{"key": "value"}')).toEqual({ key: "value" });
  });

  it("should throw when transforming an invalid JSON string", () => {
    expect(() => Transformers.Json("invalid")).toThrow();
  });
});
