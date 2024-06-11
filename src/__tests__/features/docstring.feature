Feature: Docstrings

  Scenario: Testing docstrings
    Given I have a simple docstring
      """
      Hello, World!
      """
    Then I should see the docstring
