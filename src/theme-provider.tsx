"use client";

import * as React from "react";
import { createThemeStore, ThemeContext } from "./create-theme-store";
import { ThemeScript } from "./theme-script";
import { ThemeProviderDefaults, ThemeProviderProps } from "./types";
import { useStore } from "zustand";

export function ThemeProvider({
  children,
  ...props
}: { children?: React.ReactNode } & Partial<ThemeProviderProps>) {
  const settings: ThemeProviderProps = { ...ThemeProviderDefaults, ...props };

  const store = React.useRef(createThemeStore(settings)).current;

  const [system, mode, setMode] = useStore(store, (s) => [
    s.system,
    s.mode,
    s.setMode,
  ]);

  // system theme listener
  React.useEffect(() => {
    function handleSystemChange(event: MediaQueryListEvent | MediaQueryList) {
      // !system or !mode or system and ui in same mode
      if (
        !settings.enableSystem ||
        !system ||
        !mode ||
        event.matches === (mode === "dark")
      )
        return;
      // system switched to dark mode, ui still in light mode
      else if (event.matches) setMode("dark");
      // system switched to light mode, ui still in dark mode
      else if (!event.matches) setMode("light");
    }

    const media = matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", handleSystemChange);

    return () => media.removeEventListener("change", handleSystemChange);
  }, [mode, setMode, system]);

  return (
    <ThemeContext.Provider value={store}>
      <ThemeScript {...settings} />
      {children}
    </ThemeContext.Provider>
  );
}
