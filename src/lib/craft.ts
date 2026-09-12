/** Production craft. Not a conferred degree. */

export const spoken = {
  line: "",
  whole: true,
  dropped: true,
  status: "No spoken trailer. The clip is the room. Nobody talks on it. Ever.",
} as const;

export const trailer = {
  type: "trailer" as const,
  title: "The room",
  itunes: "episodeType: trailer — no season, no episode number",
  duration: "Ten seconds of the apartment. Nobody talking.",
  promise: "This is the trailer. The apartment. Not an episode. Not a voice.",
  script: [
    { at: "0:00", line: "Room. Lamp. Air. Nobody talking." },
    { at: "out", line: "02:17. Stop. Room after, not under." },
  ],
} as const;

export const clock = [
  {
    name: "Cold open",
    beat: "Sit down and talk. No set opening. No theme song.",
  },
  {
    name: "Names",
    beat: "James Richmond. Then the person sitting. Title after the thought, not before it.",
  },
  {
    name: "Talk",
    beat: "A full hour. Always someone sitting. They bring the theme. No music under the talking.",
  },
  {
    name: "Air",
    beat: "The room only when nobody is talking. Between thoughts, not under them.",
  },
  {
    name: "Out",
    beat: "02:17. Stop talking. Do not recap. Do not ask them to rate and subscribe in the last breath.",
  },
] as const;

export const soon = {
  status: "Soon. They already talk. The bag is the delay, not the conversation.",
  date: "No date on the site. A date in a directory before a take is a lie.",
} as const;

export const next = [
  {
    n: "1",
    name: "James buys the five things",
    beat: "The list is on Sit. Around six to eight hundred. This is happening in the world, not on the site.",
  },
  {
    n: "2",
    name: "Sit",
    beat: "A full hour. No music under the talking. Room sound only when nobody is speaking.",
  },
  {
    n: "3",
    name: "Cut",
    beat: "Listen back in headphones. If a splice is ugly, fix it.",
  },
  {
    n: "4",
    name: "Put the file on the site",
    beat: "James records. This site gets the player. No fake tape until then.",
  },
] as const;

export const night = [
  { item: "The room", beat: "Close the window. Quiet the fridge if you can. Phones face-down." },
  { item: "The table", beat: "Two chairs that don't squeak. Water for both. An hour is long." },
  { item: "The mics", beat: "About a fist from the mouth. Headphones on. Speakers off." },
  { item: "Record", beat: "Hit record on the little box (the P4). Don't start talking first." },
  { item: "The opening", beat: "No set line. They brought the theme. Start talking." },
  { item: "The hour", beat: "Forty-five to sixty minutes. No music under the voices." },
  { item: "The gaps", beat: "When nobody is talking, the room can sit there. That's on purpose." },
  { item: "Stop", beat: "Don't recap. Don't ask anyone to rate and subscribe. Save the files twice." },
] as const;

export const after = [
  {
    n: "1",
    name: "Copy the files twice",
    beat: "Off the card in the little box, onto the laptop. Then into Google Drive → Late Night Brain Fog → 1-tape. Don't wipe the card until you've heard it play.",
  },
  {
    n: "2",
    name: "Listen once, all the way through",
    beat: "Headphones. Don't edit yet. If the hour is the hour, you already have it.",
  },
  {
    n: "3",
    name: "Cut only what you must",
    beat: "No music under the talking. Leave the quiet. If a splice is ugly, fix that splice only. James listens. I cut. The public site never sees the raw tape.",
  },
  {
    n: "4",
    name: "Open Transistor",
    beat: "Starter, about $19 a month, 14 days free to try. Paste the show fields below. The square picture is the cover.",
  },
  {
    n: "5",
    name: "Upload the trailer first",
    beat: "Mark it as a trailer, not episode one. The clip is the room. Nobody talking. Ever.",
  },
  {
    n: "6",
    name: "Then the hour",
    beat: "The title you picked. James Richmond · the person sitting. First thing in the feed.",
  },
  {
    n: "7",
    name: "Send the feed out",
    beat: "Apple, Spotify, YouTube. Don't publish empty numbers for nights you haven't sat.",
  },
] as const;

export const ethics = [
  {
    title: "Do not borrow the authority of tape",
    body: "Titles are a list of nights, not a season. A picture with a name is not a recorded hour. Directories get a trailer first, then the first hour, never a feed of empty numbers.",
  },
  {
    title: "Do not invent a voice",
    body: "No stand-in for James. No written bio that did not come from him. The mark is the picture until he sits for one. The room has no authority of speech — that is the point of the bed.",
  },
  {
    title: "A guest has a seat, not a surprise",
    body: "They know they may be recorded. They can say stop. Their name sits after James. They bring the theme. This is the release, in plain language, until a lawyer writes a longer one.",
  },
  {
    title: "The bed is ours",
    body: "Room, lamp, air was made for this kit. It is not a conversation and it is not someone else's song. When a real take drives the bars, credit the people in the room.",
  },
] as const;

