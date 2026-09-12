import * as React from "react";
import { cn } from "@/lib/cn";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      suppressHydrationWarning
      className={cn(
        "flex h-11 w-full rounded-md bg-raised px-3 text-sm text-ink shadow-[var(--shadow-hairline)] outline-none transition-shadow placeholder:text-haze focus-visible:shadow-[var(--shadow-hairline-hover)]",
        className,
      )}
      {...props}
    />
  );
}
