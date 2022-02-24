import { useRouter } from 'next/router'
import { AuthAPI } from '~/api-service'
import { base64Decode } from '~/hooks'
import { PageContext, StoreActions } from '~/store'

const MultiVendorOAuthRedirect = ({ forwardTo='/me' }) => {
  try {
    const router = useRouter()
    router.push(forwardTo)
  } catch(e) {}
  return null
}

MultiVendorOAuthRedirect.getInitialProps = async ({ store, query }:PageContext) => {
  try {
    const { vendor, code, state } = query
    const { authenticationJwt } = store.getState()
    const parsedState = JSON.parse(base64Decode(state))
    const authRes = parsedState?.action !== 'link'
      ? await AuthAPI.OAuthLogin(vendor, code)
      : await AuthAPI.OAuthAccountLink(vendor, code, authenticationJwt)
    store.dispatch({ type: StoreActions.SetAuthJWT, payload: authRes.jwt })
    store.dispatch({ type: StoreActions.SetAuthUser, payload: authRes.user })
    return {
      jwt: authRes.jwt,
      user: authRes.user,
      forwardTo: parsedState?.action !== 'link' ? '/me' : '/me/accounts'
    }
  } catch(e) {
    return {}
  }
}

export default MultiVendorOAuthRedirect
