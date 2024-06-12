@tagFeature1 @tagFeature2
Feature: loadFeature with tag option - Scenario

  @tagScenario
  Scenario: Add two number
    Given A is 1
    And B is 2
    When I add the values
    Then The result equals 3