import { Binding } from "../decorators";
import { Container } from "../dependencies";

describe("Container", () => {
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

  describe("get", () => {
    it("should return an instance of the class", () => {
      const container = new Container();
      const instance = container.get(TestClass);

      expect(instance).toBeDefined();
    });

    it("should return the same instance of the class", () => {
      const container = new Container();
      const instance1 = container.get(TestClass);
      const instance2 = container.get(TestClass);

      expect(instance1).toBe(instance2);
    });

    it("should return an instance of the class with one level of dependencies", () => {
      const container = new Container();
      const instance = container.get(TestClassWithOneLevelOfDependencies);
      const dependency = container.get(TestClass);

      expect(instance).toBeDefined();
      expect(dependency).toBeDefined();
    });

    it("should return an instance of the class with two levels of dependencies", () => {
      const container = new Container();
      const instance = container.get(TestClassWithTwoLevelsOfDependencies);
      const dependency = container.get(TestClassWithOneLevelOfDependencies);
      const subDependency = container.get(TestClass);

      expect(instance).toBeDefined();
      expect(dependency).toBeDefined();
      expect(subDependency).toBeDefined();
    });

    it("should return an instance of the class with two dependencies", () => {
      const container = new Container();
      const instance = container.get(TestClassWithTwoDependency);
      const dependency1 = container.get(TestClass);
      const dependency2 = container.get(TestClass2);

      expect(instance).toBeDefined();
      expect(dependency1).toBeDefined();
      expect(dependency2).toBeDefined();
    });
  });
});
