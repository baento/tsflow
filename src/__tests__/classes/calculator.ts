export class Calculator {
  private readonly calculator: number[] = [];

  public add(value: number) {
    this.calculator.push(value);
  }

  public sum() {
    return this.calculator.reduce((prev, cur) => prev + cur, 0);
  }
}
