import { SingleChoicePopup } from "../captcha/challenge_types";
import type { CaptchaChallenge } from "../captcha/types";

type SingleChoiceChallengeDefinition = {
  id: string;
  prompt: string;
  options: {
    id: string;
    label: string;
  }[];
  correctOptionId: string;
};

const singleChoiceChallengeDefinitions: SingleChoiceChallengeDefinition[] = [
  {
    id: "single-choice-vibe-cooked",
    prompt: "The plan failed before it even started. What does chat say?",
    options: [
      { id: "back", label: "We are so back" },
      { id: "giving", label: "It's giving" },
      { id: "cooked", label: "Bro is cooked" },
      { id: "cook", label: "Let him cook" },
    ],
    correctOptionId: "cooked",
  },
  {
    id: "single-choice-no-cap",
    prompt: "Someone swears the story is true.",
    options: [
      { id: "hat", label: "No hat detected" },
      { id: "truth", label: "I'm not lying" },
      { id: "stop", label: "Stop talking" },
      { id: "ended", label: "The video ended" },
    ],
    correctOptionId: "truth",
  },
  {
    id: "single-choice-support-bit",
    prompt: "Someone sends nonsense, but the energy is correct. Reply with:",
    options: [
      { id: "real", label: "Real" },
      { id: "no-cap", label: "No cap" },
      { id: "skill-issue", label: "Skill issue" },
      { id: "bro-sold", label: "Bro sold" },
    ],
    correctOptionId: "real",
  },
  {
    id: "single-choice-rizz",
    prompt: "Someone wins everyone over without trying. They have:",
    options: [
      { id: "rizz", label: "Rizz" },
      { id: "sigma", label: "Sigma" },
      { id: "npc", label: "NPC" },
      { id: "lag", label: "Lag" },
    ],
    correctOptionId: "rizz",
  },
  {
    id: "single-choice-chat-real",
    prompt: "The group chat needs proof the timeline is still normal.",
    options: [
      { id: "real", label: "Real" },
      { id: "fanum-tax", label: "Fanum tax" },
      { id: "respawn", label: "Respawn" },
      { id: "side-quest", label: "Side quest" },
    ],
    correctOptionId: "real",
  },
  {
    id: "single-choice-embarrassing",
    prompt: "Someone tries to look cool and the room goes silent.",
    options: [
      { id: "based", label: "Based" },
      { id: "cringe", label: "Cringe" },
      { id: "locked-in", label: "Locked in" },
      { id: "ate", label: "Ate" },
    ],
    correctOptionId: "cringe",
  },
  {
    id: "single-choice-main-character-confidence",
    prompt: "The selfie is flawless and the caption knows it.",
    options: [
      { id: "i-fear-i-ate", label: "I fear I ate" },
      { id: "lowkey-maybe", label: "Lowkey maybe" },
      { id: "onto-something", label: "Bro might be onto something" },
      { id: "negative-aura", label: "Negative aura" },
    ],
    correctOptionId: "i-fear-i-ate",
  },
  {
    id: "single-choice-impressive",
    prompt: "Someone absolutely destroys the presentation.",
    options: [
      { id: "ate", label: "They ate" },
      { id: "lagged", label: "They lagged" },
      { id: "spawned", label: "They spawned" },
      { id: "respawned", label: "They respawned" },
    ],
    correctOptionId: "ate",
  },
  {
    id: "single-choice-stop-cooking",
    prompt: "Someone is pitching an idea so bad the room must intervene.",
    options: [
      { id: "never-cook", label: "Never let bro cook again" },
      { id: "let-cook", label: "Let him cook" },
      { id: "common-w", label: "Common W" },
      { id: "big-aura", label: "Big aura" },
    ],
    correctOptionId: "never-cook",
  },
  {
    id: "single-choice-vibe-check",
    prompt: "Everything is going weirdly well. Pick the safest approval.",
    options: [
      { id: "w", label: "W" },
      { id: "common-w", label: "Common W" },
      { id: "big-aura", label: "Big aura" },
      { id: "all", label: "All of the above" },
    ],
    correctOptionId: "all",
  },
  {
    id: "single-choice-mid",
    prompt: "The movie was not terrible, not great, just painfully okay.",
    options: [
      { id: "peak", label: "Peak" },
      { id: "average", label: "Suspiciously average" },
      { id: "final-boss", label: "Final boss" },
      { id: "fire", label: "Lowkey fire" },
    ],
    correctOptionId: "average",
  },
  {
    id: "single-choice-minor-inconvenience",
    prompt:
      "Which phrase belongs in a dramatic reaction to a minor inconvenience?",
    options: [
      { id: "cooked", label: "I'm cooked" },
      { id: "side-quest", label: "New side quest" },
      { id: "spawn", label: "W spawn" },
      { id: "loot", label: "Common loot" },
    ],
    correctOptionId: "cooked",
  },
  {
    id: "single-choice-agree",
    prompt: "You agree, but typing four letters would be doing too much.",
    options: [
      { id: "fr", label: "Fr" },
      { id: "npc", label: "NPC" },
      { id: "mid", label: "Mid" },
      { id: "67", label: "67" },
    ],
    correctOptionId: "fr",
  },
  {
    id: "single-choice-algorithm",
    prompt: 'Which option has the strongest "algorithm found me at 2 AM" energy?',
    options: [
      { id: "skibidi-lore", label: "Skibidi toilet lore breakdown" },
      { id: "aura-farming", label: "Aura farming tutorial" },
      { id: "six-seven", label: "Six seven explained poorly" },
      { id: "mewing", label: "Mewing tutorial iceberg" },
    ],
    correctOptionId: "skibidi-lore",
  },
  {
    id: "single-choice-background-character",
    prompt: "Someone is standing there like default game dialogue.",
    options: [
      { id: "npc", label: "NPC" },
      { id: "rizzler", label: "Rizzler" },
      { id: "final-boss", label: "Final boss" },
      { id: "main-character", label: "Main character" },
    ],
    correctOptionId: "npc",
  },
  {
    id: "single-choice-negative-aura",
    prompt: "Someone admits their social score is below zero.",
    options: [
      { id: "cooked", label: "You're cooked" },
      { id: "common-w", label: "Common W" },
      { id: "cook", label: "Let him cook" },
      { id: "big-aura", label: "Big aura" },
    ],
    correctOptionId: "cooked",
  },
  {
    id: "single-choice-charisma",
    prompt: "Someone walks in and the whole lunch table pays attention.",
    options: [
      { id: "rizz", label: "They have rizz" },
      { id: "lag", label: "They have lag" },
      { id: "homework", label: "They have homework" },
      { id: "no-aura", label: "They have no aura" },
    ],
    correctOptionId: "rizz",
  },
  {
    id: "single-choice-unexpectedly-good",
    prompt: "The random gas station snack is somehow elite.",
    options: [
      { id: "fire", label: "Lowkey fire" },
      { id: "mid", label: "Highkey mid" },
      { id: "npc", label: "Certified NPC" },
      { id: "l", label: "Common L" },
    ],
    correctOptionId: "fire",
  },
  {
    id: "single-choice-absurd-acceptance",
    prompt: "The video makes no sense, but your soul accepts it.",
    options: [
      { id: "real", label: "Real" },
      { id: "cap", label: "Cap" },
      { id: "ratio", label: "Ratio" },
      { id: "touch-grass", label: "Touch grass" },
    ],
    correctOptionId: "real",
  },
  {
    id: "single-choice-locked-in",
    prompt: "The test starts in ten minutes and your brain finally loads.",
    options: [
      { id: "focused", label: "Focused" },
      { id: "logged-out", label: "Logged out" },
      { id: "muted", label: "Muted" },
      { id: "settings", label: "Lost in settings" },
    ],
    correctOptionId: "focused",
  },
  {
    id: "single-choice-alpha-energy",
    prompt: "Someone misses once, nods, and claims it was strategy.",
    options: [
      { id: "sigma", label: "Sigma behavior" },
      { id: "npc", label: "NPC behavior" },
      { id: "tutorial", label: "Tutorial behavior" },
      { id: "side-quest", label: "Side quest behavior" },
    ],
    correctOptionId: "sigma",
  },
  {
    id: "single-choice-win",
    prompt: "The vending machine drops two snacks for one payment.",
    options: [
      { id: "w", label: "W" },
      { id: "l", label: "L" },
      { id: "mid", label: "Mid" },
      { id: "cap", label: "Cap" },
    ],
    correctOptionId: "w",
  },
  {
    id: "single-choice-failed-publicly",
    prompt: "Someone had one job in front of everyone and missed.",
    options: [
      { id: "sold", label: "Bro sold" },
      { id: "ate", label: "Bro ate" },
      { id: "clutched", label: "Bro clutched" },
      { id: "locked-in", label: "Bro locked in" },
    ],
    correctOptionId: "sold",
  },
  {
    id: "single-choice-continue-entertaining",
    prompt: 'Choose the phrase that means "please continue, this is entertaining."',
    options: [
      { id: "cook", label: "Let him cook" },
      { id: "cap", label: "Stop the cap" },
      { id: "skill-issue", label: "Skill issue" },
      { id: "touch-grass", label: "Touch grass" },
    ],
    correctOptionId: "cook",
  },
  {
    id: "single-choice-group-chat-judge",
    prompt: 'Which message has the strongest "group chat judge has spoken" energy?',
    options: [
      { id: "rate-fit", label: "Chat, rate the fit" },
      { id: "him", label: "Bro thinks he's him" },
      { id: "be-fr", label: "Be so for real" },
      { id: "this-you", label: "This you?" },
    ],
    correctOptionId: "this-you",
  },
];

export const singleChoiceChallenges: CaptchaChallenge[] =
  singleChoiceChallengeDefinitions.map((challenge) => ({
    id: challenge.id,
    popup: (props) => (
      <SingleChoicePopup
        {...props}
        promptLabel="Select the correct answer"
        prompt={challenge.prompt}
        promptHint="Choose one option below"
        options={challenge.options}
        correctOptionId={challenge.correctOptionId}
      />
    ),
  }));
