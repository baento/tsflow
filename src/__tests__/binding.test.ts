import { loadFeature } from "../gherkin/feature";

import "./calculator.steps";

loadFeature("./features/calculator.feature");
loadFeature(["./features/cal*.feature"]);
