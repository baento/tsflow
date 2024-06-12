Feature: loadFeature with tag option - Scenario Outline

  @tagScenarioOutline
  Scenario Outline: Add two number (with Examples)
    Given A is <a>
    And B is <b>
    When I add the values
    Then The result equals <result>

    @tagExamples1
    Examples:
      | a | b | result |
      | 1 | 2 | 3      |
      | 2 | 3 | 5      |
      | 3 | 4 | 7      |

    @tagExamples2
    Examples:
      | a | b | result |
      | 1 | 2 | 3      |
      | 2 | 3 | 5      |
      | 3 | 4 | 7      |
