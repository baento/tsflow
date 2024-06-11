import type { Transformer } from "../types";

const Json: Transformer<object> = (value: string) => JSON.parse(value);

export default {
  Json,
};
