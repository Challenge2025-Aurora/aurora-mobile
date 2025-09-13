import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { LIGHT, DARK } from "./palettes";
import type { Mode, ThemeCtx } from "./types";
import { getThemeMode, setThemeMode } from "../storage/theme";

const ThemeContext = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>("light");

  useEffect(() => {
    getThemeMode()
      .then(setMode)
      .catch(() => {});
  }, []);

  useEffect(() => {
    setThemeMode(mode).catch(() => {});
  }, [mode]);

  const colors = mode === "light" ? LIGHT : DARK;
  const toggle = () => setMode((m) => (m === "light" ? "dark" : "light"));
  const value = useMemo(() => ({ mode, colors, toggle, set: setMode }), [mode]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("ThemeProvider ausente");
  return ctx;
}
