import { GetStaticProps, InferGetStaticPropsType } from 'next'
import DescBlock from '../components/HomePage/DescBlock'
import Layout from '../components/layout'
import NavLinks from '../components/HomePage/NavLinks'
import { getHomeLinksData } from '../lib/nav-links'

type Links = {
  title: string,
  links: {
    href: string
    text: string
    desc?: string
  }[]
}[]

export const getStaticProps: GetStaticProps<{links: Links}> = async () => {
  const links = getHomeLinksData()
  return {
    props: {
      links
    },
    revalidate: 1
  }
}

export default function Home ({ links }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title='The Jeff'>
      {
        links.map(link => (
          <DescBlock key={link.title} title={link.title}>
            <NavLinks className='text-2xl lg:text-3xl' hrefList={link.links}/>
          </DescBlock>
        ))
      }
    </Layout>
  )
}

