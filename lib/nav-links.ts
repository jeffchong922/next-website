import fs from 'fs'
import path from 'path'

const homeLinksPath = path.join(process.cwd(), 'data/home-links.json')

export function getHomeLinksData () {
  const file = fs.readFileSync(homeLinksPath, 'utf-8')
  return JSON.parse(file)
}