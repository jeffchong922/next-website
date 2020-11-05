import React from 'react'
import Head from 'next/head'
import Layout from '../../layout'
import makeDocTitle from '../../helpers/doc-title'
import ResourceTitle from '../../components/shared/ResourceTitle'
import NoResource from '../../components/ArticlesPage/NoResource'
import ResourceNav from '../../components/ArticlesPage/ResourceNav'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getAllArticle } from '../../libs/articles'
import FlexGrid from '../../components/shared/FlexGrid'
import Card from '../../components/ArticlesPage/Card'

export type Article = {
  id: string
  tags: string[]
  title: string
}

export type ArticlesProps = {
  articles: Article[]
}

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  const articles = getAllArticle()

  const mapArticles = articles.map<Article>(article => ({
    ...article,
    tags: article.tags.length <= 0 ? ['NO TAG'] : article.tags,
  }))

  return {
    props: {
      articles: mapArticles
    }
  }
}

const Articles = ({
  articles
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(articles)
  return (
    <Layout>
      <Head>
        <title>{makeDocTitle('记录')}</title>
      </Head>
      <ResourceTitle>
      ✍记录内容 <br/> 🔍第1页
      </ResourceTitle>

      {
        articles.length <= 0
          ? <NoResource/>
          : <FlexGrid RenderItem={Card} resources={articles}/>
      }

      <ResourceNav
        leftClick={() => alert(1)}
        rightClick={() => alert(2)}
      />
    </Layout>
  )
}

export default Articles
