/** Honest cutover. GitHub holds files. Vercel runs the site. Squarespace keeps the name. */

export const domainCutover = {
  now: "brainfogpodcast.com is a Squarespace Coming Soon page (river photo). That is not this show.",
  cannot:
    "I cannot click Add Preset for you. I can put the files on GitHub, publish on Vercel, and tell you the Squarespace clicks.",
  ready:
    "Repo: github.com/JamesTRichmond/brainfogpodcast (private). Vercel runs it. Squarespace only points the name.",
  warn: "No mail at this name. Do not click Create or connect a website in Squarespace.",
  path: "GitHub holds the files. Vercel runs the site. Squarespace only keeps the name and points it.",
  github: "JamesTRichmond",
  repo: "brainfogpodcast",
  live: "https://brainfogpodcast.vercel.app",
  steps: [
    {
      n: "1",
      name: "Files on GitHub",
      beat: "Private repo brainfogpodcast under JamesTRichmond.",
    },
    {
      n: "2",
      name: "Vercel runs the site",
      beat: "Every push to main builds. You get a vercel.app address first.",
    },
    {
      n: "3",
      name: "Add the name in Vercel",
      beat: "brainfogpodcast.com and www. Vercel shows the records.",
    },
    {
      n: "4",
      name: "Squarespace: Add Preset → Vercel",
      beat: "Domains → brainfogpodcast.com → DNS → Add Preset → Vercel. Not Create a website.",
    },
    {
      n: "5",
      name: "Check",
      beat: "Open brainfogpodcast.com. Two circles and LATE NIGHT, not the river.",
    },
  ],
  screens: [
    {
      n: "1",
      title: "Log in",
      beat: "squarespace.com. Home. Domains.",
    },
    {
      n: "2",
      title: "Open the domain",
      beat: "brainfogpodcast.com. Active. Don't click Create or connect a website.",
    },
    {
      n: "3",
      title: "Open DNS",
      beat: "Left: DNS. Don't delete records yet.",
    },
    {
      n: "4",
      title: "Add Preset → Vercel",
      beat: "After Vercel has the domain added. Password if it asks. Pick Vercel. Save.",
    },
    {
      n: "5",
      title: "Look",
      beat: "New tab: brainfogpodcast.com. Circles = done. River = wait, then check DNS.",
    },
  ],
} as const;
