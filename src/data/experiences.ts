import type { Experience } from '../types'

export const experiences: Experience[] = [
  {
    id: 'melropDesktop',
    title: 'Software Developer',
    company: 'Melrop Store',
    location: 'Santa Marta, CO',
    period: '2023 - 2024',
    description: 'Designed and developed a Java-based desktop application to manage product inventory efficiently.',
    achievements: [
      'Implemented CRUD operations for products, categories, and inventory.',
      'Integrated local database storage using PostgreSQL.',
      'Designed a modular architecture to separate UI, logic, and data layers, improving maintainability.'
    ],
    technologies: ['Java', 'JavaFX', 'PostgreSQL', 'Launch4j'],
    current: false
  },
  {
    id: 'melropWeb',
    title: 'Web Developer',
    company: 'Melrop Store',
    location: 'Santa Marta, CO',
    period: '2025 - Present',
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