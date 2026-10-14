import { cn } from "@/lib/utils";
import type { BaseComponentProps } from "@/types";

export function Container({ className, children }: BaseComponentProps & { children: React.ReactNode }) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
