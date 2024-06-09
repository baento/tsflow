import runJest from "../runJest";
import { extractSummary } from "../utils";

test("Throw when timeout is exceeded", () => {
  const result = runJest("step-decorator-timeout-option");

  const { rest } = extractSummary(result.stderr);

  expect(rest).toMatchSnapshot();
});
