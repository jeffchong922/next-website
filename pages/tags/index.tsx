import React from 'react'
import Head from 'next/head'
import Layout from '../../layout'
import makeDocTitle from '../../helpers/doc-title'
import ResourceTitle from '../../components/shared/ResourceTitle'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getAllArticleTags } from '../../libs/articles'
import TagsTable from '../../components/TagsPage/TagsTable'
import { transformStrForShow } from '../../helpers/name-link'

export type Tag = {
  name: string
  count: number
}

export type TagsProps = {
  tags: Tag[]
}

export const getStaticProps: GetStaticProps<TagsProps> = async () => {
  const sortedTags = (await getAllArticleTags()).map(transformStrForShow).sort()

  // 集成
  const tags: Tag[] = []
  let counter = 1
  sortedTags.forEach((tag, idx) => {
    if (tag === sortedTags[idx+1]) {
      counter++
    } else {
      tags.push({
        name: tag,
        count: counter
      })
      counter = 1
    }
  })

  return {
    props: {
      tags: tags
    },
    revalidate: 1
  }
}

const Tags = ({
  tags
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <Head>
        <title>{makeDocTitle('全部标签')}</title>
      </Head>
      <ResourceTitle>
        🔖 全部标签
      </ResourceTitle>

      <TagsTable tags={tags}/>
    </Layout>
  )
}

export default Tags
