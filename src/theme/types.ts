export type Mode = 'light' | 'dark' | 'system';

export type Colors = {
  bg: string;
  bgSecundary: string;
  text: string;
  textOnPrimary: string;
  primary: string;
  accent: string;
  border: string;
  placeholder: string;
  shadow: string;
  modalOverlay: string;
  navBg: string;
  navText: string;
};

export type ThemeCtx = {
  mode: Mode;
  colors: Colors;
  toggle: () => void;
  set: (m: Mode) => void;
};
