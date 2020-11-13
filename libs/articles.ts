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
import Prismic from 'prismic-javascript'
import { makeClient } from '../prismic-configuration'
import ArticleCard from '../components/shared/ArticleCard'
import { Document } from 'prismic-javascript/types/documents'

export type ArticleCard = {
  id: string
  title: string
  tags: string[]
  desc?: string
}

export type Article = {
  description?: string
  topImg: string
  title: string
  date: string
  tags: string[]
  data: {
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

  return fetchResult.results.map<ArticleCard>(getArticleCardInfo)
}

export async function getArticlesUid (): Promise<string[]> {
  const fetchResult = await prismicClient.query(
    Prismic.Predicates.at('document.type', 'md-article'),
    {
      fetch: ['md-article.date']
    }
  )
  return fetchResult.results.map<string>(doc => doc.uid)
}

export async function getArticleByUid (uid: string, preview: boolean, previewData?: { ref: string }): Promise<Article> {
  const options = preview
    ? { ref: previewData.ref }
    : {}
  const articleDoc = await prismicClient.getByUID('md-article', uid, options)
  const parsed = await parseRawMD2Html(articleDoc.data.content[0].text)
  return {
    description: articleDoc.data.description,
    topImg: articleDoc.data['top-img-path'],
    title: articleDoc.data.title[0].text,
    date: articleDoc.data.date,
    tags: articleDoc.data.tags.map(({ tag }) => tag.uid),
    data: parsed.data
  }
}

export async function getAllArticleTags (): Promise<string[]> {
  const fetchResult = await prismicClient.query(
    Prismic.Predicates.at('document.type', 'md-article'),
    {
      fetch: ['md-article.tags']
    }
  )
  const tags = fetchResult.results.map<string[]>(doc => doc.data.tags.map(({ tag }) => tag.uid))
  return flatten<string>(tags)
}

export async function getUniqueTags (): Promise<string[]> {
  const fetchResult = await prismicClient.query(
    Prismic.Predicates.at('document.type', 'article-tag')
  )
  return fetchResult.results.map(doc => doc.uid)
}

export async function getArticlesByTagUid (uid: string): Promise<ArticleCard[]> {
  const tagDoc = await prismicClient.getByUID('article-tag', uid, {})
  const fetchResult = await prismicClient.query(
    [
      Prismic.Predicates.at('document.type', 'md-article'),
      Prismic.Predicates.at('my.md-article.tags.tag', tagDoc.id)
    ],
    {
      orderings: '[my.md-article.date desc]',
      fetch: ['md-article.title', 'md-article.description', 'md-article.tags']
    }
  )
  return fetchResult.results.map<ArticleCard>(getArticleCardInfo)
}

async function parseRawMD2Html (content: string) {
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
    }
  })

  return {
    data: {
      mdxSource,
      localComponents
    }
  }
}

function getLocalComponentsFromMdxContent (content: string): string[] {
  const codeBlockReg = /^\`\`\`(.|\n|\r)*?\`\`\`$/img
  const localComponentReg = /\<([A-Z].*?)\/\>/g

  const filterContent = content.replace(codeBlockReg, '')
  const matches = filterContent.matchAll(localComponentReg)

  const components = Array.from(matches, m => m[1].trim())
    .filter((c, idx, cs) => cs.findIndex(_ => _ === c) === idx)

  return components
}

function getArticleCardInfo (doc: Document) {
  return {
    id: doc.uid,
    title: doc.data.title[0].text,
    desc: doc.data.description,
    tags: doc.data.tags.map(({ tag }) => tag.uid)
  }
}