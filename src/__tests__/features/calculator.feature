Feature: Calculator

  Scenario: Add two numbers (with regular expressions)
    Given A is 1
    And B is 2
    When I add the values
    Then The result is 012

  Scenario: Add two numbers (with regular expressions and @Types)
    Given C is 1
    And D is 2
    When I add the values
    Then The result should be 3

  Scenario: Add two numbers (with cucumber expressions)
    Given E is 1
    And F is 2
    When I add the values
    Then The result equals 3