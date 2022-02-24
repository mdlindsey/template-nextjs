import cookies from 'js-cookie'
import { IS_DEV } from '~/config'
import { PageContext } from '.'

export const PERSIST_REDUX = 'NRP_PERSIST_REDUX_ACTION_TYPE'
export const PERSIST_COOKIE = '__state__'

const MAX_COOKIES = 20 // 20 cookies per domain allowed
const MAX_COOKIE_LENGTH = 4000 // 4096 bytes is max cookie size

let lastStorageUsage:number
export const saveState = <T>(state:T):T => {
    const stateJson = JSON.stringify(state)
    const encodedState = Buffer.from(stateJson).toString('base64')
    for(let i = 0; i < MAX_COOKIES; i++) {
        const encodedStateSlice = encodedState.substr(MAX_COOKIE_LENGTH * i, MAX_COOKIE_LENGTH * (i+1))
        encodedStateSlice
            ? cookies.set(PERSIST_COOKIE + i, encodedStateSlice)
            : cookies.remove(PERSIST_COOKIE + i)
    }
    if (IS_DEV) {
        let cookieStatusColor = 2 // 1 = red, 2 = green, 3 = yellow
        const maxStorageBytes = MAX_COOKIES * MAX_COOKIE_LENGTH
        const storageUsage = encodedState.length / maxStorageBytes
        if (storageUsage !== lastStorageUsage) {
            if (storageUsage >= 0.25) {
                cookieStatusColor = 3
            }
            if (storageUsage >= 0.50) {
                cookieStatusColor = 1
            }
            console.log(`\x1b[3${cookieStatusColor}m[i] Global state is using ${encodedState.length} bytes (${Math.ceil(storageUsage * 100)}%) of ${maxStorageBytes} bytes available`)
            lastStorageUsage = storageUsage
        }
    }
    return state
}

export const loadState = <T>(ctx:PageContext):T => {
    if (!ctx?.req?.headers?.cookie) {
        return
    }
    const encodedCookies = []
    for(const c of ctx.req.headers.cookie.split(';')) {
        const [key, value] = c.trim().split('=')
        if (key.includes(PERSIST_COOKIE)) {
            const cookieIndex = Number(key.replace(PERSIST_COOKIE, ''))
            encodedCookies[cookieIndex] = value
        }
    }
    const cookieStateJson = Buffer.from(encodedCookies.join(''), 'base64').toString()
    if (!cookieStateJson) {
        return
    }
    const initialState = JSON.parse(cookieStateJson)
    if (!initialState) {
        return
    }
    ctx.store.dispatch({ type: PERSIST_REDUX, payload: initialState })
}
