import React from 'react'
import Head from 'next/head'
import Layout from '../../layout'
import makeDocTitle from '../../helpers/doc-title'
import ResourceTitle from '../../components/shared/ResourceTitle'
import FlexGrid from '../../components/shared/FlexGrid'

const data = [
  {
    id: '1',
    name: '222'
  },
  {
    id: '2',
    name: '333'
  },
]

const Favorite: React.VFC = () => {
  return (
    <Layout>
      <Head>
        <title>{makeDocTitle('收藏夹')}</title>
      </Head>
      <ResourceTitle>🚀 收藏内容</ResourceTitle>

      {/* 内容 */}
      <FlexGrid RenderItem={(props) => {
        return <span>{props.name}</span>
      }} resources={data}/>
    </Layout>
  )
}

export default Favorite
