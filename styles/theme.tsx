// import { DefaultTheme } from 'styled-components'

export const MOBILE_MAX_WIDTH_SIZE = 768
export const TABLET_MAX_WIDTH_SIZE = 1024

export interface ThemeProps {
  theme: typeof DarkTheme
}

// Generic colors used when style is identical for light/dark theme
const genericColors = {
  white: '#fff',
  black: '#111',
}

const GlobalTheme = {
  colors: {
    ...genericColors,
  },
  breakpoints: {
    sm: `@media only screen and (max-width: ${MOBILE_MAX_WIDTH_SIZE}px)`,
    md: `@media only screen and (max-width: ${TABLET_MAX_WIDTH_SIZE}px)`,
    lg: `@media only screen and (min-width: ${TABLET_MAX_WIDTH_SIZE + 1}px)`,
  },
  shadows: {
    shadowLarge: '0px 0px 30px rgba(7, 5, 31, 0.6);',
    input: '0px 0px 6px #4606FA',
  },
  fonts: {
    roboto: "'Roboto', Arial, Helvetica, sans-serif",
  }
} // as DefaultTheme

const darkThemeColors = {
  bgPrimary: '#262348',
  fgPrimary: genericColors.white,
  fgLight: '#ccc',
}

const lightThemeColors = {
  bgPrimary: genericColors.white,
  fgPrimary: genericColors.black,
  fgLight: '#333',
}

export const DarkTheme = {
  ...GlobalTheme,
  colors: {
    ...GlobalTheme.colors,
    ...darkThemeColors,
  },
}

export const LightTheme = {
  ...GlobalTheme,
  colors: {
    ...GlobalTheme.colors,
    ...lightThemeColors,
  },
}
