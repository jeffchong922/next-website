import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import hydrate from 'next-mdx-remote/hydrate'
import { Box, Flex, Text } from 'theme-ui'
import Head from 'next/head'
import { useRouter } from 'next/router'
import makeComponents from '../../config/mdxComponents'
import Layout from '../../layout'
import { getArticleByUid, getArticlesUid } from '../../libs/articles'
import makeDocTitle from '../../helpers/doc-title'
import Custom404 from '../404'
import LoadingPage from '../../components/shared/LoadingPage'
import ResourceTitle from '../../components/shared/ResourceTitle'
import BBBox from '../../components/shared/BBBox'
import NormalLink from '../../components/shared/NormalLink'
import { transformStrForLink, transformStrForShow } from '../../helpers/name-link'
import NextCoverImage from '../../components/shared/NextCoverImg'

export type Query = {
  slug: string
}

export type ArticleProps = {
  errMsg: string
  mdxSource: any
  frontMatter: {
    title: string
    tags: string[]
    image?: string
  }
  localComponents: string[]
}

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  const ids = await getArticlesUid()

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
    frontMatter: null,
    localComponents: []
  }
  try {
    const { data: { mdxSource, localComponents }, title, tags, topImg: image } = await getArticleByUid(params.slug)
    result.mdxSource = mdxSource
    result.localComponents = localComponents
    result.frontMatter = {
      title,
      tags,
      image
    }
  } catch (e) {
    result.errMsg = e.message
  }
  
  return {
    props: result,
    revalidate: 1
  }
}

const Article = ({
  errMsg,
  mdxSource,
  frontMatter,
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
        <title>{makeDocTitle(frontMatter.title)}</title>
      </Head>

      <Box sx={{
        width: 'full',
        height: ['xs', 'md', 'xl', '3xl'],
        overflow: 'hidden',
      }}>
        <NextCoverImage src={ frontMatter.image }  alt='article-image'/>
      </Box>
    
      <BBBox>
        <Box sx={{ px: ['4', '16', '24'], maxWidth: '5xl', mb: '20' }}>
          <h1 style={{ margin: '3.6rem 0', fontSize: '2.8rem' }}>{frontMatter.title}</h1>
          {content}
        </Box>
      </BBBox>

      <ResourceTitle>🔗 相关标签</ResourceTitle>
      <BBBox>
        <Flex sx={{ flexWrap: 'wrap', pt: '8' }}>
          {
            frontMatter.tags.map(tag => (
              <Text key={tag} sx={{
                width: ['1/3', '1/4'],
                mb: '8',
                textAlign: 'center', fontSize: ['lg', 'xl'], fontWeight: 'bold',
                color: 'text',
                textDecoration: 'underline',
                transition: 'color .3s',
                ":hover": {
                  color: 'primary'
                }
              }}>
                <NormalLink href={`/tags/${transformStrForLink(tag)}`}>#{transformStrForShow(tag)}</NormalLink>
              </Text>
            ))
          }
        </Flex>
      </BBBox>
    </Layout>
  )
}

export default Article
