import { Binding } from "../decorators";
import { InstanceManager } from "../instanceManager";

describe("InstanceManager", () => {
  @Binding()
  class TestClass {}

  @Binding()
  class TestClass2 {}

  @Binding([TestClass])
  class TestClassWithOneLevelOfDependencies {
    constructor(private readonly testClass: TestClass) {}
  }

  @Binding([TestClassWithOneLevelOfDependencies])
  class TestClassWithTwoLevelsOfDependencies {
    constructor(private readonly testClassWithOneLevelOfDependencies: TestClassWithOneLevelOfDependencies) {}
  }

  @Binding([TestClass, TestClass2])
  class TestClassWithTwoDependency {
    constructor(
      private readonly testClass: TestClass,
      private readonly testClass2: TestClass2,
    ) {}
  }

  describe("getOrSaveInstance", () => {
    it("should return an instance of the class", () => {
      const instanceManager = new InstanceManager();
      const instance = instanceManager.getOrSaveInstance(TestClass);

      expect(instance).toBeDefined();
    });

    it("should return the same instance of the class", () => {
      const instanceManager = new InstanceManager();
      const instance1 = instanceManager.getOrSaveInstance(TestClass);
      const instance2 = instanceManager.getOrSaveInstance(TestClass);

      expect(instance1).toBe(instance2);
    });

    it("should return an instance of the class with one level of dependencies", () => {
      const instanceManager = new InstanceManager();
      const instance = instanceManager.getOrSaveInstance(TestClassWithOneLevelOfDependencies);
      const dependency = instanceManager.getInstance(TestClass);

      expect(instance).toBeDefined();
      expect(dependency).toBeDefined();
    });

    it("should return an instance of the class with two levels of dependencies", () => {
      const instanceManager = new InstanceManager();
      const instance = instanceManager.getOrSaveInstance(TestClassWithTwoLevelsOfDependencies);
      const dependency = instanceManager.getInstance(TestClassWithOneLevelOfDependencies);
      const subDependency = instanceManager.getInstance(TestClass);

      expect(instance).toBeDefined();
      expect(dependency).toBeDefined();
      expect(subDependency).toBeDefined();
    });

    it("should return an instance of the class with two dependencies", () => {
      const instanceManager = new InstanceManager();
      const instance = instanceManager.getOrSaveInstance(TestClassWithTwoDependency);
      const dependency1 = instanceManager.getInstance(TestClass);
      const dependency2 = instanceManager.getInstance(TestClass2);

      expect(instance).toBeDefined();
      expect(dependency1).toBeDefined();
      expect(dependency2).toBeDefined();
    });
  });

  describe("getInstance", () => {
    it("should throw an error if no instance is found", () => {
      const instanceManager = new InstanceManager();

      expect(() => instanceManager.getInstance(TestClass)).toThrow();
    });
  });
});
