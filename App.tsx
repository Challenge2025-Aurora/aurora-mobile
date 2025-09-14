import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';
import { ThemeProvider, useTheme } from './src/theme';
import TabNavigator from './src/navigation/TabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
import { setStatusBarTranslucent } from 'expo-status-bar';
import { LanguageProvider } from './src/i18n';

function NavWrapper() {
  const { mode, colors } = useTheme();
  const navTheme: Theme = {
    ...(mode === 'light' ? DefaultTheme : DarkTheme),
    colors: {
      ...(mode === 'light' ? DefaultTheme.colors : DarkTheme.colors),
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
      <StatusBar barStyle={mode === 'light' ? 'dark-content' : 'light-content'} />
      <NavigationContainer theme={navTheme}>
        <TabNavigator />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  React.useEffect(() => {
    NavigationBar.setBackgroundColorAsync('transparent');
    NavigationBar.setBehaviorAsync('overlay-swipe');
    setStatusBarTranslucent?.(true);
  }, []);

  return (
    <SafeAreaProvider>
        <LanguageProvider>
      <ThemeProvider>
        <NavWrapper />
      </ThemeProvider>
        </LanguageProvider>
    </SafeAreaProvider>
  );
}
