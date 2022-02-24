

import { useRouter } from 'next/router'
import { useState, useEffect, RefObject } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ColorScheme, GlobalState, StoreActions, User } from '~/store'
import { MOBILE_MAX_WIDTH_SIZE, TABLET_MAX_WIDTH_SIZE } from '~/styles/theme'

export const requireLogin = () => {
    try { window.location } catch(e) { return }
    const router = useRouter()
    const authenticationJwt = useSelector<GlobalState>(s => s.authenticationJwt)
    if (!authenticationJwt) {
        router.push('/login')
    }
}

export const bypassIfLoggedIn = () => {
    try { window.location } catch(e) { return }
    const router = useRouter()
    const authenticationJwt = useSelector<GlobalState>(s => s.authenticationJwt)
    if (authenticationJwt) {
        router.push('/me')
    }
}

export const base64Encode = (str:string) => {
    try {
        if (btoa) {
            return btoa(str)
        }
    } catch(e) {
        return Buffer.from(str).toString('base64')
    }
}

export const base64Decode = (str:string) => {
    try {
        if (atob) {
            return atob(str)
        }
    } catch(e) {
        return Buffer.from(str, 'base64').toString('ascii')
    }
}

export const useMedia = () => {
  const [width, setWidth] = useState(null)

  useEffect(() => {
    function handleResize() {
      // Set window width/height to state
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return {
    isMobile: width < MOBILE_MAX_WIDTH_SIZE,
    isTablet: width >= MOBILE_MAX_WIDTH_SIZE && width < TABLET_MAX_WIDTH_SIZE,
    isDesktop: width >= TABLET_MAX_WIDTH_SIZE,
  }
}

export const useOutsideTrigger = (ref:RefObject<HTMLElement>, callback:()=>{}) => {
  useEffect(() => {
    const checkClickTarget = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    // Bind event listener
    document.addEventListener('mousedown', checkClickTarget)

    return () => {
      // Unbind event listener
      document.removeEventListener('mousedown', checkClickTarget)
    }
  }, [ref])
}

// Global state dispatchers
export const useDispatcher = () => {
    const dispatch = useDispatch()
    const globalState = useSelector((s:GlobalState) => s)
    return {
        setJwt(jwt:string) {
          dispatch({ type: StoreActions.SetAuthJWT, payload: jwt })
        },
        setUser(user:User) {
          dispatch({ type: StoreActions.SetAuthUser, payload: user })
        },
        switchColorScheme() {
            dispatch({
                type: StoreActions.SetColorScheme,
                payload: globalState.colorScheme === ColorScheme.Dark ? ColorScheme.Light : ColorScheme.Dark
            })
        },
    }
}
