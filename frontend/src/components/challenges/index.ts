import { orderingChallenges } from "./orderingChallenges";
import { singleChoiceChallenges } from "./singleChoiceChallenges";

export const challenges = [...singleChoiceChallenges, ...orderingChallenges];

export { orderingChallenges, singleChoiceChallenges };
