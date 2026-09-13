"use client";

import { useEffect, useMemo, useState } from "react";
import { HUMAN_ITEMS } from "@/lib/ledger";

const STORAGE = "late-night-clicklist-v1";

function loadDone(): Record<number, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE);
    return raw ? (JSON.parse(raw) as Record<number, boolean>) : {};
  } catch {
    return {};
  }
}

export function Clicklist() {
  const [done, setDone] = useState<Record<number, boolean>>({});
  const [open, setOpen] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setDone(loadDone());
  }, []);

  function toggle(id: number) {
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(STORAGE, JSON.stringify(next));
      return next;
    });
  }

  const total = HUMAN_ITEMS.length;
  const n = HUMAN_ITEMS.filter((s) => s.done || done[s.clickId]).length;
  const nextOpen = HUMAN_ITEMS.find((s) => {
    if (s.done || done[s.clickId]) return false;
    if (s.blockedBy == null) return true;
    return Boolean(done[s.blockedBy]);
  });

  const groups = useMemo(
    () => [
      { name: "Now", ids: [1] },
      { name: "When the bag lands", ids: [2] },
      { name: "After the sit", ids: [3, 4] },
      { name: "After the cut", ids: [5, 6] },
    ],
    [],
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="mb-2 flex items-baseline justify-between text-xs uppercase tracking-[0.22em] text-haze">
          <span>
            {n} / {total}
          </span>
          <span>{nextOpen ? `Next: ${nextOpen.clickId}. ${nextOpen.title}` : "Nothing open"}</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-raised">
          <div
            className="h-full bg-sodium transition-[width]"
            style={{ width: `${(n / total) * 100}%` }}
          />
        </div>
      </div>

      {groups.map((g) => (
        <section key={g.name} className="flex flex-col gap-2">
          <h2 className="text-xs font-medium uppercase tracking-[0.22em] text-sodium">{g.name}</h2>
          {HUMAN_ITEMS.filter((s) => g.ids.includes(s.clickId)).map((s) => {
            const blocked = s.blockedBy != null && !HUMAN_ITEMS.find((x) => x.clickId === s.blockedBy)?.done && !done[s.blockedBy];
            const isDone = Boolean(s.done || done[s.clickId]);
            return (
              <article
                key={s.clickId}
                className="rounded-lg bg-raised px-4 py-3 shadow-[var(--shadow-hairline)]"
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={isDone}
                    disabled={blocked}
                    onChange={() => toggle(s.clickId)}
                    className="mt-1 size-4 accent-[#E08A32]"
                    aria-label={`${s.clickId}. ${s.title}`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm text-ink ${isDone ? "line-through opacity-50" : ""}`}>
                      <span className="text-haze">{s.clickId}.</span> {s.title}
                      <span className="ml-2 text-xs text-haze">{s.time}</span>
                    </p>
                    {blocked ? (
                      <p className="mt-1 text-xs text-haze">Wait on {s.blockedBy}.</p>
                    ) : null}
                    <button
                      type="button"
                      className="mt-2 text-xs uppercase tracking-[0.18em] text-muted hover:text-ink"
                      onClick={() => setOpen((o) => ({ ...o, [s.clickId]: !o[s.clickId] }))}
                    >
                      {open[s.clickId] ? "Hide how" : "How"}
                    </button>
                    {open[s.clickId] ? (
                      <div className="mt-2 space-y-2 text-sm text-muted">
                        <p>{s.how}</p>
                        {s.href ? (
                          <p>
                            <a
                              href={s.href}
                              className="text-sodium underline decoration-sodium/40 underline-offset-4 hover:text-glow-sodium"
                              target="_blank"
                              rel="noreferrer"
                            >
                              Open
                            </a>
                          </p>
                        ) : null}
                        <p className="text-xs text-haze">Success: {s.success}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      ))}
    </div>
  );
}
