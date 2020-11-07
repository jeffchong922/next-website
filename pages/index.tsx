import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head'
import Banner from "../components/HomePage/Banner";
import LatestRecords from '../components/HomePage/LatestRecords';
import ResourceTitle from '../components/shared/ResourceTitle';
import Layout from "../layout";
import { getAllArticle } from '../libs/articles';

export type Article = {
  id: string
  tags: string[]
  title: string
  desc: string
}

export type ArticlesProps = {
  articles: Article[]
}

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  // 三篇文章
  const articles = getAllArticle().slice(0, 3)

  const mapArticles = articles.map<Article>(article => ({
    desc: '没有相关文章描述',
    ...article,
    tags: article.tags.length <= 0 ? ['NO TAG'] : article.tags,
  }))

  return {
    props: {
      articles: mapArticles
    }
  }
}

export default function Home ({
  articles
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Head>
        <title>Jeff · 前端开发者</title>
      </Head>
      <Banner/>

      <ResourceTitle>📓 最近记录</ResourceTitle>

      <LatestRecords articles={articles}/>
    </Layout>
  )
}

