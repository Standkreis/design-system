"use client";
import { ScanLine } from "lucide-react";
import type { ComponentProps } from "react";
import { Button } from "./button.js";
import { useLocale } from "../providers/standkreis-provider.js";

/** Visible label by default. Applications own capture/identification behaviour. */
export function IdentificationAction({
  children,
  ...props
}: ComponentProps<typeof Button>) {
  const { messages } = useLocale();
  return (
    <Button {...props}>
      <ScanLine aria-hidden="true" />
      {children ?? messages.identify}
    </Button>
  );
}
