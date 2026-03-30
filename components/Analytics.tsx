"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GA_ID = "G-1HN3PEMC8Y";

declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config: object) => void;
  }
}

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + "?" + searchParams.toString();

    window.gtag?.("config", GA_ID, {
      page_path: url,
    });
  }, [pathname, searchParams]);

  return null;
}