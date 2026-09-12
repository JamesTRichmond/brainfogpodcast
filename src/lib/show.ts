import { brand, guests, samples, type SampleEpisode } from "@/lib/brand";

export type ShowEpisode = SampleEpisode & {
  slug: string;
  logline: string;
  premiere?: boolean;
};

const copy: Record<string, { slug: string; logline: string }> = {
  "001": {
    slug: "drift",
    logline: "A solo night. The thought that will not pick a wall.",
  },
  "002": {
    slug: "two-am",
    logline: "Taylor Fabrega. The hour that is not late and is not morning.",
  },
  "003": {
    slug: "the-thing-we-keep-almost-saying",
    logline: "Zack Mellette. First hour. The one we keep not quite landing.",
  },
  "004": {
    slug: "what-survives-the-morning",
    logline: "Solo. Breakfast versus the sodium. What is still true in daylight.",
  },
  "005": {
    slug: "whether-a-thought-that-arrives-after-midnight",
    logline: "Al & Carson Harder-Hyde. The long title. Two guests, one hour that might not keep.",
  },
};

export const episodes: ShowEpisode[] = samples.map((s) => {
  const extra = copy[s.number];
  if (!extra) throw new Error(`Missing show copy for EP ${s.number}`);
  return { ...s, ...extra, premiere: s.number === "003" };
});

/** First hour leads. Bible numbers on the plates do not change. */
export const slate = [
  ...episodes.filter((e) => e.premiere),
  ...episodes.filter((e) => !e.premiere),
];

/** Public list. Always someone sitting. Empty-guest plates stay in the kit, not the show. */
export const nights = slate.filter((e) => e.guest);

export function episodeBySlug(slug: string) {
  return episodes.find((e) => e.slug === slug);
}

export const premiere = {
  number: "003",
  slug: "the-thing-we-keep-almost-saying",
  guest: "Zack Mellette",
  title: "The Thing We Keep Almost Saying",
  length: "A full hour. Forty-five to sixty minutes.",
  mix: "Voices dry. The room only between thoughts, never under them.",
  listen: "Headphones. A walk or a drive. The hour has to work if they never see the apartment.",
  soon: "Soon. They already talk. The bag is the delay, not the friendship. No date on this page.",
} as const;

/** Public one-liner under the wordmark. */
export const pitch =
  "Two people talking. About an hour. Late. James Richmond's show.";

/** Apple / Spotify / Transistor show description. */
export const description = `Late Night Brain Fog is James Richmond's late-night show.

He talks with someone sitting with him and records it. They bring the theme. Always two people. About an hour.

The hour is late. The lights are sodium-vapor and a television left on.

Made for headphones — a walk, a drive. Voices sit in the clear. The room comes back when nobody is talking.

Not advice. Not news. The first take is not cut yet.`;

export const aboutShow = [
  "Two people talking. About an hour. Late. James Richmond's show. The person sitting brings the theme.",
  "Always someone sitting. Never instead of him. Audio first — the picture is the listing, the hour is for the ear.",
  "Nothing is recorded yet. Subscribe stays off until an hour is actually up.",
];

export const aboutHost = [
  "James Richmond hosts. It's his show. Always someone sitting. They bring the theme.",
  "No invented biography. The show is the bio until he writes more.",
];

export const directories = [
  { name: "Apple Podcasts", role: "the catalog most people search first" },
  { name: "Spotify", role: "where a lot of the listening happens" },
  { name: "YouTube", role: "the video shelf, when a take has a picture" },
  { name: "RSS", role: "Overcast, Pocket Casts, and everything else" },
] as const;

/**
 * Where the audio files and the RSS feed live.
 * Listeners never visit this. Directories read the feed.
 */
export const audioHost = {
  name: "Transistor",
  plan: "Starter",
  price: "$19 a month",
  trial: "14 days",
  url: "https://transistor.fm",
  why: [
    "People put the files on a host. Listeners never go there. They go to Apple, Spotify, YouTube, Pocket Casts. The host's job is the RSS feed and the audio.",
    "Most first shows land on Buzzsprout because it is easy, or on Spotify for Creators because it is free. Spotify keeps the show inside Spotify's page. Buzzsprout will give you a website that looks like a Buzzsprout website.",
    "This show already has a face. Transistor holds the audio and the feed, will not restyle the cover, and lets this site be the site. Starter is enough until a take exists. Captivate is for ads and growth — too early. Do not start on a free host you will have to leave.",
  ],
} as const;

/** Fields to paste into Transistor / Apple Podcasts Connect. */
export const feedProfile = [
  { label: "Show title", value: brand.name },
  { label: "Author", value: brand.host },
  { label: "Owner", value: brand.host },
  { label: "Language", value: "English" },
  { label: "Category", value: "Society & Culture · Personal Journals" },
  { label: "Type", value: "Episodic" },
  { label: "Explicit", value: "No" },
  { label: "Artwork", value: "Cover, 3000 × 3000 — the C2 plate" },
  { label: "Copyright", value: `© ${brand.host}` },
  { label: "Website", value: "This site" },
  { label: "Owner email", value: "The one you use for Apple Podcasts Connect. Do not invent one here." },
] as const;

export const roster = guests;
