import { BindingRegistry } from "./registry";
import type { Class } from "./types";

export class InstanceManager {
  private _instances = new Map<string, Class>();

  public saveInstanceAndDeps(prototype: Class) {
    const dependencies = BindingRegistry.instance.getDependencies(prototype);

    if (dependencies.length === 0) {
      const prototypeInstance = new prototype();
      this._instances.set(prototype.name, prototypeInstance);
    } else {
      const initDeps = [];

      for (const dependency of dependencies) {
        this.saveInstanceAndDeps(dependency);

        initDeps.push(this._instances.get(dependency.name));
      }

      const prototypeInstance = new prototype(...initDeps);
      this._instances.set(prototype.name, prototypeInstance);
    }
  }

  public getOrSaveInstance(prototype: Class): Class {
    const instance = this._instances.get(prototype.name);

    if (!instance) {
      this.saveInstanceAndDeps(prototype);

      return this.getOrSaveInstance(prototype);
    }

    return instance;
  }

  public getInstance(prototype: Class) {
    const instance = this._instances.get(prototype.name);

    if (!instance) {
      throw new Error(`No instance found for ${prototype.name}`);
    }

    return instance;
  }

  public clear() {
    this._instances.clear();
  }
}
