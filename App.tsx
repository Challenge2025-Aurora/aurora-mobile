import * as React from "react";
import { StatusBar } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  Theme,
} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import * as NavigationBar from "expo-navigation-bar";
import { setStatusBarTranslucent } from "expo-status-bar";

import { ThemeProvider, useTheme } from "./src/theme";
import { LanguageProvider } from "./src/i18n";

import TabNavigator from "./src/navigation/TabNavigator";

import { AuthProvider, useAuth } from "./src/auth/AuthContext";
import AuthStack from "./src/navigation/AuthStack";

function NavWrapper() {
  const { mode, colors } = useTheme();
  const { user } = useAuth();

  const navTheme: Theme = {
    ...(mode === "light" ? DefaultTheme : DarkTheme),
    colors: {
      ...(mode === "light" ? DefaultTheme.colors : DarkTheme.colors),
      background: colors.bg,
      card: colors.navBg,
      text: colors.navText,
      primary: colors.primary,
      border: colors.border,
      notification: colors.accent,
    },
  };

  return (
    <>
      <StatusBar
        barStyle={mode === "light" ? "dark-content" : "light-content"}
      />
      <NavigationContainer theme={navTheme}>
        {user ? <TabNavigator /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
}

export default function App() {
  React.useEffect(() => {
    NavigationBar.setBackgroundColorAsync("transparent");
    NavigationBar.setBehaviorAsync("overlay-swipe");
    setStatusBarTranslucent?.(true);
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <NavWrapper />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
