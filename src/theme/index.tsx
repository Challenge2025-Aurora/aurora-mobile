import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { LIGHT, DARK } from "./palettes";
import type { Mode, ThemeCtx } from "./types";
import { getThemeMode, setThemeMode } from "../storage/theme";

const ThemeContext = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<Mode>("light");

  useEffect(() => {
    getThemeMode()
      .then((m) => m && setMode(m as Mode))
      .catch(() => {});
  }, []);

  useEffect(() => {
    setThemeMode(mode).catch(() => {});
  }, [mode]);

  const effective = mode === "system" ? (systemScheme === "dark" ? "dark" : "light") : mode;
  const colors = effective === "light" ? LIGHT : DARK;

  const toggle = () =>
    setMode((m) => {
      if (m === "light") return "dark";
      if (m === "dark") return "light";

      return systemScheme === "dark" ? "light" : "dark";
    });

  const value = useMemo(() => ({ mode, colors, toggle, set: setMode }), [mode, effective]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("ThemeProvider ausente");
  return ctx;
}
