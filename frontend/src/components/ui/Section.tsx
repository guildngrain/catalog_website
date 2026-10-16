import { cn } from "@/lib/utils";
import type { BaseComponentProps } from "@/types";

interface SectionProps extends BaseComponentProps {
  children: React.ReactNode;
}

export function Section({ className, children }: SectionProps) {
  return (
    <section className={cn("py-16 sm:py-24", className)}>
      {children}
    </section>
  );
}
