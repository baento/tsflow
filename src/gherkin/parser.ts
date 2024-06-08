import { AstBuilder, GherkinClassicTokenMatcher, Parser, compile } from "@cucumber/gherkin";
import type AstNode from "@cucumber/gherkin/dist/src/AstNode";
import { type GherkinDocument, IdGenerator } from "@cucumber/messages";

export class GherkinParser {
  private _uuid: IdGenerator.NewId;
  private _parser: Parser<AstNode>;

  constructor() {
    this._uuid = IdGenerator.uuid();
    const builder = new AstBuilder(this._uuid);
    const matcher = new GherkinClassicTokenMatcher();
    this._parser = new Parser(builder, matcher);
  }

  public parseDocument(source: string) {
    return this._parser.parse(source);
  }

  public compileDocument(document: GherkinDocument, uri: string) {
    return compile(document, uri, this._uuid);
  }
}
