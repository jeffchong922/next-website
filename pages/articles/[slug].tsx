import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import hydrate from 'next-mdx-remote/hydrate'
import makeComponents from '../../config/mdxComponents'
import { getAllArticleIds, getArticleById } from '../../libs/articles'

export type Query = {
  slug: string
}

export type ArticleProps = {
  mdxSource: any
  frontMatter: any
  localComponents: string[]
}

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  const ids = getAllArticleIds()

  const paths = ids.map(id => ({
    params: {
      slug: id
    }
  }))

  return {
    paths: paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<ArticleProps, Query> = async ({
  params
}) => {
  const article = await getArticleById(params.slug)
  return {
    props: {
      mdxSource: article.source,
      frontMatter: article.frontMatter,
      localComponents: article.localComponents
    }
  }
}

const Article = ({
  mdxSource,
  frontMatter,
  localComponents
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const content = hydrate(mdxSource, {
    components: makeComponents(localComponents)
  })

  return (
    <div>
      {content}
    </div>
  )
}

export default Article