export const purpose = {
  one: "Two people talking. About an hour. Late. James Richmond's show.",
  for: "This site is the landing page. Logo and mood first. Audio first. Each night the person sitting brings the theme.",
  audience: "Headphones. A walk or a drive. Friends and strangers, equally.",
  return: "A few real hours, cut, up. That's the pride test.",
  theme: "The person sitting brings the theme. There isn't one topic for the whole series.",
  maybe: "First night might be AI. Not locked. Not printed.",
} as const;

export const markWhy = {
  loved: "The two circles and LATE NIGHT. That's the logo you use in the small bar at the top.",
  meaning:
    "No hidden code. Orange is a streetlight. Blue is a television left on. They overlap a little on purpose so it feels like 2am, not a gym logo. The overlap is also how old printing looks when the colors don't line up perfectly.",
  versions: [
    {
      where: "Top of every page",
      why: "Tiny. Only room for the circles and LATE NIGHT. That's the one you liked.",
    },
    {
      where: "Homepage, big",
      why: "Room for the full name: LATE NIGHT plus Brain Fog. Same circles, bigger.",
    },
    {
      where: "Round profile picture",
      why: "Words get cropped in a circle. Circles only.",
    },
    {
      where: "Cover art / episode pictures",
      why: "The big square for Apple and Spotify. Full name plus the night.",
    },
    {
      where: "Kit page",
      why: "Leftovers we didn't pick. Not extra logos. The trail, left visible. Off the public menu.",
    },
  ],
} as const;

/** I draft. James picks. Steal, rewrite, or toss. Not on the public cards until picked. */
export const titleDrafts = [
  {
    n: "1",
    title: "After the Building Goes Quiet",
    note: "The hour, not the topic. Works even if they bring AI or anything else.",
  },
  {
    n: "2",
    title: "Two Chairs",
    note: "The show in two words. Maybe too small. Maybe exactly it.",
  },
  {
    n: "3",
    title: "Still True in the Morning",
    note: "The pride test, as a title. Might be too much thesis.",
  },
] as const;

/** Honest study record. Not an unofficial transcript. Not conferred. */
export const study = [
  {
    school: "Ohio University — Scripps College of Communication",
    program: "Podcasting Certificate (published catalog)",
    status: "Studied. Not enrolled. Not conferred.",
    courses: [
      "Audio reporting and field recording as a craft, not a vibe",
      "Journalism ethics: don't borrow the authority of tape you don't have",
      "Audience: who the hour is for, said in the listing",
    ],
    applied: "The night checklist. Dry voices. No empty episode numbers.",
  },
  {
    school: "Rider University — B.A. in Radio and Podcasting",
    program: "Students own and operate broadcast studios (published program)",
    status: "Studied. Not enrolled. Not conferred.",
    courses: [
      "Two-person sit: two mics, two ears, a box that records both",
      "A guest has a seat, not a surprise",
      "The studio is a room, not a brand of chill",
    ],
    applied: "The bag. From scratch. PodTrak P4, two PodMics, closed-back headphones.",
  },
  {
    school: "NYU — Arthur L. Carter Journalism Institute",
    program: "Podcasting & Audio Reportage concentration (published catalog)",
    status: "Studied. Not enrolled. Not conferred. This site is the topic, not a dissertation.",
    courses: [
      "Deep audio reporting: the hour is the document",
      "What we are allowed to say about the apartment",
      "No fake cold open",
    ],
    applied: "Trailer is the room. No spoken line. Ever. Titles after the sit, drafted then picked.",
  },
] as const;

export const notThoseSchools =
  "I did not sit in those rooms. I did not write to those professors. I will not put their seals on a PDF. The catalogs were read. The kit kept its heart.";

export const beforeAfter = [
  {
    was: "A design kit that talked like a season.",
    now: "A landing page for a show. Nights, not a catalog of fake episodes.",
  },
  {
    was: "C5 as if a night had already been taped.",
    now: "The night card is a trailer picture. Nobody talking. Ever.",
  },
  {
    was: "The pitch named who sits first.",
    now: "It's James's show. Two people talking. They bring the theme. Names live on the night, not the front.",
  },
  {
    was: "A spoken line waiting to be faked.",
    now: "No spoken trailer. The clip is the room.",
  },
] as const;

export const thesisGrafs = [
  "The assignment was three schools and a dissertation. The honest version: read the catalogs, apply the craft, do not wear the seals.",
  "Ohio: the listing has to tell the truth about tape. Rider: two chairs, two mics, a guest who knows they may be recorded. NYU: the hour is the document, and a fake cold open is a lie about the document.",
  "The heart is the apartment. Two lights. James first. Someone sitting after him. No green, no smoke. The title sits. The fringe that inhaled is not-this.",
  "The public object is a trailer with no speech. The catalog is nights that are not tape yet. When James records, this site gets the player. Until then the room is honest, and that is harder than a fake cold open.",
] as const;
