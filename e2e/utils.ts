import dedent from "dedent";

export const extractSummary = (stdout: string) => {
  const match = stdout
    .replaceAll(/(?:\\[nr])+/g, "\n")
    .match(/(Seed:.*\n)?Test Suites:.*\nTests.*\nSnapshots.*\nTime.*(\nRan all test suites)*.*\n*$/gm);
  if (!match) {
    throw new Error(dedent`
        Could not find test summary in the output.
        OUTPUT:
          ${stdout}
      `);
  }

  const summary = replaceTime(match[0]);

  const rest = stdout
    .replace(match[0], "")
    // remove all timestamps
    .replaceAll(/\s*\(\d*\.?\d+ m?s\b\)$/gm, "");

  return {
    rest: rest.trim(),
    summary: summary.trim(),
  };
};

export const replaceTime = (str: string) =>
  str.replaceAll(/\d*\.?\d+ m?s\b/g, "<<REPLACED>>").replaceAll(", estimated <<REPLACED>>", "");
