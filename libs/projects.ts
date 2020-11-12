import Prismic from 'prismic-javascript'
import { makeClient } from '../prismic-configuration'

export type Project = {
  id: string
  title: string
  screenShort: string
  skill: string
  href: string
  desc: string
}

const prismicClient = makeClient()

export async function getProjectsData (): Promise<Project[]>  {
  const selfProject = await prismicClient.query(
    Prismic.Predicates.at('document.type', 'self-project')
  )

  const projects = selfProject.results.map<Project>(project => ({
    id: project.id,
    title: project.data.title,
    screenShort: project.data.picture.url,
    skill: project.data.skill,
    href: project.data.href.url,
    desc: project.data.description
  }))
  
  return projects
}