import Prismic from 'prismic-javascript'
import { makeClient } from '../prismic-configuration'

export type FavoriteItem = {
  id: string,
  href: string
  name: string
  icon: string
  desc: string
}

export type FavoriteData = {
  category: string
  items: FavoriteItem[]
}

const prismicClient = makeClient()

export async function getFavoritesData (): Promise<Array<FavoriteData>>  {
  // 获取所有分类
  const favoriteCategories = await prismicClient.query(
    Prismic.Predicates.at('document.type', 'favorite-category'),
    { orderings: '[document.last_publication_date]' }
  )

  // 获取分类内容
  const promises = favoriteCategories.results.map<Promise<FavoriteData>>(async (category) => {
    const favorites = await prismicClient.query([
      Prismic.Predicates.at('document.type', 'favorite'),
      Prismic.Predicates.at('my.favorite.categories.category', category.id)
    ], { orderings: '[document.last_publication_date]' })
    
    const items = favorites.results.map<FavoriteItem>(favorite => ({
      id: favorite.id,
      href: favorite.data.href.url,
      icon: favorite.data['icon-path'],
      name: favorite.data.name,
      desc: favorite.data.description,
    }))
    return {
      category: category.data.category,
      items
    }
  })
  
  return await Promise.all(promises)
}