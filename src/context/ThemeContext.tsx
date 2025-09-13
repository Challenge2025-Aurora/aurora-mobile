import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Mode = 'light' | 'dark'
type Colors = {
  bg: string
  bgSecundary: string
  text: string
  textOnPrimary: string
  primary: string
  accent: string
  border: string
  placeholder: string
  shadow: string
  modalOverlay: string
  navBg: string
  navText: string
}
type Ctx = { mode: Mode; colors: Colors; toggle: () => void; set: (m: Mode) => void }

const LIGHT: Colors = {
  bg: '#f9f7ff',
  bgSecundary: '#ede7ff',
  text: '#5f4c8c',
  textOnPrimary: '#ffffff',
  primary: '#a27cf0',
  accent: '#ffd86b',
  border: '#e0d5fd',
  placeholder: '#bfaeeb',
  shadow: '#a27cf0',
  modalOverlay: 'rgba(0,0,0,0.15)',
  navBg: '#a27cf0',
  navText: '#ffffff',
}

const DARK: Colors = {
  bg: '#1a1625',
  bgSecundary: '#2a243d',
  text: '#f9f7ff',
  textOnPrimary: '#ffffff',
  primary: '#b38eff',
  accent: '#ffd86b',
  border: '#3c3559',
  placeholder: '#8c80b3',
  shadow: 'rgba(0,0,0,0.5)',
  modalOverlay: 'rgba(0,0,0,0.5)',
  navBg: '#2a243d',
  navText: '#f9f7ff',
}

const ThemeContext = createContext<Ctx | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>('light')

  useEffect(() => {
    AsyncStorage.getItem('@theme').then(v => {
      if (v === 'dark' || v === 'light') setMode(v as Mode)
    })
  }, [])

  useEffect(() => {
    AsyncStorage.setItem('@theme', mode).catch(() => {})
  }, [mode])

  const colors = mode === 'light' ? LIGHT : DARK
  const toggle = () => setMode(m => (m === 'light' ? 'dark' : 'light'))
  const value = useMemo(() => ({ mode, colors, toggle, set: setMode }), [mode])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('ThemeProvider ausente')
  return ctx
}
