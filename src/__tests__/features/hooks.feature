Feature: Testing hooks

  Scenario: Multiple hooks with a single step
    Then Set the number to 50

  Scenario: Single hook with a multiple steps
      Then Increase by 1
      Then Increase by 10