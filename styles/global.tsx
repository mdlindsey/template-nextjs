import styled, { createGlobalStyle } from 'styled-components'
import { ThemeProps } from './theme'

const GlobalStyle = createGlobalStyle(({ theme }:ThemeProps) => `
  body {
    margin: 0;
    padding: 0;
    color: ${theme.colors.fgPrimary};
    font-family: ${theme.fonts.roboto};
    background-color: ${theme.colors.bgPrimary};
  }

  a {
    color: inherit;
    text-decoration: none;
    font-size: inherit;
    line-height: inherit;
  }
`)

const PreventBodyScrollStyles = createGlobalStyle`
  html, body {
    height: 100%;
    overflow: hidden;
  }
`

const Main = styled.main`
  height: 100%;
  min-height: calc(100vh - 150px);
`

export { Main, GlobalStyle, PreventBodyScrollStyles}
