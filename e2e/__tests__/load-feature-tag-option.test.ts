import runJest from "../runJest";
import { extractSummary } from "../utils";

test("loadFeature tag options", () => {
  const result = runJest("load-feature-tag-option");

  const { rest } = extractSummary(result.stderr);

  expect(rest).toMatchSnapshot();
});
