import type { Class } from "../types";

export class Dependencies {
  private static _instance: Dependencies;

  private _dependencies = new Map<Class, Class[]>();

  private constructor() {}

  public static get instance(): Dependencies {
    if (!Dependencies._instance) {
      Dependencies._instance = new Dependencies();
    }

    return Dependencies._instance;
  }

  public get(binding: Class) {
    return this._dependencies.get(binding) || [];
  }

  public set(binding: Class, dependencies: Class[]) {
    this._dependencies.set(binding, dependencies);
  }
}
