import { GetStaticProps, InferGetStaticPropsType } from 'next'
import ArticleList from '../../components/ArticlePage/ArticleList'
import Layout from '../../components/layout'
import { getRandomArticleList } from '../../lib/articles'

export type Articles = {
  id: string
  title: string
  desc: string
  tags: string[]
}[]

export const getStaticProps: GetStaticProps<{articles: Articles}> = async () => {
  const articles = getRandomArticleList()
  return {
    props: {
      articles
    },
    revalidate: 1
  }
}

export default function Articles ({ articles }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title='Articles' subTitle='搜集整理的文档'>
      <ArticleList articleList={articles}/>
    </Layout>
  )
}
