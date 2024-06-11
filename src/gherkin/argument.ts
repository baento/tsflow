import type { PickleStepArgument } from "@cucumber/messages";

export type DataTable<T = Record<string, string>> = T[];

export const extractArgument = (argument?: PickleStepArgument) => {
  if (!argument) {
    return undefined;
  }

  const { dataTable, docString } = argument;

  if (dataTable) {
    const [header, ...rows] = dataTable.rows;
    const headerValues = header.cells.map(({ value }) => value);

    return rows.map(({ cells }) => {
      const rowEntries = cells.map((cell, index) => [headerValues[index], cell.value]);
      return Object.fromEntries(rowEntries);
    });
  }

  if (docString) {
    return docString.content;
  }
};
