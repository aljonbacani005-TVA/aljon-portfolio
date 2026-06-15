"use client";

import { useCallback, useRef, useEffect } from "react";

const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_URL = "https://calendly.com/aljonbacani005/30min";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
      closePopupWidget: () => void;
    };
  }
}

export function useCalendly() {
  const scriptLoaded = useRef(false);
  const scriptError = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current || document.querySelector(`script[src="${CALENDLY_SCRIPT}"]`)) {
      scriptLoaded.current = true;
      return;
    }

    const script = document.createElement("script");
    script.src = CALENDLY_SCRIPT;
    script.async = true;
    script.onload = () => {
      scriptLoaded.current = true;
    };
    script.onerror = () => {
      scriptError.current = true;
    };
    document.head.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, []);

  const openCalendly = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();

    if (scriptError.current) {
      window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
      return;
    }

    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
    }
  }, []);

  return { openCalendly };
}
