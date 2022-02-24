import Head from 'next/head'
import { Main } from '~/styles/global'
import Header from './Header'
import Footer from './Footer'
import { FC, ReactElement } from 'react'

type ReactChild = FC | FC[] | ReactElement
export type PageProps = { title?:string, children?:ReactChild }
const PageTemplate = ({ title, children }: PageProps) => {
  return (
      <>
        <Head>
          <title>{ title } | NextJS Template</title>
        </Head>
        <Header />
        <Main>
            { children }
        </Main>
        <Footer />
      </>
  )
}

export default PageTemplate
