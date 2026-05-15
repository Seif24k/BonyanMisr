'use client';

import { useEffect } from 'react';

export function DevErrorSuppressor() {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV === 'development') {
      const originalError = console.error;
      console.error = function(...args: any[]) {
        const errorMsg = args.join(' ');
        // Suppress MapLibre/CartoCD tile fetch errors in local dev
        if (
          errorMsg.includes('basemaps.cartocdn.com') || 
          errorMsg.includes('AJAXError') ||
          errorMsg.includes('Failed to fetch')
        ) {
          return;
        }
        originalError.apply(console, args);
      };

      return () => {
        console.error = originalError;
      };
    }
  }, []);

  return null;
}
