import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../../layout'
import makeDocTitle from '../../helpers/doc-title'
import ResourceTitle from '../../components/shared/ResourceTitle'
import ResourceNav from '../../components/ArticlesPage/ResourceNav'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getAllArticle } from '../../libs/articles'
import HighlightLink from '../../components/shared/HighlightLink'
import ShowArticles from '../../components/ArticlesPage/ShowArticles'
import { scrollToTop } from '../../helpers/dom'

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

function isHaveResources (resources: any[], idx) {
  return resources[idx] ? true : false
}

const Articles = ({
  articles
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [maxSize, setMaxSize] = useState<number>(6)
  const [currentArticles, setCurrentArticles] = useState<Article[]>([])
  const [page, setPage] = useState<number>(1)

  // 设置当前文档
  useEffect(() => {
    const sliced = articles.slice(
      (page - 1) * maxSize,
      (page) * maxSize
    )
    setCurrentArticles(sliced)
  },[maxSize, page, articles])
  
  function handlePrevClick () {
    const idx = (page - 1) * maxSize - 1
    if (isHaveResources(articles, idx)) {
      setPage(page - 1)
      scrollToTop()
    }
  }

  function handleNextClick () {
    const idx = page * maxSize
    if (isHaveResources(articles, idx)) {
      setPage(page + 1)
      scrollToTop()
    }
  }

  return (
    <Layout>
      <Head>
        <title>{makeDocTitle('记录')}</title>
      </Head>
      <ResourceTitle>
        ✍记录内容 <br/> 🔍第{page}页
      </ResourceTitle>

      <ShowArticles articles={currentArticles}/>

      <ResourceNav
        leftClick={handlePrevClick}
        rightClick={handleNextClick}
      />

      <HighlightLink href='/tags'>通过标签查询</HighlightLink>
    </Layout>
  )
}

export default Articles
