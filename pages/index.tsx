import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head'
import Banner from "../components/HomePage/Banner";
import LatestRecords from '../components/HomePage/LatestRecords';
import ResourceTitle from '../components/shared/ResourceTitle';
import Layout from "../layout";
import { getRecentArticles } from '../libs/articles';
import { makeClient } from '../prismic-configuration';

export type Article = {
  id: string
  tags: string[]
  title: string
  desc: string
}

export type ArticlesProps = {
  articles: Article[]
  bannerImg: string
}

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  const articles = await getRecentArticles()

  const mapArticles = articles.map<Article>(article => ({
    ...article,
    desc: article.desc || '没有相关文章描述',
    tags: article.tags.length <= 0 ? ['NO TAG'] : article.tags,
  }))

  const homeDoc = await makeClient().getSingle('home-page', {
    fetch: ['home-page.banner']
  })

  return {
    props: {
      articles: mapArticles,
      bannerImg: homeDoc.data.banner.url || '/images/home-banner.jpg'
    },
    revalidate: 1
  }
}

export default function Home ({
  articles,
  bannerImg
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Head>
        <title>Jeff · 前端开发者</title>
      </Head>
      <Banner bannerImg={bannerImg}/>

      <ResourceTitle>📓 最近记录</ResourceTitle>

      <LatestRecords articles={articles}/>
    </Layout>
  )
}

