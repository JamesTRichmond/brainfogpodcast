import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/cn";
import { useMounted } from "@/lib/use-mounted";

export function Slider({
  className,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const mounted = useMounted();
  if (!mounted) {
    return (
      <div className={cn("relative flex h-11 w-full items-center", className)} aria-hidden>
        <div className="relative h-1 w-full grow rounded-full bg-raised shadow-[var(--shadow-hairline)]">
          <div className="absolute h-full w-1/3 rounded-full bg-sodium" />
        </div>
      </div>
    );
  }
  return (
    <SliderPrimitive.Root
      className={cn("relative flex h-11 w-full touch-none items-center select-none", className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1 w-full grow rounded-full bg-raised shadow-[var(--shadow-hairline)]">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-sodium" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className="block size-5 rounded-full bg-ink shadow-md transition-transform duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sodium/70 active:scale-95"
        aria-label="Offset"
      />
    </SliderPrimitive.Root>
  );
}
