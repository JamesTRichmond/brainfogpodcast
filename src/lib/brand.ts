export const brand = {
  name: "Late Night Brain Fog",
  kicker: "LATE NIGHT",
  display: "Brain Fog",
  tell: "02:17",
  host: "James Richmond",
  domain: "brainfogpodcast.com",
  wordmark: "A",
  rev: "1.21-go",
} as const;

export const color = {
  base: "#14110E",
  raised: "#1E1A16",
  sodium: "#E08A32",
  tv: "#3A7A9C",
  haze: "#8A6E58",
  ink: "#F0E4D0",
  muted: "#C4B09A",
  glowSodium: "#FFB14A",
  glowTv: "#6EB3D0",
} as const;

export const misreg = {
  em: 0.05,
  px: 6,
  ghost: 0.66,
  disc: 0.86,
  slip: 0.13,
  titleEm: 0.08,
  kickerEm: 0.12,
  period: 10,
  swing: 0.15,
  floorPt: 36,
} as const;

/** C5 1080² title-safe geometry. Production 04-final is frozen; this is the test plate. */
export const c5 = {
  size: 1080,
  safe: { l: 64, t: 64, r: 1016, b: 504 },
  wave: { x: 80, y: 560, w: 920, h: 300 },
  title: { pt: 44, y: 180, asPlaced: 64, sidebearing: -1 },
  kicker: { x: 64, y: 80, pt: 18 },
  ep: { x: 64, y: 118, pt: 22 },
  guest: { x: 64, y: 250, pt: 22 },
  ruleY: 900,
  footerY: 930,
  discs: { cx: 960, cy: 140, r: 70 },
  extrema: [0, 2.5, 5, 7.5] as const,
  fps: 12,
  frames: 120,
  tooMuchPx: 12,
  seam: {
    full01: 0.0003,
    full0n: 0.0003,
    title01: 0.0,
    title0n: 0.0,
  },
} as const;

export type SampleEpisode = {
  number: string;
  title: string;
  guest: string;
  plate: string;
};

/** On-air roster. Custom names still type into the guest field. */
export const guests = [
  "Taylor Fabrega",
  "Zack Mellette",
  "Lyndsey Bingham",
  "Tom Richmond",
  "KJ Richmond",
  "Dan Damerville",
  "Melissa Hutchinson",
  "Connor Fabrega",
  "Shane Brunell",
  "Al & Carson Harder-Hyde",
] as const;

export const samples: SampleEpisode[] = [
  { number: "001", title: "Drift", guest: "", plate: "/kit/episode-001.png" },
  { number: "002", title: "Two A.M.", guest: "Taylor Fabrega", plate: "/kit/episode-002.png" },
  {
    number: "003",
    title: "The Thing We Keep Almost Saying",
    guest: "Zack Mellette",
    plate: "/kit/episode-003.png",
  },
  { number: "004", title: "What Survives the Morning", guest: "", plate: "/kit/episode-004.png" },
  {
    number: "005",
    title: "Whether a Thought That Arrives After Midnight",
    guest: "Al & Carson Harder-Hyde",
    plate: "/kit/episode-005.png",
  },
];

export const artifacts = [
  { id: "C1", name: "Wordmark A + F — locked" },
  { id: "C2", name: "Cover 3000²" },
  { id: "C3", name: "Episode card function" },
  { id: "C4", name: "Five sample cards" },
  { id: "C5", name: "Audiogram 1080² · 10s trailer bed · title still locked" },
  { id: "C6", name: "Platform banner" },
  { id: "C7", name: "Avatar, crop-safe" },
  { id: "C8", name: "Pinned 4:5" },
  { id: "C9", name: "Brand sheet" },
  { id: "C10", name: "Contact sheet" },
] as const;

/** Empty guest is host-only. A named guest sits after the host, never instead of him. */
export function guestLine(guest: string) {
  const g = guest.trim();
  if (!g || g === brand.host) return brand.host;
  return `${brand.host} · ${g}`;
}

export function dxAt(t: number, dx0: number) {
  return dx0 * (1 - misreg.swing + misreg.swing * Math.sin((2 * Math.PI * t) / misreg.period));
}

export function titleDx0(pt: number = c5.title.pt) {
  return misreg.titleEm * pt;
}

export function tooMuchEm(pt: number = c5.title.pt) {
  return c5.tooMuchPx / pt;
}

/** Frame time on the 12fps × 10s encode. Last frame is 119, not t=10. */
export function frameTime(i: number) {
  return (i * misreg.period) / c5.frames;
}

export function voiceScale(t: number, period: number, delay = 0) {
  return 0.82 + 0.18 * (0.5 + 0.5 * Math.sin((2 * Math.PI * (t + delay)) / period));
}

/** origin_x = ceil(safe_left − min(0, sidebearing) + dx_max) */
export function insetOrigin(
  dxMax: number,
  sidebearing: number = c5.title.sidebearing,
) {
  return Math.ceil(c5.safe.l - Math.min(0, sidebearing) + dxMax);
}

export function ghostLeft(
  origin: number,
  dx: number,
  sidebearing: number = c5.title.sidebearing,
) {
  return origin + Math.min(0, sidebearing) - dx;
}

export function c5Pct(n: number) {
  return `${(n / c5.size) * 100}%`;
}

export function c5Cqw(n: number) {
  return `${(n / c5.size) * 100}cqw`;
}

export function ladderVerdict(px: number) {
  if (px <= 1) return "dead";
  if (px <= 3) return "invisible except on a large monitor";
  if (px <= 5) return "floor — only if you hunt";
  if (px <= 7) return "lock — look twice";
  if (px <= 10) return "still type, edges fringe";
  if (px <= 16) return "poster-loud, wrong for a tile";
  return "broken letterforms / anaglyph";
}

export function titleClass(title: string) {
  const n = title.length;
  if (n >= 44) return "text-xl leading-snug sm:text-2xl";
  if (n > 28) return "text-2xl leading-snug sm:text-3xl";
  if (n > 14) return "text-3xl leading-tight sm:text-4xl";
  return "text-4xl leading-none sm:text-5xl";
}
