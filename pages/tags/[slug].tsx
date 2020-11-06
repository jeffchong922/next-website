import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import React from 'react'
import Head from 'next/head'
import Layout from '../../layout'
import { getAllTag, getArticlesByTag } from '../../libs/articles'
import makeDocTitle from '../../helpers/doc-title'
import ResourceTitle from '../../components/shared/ResourceTitle'
import HighlightLink from '../../components/shared/HighlightLink'
import { transformTagForLink, transformTagForShow } from '../../helpers/tag'
import ShowArticles from '../../components/ArticlesPage/ShowArticles'

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
  const tags = getAllTag().map(transformTagForLink).sort().filter((tag, idx, tags) => tag !== tags[idx+1])
  const paths = tags.map(tag => ({
    params: {
      slug: tag
    }
  }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<TagRelatedProps, Query> = async ({
  params
}) => {
  const articles = getArticlesByTag(params.slug)
  return {
    props: {
      tag: transformTagForShow(params.slug),
      articles
    }
  }
}

const TagRelated = ({
  tag,
  articles
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
