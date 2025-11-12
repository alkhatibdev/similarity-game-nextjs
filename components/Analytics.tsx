'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const lastTrackedUrl = useRef<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag && gaId) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

      // Only track if the URL has actually changed
      if (url !== lastTrackedUrl.current) {
        lastTrackedUrl.current = url;

        // Use event instead of config to avoid duplicate initial pageviews
        window.gtag('event', 'page_view', {
          page_path: url,
        });
      }
    }
  }, [pathname, searchParams, gaId]);

  return null;
}
