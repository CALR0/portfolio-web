import { Github, Linkedin, Mail } from 'lucide-svelte'
import type { SocialLink } from '../types'

export const socialLinks: SocialLink[] = [
  { 
    icon: Github, 
    href: 'https://github.com/CALR0', 
    label: 'GitHub',
    color: 'hover:text-white',
    bgColor: 'group-hover:bg-white/10',
    description: 'Check out my code'
  },
  { 
    icon: Linkedin, 
    href: 'https://www.linkedin.com/in/carlos-lizarazo-bb3036367/', 
    label: 'LinkedIn',
    color: 'hover:text-blue-400',
    bgColor: 'group-hover:bg-blue-500/10',
    description: 'Connect with me'
  },
  { 
    icon: 'X',
    href: 'https://x.com/cxrlos_lzr', 
    label: 'X',
    color: 'hover:text-gray-100',
    bgColor: 'group-hover:bg-gray-500/10',
    description: 'Follow me'
  },
  { 
    icon: Mail, 
    href: 'mailto:carlosandr3zlizarazo@gmail.com', 
    label: 'Email',
    color: 'hover:text-blue-400',
    bgColor: 'group-hover:bg-blue-500/10',
    description: 'Send me a message'
  }
]