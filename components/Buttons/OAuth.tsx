import Image from 'next/image'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { AuthAPI, OAuthVendor } from '~/api-service'
import { base64Encode, useDispatcher } from '~/hooks'
import { GlobalState } from '~/store'
import { HOST } from '~/config'

const Wrapper = styled.a`
    .border-l {
        margin-left: 12px;
        border-color: rgba(255, 255, 255, 0.3);
    }
`

export enum OAuthButtonAction {
    Login = 'login',
    SignUp = 'signup',
    Unlink = 'unlink',
}

export type OAuthButtonProps = OAuthVendor & {
    state?: object
    action: OAuthButtonAction
}
const OAuthButton = (props: OAuthButtonProps) => {
    const state = !props.state ? '' : base64Encode(JSON.stringify(props.state))
    const href = props.action === OAuthButtonAction.Unlink ? '#'
        : props.redirectUrl + `&redirect_uri=${HOST}/oauth/${props.vendorId}` + `&state=${state}`
    const actionLabel = props.action === OAuthButtonAction.Login ? 'Login with'
        : props.action === OAuthButtonAction.SignUp ? 'Sign up with' : 'Unlink your'

    const dispatch = useDispatcher()
    const userJwt = useSelector((s: GlobalState) => s.authenticationJwt)
    const onClick = props.action !== OAuthButtonAction.Unlink ? null : async () => {
        const authRes = await AuthAPI.OAuthAccountUnlink(props.vendorId, userJwt)
        dispatch.setJwt(authRes.jwt)
        dispatch.setUser(authRes.user)
    }

    return (
        <Wrapper href={href} onClick={onClick} style={{ backgroundColor: props.brandColor }} className="text-gray-100 hover:text-white shadow text-sm font-bold py-3 px-4 rounded flex justify-start items-center cursor-pointer w-64 mt-2">
            <Image width="24" height="24" src={props.brandIcon} alt={`${props.vendorName} icon`} />
            <span className="border-l h-6 w-1 block mr-1"></span>
            <span className="pl-3">{actionLabel} {props.vendorName}</span>
        </Wrapper>
    )
}

export default OAuthButton
