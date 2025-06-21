export interface Experience {
  id: string
  title: string
  company: string
  location: string
  period: string
  description: string
  achievements: string[]
  technologies: string[]
  website?: string
  current: boolean
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  github: string
  demo: string
}

export interface Skill {
  name: string
  icon: string
  color: string
  level: number
}

export interface SocialLink {
  icon: any
  href: string
  label: string
  color: string
  bgColor: string
  description: string
}