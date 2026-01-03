"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function TopLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (active) {
      if (timer.current) {
        window.clearTimeout(timer.current);
      }
      timer.current = window.setTimeout(() => setActive(false), 150);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  useEffect(() => {
    window.__startLoader = () => setActive(true);
    return () => {
      delete window.__startLoader;
    };
  }, []);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-1.5 z-999 pointer-events-none"
      style={{
        opacity: active ? 1 : 0,
        transition: "opacity 200ms ease",
      }}
    >
      <div
        className="bg-marvel h-full"
        style={{
          width: active ? "99%" : "0%",
          transition: active ? "width 400ms ease" : "width 100ms ease",
        }}
      />
    </div>
  );
}
