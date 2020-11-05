import React from 'react'
import Head from 'next/head'
import Layout from '../../layout'
import makeDocTitle from '../../helpers/doc-title'
import ResourceTitle from '../../components/shared/ResourceTitle'
import NoResource from '../../components/ArticlesPage/NoResource'
import ResourceNav from '../../components/ArticlesPage/ResourceNav'

const Articles = () => {
  return (
    <Layout>
      <Head>
        <title>{makeDocTitle('记录')}</title>
      </Head>
      <ResourceTitle>
      ✍记录内容 <br/> 🔍第1页
      </ResourceTitle>
      <NoResource/>
      <ResourceNav
        leftClick={() => alert(1)}
        rightClick={() => alert(2)}
      />
    </Layout>
  )
}

export default Articles
