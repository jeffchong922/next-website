import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import renderToString from 'next-mdx-remote/render-to-string'
import makeComponents from '../config/mdxComponents'

const ARTICLES_DIRECTORY = path.join(process.cwd(), 'data/articles')

function articlePathFilter (path: string) {
  return /\.mdx?/.test(path)
}

export function getAllArticle () {
  const filePaths = fs.readdirSync(ARTICLES_DIRECTORY)
    .filter(articlePathFilter)

  const articleList = filePaths.map(filePath => {
    const id = filePath.replace(/\.mdx?$/, '')
    
    const source = fs.readFileSync(path.join(ARTICLES_DIRECTORY, filePath), 'utf-8')

    const { data } = matter(source)
    const { title, tags } = data

    let articleTags: string[] = []
    if (tags) {
      articleTags = typeof tags === 'string'
        ? [tags]
        : tags
    }

    return {
      id,
      title: title ? title : id,
      tags: articleTags
    }
  })

  return articleList
}

export function getAllArticleIds () {
  return fs.readdirSync(ARTICLES_DIRECTORY)
    .filter(articlePathFilter)
    .map(filePath => filePath.replace(/\.mdx?$/, ''))
}

export async function getArticleById (id: string) {
  let source: Buffer
  if (isFileExist(`${id}.md`)) {
    source = fs.readFileSync(path.join(ARTICLES_DIRECTORY, `${id}.md`))
  } else if (isFileExist(`${id}.mdx`)) {
    source = fs.readFileSync(path.join(ARTICLES_DIRECTORY, `${id}.mdx`))
  } else {
    throw new Error('相关文章未找到')
  }

  const { content, data } = matter(source)

  const localComponents = getLocalComponentsFromMdxContent(content)

  const mdxSource = await renderToString(content, {
    components: makeComponents(localComponents),
    mdxOptions: {
      remarkPlugins: []
    },
    scope: data
  })

  return {
    source: mdxSource,
    frontMatter: data,
    localComponents
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

export function isFileExist (fileName: string) {
  return fs.existsSync(path.join(ARTICLES_DIRECTORY, fileName))
}