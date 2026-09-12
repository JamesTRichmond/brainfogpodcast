import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const joinWaitlist = createServerFn({ method: "POST" })
  .validator((data: { email: string }) => data)
  .handler(async ({ data }) => {
    const email = data.email.trim().toLowerCase();
    if (!EMAIL.test(email) || email.length > 200) {
      return { ok: false as const, error: "That doesn't look like an email." };
    }
    const sql = await getSql();
    await sql`
      insert into waitlist (email) values (${email})
      on conflict (email) do nothing
    `;
    return { ok: true as const };
  });

export const waitlistCount = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql<{ n: number }>`select count(*)::int as n from waitlist`;
  return rows[0]?.n ?? 0;
});
