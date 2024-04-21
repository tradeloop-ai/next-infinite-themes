"use client";

import { LocalThemeStore, ThemeProviderProps, ThemeStoreProps } from "./types";
import { memo } from "react";

export const ThemeScript = memo((settings: ThemeProviderProps) => {
  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `(${initTheme.toString()})(${JSON.stringify(settings)})`,
      }}
    />
  );
});

function initTheme(settings: ThemeProviderProps) {
  // match with utils.ts
  function getSystemTheme(): "light" | "dark" {
    return matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  // match with utils.ts
  function setDocumentTheme({
    theme,
    mode,
    enableColorScheme,
    modeAttribute,
    themeAttribute,
  }: Pick<ThemeStoreProps, "theme" | "mode"> &
    Pick<
      ThemeProviderProps,
      "enableColorScheme" | "modeAttribute" | "themeAttribute"
    >) {
    if (theme) {
      document.documentElement.setAttribute(`data-${themeAttribute}`, theme);
    }

    if (mode) {
      if (modeAttribute === "class") {
        mode === "dark"
          ? document.documentElement.classList.add("dark")
          : document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.setAttribute(`data-${modeAttribute}`, mode);
      }

      if (enableColorScheme) {
        document.documentElement.style.colorScheme = mode;
      }
    }
  }

  const {
    storageKey,
    defaultTheme,
    defaultMode,
    // forcedTheme,
    enableSystem,
    enableColorScheme,
    // disableTransitionOnChange,
    themes,
    modeAttribute,
    themeAttribute,
    // value,
    // nonce
  } = settings;

  const cache = localStorage.getItem(storageKey);

  const localThemeStore: LocalThemeStore = cache
    ? JSON.parse(cache)
    : {
        state: {
          theme: defaultTheme,
          mode:
            defaultMode === "system"
              ? enableSystem
                ? getSystemTheme()
                : "light"
              : defaultMode,
          system: enableSystem ? defaultMode === "system" : false,
        },
        version: 0,
      };

  const theme = localThemeStore.state.theme;
  const system = localThemeStore.state.system;
  const mode = system
    ? enableSystem
      ? getSystemTheme()
      : "light"
    : localThemeStore.state.mode;

  setDocumentTheme({
    theme,
    mode,
    enableColorScheme: enableColorScheme,
    modeAttribute: modeAttribute,
    themeAttribute: themeAttribute,
  });

  if (!cache) localStorage.setItem(storageKey, JSON.stringify(localThemeStore));
}
