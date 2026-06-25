import { OrderingPopup } from "../captcha/challenge_types";
import type { CaptchaChallenge } from "../captcha/types";

type OrderingChallengeDefinition = {
  id: string;
  prompt: string;
  options: {
    id: string;
    label: string;
  }[];
  correctOrder: string[];
};

const orderingChallengeDefinitions: OrderingChallengeDefinition[] = [
  {
    id: "ordering-cooked",
    prompt: "Order these from least cooked to most cooked",
    options: [
      { id: "phone-1", label: "Phone at 1%" },
      { id: "delayed", label: "Slightly delayed" },
      { id: "be-honest", label: 'Group chat said "be honest"' },
      { id: "forgot-assignment", label: "Forgot the assignment" },
    ],
    correctOrder: ["delayed", "forgot-assignment", "phone-1", "be-honest"],
  },
  {
    id: "ordering-group-chat-reactions",
    prompt: "Order the group chat reactions from calm to catastrophic",
    options: [
      { id: "bro", label: "BRO" },
      { id: "real", label: "real" },
      { id: "chat-real", label: "chat is this real" },
      { id: "wait", label: "wait" },
    ],
    correctOrder: ["real", "wait", "bro", "chat-real"],
  },
  {
    id: "ordering-w-size",
    prompt: "Order these from smallest W to biggest W",
    options: [
      { id: "snack-machine", label: "Snack machine gave two" },
      { id: "charger", label: "Found the charger" },
      { id: "snow-day", label: "Snow day" },
      { id: "homework-delayed", label: "Homework got delayed" },
    ],
    correctOrder: ["charger", "homework-delayed", "snack-machine", "snow-day"],
  },
  {
    id: "ordering-brainrot-vibes",
    prompt: "Order the vibes from most normal to most brainrot",
    options: [
      { id: "skibidi-iceberg", label: "Skibidi lore iceberg" },
      { id: "regular-meme", label: "Regular meme" },
      { id: "ohio-final-boss", label: "Ohio final boss compilation" },
      { id: "slowed-reverb", label: "Slowed reverb edit" },
    ],
    correctOrder: [
      "regular-meme",
      "slowed-reverb",
      "skibidi-iceberg",
      "ohio-final-boss",
    ],
  },
  {
    id: "ordering-fit-check",
    prompt: "Order the fit check ratings from lowest to highest",
    options: [
      { id: "fire", label: "Fire" },
      { id: "mid", label: "Mid" },
      { id: "ate", label: "Ate" },
      { id: "clean", label: "Clean" },
    ],
    correctOrder: ["mid", "clean", "fire", "ate"],
  },
  {
    id: "ordering-battery-panic",
    prompt: "Order the battery percentages by panic level",
    options: [
      { id: "9", label: "9%" },
      { id: "72", label: "72%" },
      { id: "1", label: "1%" },
      { id: "28", label: "28%" },
    ],
    correctOrder: ["72", "28", "9", "1"],
  },
  {
    id: "ordering-online-status",
    prompt: "Order these statuses from online to unavailable",
    options: [
      { id: "read", label: "Left on read" },
      { id: "active", label: "Active now" },
      { id: "dead", label: "Phone dead" },
      { id: "typing", label: "Typing..." },
    ],
    correctOrder: ["active", "typing", "read", "dead"],
  },
  {
    id: "ordering-confidence",
    prompt: "Order the confidence levels",
    options: [
      { id: "locked-in", label: "Locked in" },
      { id: "unsure", label: "Unsure" },
      { id: "sigma", label: "Sigma" },
      { id: "lowkey", label: "Lowkey" },
    ],
    correctOrder: ["unsure", "lowkey", "locked-in", "sigma"],
  },
  {
    id: "ordering-brainrot-terms",
    prompt: "Order these from least to most brainrot",
    options: [
      { id: "fanum-tax", label: "Fanum tax" },
      { id: "real", label: "Real" },
      { id: "six-seven", label: "Six seven" },
      { id: "skibidi", label: "Skibidi" },
    ],
    correctOrder: ["real", "skibidi", "fanum-tax", "six-seven"],
  },
  {
    id: "ordering-lunch-table",
    prompt: "Order the lunch table reactions after someone says something wild",
    options: [
      { id: "ayo", label: '"Ayo?"' },
      { id: "silence", label: "Silence" },
      { id: "yelling", label: "Everyone yelling" },
      { id: "side-eye", label: "Side eye" },
    ],
    correctOrder: ["silence", "side-eye", "ayo", "yelling"],
  },
  {
    id: "ordering-caught-in-4k",
    prompt: 'Order these from least to most "screen got caught in 4K"',
    options: [
      { id: "game", label: "Game paused" },
      { id: "blank", label: "Blank tab" },
      { id: "meme-search", label: "Meme search results" },
      { id: "homework", label: "Homework doc" },
    ],
    correctOrder: ["blank", "homework", "game", "meme-search"],
  },
  {
    id: "ordering-meme-lifespan",
    prompt: "Order the meme lifespan",
    options: [
      { id: "parent", label: "Parent uses it" },
      { id: "new", label: "New" },
      { id: "archaeology", label: "Archaeology" },
      { id: "everywhere", label: "Everywhere" },
    ],
    correctOrder: ["new", "everywhere", "parent", "archaeology"],
  },
  {
    id: "ordering-aura-score",
    prompt: "Order the aura score",
    options: [
      { id: "solid", label: "Solid aura" },
      { id: "negative", label: "Negative aura" },
      { id: "final-boss", label: "Final boss aura" },
      { id: "neutral", label: "Neutral aura" },
    ],
    correctOrder: ["negative", "neutral", "solid", "final-boss"],
  },
  {
    id: "ordering-bad-take",
    prompt: "Order the responses to a bad take from polite to devastating",
    options: [
      { id: "bro-what", label: "Bro what" },
      { id: "hmm", label: "Hmm" },
      { id: "delete-this", label: "Delete this" },
      { id: "interesting", label: "Interesting" },
    ],
    correctOrder: ["hmm", "interesting", "bro-what", "delete-this"],
  },
  {
    id: "ordering-app-muscle-memory",
    prompt: 'Order the apps from "opened intentionally" to "opened by muscle memory"',
    options: [
      { id: "messages", label: "Messages" },
      { id: "notes", label: "Notes" },
      { id: "tiktok", label: "TikTok" },
      { id: "camera", label: "Camera" },
    ],
    correctOrder: ["notes", "camera", "messages", "tiktok"],
  },
  {
    id: "ordering-group-chat-argument",
    prompt: "Order these from least to most likely to start a group chat argument",
    options: [
      { id: "be-honest", label: '"be honest"' },
      { id: "lol", label: '"lol"' },
      { id: "rate-fit", label: '"rate the fit"' },
      { id: "who-asked", label: '"who asked"' },
    ],
    correctOrder: ["lol", "who-asked", "be-honest", "rate-fit"],
  },
];

export const orderingChallenges: CaptchaChallenge[] =
  orderingChallengeDefinitions.map((challenge) => ({
    id: challenge.id,
    popup: (props) => (
      <OrderingPopup
        {...props}
        promptLabel="Put the items in order"
        prompt={challenge.prompt}
        promptHint="Drag items or use the handle buttons"
        options={challenge.options}
        correctOrder={challenge.correctOrder}
      />
    ),
  }));
