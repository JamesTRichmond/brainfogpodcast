import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/cn";
import { useMounted } from "@/lib/use-mounted";

export function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  const mounted = useMounted();
  if (!mounted) {
    return (
      <span
        className={cn(
          "inline-flex h-6 w-11 shrink-0 rounded-full bg-raised shadow-[var(--shadow-hairline)]",
          props.checked ? "bg-sodium" : "bg-raised",
          className,
        )}
        aria-hidden
      />
    );
  }
  return (
    <SwitchPrimitive.Root
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-raised shadow-[var(--shadow-hairline)] transition-colors data-[state=checked]:bg-sodium",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="pointer-events-none block size-5 translate-x-0.5 rounded-full bg-ink transition-transform data-[state=checked]:translate-x-5" />
    </SwitchPrimitive.Root>
  );
}
