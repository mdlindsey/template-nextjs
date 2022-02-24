const globalTyped = global as unknown as {
  window: Window & {
    gtag(t:string, a:string, p:object):void
  }
}

// Log the pageview with the URL
export const pageView = (url:string) => {
  globalTyped.window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  })
}

/**
 * How to log specific events:
  ga.event({
    action: "search",
    params : {
      search_term: query
    }
  })
 */
export const event = ({ action, params }) => {
  globalTyped.window.gtag('event', action, params)
}
