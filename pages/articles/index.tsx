import { GetStaticProps, InferGetStaticPropsType } from 'next'
import ArticleList from '../../components/ArticlePage/ArticleList'
import Layout from '../../components/Layout'
import { getRandomArticleList } from '../../lib/articles'
import { getPageImg } from '../../lib/page-img'

export type Article = {
  id: string
  title: string
  desc: string
  tags: string[]
}

export type ArticlesProps = {
  articles: Article[]
  bannerImgPath: string
}

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  const articles = getRandomArticleList()
  const imgSrc = getPageImg('/articles')
  return {
    props: {
      articles,
      bannerImgPath: imgSrc
    },
    revalidate: 1
  }
}

export default function Articles ({ articles, bannerImgPath }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title='Articles' subTitle='搜集整理的文档' bgImgSrc={bannerImgPath}>
      <ArticleList articleList={articles}/>
    </Layout>
  )
}
