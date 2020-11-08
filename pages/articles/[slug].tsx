import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import hydrate from 'next-mdx-remote/hydrate'
import { Box } from 'theme-ui'
import Head from 'next/head'
import { useRouter } from 'next/router'
import makeComponents from '../../config/mdxComponents'
import Layout from '../../layout'
import { getAllArticleIds, getArticleById, MdxArticle } from '../../libs/articles'
import makeDocTitle from '../../helpers/doc-title'
import Custom404 from '../404'
import LoadingPage from '../../components/shared/LoadingPage'

export type Query = {
  slug: string
}

export type FetchSuccess = {
  mdxSource: any
  localComponents: string[]
}

export type FetchError = {
  error: Error
}


export type ArticleProps = {
  errMsg: string
  mdxSource: any
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
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<ArticleProps, Query> = async ({
  params
}) => {
  let result: ArticleProps = {
    errMsg: '',
    mdxSource: null,
    localComponents: []
  }
  const article = await getArticleById(params.slug)
  if (article.errMsg) {
    result.errMsg = article.errMsg
  } else {
    const { mdxSource, localComponents } = article.data
    result.mdxSource = mdxSource
    result.localComponents = localComponents
  }
  
  return {
    props: result,
    revalidate: 1
  }
}

const Article = ({
  errMsg,
  mdxSource,
  localComponents
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  if (router.isFallback) {
    return <LoadingPage/>
  }
  if (errMsg) {
    return <Custom404>{errMsg}</Custom404>
  }

  const content = hydrate(mdxSource, {
    components: makeComponents(localComponents)
  })

  return (
    <Layout showArticleProgress={true}>
      <Head>
        <title>{makeDocTitle('标题')}</title>
      </Head>

      <Box sx={{ px: ['4', '16', '24'], maxWidth: '5xl' }}>
        {content}
      </Box>
    </Layout>
  )
}

export default Article
