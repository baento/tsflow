import type { Transformer } from "../types";

type Boolean = {
  (): Transformer<boolean>;
  (trueString: string, falseString: string): Transformer<boolean>;
};

const Booleanish: Boolean = (trueString = "true", falseString = "false") => {
  return (value: string) => {
    if (value === trueString) {
      return true;
    }

    if (value === falseString) {
      return false;
    }

    throw new Error(`Expected "${trueString}" or "${falseString}", but got "${value}"`);
  };
};

export default {
  Booleanish,
  Boolean: Booleanish(),
};
