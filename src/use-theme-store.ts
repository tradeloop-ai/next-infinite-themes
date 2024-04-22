"use client";

import { ThemeContext } from "./create-theme-store";
import { ThemeStoreProps } from "./types";
import * as React from "react";
import { useStore } from "zustand";

/**
 * A custom hook for accessing theme state within a React component.
 * This hook requires that `ThemeProvider` be somewhere higher in the component tree to provide `ThemeContext`.
 *
 * ### Usage
 *
 * For retrieving a single state property:
 * ```tsx
 * const theme = useThemeStore(state => state.theme);
 * ```
 *
 * For retrieving and setting multiple state properties:
 * ```tsx
 * const [theme, setTheme] = useThemeStore(state => [state.theme, state.setTheme]);
 * ```
 *
 * @param selector - A selector function that receives the entire state and returns the part of the state needed by the component.
 * @typeParam T - The type of the selected state.
 * @returns The selected state.
 * @throws {Error} Throws if `ThemeProvider` is not found in the component tree.
 */
export function useThemeStore<T>(selector: (state: ThemeStoreProps) => T): T {
  const store = React.useContext(ThemeContext);
  if (!store) throw new Error("Missing ThemeProvider in the tree");
  return useStore(store, selector);
}
