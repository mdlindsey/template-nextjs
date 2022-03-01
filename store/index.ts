import cookies from 'js-cookie'
import { NextPageContext } from 'next'
import { createStore, AnyAction, Store } from 'redux'
import { MakeStore, createWrapper, Context, HYDRATE } from 'next-redux-wrapper'
import { saveState, PERSIST_REDUX } from './persist'

export interface User {
    email: string
    username: string
}

export enum ColorScheme {
    Dark = 'dark',
    Light = 'light',
}

export enum StoreActions {
    LogOut = 'DESTROY_SESSION',
    SetAuthJWT = 'SET_AUTH_JWT',
    SetAuthUser = 'SET_AUTH_USER',
    SetColorScheme = 'SET_COLOR_SCHEME',
}

export interface GlobalState {
    colorScheme?: ColorScheme
    authenticatedUser?: User
    authenticationJwt?: string
}

export type PageContext = NextPageContext &
    { store:Store<GlobalState, AnyAction> } &
    { query: { [key:string]: string } }

const initialState = {}
export const reducer = (state:GlobalState=initialState, action:AnyAction) => {
    switch (action.type) {
        case PERSIST_REDUX:
            return { ...state, ...action.payload }
        case HYDRATE:
            return saveState({ ...state, ...action.payload })
        case StoreActions.LogOut:
            cookies.set('jwt', '')
            cookies.remove('jwt')
            return saveState({
                ...state,
                authenticatedUser: null,
                authenticationJwt: null,
            })
        case StoreActions.SetColorScheme:
            return saveState({
                ...state,
                colorScheme: action.payload
            })
        case StoreActions.SetAuthUser:
            return saveState({
                ...state,
                authenticatedUser: action.payload
            })
        case StoreActions.SetAuthJWT:
            cookies.set('jwt', action.payload)
            return saveState({
                ...state,
                authenticationJwt: action.payload
            })
        default:
            return state
    }
}

// create a makeStore function
const makeStore: MakeStore<Store<GlobalState, AnyAction>> = (_:Context) => createStore(reducer)

// export an assembled wrapper
export const reduxWrapper = createWrapper<Store<GlobalState, AnyAction>>(makeStore, { debug: false })
