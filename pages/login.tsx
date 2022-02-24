import styled from 'styled-components'
import { bypassIfLoggedIn } from '~/hooks'
import { MockAuthAPI, OAuthVendor } from '~/api-service'
import OAuthButton, { OAuthButtonAction } from '~/components/Buttons/OAuth'
import Page from '~/components/Page'

export const OAuthWrapper = styled.div`
  position: relative;
  height: 80vh;

  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export type OAuthPageProps = {
  vendors: OAuthVendor[]
}

const Login = ({ vendors }:OAuthPageProps) => {
  bypassIfLoggedIn()
  const staticProps = {
    state: { foo: 'bar' },
    action: OAuthButtonAction.Login,
  }
  return (
    <Page title="Login">
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

Login.getInitialProps = async () => {
  // Replace MockAuthAPI with AuthAPI once NestJS template is implemented
  const vendors = await MockAuthAPI.OAuthVendors()
  return { vendors }
}

export default Login
