import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Layout from '../../components/Layout'
import { getAllArticleIds, getArticleDataById } from '../../lib/articles'

export type Query = {
  id: string
}

export type ArticleProps = {
  articleInfo: {
    id: string
    title: string
    image: string
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
    <Layout title={articleInfo.title} bgImgSrc={articleInfo.image}>
      <article dangerouslySetInnerHTML={{ __html: articleInfo.contentHtml }}></article>
    </Layout>
  )
}
