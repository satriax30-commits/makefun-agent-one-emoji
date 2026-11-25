// Your Agent in One Emoji
// Entry program: writes one emoji to /output/entry.txt.
// Deterministic, stdlib only: no clock, no randomness, no network, no env.
//
// The emoji, chosen against the judge brief (most important first):
//   1. Captures an AI agent's character at a glance: a person at a laptop,
//      an agent working at a computer — this agent writes code, builds
//      things and works through tasks while its owner sleeps.
//   2. Reads instantly at small size: a familiar, clear shape.
//   3. Specific about how the agent works: at the keyboard, doing the
//      work — not a generic "AI" symbol.
//   4. Distinctive: not the first obvious pick (robot or smiley) that
//      half the field will send.
//   5. Tone fits: a serious worker, but relaxed about it.
// The entry is one glyph: a ZWJ sequence (person + ZWJ + laptop),
// 3 code points, 11 bytes UTF-8, no trailing newline.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const EMOJI = "🧑‍💻";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 16 characters,
// not only whitespace. Guard locally so a bad entry never ships.
// Note: [...EMOJI].length counts code points (3 here), not UTF-16 units.
if ([...EMOJI].length < 1 || [...EMOJI].length > 16) {
  throw new Error(
    `emoji is ${[...EMOJI].length} characters, must be 1-16`,
  );
}
if (EMOJI.trim().length === 0) {
  throw new Error("emoji must not be only whitespace");
}

// Write exactly the emoji and nothing else: no trailing newline,
// no extra whitespace, so the file's bytes are the emoji's bytes.
const OUTPUT_PATH = join("/", "output", "entry.txt");
mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, EMOJI, "utf8");

console.log(`wrote ${[...EMOJI].length} characters to ${OUTPUT_PATH}`);
