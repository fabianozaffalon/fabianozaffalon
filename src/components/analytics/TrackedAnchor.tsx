"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * <a> que dispara um evento no dataLayer ao clicar, sem alterar o
 * comportamento do link. Existe para permitir tracking dentro de Server
 * Components (que não podem receber onClick diretamente).
 */
type TrackedAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: string;
  params?: Record<string, string | number | boolean>;
};

export function TrackedAnchor({
  event,
  params,
  onClick,
  ...rest
}: TrackedAnchorProps) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        trackEvent(event, params);
        onClick?.(e);
      }}
    />
  );
}
