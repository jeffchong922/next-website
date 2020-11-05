import fs from 'fs'
import path from 'path'

export type Page = {
  path: string
  src: string
}

const pagesImgPath = path.join(process.cwd(), 'data/pages-img.json')

export function getPageImg (path: string): string {
  const file = fs.readFileSync(pagesImgPath, 'utf-8')

  const pages: Page[] = JSON.parse(file)
  const page = pages.filter(page => page.path === path)

  return page.length !== 0
    ? page[0].src
    : ''
}