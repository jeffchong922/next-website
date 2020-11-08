import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../../layout'
import { getAllTag, getArticlesByTag } from '../../libs/articles'
import makeDocTitle from '../../helpers/doc-title'
import ResourceTitle from '../../components/shared/ResourceTitle'
import HighlightLink from '../../components/shared/HighlightLink'
import { transformStrForShow, transformStrForLink } from '../../helpers/name-link'
import ShowArticles from '../../components/ArticlesPage/ShowArticles'
import LoadingPage from '../../components/shared/LoadingPage'

export type Query = {
  slug: string
}

export type Article = {
  id: string
  tags: string[]
  title: string
}

export type TagRelatedProps = {
  tag: string
  articles: Article[]
}

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  const tags = getAllTag().map(transformStrForLink).sort().filter((tag, idx, tags) => tag !== tags[idx+1])
  const paths = tags.map(tag => ({
    params: {
      slug: tag
    }
  }))
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<TagRelatedProps, Query> = async ({
  params
}) => {
  const articles = getArticlesByTag(params.slug)
  return {
    props: {
      tag: transformStrForShow(params.slug),
      articles
    },
    revalidate: 1
  }
}

const TagRelated = ({
  tag,
  articles
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  if (router.isFallback) {
    return <LoadingPage/>
  }
  return (
    <Layout>
      <Head>
        <title>{makeDocTitle(`#${tag}`)}</title>
      </Head>

      <ResourceTitle>🔗 {tag} ({articles.length} total)</ResourceTitle>

      <ShowArticles articles={articles}/>

      <HighlightLink href='/tags'>全部标签</HighlightLink>
    </Layout>
  )
}

export default TagRelated
