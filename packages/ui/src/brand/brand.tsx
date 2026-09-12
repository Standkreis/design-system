import type { ComponentProps } from "react";
import { cn } from "../lib/utils.js";
import { gatheredArc, gatheredRotations } from "./geometry.js";

export type BrandMarkProps = ComponentProps<"svg"> & {
  label?: string;
};

/** Decorative unless an accessible label is supplied. Does not imply product identity. */
export function BrandMark({ label, className, ...props }: BrandMarkProps) {
  return (
    <svg
      width="32"
      height="32"
      {...props}
      className={cn("shrink-0", className)}
      viewBox="0 0 100 100"
      fill="none"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      data-slot="brand-mark"
    >
      <g stroke="currentColor" strokeWidth="10" strokeLinecap="round">
        {gatheredRotations.map((angle) => (
          <path
            key={angle}
            d={gatheredArc}
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
      </g>
      <circle cx="50" cy="50" r="5" fill="currentColor" />
    </svg>
  );
}

export type BrandProps = ComponentProps<"span"> & {
  product?: string;
};
export function Brand({ product, className, ...props }: BrandProps) {
  return (
    <span
      {...props}
      className={cn(
        "inline-flex items-center gap-2.5 whitespace-nowrap font-sans text-lg leading-none",
        className,
      )}
      data-slot="brand"
    >
      <BrandMark />
      <span className="font-semibold tracking-tight">Standkreis</span>
      {product && <span className="-ml-0.5 font-normal">{product}</span>}
    </span>
  );
}
