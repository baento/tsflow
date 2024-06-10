import runJest from "../runJest";

test("Throw when timeout is exceeded", () => {
  const result = runJest("step-decorator-timeout-option");

  expect(result.stderr).toContain("Step timed out after 250ms");
});
