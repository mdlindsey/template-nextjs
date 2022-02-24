import { OAuthVendor } from '~/api-service'
import OAuthButton, { OAuthButtonAction } from '~/components/Buttons/OAuth'
import LoginPage, { OAuthPageProps, OAuthWrapper} from './login'
import { bypassIfLoggedIn } from '~/hooks'
import Page from '~/components/Page'

const SignUp = ({ vendors }:OAuthPageProps) => {
  bypassIfLoggedIn()
  const staticProps = {
    state: { foo: 'bar' },
    action: OAuthButtonAction.SignUp,
  }
  return (
    <Page title="Sign Up">
      <OAuthWrapper>
        <div>
          {
            vendors?.map((vendorProps:OAuthVendor) => (
              <OAuthButton key={vendorProps.vendorId} {...staticProps} {...vendorProps} />
            ))
          }
        </div>
      </OAuthWrapper>
    </Page>
  )
}

SignUp.getInitialProps = LoginPage.getInitialProps

export default SignUp
