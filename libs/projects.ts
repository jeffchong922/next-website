import fs from 'fs'
import path from 'path'

export type ProjectsData = {
  title: string
  screenShort: string
  skill: string
  href: string
}[]

const projectsFile = path.join(process.cwd(), 'data/projects.json')

export function getProjectsData ()  {
  const source = fs.readFileSync(projectsFile, 'utf-8')
  return JSON.parse(source) as ProjectsData
}