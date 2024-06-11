import tagExpressionParser from "@cucumber/tag-expressions";

type ParserFunction = { evaluate(variables: string[]): boolean };

export const getTagParser = (tags?: string): ParserFunction | undefined => {
  if (!tags) {
    return;
  }

  return tagExpressionParser(tags);
};
