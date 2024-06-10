import type { Transformer } from "../types";

type Bool = {
  (): Transformer<boolean>;
  (trueString: string, falseString: string): Transformer<boolean>;
};

export const Booleanish: Bool = (trueString = "true", falseString = "false") => {
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

export const Bool = Booleanish();
