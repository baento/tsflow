# TSFlow

Welcome to **TSFlow**, a lightweight and intuitive framework for defining and running tests in your projects, using a syntax similar to [SpecFlow](https://specflow.org/). TSFlow makes it easy to write, organize, and execute steps in a structured and readable way.

## Features

- **Simple Syntax:** Declare and reuse steps with a clear and concise syntax.
- **Automatic bindings:** Bind your [Gherkin](https://cucumber.io/docs/gherkin/reference/) scenarios to your step definitions with one line.
- **Dependency injection:** Easily share context between your binding classes.
- **Integration Friendly:** Works well with various testing and automation frameworks.

## Getting Started

### Installation

To install TSFlow, run:

```bash
npm install --save-dev @baento/tsflow
```

### Usage

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

Steps are defined using the `@Step`, `@Given`, `@When` and/or `@Then` decorators on class methods. They all have the same effect and only exist for readability.

TSFlow allows you to pass parameters to your step definitions. Define steps with a [Cucumber expression](https://github.com/cucumber/cucumber-expressions#readme) (with placeholders) or alternatively a [Regular Expression](https://en.wikipedia.org/wiki/Regular_expression) (with capture groups) and parameters will be automatically extracted and passed to your step functions.

```typescript
// calculator.steps.ts
import { Given, When, Then } from "@baento/tsflow";

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
  public stepResult(expectedResult: number) {
    expect(this.result).toStrictEqual(expectedResult);
  }
}
```

### Dependency injection

Classes with matching step definitions will be instanciated for each scenario defined in your feature file. Therefore, in order to share data between binding classes in the same scenario, you can use the `@Binding` decorator with an array of classes to be injected in the constructor :

```typescript
import { Binding } from "@baento/tsflow";

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

Injected classes will be instanciated and will persist for an entire scenario.

## Contributing

We welcome contributions to TSFlow! If you find a bug or have a feature request, please open an issue on GitHub. You can also fork the repository and submit a pull request.

## License

TSFlow is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Acknowledgements

Special thanks to all contributors who have helped make TSFlow possible.

---

Happy Stepping! 🥒
