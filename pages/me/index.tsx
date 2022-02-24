import Link from 'next/link'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Page from '~/components/Page'
import { GlobalState } from '~/store'
import { requireLogin } from '~/hooks'

const Wrapper = styled.div`
  .link-accounts {
    text-align: right;
    padding: 32px;
  }
  pre {
    padding: 64px;
    max-width: 60vw;
    overflow: hidden;
  }
`

const MyAccountPage = () => {
  requireLogin()
  const stateSample = useSelector((state:GlobalState) => state)
  return (
    <Page title="My account">
      <Wrapper>
        <div className="link-accounts">
          <Link href="/me/accounts">Manage linked accounts</Link>
        </div>
        <pre>
          { JSON.stringify(stateSample, null, 2) }
        </pre>
      </Wrapper>
    </Page>
  )
}

export default MyAccountPage
