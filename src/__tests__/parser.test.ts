import path from "path";
import fs from "fs";

import { GherkinParser } from "../gherkin/parser";

describe("GherkinParser", () => {
  const gherkinParser = new GherkinParser();
  const uri = path.resolve(__dirname, "./features/calculator.feature");
  const source = fs.readFileSync(uri, { encoding: "utf-8" });

  describe("parseDocument", () => {
    it("should parse a document", () => {
      const document = gherkinParser.parseDocument(source);

      expect(document).toBeDefined();
    });
  });

  describe("compileDocument", () => {
    it("should compile a document", () => {
      const document = gherkinParser.parseDocument(source);
      const compiled = gherkinParser.compileDocument(document, uri);

      expect(compiled).toBeDefined();
    });
  });
});
