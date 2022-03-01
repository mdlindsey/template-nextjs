import Head from 'next/head'
import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { AppContext, AppInitialProps, AppProps } from 'next/app'
import { ColorScheme, GlobalState, PageContext, reduxWrapper } from '~/store'
import { loadState } from '~/store/persist'
import { pageView } from '~/tracking/google'
import { GlobalStyle } from '~/styles/global'
import { CustomFonts } from '~/styles/fonts'
import { DarkTheme, LightTheme } from '~/styles/theme'

export type CustomApp = FC<AppProps> & {
  getInitialProps(ctx:AppContext):Promise<AppInitialProps>
}

const App:CustomApp = ({ Component, pageProps }) => {
  const router = useRouter()
  const colorScheme = useSelector((s:GlobalState) => s.colorScheme)

  useEffect(() => {
    const handleRouteChange = (url:string) => {
        pageView(url)
    }
    // When the component is mounted, subscribe to router changes
    // and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <ThemeProvider theme={colorScheme === ColorScheme.Light ? LightTheme : DarkTheme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CustomFonts />
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

App.getInitialProps = async ({ Component, ctx }: AppContext & { ctx: PageContext }) => {
  loadState(ctx)
  const pageProps = !Component.getInitialProps ? {} : await Component.getInitialProps(ctx)
  return { pageProps }
}

// eslint-disable-next-line import/no-default-export
export default reduxWrapper.withRedux(App)
