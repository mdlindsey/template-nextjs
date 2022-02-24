import styled from 'styled-components'
import { requireLogin } from '~/hooks'
import { MockAuthAPI, OAuthVendor } from '~/api-service'
import { OAuthPageProps } from '../login'
import OAuthButton, { OAuthButtonAction } from '~/components/Buttons/OAuth'
import Page from '~/components/Page'

const Wrapper = styled.div`
  position: relative;
  height: 80vh;

  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .vendor-name {
    text-transform: capitalize;
  }

  .vendor-avatar {
    float: right;
    position: relative;
    margin-left: 12px;
    top: -40px;
    width: 32px;
    border-radius: 50%;
  }
`

const MyAccount = ({ vendors }:OAuthPageProps) => {
  requireLogin()
  const staticProps = {
    state: { foo: 'bar' },
    action: OAuthButtonAction.Login,
  }
  return (
    <Page title="My Account">
      <Wrapper>
        <div>
          {
            vendors?.map((vendorProps:OAuthVendor) => (
              <OAuthButton key={vendorProps.vendorId} {...staticProps} {...vendorProps} />
            ))
          }
        </div>
      </Wrapper>
    </Page>
  )
}

MyAccount.getInitialProps = async () => {
  const vendors = await MockAuthAPI.OAuthVendors()
  return { vendors }
}

export default MyAccount
