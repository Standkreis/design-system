"use client";
import { Info } from "lucide-react";
import { useId, type ComponentProps, type ReactNode } from "react";
import { cn } from "../lib/utils.js";
import { useLocale } from "../providers/standkreis-provider.js";

export type UncertaintyNoticeProps = Omit<
  ComponentProps<"section">,
  "title"
> & { title?: ReactNode; action?: ReactNode };
/** A calm explanation, not an error alert. Applications supply evidence-backed alternatives. */
export function UncertaintyNotice({
  title,
  children,
  action,
  className,
  ...props
}: UncertaintyNoticeProps) {
  const { messages } = useLocale();
  const id = useId();
  return (
    <section
      {...props}
      aria-labelledby={id}
      className={cn(
        "flex gap-3 rounded-lg bg-warning-surface p-5 text-warning",
        className,
      )}
      data-slot="uncertainty-notice"
    >
      <Info size={20} className="mt-1 shrink-0" aria-hidden="true" />
      <div className="min-w-0">
        <h3 id={id} className="mb-1 text-base font-semibold">
          {title ?? messages.uncertain}
        </h3>
        <div className="text-sm leading-relaxed">
          {children ?? messages.uncertaintyDescription}
        </div>
        {action && <div className="mt-3">{action}</div>}
      </div>
    </section>
  );
}
