import { cn } from "@/lib/utils";
import type { BaseComponentProps } from "@/types";

interface CardProps extends BaseComponentProps {
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}>
      {children}
    </div>
  );
}
