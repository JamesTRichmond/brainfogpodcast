/** One living ledger. Phase numbers are permanent. HUMAN items never re-enter the agent list. */

export type PhaseStatus = "open" | "closed" | "closed-with-carry";
export type Kind = "AGENT" | "HUMAN";

export const HUMAN_ITEMS = [
  {
    clickId: 1,
    originPhase: 6,
    lastSeenPhase: 7,
    title: "Buy the bag",
    time: "20 min",
    href: "https://www.amazon.com/gp/aws/cart/add.html?ASIN.1=B08F8HL7T7&Quantity.1=1&ASIN.2=B07MSCRCVK&Quantity.2=2&ASIN.3=B00HVLUR18&Quantity.3=2&ASIN.4=B07V2FJL54&Quantity.4=2&ASIN.5=B087KG4H2Z&Quantity.5=1&ASIN.6=B09ZS1PHV4&Quantity.6=1",
    how: "Logged into Amazon. One cart: P4, two PodMics (XLR, not USB), two M20x, two desk arms, XLR 2-pack, 32 GB SD. Stay around $600–800. Skip Duo and SM7s.",
    success: "Order confirmation, or boxes at the door.",
    blockedBy: null as number | null,
    done: true,
  },
  {
    clickId: 2,
    originPhase: 6,
    lastSeenPhase: 7,
    title: "Sit an hour",
    time: "45–60 min",
    href: null,
    how: "Two mics. Two closed headphones. No speakers. They bring the theme. Dry voices. Quiet can stay.",
    success: "Files on the P4 card.",
    blockedBy: 1,
    done: false,
  },
  {
    clickId: 3,
    originPhase: 6,
    lastSeenPhase: 7,
    title: "Copy the card into 1-tape",
    time: "10 min",
    href: "https://drive.google.com/drive/folders/16NuTrgCnbftf7NsLAmMR1SGuEfY6_ZIX",
    how: "Card → laptop. Then that folder. Don't wipe the card until you've heard it play.",
    success: "The night's files visible in 1-tape.",
    blockedBy: 2,
    done: false,
  },
  {
    clickId: 4,
    originPhase: 6,
    lastSeenPhase: 7,
    title: "Tell me in this chat",
    time: "1 min",
    href: null,
    how: "One line: the tape is in 1-tape. I pull it from Drive.",
    success: "I reply that I have the files.",
    blockedBy: 3,
    done: false,
  },
  {
    clickId: 5,
    originPhase: 7,
    lastSeenPhase: 7,
    title: "Listen to the cut",
    time: "about an hour",
    href: "https://drive.google.com/drive/folders/1kDGXjACtLRIFtGcTYS9ZbhNp9jaBAH_f",
    how: "Headphones. Walk or drive. Keep, or name the minutes to drop.",
    success: "Keep — or a recut list.",
    blockedBy: 4,
    done: false,
  },
  {
    clickId: 6,
    originPhase: 7,
    lastSeenPhase: 7,
    title: "Put the hour on Transistor",
    time: "20 min",
    href: "https://transistor.fm",
    how: "Starter. Cover is the square. Trailer is the room, nobody talking. Then the hour. Don't publish empty nights.",
    success: "The hour is in the feed, not a Coming Soon.",
    blockedBy: 5,
    done: false,
  },
] as const;

export const phases = [
  { id: 1, name: "Identity / kit", status: "closed" as PhaseStatus },
  { id: 2, name: "Public landing", status: "closed" as PhaseStatus },
  { id: 3, name: "GitHub, Vercel, the name", status: "closed" as PhaseStatus },
  { id: 4, name: "Neon waitlist", status: "closed" as PhaseStatus },
  { id: 5, name: "Tape desk + FFmpeg recipes", status: "closed" as PhaseStatus },
  {
    id: 6,
    name: "First hour",
    status: "closed" as PhaseStatus,
    native: ["Bag ordered. Sit and tape stay on the clicklist."],
    carried: [] as string[],
  },
  {
    id: 7,
    name: "Cut and Transistor",
    status: "open" as PhaseStatus,
    native: ["No tape yet. Do not invent an hour. Cut when click 4 is done."],
    carried: [] as string[],
  },
] as const;

export const currentPhaseId = 7;

export const RUNLOG = [
  "2026-09-13 living-phases + dynamic-clicklist: opened phase 6. Parked clicks 1–6. Nothing carried. Site live at brainfogpodcast.com.",
  "2026-09-13 move on: click 1 closed (bag ordered). Phase 6 closed. Phase 7 open. Parked 2–6. Nothing carried.",
] as const;
