import fs from 'fs'
import path from 'path'

export type FavoriteData = {
  category: string
  items: {
    href: string
    name: string
    icon?: string
    desc?: string
  }[]
}[]

const favoriteFile = path.join(process.cwd(), 'data/favorite.json')

export function getFavoritesData ()  {
  const source = fs.readFileSync(favoriteFile, 'utf-8')
  return JSON.parse(source) as FavoriteData
}