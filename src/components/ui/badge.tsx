import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-white",
        className
      )}
      {...props}
    />
  );
}
