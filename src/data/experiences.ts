import type { Experience } from '../types'

export const experiences: Experience[] = [
  {
    id: 'systemsEngineering',
    title: 'Systems Engineering Student',
    company: 'Universidad del Magdalena',
    location: 'Santa Marta, CO',
    period: 'systemsEngineering.period',
    description: 'Currently pursuing a Bachelor\'s degree in Systems Engineering with a focus on software development, algorithms, and modern web technologies.',
    achievements: [
      'Developing strong foundations in software engineering principles and best practices.',
      'Learning advanced programming concepts, data structures, and algorithms.',
      'Gaining expertise in database design, system architecture, and project management.',
      'Participating in academic projects involving full-stack web development.'
    ],
    technologies: ['Java', 'Python', 'JavaScript', 'SQL', 'React', 'Spring Boot'],
    current: true
  },
  {
    id: 'melropWeb',
    title: 'Web Developer',
    company: 'Melrop Store',
    location: 'Santa Marta, CO',
    period: 'melropWeb.period',
    description: 'Design, development and maintenance of informative web app store, with products, filter categories, and contact section.',
    achievements: [
      'Developed a fully responsive web application using React, TypeScript, and Vite.',
      'Implemented product listings with category-based filtering for improved experience',
      'Designed a clean, modern UI with intuitive navigation.'
    ],
    technologies: ['React', 'Vite', 'Tailwind', 'EmailJS', 'Framer Motion'],
    website: 'https://melropstore.netlify.app/',
    current: true
  }
]