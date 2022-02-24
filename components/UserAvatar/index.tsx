import Image from 'next/image'
import styled from 'styled-components'

const AvatarWrapper = styled.span`
    img, span {
        display: inline-block;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        position: relative;
        bottom: -0.15em;
    }
    img {
        
    }
    span {
        background: #aaa;
        line-height: 22px;
        font-size: 18px;
        padding-left: 0.32em;
    }
`

export type UserAvatarProps = {
    url?: string
    username?: string
}
const UserAvatar = ({ url, username }:UserAvatarProps) => {
  return (
    <AvatarWrapper>
        {
            url ? <Image width="22" height="22" src={url} alt="" /> :
            <span>{ username?.charAt(0) || '?' }</span> 
        }
    </AvatarWrapper>
  )
}

export default UserAvatar
