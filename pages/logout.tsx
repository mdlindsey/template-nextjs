import { useRouter } from 'next/router'
import { PageContext, StoreActions } from '~/store'

const LogoutPage = () => {
  try {
    const router = useRouter()
    router.push('/')
  } catch(e) {}
  return null
}

LogoutPage.getInitialProps = async ({ store }:PageContext) => {
  store.dispatch({ type: StoreActions.LogOut })
}

export default LogoutPage
