import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import highlight from 'remark-highlight.js'
import { fisherYates } from '../utils/tools'

const articlesDirectory = path.join(process.cwd(), 'data/articles')

export function getRandomArticleList () {
  const fileNames = fs.readdirSync(articlesDirectory)

  const articleList = fileNames.map(fileName => {
    const id = fileName.replace(/.md$/, '')

    const fullPath = path.join(articlesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf-8')

    const matterResult = matter(fileContents)

    let tagList: string[] = []

    const { tags, ...otherInfo } = matterResult.data
    if (tags) {
      tagList = tagList.concat(tags)
    }

    return {
      id,
      title: id,
      desc: '没有找到文章相关描述',
      tags: tagList,
      ...otherInfo
    }
  })

  return fisherYates(articleList)
}

export function getAllArticleIds () {
  const fileNames = fs.readdirSync(articlesDirectory)

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/.md$/, '')
      }
    }
  })
}

export async function getArticleDataById (id: string) {
  const fullPath = path.join(articlesDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf-8')

  const matterResult = matter(fileContents)

  const processContent = await remark()
    .use(highlight)
    .use(html)
    .process(matterResult.content)

  const contentHtml = processContent.toString()

  const { image, ...otherInfo } = matterResult.data
  
  return {
    id,
    contentHtml,
    title: id,
    image: image ? image : '',
    ...otherInfo
  }
}