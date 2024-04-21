"use client";

import {
  ThemeProviderDefaults,
  ThemeProviderProps,
  ThemeStoreProps,
} from "./types";
import { getSystemTheme, setDocumentTheme } from "./utils";
import { createContext } from "react";
import { createStore } from "zustand";
import { persist } from "zustand/middleware";

export const ThemeContext = createContext<ReturnType<
  typeof createThemeStore
> | null>(null);

export const createThemeStore = (props: ThemeProviderProps) => {
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
  } = { ...ThemeProviderDefaults, ...props };

  return createStore<ThemeStoreProps>()(
    persist<ThemeStoreProps>(
      (set, get) => ({
        theme: undefined, // initialized by dangerouslySetInnerHTML
        setTheme: (theme) => {
          setDocumentTheme({
            theme,
            enableColorScheme,
            modeAttribute,
            themeAttribute,
          });

          set(() => ({ theme: theme }));
        },

        mode: undefined, // initialized by dangerouslySetInnerHTML
        setMode: (mode) => {
          // if system is true, disable it if switching to non system preference theme
          const system = get().system;
          if (system) {
            if (mode !== getSystemTheme()) {
              set(() => ({ system: false }));
            }
          }

          setDocumentTheme({
            mode,
            enableColorScheme,
            modeAttribute,
            themeAttribute,
          });

          set(() => ({ mode: mode }));
        },

        system: undefined, // initialized by dangerouslySetInnerHTML
        setSystem: (system) => {
          if (enableSystem) {
            if (system) {
              const mode = getSystemTheme();

              setDocumentTheme({
                mode,
                enableColorScheme,
                modeAttribute,
                themeAttribute,
              });

              set(() => ({ system: system, mode: mode }));
            } else {
              set(() => ({ system: system }));
            }
          }
        },
      }),
      {
        name: storageKey,
      },
    ),
  );
};
