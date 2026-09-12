import * as React from "react";
import { cn } from "@/lib/cn";

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "text-[0.68rem] font-medium uppercase tracking-[0.22em] text-haze",
        className,
      )}
      {...props}
    />
  );
}
