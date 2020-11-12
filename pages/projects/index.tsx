import React from 'react'
import Head from 'next/head'
import Layout from '../../layout'
import makeDocTitle from '../../helpers/doc-title'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getProjectsData } from '../../libs/projects'
import ResourceTitle from '../../components/shared/ResourceTitle'
import Card, { CardProps } from '../../components/ProjectsPage/Card'
import FlexGrid from '../../components/shared/FlexGrid'

export type Project = {
  id: string
} & CardProps

export type ProjectsProps = {
  projects: Project[]
}

export const getStaticProps: GetStaticProps<ProjectsProps> = async () => {
  const data = await getProjectsData()

  // 格式化
  const mapData = data.map<Project>(item => ({
    id: item.title,
    ...item
  }))

  return {
    props: {
      projects: mapData
    },
    revalidate: 10,
  }
}

const Projects = ({
  projects
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <Head>
        <title>{makeDocTitle('个人作品')}</title>
      </Head>

      <ResourceTitle>👓 个人作品</ResourceTitle>

      { projects.length > 0 && (
        <FlexGrid RenderItem={Card} resources={projects}/>
      )}
    </Layout>
  )
}

export default Projects
