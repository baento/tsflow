# TSFlow

Welcome to **TSFlow**, a lightweight and intuitive framework for defining and running tests in your projects, inspired by [SpecFlow](https://specflow.org/) and [jest-cucumber](https://github.com/bencompton/jest-cucumber). TSFlow makes it easy to write, organize, and execute steps in a structured and readable way.

> [!NOTE]  
> This project is still under heavy development. Beware of breaking changes !

## Features

- ✏️ **Simple syntax:** Implement and reuse steps with a clear and concise syntax.
- 🔗 **Automatic bindings:** Bind your [Gherkin](https://cucumber.io/docs/gherkin/reference/) scenarios to your step definitions with two lines.
- 💉 **Dependency injection:** Easily share context between your binding classes.

## Getting Started

### Installation

To install TSFlow, run:

```bash
npm install --save-dev @baento/tsflow
```

> [!IMPORTANT]  
> TSFlow is **not** a test runner. It currently only runs on [Jest](https://jestjs.io/), other test runners will be supported in the future (see #44).

### Basic Usage

Let's assume the following feature file :

```feature
# calculator.feature
Feature: Calculator

  Scenario: Add two numbers
    Given A number 1
    And A number 2
    When I add the numbers
    Then The result is 3
```

TSFlow allows you to define steps in a declarative way. Here's a simple example to get you started:

```typescript
// calculator.test.ts
import { loadFeature } from "@baento/tsflow";

import "./calculator.steps.ts";

loadFeature("./calculator.feature");
```

### Defining Steps

Steps are defined using the `@Step`, `@Given`, `@When` and/or `@Then` decorators on class methods decorated with the `@Binding` decorator. They all have the same effect and only exist for readability.

You can pass parameters to your step definitions by defining steps with a [Cucumber expression](https://github.com/cucumber/cucumber-expressions#readme) (with placeholders) or alternatively a [Regular Expression](https://en.wikipedia.org/wiki/Regular_expression) (with capture groups), parameters will be automatically extracted and passed to your step functions.

> [!WARNING]  
> Using Regular Expressions, parameters will not be automatically casted to the correct type.
> You might want to add a `@Types` decorator onto the method to specify transformers for your parameters.

```typescript
// calculator.steps.ts
import { Binding, Given, When, Then } from "@baento/tsflow";

@Binding()
class CalculatorSteps {
  private numbers: number[] = [];
  private result: number = 0;

  constructor() {}

  @Given("A number {int}")
  public stepIs(value: number) {
    this.numbers.push(value);
  }

  @When("I add the numbers")
  public stepAdd() {
    this.result = this.numbers.reduce((acc, curr) => acc + curr, 0);
  }

  @Then(/^The result is (\d+)$/)
  public stepResult(expectedResult: string) {
    expect(this.result).toStrictEqual(Number(expectedResult));
  }
}
```

### Dependency injection

Classes with matching step definitions will be instanciated for each scenario defined in your feature file. Therefore, in order to share data between binding classes in the same scenario, you can specify dependencies in the `@Binding` decorator :

```typescript
import { Binding, Given } from "@baento/tsflow";

class Calculator {
  public numbers: number[] = [];

  constructor() {}
}

@Binding([Calculator])
class CalculatorSteps {
  constructor(readonly calculator: Calculator) {}

  @Given("A number {int}")
  public stepIs(value: number) {
    this.calculator.numbers.push(value);
  }

  // ...
}
```
> [!NOTE]  
> Injected classes will be instanciated and will persist for an entire scenario.

## Contributing

We welcome contributions to TSFlow! If you find a bug or have a feature request, please open an issue on GitHub. You can also fork the repository and submit a pull request.

## License

TSFlow is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Acknowledgements

Special thanks to all contributors who have helped make TSFlow possible.

---

Happy Stepping! 🥒
