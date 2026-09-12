import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  size?: number;
};

export function TwoDiscMark({ className, size = 160 }: Props) {
  const r = 42;
  const slip = r * 0.13;
  const c = 50;
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={cn("block", className)}
      role="img"
      aria-label="Late Night Brain Fog mark"
    >
      <circle cx={c + slip} cy={c + slip} r={r} fill="var(--color-tv)" fillOpacity="0.86" />
      <circle cx={c - slip} cy={c - slip} r={r} fill="var(--color-sodium)" fillOpacity="0.86" />
    </svg>
  );
}
