"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@standkreis/ui/lib/utils";

const cardVariants = cva(
  "flex flex-col gap-6 rounded-xl border py-6 [--card-description-foreground:var(--muted-foreground)]",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground shadow-sm",
        soft: "border-transparent bg-secondary text-secondary-foreground",
        outline: "bg-transparent text-foreground",
        primary:
          "border-transparent bg-primary text-primary-foreground [--card-description-foreground:var(--primary-foreground)]",
        info: "border-transparent bg-info-surface text-info [--card-description-foreground:var(--info)]",
        success:
          "border-transparent bg-success-surface text-success [--card-description-foreground:var(--success)]",
        error:
          "border-transparent bg-error-surface text-error [--card-description-foreground:var(--error)]",
        warning:
          "border-transparent bg-warning-surface text-warning [--card-description-foreground:var(--warning)]",
        inverse:
          "border-transparent bg-inverse text-inverse-foreground [--card-description-foreground:var(--inverse-foreground)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

type CardProps = React.ComponentProps<"div"> &
  VariantProps<typeof cardVariants> & { asChild?: boolean };
function Card({
  className,
  variant = "default",
  asChild = false,
  ...props
}: CardProps) {
  const Comp = asChild ? Slot.Root : "div";
  return (
    <Comp
      data-slot="card"
      data-variant={variant}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "div";
  return (
    <Comp
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "div";
  return (
    <Comp
      data-slot="card-description"
      className={cn(
        "text-sm text-[var(--card-description-foreground,var(--muted-foreground))]",
        className,
      )}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  cardVariants,
  type CardProps,
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
