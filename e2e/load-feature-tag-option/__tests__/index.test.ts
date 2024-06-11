import { loadFeature } from "../../../src";

import "../tagOption.steps";

// None
loadFeature("../tagOptionsScenario.feature", { tags: "@noTagWillMatch" });

// And
loadFeature("../tagOptionsScenario.feature", { tags: "@tagFeature1 and @tagFeature2" });

// Not
loadFeature("../tagOptionsScenario.feature", { tags: "not @tagFeature1" });

// Or
loadFeature("../tagOptionsScenario.feature", { tags: "@tagFeature1 or @tagFeature2" });

// Scenario
loadFeature("../tagOptionsScenario.feature", { tags: "@tagScenario" });

// Scenario Outline
loadFeature("../tagOptionsScenarioOutline.feature", { tags: "@tagScenarioOutline" });

// Examples
loadFeature("../tagOptionsScenarioOutline.feature", { tags: "@tagExamples1" });
loadFeature("../tagOptionsScenarioOutline.feature", { tags: "@tagExamples2" });
