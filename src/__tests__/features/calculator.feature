Feature: Calculator

  Scenario: Add two numbers (with regular expressions)
    Given A is 1
    And B is 2
    When I add the values
    Then The result is 012

  Scenario: Subtract two numbers (with cucumber expressions)
    Given X is 1
    And Y is 2
    When I add the values
    Then The result equals 3