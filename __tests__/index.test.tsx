import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { reducer } from '~/store'
import { DarkTheme } from '~/styles/theme'
import Home from '~/pages/index'


const ReduxProvider = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
)

const store = configureStore({ reducer })
const wrapper = ({ children }) => (
  <ReduxProvider reduxStore={store}>
    <ThemeProvider theme={DarkTheme}>
      {children}
    </ThemeProvider>
  </ReduxProvider>
)

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />, { wrapper })

    const heading = screen.getByRole('heading', {
      name: /NextJS Template/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
