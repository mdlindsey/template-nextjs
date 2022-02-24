import { createGlobalStyle } from 'styled-components'

export const CustomFonts = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    font-weight: normal;
    src: url('/fonts/Roboto-Regular.ttf');
    font-display: swap;
  }
  @font-face {
    font-family: 'Roboto';
    font-weight: bold;
    src: url('/fonts/Roboto-Bold.ttf');
    font-display: swap;
  }
  @font-face {
    font-family: 'Roboto Mono';
    font-weight: normal;
    src: url('/fonts/RobotoMono-Regular.ttf');
    font-display: swap;
  }
`
