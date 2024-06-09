import type { Class } from "../types";

import { Dependencies } from "./dependencies";

export class Container {
  private _instances = new Map<string, Class>();

  public get(prototype: Class) {
    const instance = this._instances.get(prototype.name);

    if (!instance) {
      return this.instanciate(prototype);
    }

    return instance;
  }

  public instanciate(prototype: Class): Class {
    const dependencies = Dependencies.instance.get(prototype);

    const initDeps = [];

    for (const dependency of dependencies) {
      const instance = this.get(dependency);
      initDeps.push(instance);
    }

    const prototypeInstance = new prototype(...initDeps);
    this._instances.set(prototype.name, prototypeInstance);

    return prototypeInstance;
  }

  public clear() {
    this._instances.clear();
  }
}
