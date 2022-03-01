import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { AppProps } from 'next/app'
import { ServerStyleSheet } from 'styled-components'
import { GOOGLE_ANALYTICS_ID } from '~/config'
import { DarkTheme } from '~/styles/theme'
import { CustomApp } from './_app'

export default class MyDocument extends Document {
  static async getInitialProps(ctx:DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App:CustomApp) => (props:AppProps) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          { /* Preload fonts */ }
          <link rel="preload" href="/fonts/Roboto-Bold.ttf" type="font/ttf" as="font" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/Roboto-Regular.ttf" type="font/ttf" as="font" crossOrigin="anonymous" />
          { /* Include Tailwind */ }
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.1.2/tailwind.min.css" />
          { /* Include branding */ }
          <link rel="icon" type="image/x-icon" href="/brand/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/brand/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/brand/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/brand/favicon-16x16.png" />
          <link rel="manifest" href="/brand/site.webmanifest" />
          <link rel="mask-icon" href="/brand/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content={DarkTheme.colors.bgPrimary} />
          <meta name="theme-color" content={DarkTheme.colors.bgPrimary}
          ></meta>
          { /* Include Google Analytics */ }
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GOOGLE_ANALYTICS_ID}', {
                    page_path: window.location.pathname,
                    });
                `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
