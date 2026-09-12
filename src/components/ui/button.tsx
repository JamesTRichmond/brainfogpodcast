import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium tracking-wide transition-[color,background,box-shadow,transform] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sodium/70 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        primary: "bg-sodium text-night hover:bg-glow-sodium",
        ghost: "bg-transparent text-ink hover:bg-raised",
        outline:
          "bg-transparent text-ink shadow-[var(--shadow-hairline)] hover:shadow-[var(--shadow-hairline-hover)]",
        tv: "bg-tv text-ink hover:bg-glow-tv",
      },
      size: {
        md: "h-11 px-4 text-sm",
        sm: "h-9 px-3 text-xs",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
