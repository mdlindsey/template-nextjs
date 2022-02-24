import Image from 'next/image'
import styled from 'styled-components'
import packageJson from '~/package.json'

const FooterWrapper = styled.footer`
    padding: 16px;
    text-align: center;

    img {
        width: 32px;
        margin: 8px;
        background: #fff;
        border-radius: 50%;
        display: inline-block;
    }
`

const Footer = () => {
    return (
        <FooterWrapper>
            {
                // if git repo is available show it, otherwise show generic copyright
                packageJson?.repository?.url ? (
                    <a href={packageJson.repository.url.replace('.git', '')} target="_blank" rel="noreferrer">
                        <Image width="32" height="32" src="/icons/github.svg" alt="GitHub" />
                    </a>
                ) : (
                    <>&copy; { new Date().getFullYear() }</>
                )
            }
        </FooterWrapper>
    )
}

export default Footer
