import { cn } from "@/lib/utils";
import { forwardRef, ReactElement } from "react";

const Input = forwardRef<HTMLInputElement, React.ComponentProps<"input"> & {
  _prefix?: ReactElement | string;
  suffix?: ReactElement | string;
}>(
  ({ className, type, _prefix, suffix, ...props }, ref) => {
    return (
      <div className="flex items-center">
        {_prefix && (
          <div className={cn(
            "border flex px-3 py-1 h-9 items-center justify-center text-muted-foreground bg-input/30 select-none",
            "border-r-0 rounded-l-md", {
              "cursor-not-allowed opacity-50": props.disabled,
            }
          )}>
            {_prefix}
          </div>
        )}

        <input
          type={type}
          className={cn(
            "flex h-9 w-full border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", {
              // Rounded corners
              "rounded-r-md": !suffix,
              "rounded-l-md": !_prefix,

              // Remove rounded corners
              "rounded-r-none": suffix,
              "rounded-l-none": _prefix,
            },
            className
          )}
          ref={ref}
          {...props}
        />

        {suffix && (
          <div className={cn(
            "border flex px-3 py-1 h-9 items-center justify-center text-muted-foreground bg-input/30 select-none",
            "border-l-0 rounded-r-md", {
              "cursor-not-allowed opacity-50": props.disabled,
            }
          )}>
            {suffix}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }