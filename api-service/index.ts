import axios from 'axios'
import { API_HOST } from '~/config'
import { base64Encode } from '~/hooks'

export type OAuthVendor = {
    vendorId: string
    vendorName: string
    brandIcon: string
    brandColor: string
    redirectUrl: string
}

export class TokenRefreshAPI {
    public static async InspectAccessToken(accessToken:string) {}
    public static async RefreshAccessToken(accessToken:string) {}
}

export class AuthAPI {
    public static async OAuthVendors() {
        const { data } = await axios.get(`${API_HOST}/auth/vendors`)
        return data
    }
    public static async OAuthLogin(vendor:string, oauthCode:string) {
        const { data } = await axios.post(`${API_HOST}/auth/vendor/${vendor}/${base64Encode(oauthCode)}`)
        return data
    }
    public static async OAuthAccountLink(vendor:string, oauthCode:string, userJwt:string) {
        const { data } = await axios.put(`${API_HOST}/auth/vendor/${vendor}/${base64Encode(oauthCode)}`, {}, {
            headers: { 'x-jwt': userJwt }
        })
        return data
    }
    public static async OAuthAccountUnlink(vendor:string, userJwt:string) {
        const { data } = await axios.delete(`${API_HOST}/auth/vendor/${vendor}`, {
            headers: { 'x-jwt': userJwt }
        })
        return data
    }
}

// This can be removed once API integration is setup
export class MockAuthAPI {
    public static async OAuthVendors() {
        return [
            {
                vendorId: 'google',
                vendorName: 'Google',
                brandIcon: '/icons/google.svg',
                brandColor: '#4285f4',
                redirectUrl: '#',
            },
            {
                vendorId: 'facebook',
                vendorName: 'Facebook',
                brandIcon: '/icons/facebook.svg',
                brandColor: '#3b5998',
                redirectUrl: '#',
            },
            {
                vendorId: 'microsoft',
                vendorName: 'Microsoft',
                brandIcon: '/icons/microsoft.svg',
                brandColor: '#333',
                redirectUrl: '#',
            },
            {
                vendorId: 'discord',
                vendorName: 'Discord',
                brandIcon: '/icons/discord.svg',
                brandColor: '#5a67d8',
                redirectUrl: '#',
            },
            {
                vendorId: 'twitch',
                vendorName: 'Twitch',
                brandIcon: '/icons/twitch.svg',
                brandColor: '#6441A4',
                redirectUrl: '#',
            },
            {
                vendorId: 'twitter',
                vendorName: 'Twitter',
                brandIcon: '/icons/twitter.svg',
                brandColor: '#2DAAE1',
                redirectUrl: '#',
            }
        ]
    }
}
