import React from 'react'
import Head from 'next/head'
import Layout from '../../layout'
import makeDocTitle from '../../helpers/doc-title'
import ResourceTitle from '../../components/shared/ResourceTitle'
import FlexGrid from '../../components/shared/FlexGrid'
import Card from '../../components/FavoritePage/Card'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getFavoritesData } from '../../libs/favorites'

export type Favorite = {
  id: string
  name: string
  href: string
  icon?: string
  desc?: string
}

export type FavoriteList = {
  title: string
  items: Favorite[]
}

export type FavoriteProps = {
  favoriteGroup: FavoriteList[]
}

export const getStaticProps: GetStaticProps<FavoriteProps> = async () => {
  const data = getFavoritesData()

  // 格式化
  const mapData = data.map<FavoriteList>(item => ({
    title: item.category,
    items: item.items.map<Favorite>(item => ({
      id: item.name,
      ...item
    }))
  }))

  return {
    props: {
      favoriteGroup: mapData
    }
  }
}

const Favorite: React.VFC = ({
  favoriteGroup
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <Head>
        <title>{makeDocTitle('收藏夹')}</title>
      </Head>

      {
        favoriteGroup.map(favoriteList => (
          <div key={favoriteList.title}>
            <ResourceTitle>{favoriteList.title}</ResourceTitle>
            <FlexGrid RenderItem={Card} resources={favoriteList.items}/>
          </div>
        ))
      }

    </Layout>
  )
}

export default Favorite
