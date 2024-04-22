export interface ThemeProviderProps {
  storageKey: string;
  defaultTheme: string;
  defaultMode: "light" | "dark" | "system";
  // forcedTheme: string
  enableSystem: boolean;
  enableColorScheme: boolean;
  // disableTransitionOnChange: boolean
  themes: string[];
  modeAttribute: string;
  themeAttribute: string;
  // value: string
  // nonce: string
}

export const ThemeProviderDefaults: ThemeProviderProps = {
  storageKey: "next-infinite-themes",
  defaultTheme: "",
  defaultMode: "system",
  // forcedTheme: string,
  enableSystem: true,
  enableColorScheme: true,
  // disableTransitionOnChange: true,
  themes: [],
  modeAttribute: "class",
  themeAttribute: "theme",
  // value: string,
  // nonce: string
};

export interface ThemeStoreProps {
  theme?: string;
  setTheme: (theme: string) => void;
  mode?: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
  system?: boolean;
  setSystem: (system: boolean) => void;
}

export interface LocalThemeStore {
  state: {
    theme: string;
    mode: "light" | "dark";
    system: boolean;
  };
  version: number;
}
