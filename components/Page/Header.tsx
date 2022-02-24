import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { GlobalState } from '~/store'
import { ThemeProps } from '~/styles/theme'
import ThemeSwitch from '../ThemeSwitch'
import UserAvatar from '../UserAvatar'

const HeaderWrapper = styled.header(({ theme }:ThemeProps) => `
  padding: 16px;
  position: relative;

  .brand-logo {
    display: inline-block;
    width: 32px;
    border-radius: 50%;
    border: 1px solid ${theme.colors.white};
    background-color: ${theme.colors.white};
  }
  .brand-name {
    display: inline-block;
    font-size: 20px;
    padding: 0 8px;
  }
  .brand-name, .theme-switch {
    position: relative;
    top: -8px;
  }
  .theme-switch {
    top: -2px;
  }

  nav {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    padding: 32px;
  }

  .theme-switch {
    position: relative;
    bottom: -0.55em;
    margin-left: 1em;
  }
`)

const Divider = styled.span`
  padding: 16px;
  ::before {
    content: "|";
  }
`

const GuestAccountNav = () => {
  return (
    <>
      <Link href="/login">
        <a>Login</a>
      </Link>
      <Divider />
      <Link href="/signup">
        <a>Sign Up</a>
      </Link>
    </>
  )
}

const UserAccountNavWrapper = styled.div`
  .username {
    position: relative;
    top: 2px;
    padding: 8px;
  }
`
const UserAccountNav = ({ username, avatarUrl }) => {
  return (
    <UserAccountNavWrapper>
      <Link href="/me">
        <a>
          <UserAvatar url={avatarUrl} username={username} />
          <span className="username">{username}</span>
        </a>
      </Link>
      <Divider />
      <Link href="/logout">
        <a>Logout</a>
      </Link>
      
    </UserAccountNavWrapper>
  )
}

const Header = () => {
  const user = useSelector((s:GlobalState) => s.authenticatedUser)
  return (
      <HeaderWrapper>
      <Link href="/">
        <a>
          <Image className="brand-logo" width="32" height="32" src="/icons/nextjs.png" alt="Brand Logo" />
          <span className="brand-name">NextJS Template</span>
        </a>
      </Link>
      <span className="theme-switch">
        <ThemeSwitch />
      </span>
      <nav>
        {
          !user
            ? <GuestAccountNav />
            : <UserAccountNav username={user.username} avatarUrl={user.avatarUrl} /> 
        }
      </nav>
      </HeaderWrapper>
  )
}

export default Header
