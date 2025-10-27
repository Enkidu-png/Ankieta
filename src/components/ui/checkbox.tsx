import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        "h-4 w-4 rounded border border-white/20 bg-white/10 text-[color:var(--accent,#10A37F)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
        className
      )}
      {...props}
    />
  );
});

Checkbox.displayName = "Checkbox";
