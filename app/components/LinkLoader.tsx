"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

export default function LinkWithLoader({
  href,
  ...props
}: ComponentProps<typeof Link>) {
  const currentPathname = usePathname();
  return (
    <Link
      href={href}
      {...props}
      onClick={(e) => {
        props.onClick?.(e);
        if (href !== currentPathname) {
          window.__startLoader?.();
        }
      }}
    />
  );
}
