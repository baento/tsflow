import { describe, expect, it } from "@jest/globals";

import fs from "fs";
import path from "path";

import { GherkinParser } from "../parser";

describe("GherkinParser", () => {
  const uri = path.resolve(__dirname, "./calculator.feature");
  const source = fs.readFileSync(uri, { encoding: "utf-8" });

  const gherkinParser = new GherkinParser();

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
