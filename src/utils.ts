"use client";

import { ThemeProviderProps, ThemeStoreProps } from "./types";

export function getSystemTheme(): "light" | "dark" {
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function setDocumentTheme({
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
