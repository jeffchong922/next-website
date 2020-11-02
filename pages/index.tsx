import { GetStaticProps, InferGetStaticPropsType } from 'next'
import DescBlock from '../components/HomePage/DescBlock'
import Layout from '../components/Layout'
import NavLinks from '../components/HomePage/NavLinks'
import { getHomeLinksData } from '../lib/nav-links'
import { getPageImg } from '../lib/page-img'

export type Link = {
  title: string,
  links: {
    href: string
    text: string
    desc?: string
  }[]
}

export type HomeProps = {
  links: Link[]
  bannerImgPath: string
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const links = getHomeLinksData()
  const imgSrc = getPageImg('/')
  return {
    props: {
      links,
      bannerImgPath: imgSrc
    },
    revalidate: 1
  }
}

export default function Home ({ links, bannerImgPath }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title='The Jeff' bgImgSrc={bannerImgPath}>
      {
        links.map(link => (
          <DescBlock key={link.title} title={link.title} className='pb-6'>
            <NavLinks className='text-2xl lg:text-3xl' hrefList={link.links}/>
          </DescBlock>
        ))
      }
    </Layout>
  )
}

