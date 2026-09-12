import { artifacts, brand, color, guests } from "@/lib/brand";

const decisions = [
  {
    title: "2am light, not a stoner palette",
    body: "Sodium-vapor and television on warm black. Haze is grey biased toward sodium — no pure neutral, no seventh hue, no green.",
  },
  {
    title: "Instability is registration error",
    body: "Not grunge, not texture, not smoke. Sodium ghost left, TV ghost right, ink on top. Horizontal only. 0.05 em at display.",
  },
  {
    title: "Two families",
    body: "Fraunces Soft Bold for display. Space Grotesk for body, UI, and episode titles. Plex Mono was considered and cut.",
  },
  {
    title: "Mark, not type, carries 60px",
    body: "Cover type disappears at podcast-list size. The two-disc mark is the identifier and the circular-crop avatar.",
  },
  {
    title: "Episode card is a function",
    body: `Three named properties: number, title, guest. Host is ${brand.host} on every card. Empty guest is solo. A named guest sits after him. Do not restyle.`,
  },
  {
    title: "02:17 is a tell",
    body: "It is not a logged time of a recorded show. No episode exists yet.",
  },
];

const locked = [
  { item: "Wordmark A + F", why: "Misregistered Fraunces plus the two-disc mark. B and C stay on the table as not-this." },
  { item: "Show name", why: "LATE NIGHT BRAIN FOG." },
  {
    item: "What it's for",
    why: "Two people talking. About an hour. Late. James's show. The person sitting brings the theme. Not a guest's show.",
  },
  { item: "Host on air", why: `${brand.host} on every card. Empty guest is solo ${brand.host.split(" ")[0]}.` },
  {
    item: "Guests",
    why: `${guests.join(", ")}. And more still types into the field.`,
  },
  {
    item: "C5 freeze guest",
    why: "EP 003 · The Thing We Keep Almost Saying · James Richmond · Zack Mellette.",
  },
  {
    item: "C5 bed",
    why: "Room, lamp, air. Not a conversation. This loop is a template — real audio will drive the bars later.",
  },
  {
    item: "Audio host",
    why: "Transistor. RSS and files. This site is the face. Directories get the feed when the first take is cut.",
  },
  {
    item: "Title still",
    why: "The fringe sits. Inhale is not-this — on the table the way wordmark B is on the table.",
  },
  {
    item: "First hour",
    why: "James Richmond · Zack Mellette · The Thing We Keep Almost Saying. A full hour. Bible number 003. First to tape, first in the feed.",
  },
  {
    item: "The ear",
    why: "Headphones, a walk or a drive. Voices dry. Room only between thoughts.",
  },
  {
    item: "The sit",
    why: "From scratch. Buy the bag: P4, two PodMics, two M20x, two arms, cables. Around $600–800. Ideal waits. No USB in the middle of the table.",
  },
  {
    item: "Soon",
    why: "James buys the five things. The site keeps the night ready, and where the file goes after. Trailer first, then the hour. No fake voice.",
  },
  {
    item: "The line",
    why: "Dropped. No spoken trailer. Ever. The clip is the room.",
  },
  {
    item: "Operator pages",
    why: "Kit and Sit exist at their URLs. Not in the menu. Visitors see Show, Trailer, Nights, About.",
  },
  {
    item: "Working title",
    why: "The Thing We Keep Almost Saying stays until he picks something else after the sit.",
  },
  {
    item: "The domain",
    why: "brainfogpodcast.com is Squarespace parking (river, Coming Soon). No mail there. Point it with the Vercel DNS preset after this app is published. I cannot flip DNS from here.",
  },
];

const open: { item: string; why: string }[] = [];

const bans = [
  "leaves",
  "smoke",
  "tie-dye",
  "papers",
  "green-dominant",
  "psychedelic swirls",
  "phosphor",
  "a third plate",
];

export function Law() {
  return (
    <section id="law" className="flex flex-col gap-10">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-tv">SPEC · {brand.rev}</p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-ink md:text-4xl">Tokens are the law</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          The kit is a code-generated file set standing in for the Figma file. Hex lives in tokens.
          If a new asset would look at home on a dispensary flyer, start over.
        </p>
      </div>

      <ul className="grid gap-3 md:grid-cols-2">
        {decisions.map((d) => (
          <li key={d.title} className="rounded-lg bg-raised p-4 shadow-[var(--shadow-hairline)]">
            <p className="font-medium text-ink">{d.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{d.body}</p>
          </li>
        ))}
      </ul>

      <div>
        <h3 className="text-xs font-medium uppercase tracking-[0.28em] text-sodium">Locked this pass</h3>
        <ul className="mt-4 divide-y divide-ink/10 rounded-lg bg-raised shadow-[var(--shadow-hairline)]">
          {locked.map((row) => (
            <li key={row.item} className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
              <p className="text-sm font-medium text-ink">{row.item}</p>
              <p className="text-sm text-muted">{row.why}</p>
            </li>
          ))}
        </ul>
      </div>

      {open.length > 0 ? (
      <div>
        <h3 className="text-xs font-medium uppercase tracking-[0.28em] text-tv">Open — you decide</h3>
        <ul className="mt-4 divide-y divide-ink/10 rounded-lg bg-raised shadow-[var(--shadow-hairline)]">
          {open.map((row) => (
            <li key={row.item} className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
              <p className="text-sm font-medium text-ink">{row.item}</p>
              <p className="text-sm text-muted">{row.why}</p>
            </li>
          ))}
        </ul>
      </div>
      ) : null}

      <div>
        <h3 className="text-xs font-medium uppercase tracking-[0.28em] text-haze">Banned</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {bans.map((b) => (
            <li
              key={b}
              className="rounded-md px-3 py-2 text-xs uppercase tracking-[0.16em] text-muted shadow-[var(--shadow-hairline)]"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xs font-medium uppercase tracking-[0.28em] text-tv">C1–C10</h3>
        <ol className="mt-4 grid gap-2 sm:grid-cols-2">
          {artifacts.map((a) => (
            <li key={a.id} className="flex gap-3 text-sm text-muted">
              <span className="w-8 font-medium text-sodium tabular-nums">{a.id}</span>
              <span>{a.name}</span>
            </li>
          ))}
        </ol>
      </div>

      <p className="text-xs text-haze">
        Locked palette {color.base} {color.sodium} {color.tv} {color.haze} {color.ink}. No phosphor.
      </p>
    </section>
  );
}
