export const NAVIGATION_SECTIONS = [
  'home', 
  'about', 
  'experience', 
  'skills', 
  'projects', 
  'contact'
] as const

export type NavigationSection = typeof NAVIGATION_SECTIONS[number]

export const scrollToSection = (sectionId: string): void => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

export const updateActiveSection = (
  sections: readonly string[],
  callback: (activeSection: string) => void
): void => {
  const scrollPosition = window.scrollY + 100
  
  for (const sectionId of sections) {
    const element = document.getElementById(sectionId)
    if (element) {
      const rect = element.getBoundingClientRect()
      const elementTop = rect.top + window.scrollY
      const elementBottom = elementTop + rect.height
      
      if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
        callback(sectionId)
        break
      }
    }
  }
}