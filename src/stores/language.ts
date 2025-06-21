import { writable } from 'svelte/store'

export type Language = 'en' | 'es'

// Detectar idioma del navegador o usar inglés por defecto
const getInitialLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('language') as Language
    if (saved && (saved === 'en' || saved === 'es')) {
      return saved
    }
    
    const browserLang = navigator.language.toLowerCase()
    return browserLang.startsWith('es') ? 'es' : 'en'
  }
  return 'en'
}

export const currentLanguage = writable<Language>(getInitialLanguage())

// Guardar en localStorage cuando cambie el idioma
currentLanguage.subscribe((lang) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', lang)
  }
})

export const toggleLanguage = () => {
  currentLanguage.update(lang => lang === 'en' ? 'es' : 'en')
}