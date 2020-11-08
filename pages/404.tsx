import React from 'react'
import Head from 'next/head'
import Layout from '../layout'
import makeDocTitle from '../helpers/doc-title'

export type Custom404Props = {
  children?: string
}

const Custom404: React.FC<Custom404Props> = ({
  children
}) => {
  return (
    <Layout>
      <Head>
        <title>{makeDocTitle('404')}</title>
      </Head>
      <div className='custom-404'>
        404 | { children || '资源未找到' }
      </div>
      <style jsx>{`
        .custom-404 {
          padding: 3rem 0;
          text-align: center;
        }
      `}</style>
    </Layout>
  )
}

export default Custom404
