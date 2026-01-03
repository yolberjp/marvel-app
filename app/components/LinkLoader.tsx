"use client";

import Link from "next/link";
import { ComponentProps } from "react";

export default function LinkWithLoader(props: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        props.onClick?.(e);
        window.__startLoader?.();
      }}
    />
  );
}
