import { cn } from "@/lib/utils";
import type { BaseComponentProps } from "@/types";

interface ButtonProps extends BaseComponentProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

/** Variants map to color tokens from `@/styles/tokens.css` only. */
const variantStyles = {
  primary: "bg-primary text-foreground hover:bg-primary/90 focus-visible:ring-accent",
  secondary: "bg-secondary text-background hover:bg-secondary/90 focus-visible:ring-accent",
  outline: "border border-border bg-transparent text-foreground hover:bg-card focus-visible:ring-accent",
  ghost: "bg-transparent text-foreground hover:bg-card focus-visible:ring-accent",
} as const;

/** Sizes map to text-style tokens from `@/styles/tokens.css` only. */
const sizeStyles = {
  sm: "h-8 px-3 text-ui-button-small",
  md: "h-10 px-4 text-ui-button",
  lg: "h-12 px-6 text-ui-button-large",
} as const;

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </button>
  );
}
