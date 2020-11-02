import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import ArticleList from '../../components/ArticlePage/ArticleList'
import Layout from '../../components/layout'
import { getAllArticleIds, getArticleDataById } from '../../lib/articles'

export type Query = {
  id: string
}

export type ArticleProps = {
  articleInfo: {
    id: string
    title: string
    contentHtml: string
  }
}

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  const paths = getAllArticleIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<ArticleProps, Query> = async ({ params }) => {
  const article = await getArticleDataById(params.id)
  return {
    props: {
      articleInfo: article
    },
    revalidate: 1
  }
}

export default function Article ({ articleInfo }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title={articleInfo.title}>
      <article dangerouslySetInnerHTML={{ __html: articleInfo.contentHtml }}></article>
    </Layout>
  )
}
