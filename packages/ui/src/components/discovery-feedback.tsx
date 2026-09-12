"use client";
import { Check } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "../lib/utils.js";
import { useLocale } from "../providers/standkreis-provider.js";

/** Keep mounted; toggle `visible` after an explicit action for a polite announcement. */
export function DiscoveryFeedback({
  visible = false,
  children,
  className,
  ...props
}: ComponentProps<"div"> & { visible?: boolean }) {
  const { messages } = useLocale();
  return (
    <div
      {...props}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "flex min-h-7 items-start gap-2 text-sm text-success",
        className,
      )}
      data-slot="discovery-feedback"
    >
      {visible && (
        <>
          <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <span>{children ?? messages.saved}</span>
        </>
      )}
    </div>
  );
}
