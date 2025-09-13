import * as React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer, DefaultTheme, DarkTheme, Theme } from '@react-navigation/native'
import AppNavigator from './src/navigation/AppNavigator'

import { ThemeProvider, useTheme } from './src/theme/index'

function NavWrapper() {
  const { mode, colors } = useTheme()

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
  }

  return (
    <>
      <StatusBar barStyle={mode === 'light' ? 'dark-content' : 'light-content'} />
      <NavigationContainer theme={navTheme}>
        <AppNavigator />
      </NavigationContainer>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <NavWrapper />
    </ThemeProvider>
  )
}
