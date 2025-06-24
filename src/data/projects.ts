import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'blockloom',
    title: 'Blockloom',
    description: 'A web tool for previewing and generating component variants (HTML+CSS) with another features.',
    image: 'https://i.imgur.com/bvb0mV5.png',
    technologies: ['Svelte', 'Vite', 'TypeScript'],
    github: 'https://github.com/CALR0/Blockloom-app',
    demo: 'https://github.com/CALR0/Blockloom-app'
  },
  {
    id: 'melropWeb',
    title: 'Melrop Store Web App',
    description: 'An informative website for Melrop Store with a modern and interactive interface, located in Santa Marta.',
    image: 'https://i.imgur.com/C22Li5c.png',
    technologies: ['React', 'Tailwind', 'Framer Motion', 'Vite', 'Typescript'],
    github: 'https://github.com/CALR0/melrop-store-webapp',
    demo: 'https://melropstore.netlify.app/'
  },
  {
    id: 'linkedMagFront',
    title: 'LinkedMag Front-end',
    description: 'LinkedMag is a platform for managing internships for students at the Universidad del Magdalena.',
    image: 'https://i.imgur.com/7GZQh5a.png',
    technologies: ['Angular', 'PrimeNG', 'PrimeIcons', 'Typescript'],
    github: 'https://github.com/CALR0/linked-mag-front',
    demo: 'https://linkedmag.netlify.app/'
  },
  {
    id: 'linkedMagBack',
    title: 'LinkedMag Back-end',
    description: 'LinkedMag is a platform for managing student internships at the Universidad del Magdalena, this project is its API.',
    image: 'https://miro.medium.com/v2/resize:fit:1400/0*-VVwL0nee9RgEhJB.png',
    technologies: ['Node.js', 'Express.js', 'Sequelize', 'PostgreSQL'],
    github: 'https://github.com/CALR0/linked-mag-backend',
    demo: 'https://github.com/CALR0/linked-mag-backend'
  },
  {
    id: 'rentcarFront',
    title: 'Rentcar Front-end',
    description: 'Rentcar is a web platform that offers users a vehicle search and rental experience.',
    image: 'https://i.imgur.com/NkzHvpR.png',
    technologies: ['React', 'React Router', 'Vite', 'Javascript'],
    github: 'https://github.com/CALR0/rent-car-front',
    demo: 'https://rentcaronlineapp.netlify.app/'
  },
  {
    id: 'rentcarBack',
    title: 'Rentcar Back-end',
    description: 'API for the Rentcar system, a comprehensive platform for managing vehicle rentals efficiently and securely.',
    image: 'https://blog.danielpadua.dev/assets/img/posts/java-spring-boot-intellij-idea/featured.png',
    technologies: ['Spring Boot', 'Gradle', 'Java', 'PostgreSQL'],
    github: 'https://github.com/CALR0/rent-car-backend',
    demo: 'https://github.com/CALR0/rent-car-backend'
  }
]