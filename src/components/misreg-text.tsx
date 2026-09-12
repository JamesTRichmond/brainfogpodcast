import { cn } from "@/lib/cn";
import { dxAt, misreg } from "@/lib/brand";

type Props = {
  children: string;
  className?: string;
  em?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  breathe?: boolean;
  t?: number;
  /** Force dx(t) even when breathe is off — extrema stills. */
  at?: number;
  fogOnly?: boolean;
};

function shift(em: number) {
  return `${(Math.round(em * 1e4) / 1e4).toFixed(4)}em`;
}

function Plates({
  text,
  em,
  breathe,
  t,
  at,
}: {
  text: string;
  em: number;
  breathe: boolean;
  t: number;
  at?: number;
}) {
  const offset = at != null ? dxAt(at, em) : breathe ? dxAt(t, em) : em;
  const dx = shift(offset);
  return (
    <>
      <span
        aria-hidden
        className="absolute inset-0 text-sodium"
        style={{ transform: `translateX(-${dx})`, opacity: misreg.ghost }}
      >
        {text}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 text-tv"
        style={{ transform: `translateX(${dx})`, opacity: misreg.ghost }}
      >
        {text}
      </span>
      <span className="relative text-ink">{text}</span>
    </>
  );
}

export function MisregText({
  children,
  className,
  em = misreg.em,
  as: Tag = "span",
  breathe = false,
  t = 0,
  at,
  fogOnly = false,
}: Props) {
  if (fogOnly) {
    const i = children.lastIndexOf(" ");
    const head = i === -1 ? "" : children.slice(0, i + 1);
    const tail = i === -1 ? children : children.slice(i + 1);
    return (
      <Tag className={cn("relative inline-block", className)}>
        <span className="text-ink">{head}</span>
        <span className="relative inline-block">
          <Plates text={tail} em={em} breathe={breathe} t={t} at={at} />
        </span>
      </Tag>
    );
  }

  return (
    <Tag className={cn("relative inline-block", className)}>
      <Plates text={children} em={em} breathe={breathe} t={t} at={at} />
    </Tag>
  );
}
