import { cn } from "@/lib/utils";
import type { BaseComponentProps } from "@/types";

interface CardProps extends BaseComponentProps {
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return <div className={cn("card rounded-lg border", className)}>{children}</div>;
}
