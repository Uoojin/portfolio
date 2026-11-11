import { gallery } from './gallery.js'

const projectLinks = {
  ProjectName: 'https://mono-log.onrender.com',
  'project-02': 'https://notomato.onrender.com',
}

export const projects = [
  ...gallery.map(project => ({ ...project, url: projectLinks[project.id] })),
  { id: 'blah-blah', name: 'BLAH BLAH BLAH' },
  { id: 'poster-04', name: 'Poster 04' },
]

export const projectPath = id => `${import.meta.env.BASE_URL}projects/${id}`
export const findProject = pathname => projects.find(project => projectPath(project.id) === pathname.replace(/\/$/, ''))
