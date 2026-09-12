"use client";

import { useState, type FormEvent } from "react";
import { joinWaitlist } from "@/lib/waitlist";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "err">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setError("");
    try {
      const res = await joinWaitlist({ data: { email } });
      if (res.ok) {
        setStatus("ok");
        setEmail("");
        return;
      }
      setStatus("err");
      setError(res.error);
    } catch {
      setStatus("err");
      setError("Could not save that. Try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-md flex-col gap-3">
      <label className="text-xs font-medium uppercase tracking-[0.22em] text-sodium">
        When there's tape
      </label>
      <p className="text-sm leading-relaxed text-muted">
        Leave an email. We will not write you until an hour is actually up. This
        keeps the address. It does not send mail from here.
      </p>
      {status === "ok" ? (
        <p className="text-sm text-ink">You're on the list. No mail until there's tape.</p>
      ) : (
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 min-w-0 flex-1 rounded-md bg-raised px-3 text-sm text-ink outline outline-1 outline-ink/10 placeholder:text-haze focus:outline-sodium"
          />
          <button
            type="submit"
            disabled={status === "saving"}
            className="inline-flex h-11 items-center justify-center rounded-md bg-sodium px-4 text-sm font-medium text-night hover:bg-glow-sodium disabled:opacity-60"
          >
            {status === "saving" ? "Saving…" : "Save it"}
          </button>
        </div>
      )}
      {status === "err" ? <p className="text-sm text-sodium">{error}</p> : null}
    </form>
  );
}
