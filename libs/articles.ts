import path from 'path'
import matter from 'gray-matter'
import emoji from 'remark-emoji'
import remarkSubSuper  from 'remark-sub-super'
import remarkTypograf from '@mavrin/remark-typograf'
import remarkSlug from 'remark-slug'
import remarkToc from 'remark-toc'
import footnotes from 'remark-footnotes'
import remarkAbbr from 'remark-abbr'
import renderToString from 'next-mdx-remote/render-to-string'
import makeComponents from '../config/mdxComponents'
import { flatten } from '../helpers/fp'
import makeFileTools from '../helpers/file-tools'
import { transformStrForLink } from '../helpers/name-link'
import Prismic from 'prismic-javascript'
import { makeClient } from '../prismic-configuration'
import ArticleCard from '../components/shared/ArticleCard'

export type ArticleMatter = {
  title?: string
  tags?: string[] | string
  date?: string
  desc?: string
  image?: string
}

export type ArticleInfo = {
  id: string
  title: string
  tags: string[]
  date: string
  desc: string
  image: string
  content: string
}

export type ArticleCard = {
  id: string
  title: string
  tags: string[]
  desc?: string
}

export type MdxArticle = {
  errMsg?: string
  data?: ArticleInfo & {
    mdxSource: any
    localComponents: string[]
  }
}

const prismicClient = makeClient()

export async function getRecentArticles (): Promise<ArticleCard[]> {
  return await getArticleCardInfos(3)
}

export async function getAllArticles (): Promise<ArticleCard[]> {
  return await getArticleCardInfos()
}

async function getArticleCardInfos (limit: number = 100): Promise<ArticleCard[]> {
  const fetchResult = await prismicClient.query(
    Prismic.Predicates.at('document.type', 'md-article'),
    {
      pageSize: limit,
      orderings: '[my.md-article.date desc]',
      fetch: ['md-article.title', 'md-article.description', 'md-article.tags']
    }
  )

  return fetchResult.results.map<ArticleCard>(doc => ({
    id: doc.uid,
    title: doc.data.title[0].text,
    desc: doc.data.description,
    tags: doc.data.tags.map(({ tag }) => tag.uid)
  }))
}

// 文章文件存放路径
const ARTICLES_DIRECTORY = path.join(process.cwd(), 'data/articles')

const fileTools = makeFileTools(ARTICLES_DIRECTORY)

/**
 * 文章文件过滤
 * @param fileName 文件名
 */
function articleFileFilter (fileName: string) {
  return /\.mdx?$/.test(fileName)
}

/**
 * 从文件名获取相应id值
 * @param fileName 文件名
 */
function getArticleId (fileName: string) {
  return fileName.replace(/\.mdx?$/, '')
}

/**
 * 获取所有文章文件名
 */
function getAllArticleNames () {
  return fileTools.getAllFileNames()
  .filter(articleFileFilter)
}

/**
 * 获取所有文章信息
 */
function getAllArticleInfos (): ArticleInfo[] {
  const fileNames = getAllArticleNames()

  return fileNames.map(fileName => {
    const id = getArticleId(fileName)
    
    const source = fileTools.getFileSource(fileName)

    const { data, content } = matter(source)
    const { title, tags, date, desc, image } = data as ArticleMatter

    let articleTags: string[] = []
    if (tags) {
      typeof tags === 'string'
        ? articleTags.push(tags)
        : articleTags.push(...tags)
    }
    else {
      articleTags.push('NO TAG')
    }

    let dateJson = new Date(date).toJSON()
    if (!dateJson) {
      dateJson = new Date().toJSON()
    }

    return {
      id: transformStrForLink(id),
      title: title || id,
      tags: articleTags,
      date: dateJson,
      desc: desc || '没有找到相关描述',
      image: image || '',
      content
    }
  })
}

export async function getAllArticle () {
  const data = await prismicClient.query(
    Prismic.Predicates.at('document.type', 'md-article')
  )
  console.log(data)
  return getAllArticleInfos()
}

export function getAllArticleIds () {
  return getAllArticleNames().map(getArticleId).map(transformStrForLink)
}

export async function getArticleById (id: string): Promise<MdxArticle> {

  const allArticleInfos = getAllArticleInfos()
  const articleInfo = allArticleInfos.find(_ => _.id === id)
  if (!articleInfo) {
    return {
      errMsg: '相关文章未找到'
    }
  }

  const { content, id: articleId, ...frontMatter } = articleInfo

  const localComponents = getLocalComponentsFromMdxContent(content)

  const mdxSource = await renderToString(content, {
    components: makeComponents(localComponents),
    mdxOptions: {
      remarkPlugins: [
        /* 添加 id 锚点 */
        [remarkSlug],
        /* 添加 topic */
        [remarkToc],
        /* 字符表情 */
        [emoji, {
          emoticon: true
        }],
        /* sup & sub */
        remarkSubSuper,
        /* 商标类 */
        [remarkTypograf, {
          locale: ['en-US']
        }],
        /*  */
        [footnotes, {
          inlineNotes: true
        }],
        remarkAbbr
      ]
    },
    scope: frontMatter
  })

  return {
    data: {
      ...articleInfo,
      mdxSource,
      localComponents
    }
  }
}

export function getLocalComponentsFromMdxContent (content: string): string[] {
  const codeBlockReg = /^\`\`\`(.|\n|\r)*?\`\`\`$/img
  const localComponentReg = /\<([A-Z].*?)\/\>/g

  const filterContent = content.replace(codeBlockReg, '')
  const matches = filterContent.matchAll(localComponentReg)

  const components = Array.from(matches, m => m[1].trim())
    .filter((c, idx, cs) => cs.findIndex(_ => _ === c) === idx)

  console.log('getLocalComponents() : ', components)
  return components
}

export function getAllTag () {
  const tagsList = getAllArticleInfos().map(article => article.tags)
  return flatten<string>(tagsList)
}

export function getArticlesByTag (tag: string) {
  const articleList = getAllArticleInfos()

  const filteredList = articleList.filter(({ tags }) => {
    const searchTag = transformStrForLink(tag)
    const articleTags = tags.map(transformStrForLink)
    return ~articleTags.indexOf(searchTag)
  })

  return filteredList
}