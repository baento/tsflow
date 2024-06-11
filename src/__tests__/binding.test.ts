import { loadFeature } from "../gherkin/feature";

import "./steps/calculator.steps";
import "./steps/tag.steps";

loadFeature("./features/calculator.feature");
loadFeature(["./features/cal*.feature"]);

loadFeature("./features/tag.feature", { tags: "@tag" });
loadFeature("./features/tag.feature", { tags: "@scenario1" });
