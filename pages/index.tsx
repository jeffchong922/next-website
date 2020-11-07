import Head from 'next/head'
import Banner from "../components/HomePage/Banner";
import Layout from "../layout";

export default function Home () {
  return (
    <Layout>
      <Head>
        <title>Jeff · 前端开发者</title>
      </Head>
      <Banner/>
    </Layout>
  )
}

