/** What the first hour actually sits with. Not a shopping-affiliate page. */

export const sitWhy =
  "Two people in an apartment. A full hour. Voices dry — the room only between thoughts. They will hear it on a walk, in headphones. So: two mics that reject the room, two pairs of closed headphones, and a box with two mouths and two ears. No speaker in the room. No one mic in the middle of the table.";

export const buy = {
  from: "From scratch. They already talk. Buy the bag. Sit when it arrives.",
  ceiling: "Stay around $600–800. If a store tries to sell you the Duo or two SM7s, walk.",
} as const;

export const bag = [
  { n: "1", name: "Zoom PodTrak P4", qty: "one", around: "~$200" },
  { n: "2", name: "Rode PodMic", qty: "two", around: "~$100 each" },
  { n: "3", name: "Audio-Technica ATH-M20x", qty: "two", around: "~$50 each" },
  { n: "4", name: "A desk boom arm", qty: "two", around: "~$40 each" },
  { n: "5", name: "XLR cables and an SD card", qty: "two cables, one card", around: "~$40" },
] as const;

export const already = [
  {
    item: "The apartment",
    why: "Close the window. Kill the fridge if you can. A rug. Two chairs that do not squeak for sixty minutes.",
  },
  {
    item: "A laptop you already have",
    why: "The cut happens here. The sit does not need a new computer.",
  },
  {
    item: "The lamp",
    why: "It is already the picture. Do not buy a podcast light. This hour is for the ear.",
  },
  {
    item: "Water and a clock",
    why: "Forty-five to sixty. They need a glass and a way to see 02:17 coming.",
  },
] as const;

export const essential = [
  {
    item: "Two dynamic mics",
    pick: "Rode PodMic. Two of them. From scratch, do not hunt a used SM58.",
    around: "around $100 each",
    why: "They hear the mouth in front of them, not the kitchen. Condensers eat the apartment. One USB mic in the middle of the table will not survive a dry hour.",
  },
  {
    item: "A box with two mouths and two ears",
    pick: "Zoom PodTrak P4. This is the desk. Not a Scarlett with one headphone jack.",
    around: "around $200",
    why: "Two XLRs, four if Al and Carson sit later. A headphone jack for each person. Records to a card if the laptop dies.",
  },
  {
    item: "Two closed-back headphones",
    pick: "Audio-Technica ATH-M20x. Two pairs. Sony 7506 waits.",
    around: "around $50 each",
    why: "They hear each other without a speaker. Open-back headphones leak into the mics. Speakers during a take will sit under the voices, which we refused.",
  },
  {
    item: "Two boom arms",
    pick: "Any solid desk arm that holds still for an hour.",
    around: "around $40 each",
    why: "Handheld is not an hour. The mic stays a fist from the mouth. They can move a glass without the stand walking.",
  },
  {
    item: "Cables and a card",
    pick: "Two XLR cables you can trip on and forgive. An SD card for the P4.",
    around: "around $40",
    why: "The cheap cable is the one that fails at minute fifty.",
  },
] as const;

export const essentialTotal = "The bag. Around $600–800. You already have the room.";

export const ideal = [
  {
    item: "Two broadcast mics",
    pick: "Shure SM7dB. The extra gain lives in the mic, so no extra box.",
    around: "around $500 each",
    why: "Closer, darker, more forgiving of the apartment. After the first hour is cut — not before.",
  },
  {
    item: "The two-person desk",
    pick: "Rode Rodecaster Duo.",
    around: "around $550",
    why: "Do not buy this and the P4. We bought the P4. The Duo is a later desk, not a second one in the same cart.",
  },
  {
    item: "Arms that forget they are there",
    pick: "Rode PSA1+.",
    around: "around $130 each",
    why: "An hour of boom sag is a mic that walks off the mouth. Upgrade if the cheap arms walk.",
  },
  {
    item: "The mix headphones",
    pick: "Sony MDR-7506, two pairs.",
    around: "around $100 each",
    why: "What a lot of rooms still cut on. Closed. Honest. They will tell you if a join is dirty.",
  },
  {
    item: "A little of the room taken out",
    pick: "A moving blanket behind each head, or two panels at mouth height. Not a foam pyramid kit.",
    around: "around $50–200",
    why: "Voices are dry. The apartment will still slap if the walls are bare. A blanket is allowed on day one. A treated room is not the bag.",
  },
  {
    item: "A spare recorder",
    pick: "Zoom H5 or F3 on the table, not in the mix.",
    around: "around $200–350",
    why: "If the sit dies at minute forty, the spare is the hour. After the first hour earns a spare.",
  },
] as const;

export const idealTotal =
  "Not this trip. From scratch. The first hour does not need two thousand dollars.";

export const notThis = [
  "One USB mic in the middle of the table.",
  "A condenser pair in an untreated kitchen.",
  "Speakers on during the take.",
  "Open-back headphones.",
  "A ring light. This hour is not a picture.",
  "A new laptop. The one you have will cut.",
  "A 'podcast lamp.' You already have sodium in the window.",
  "Wireless lavs as the master. They are a backup if someone walks, not the sit.",
  "The Rodecaster Duo in the same cart as the P4.",
  "Two SM7s before anyone has sat.",
] as const;

export const later = {
  title: "When three sit",
  body: "Al and Carson Harder-Hyde are a later night. That is three mouths. The P4 already has four. Do not buy a bigger desk for a night that is not on the calendar.",
} as const;
