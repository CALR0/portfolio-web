import { derived } from 'svelte/store'
import { currentLanguage } from '../stores/language'
import { translations } from './translations'

export const t = derived(
  currentLanguage,
  ($currentLanguage) => {
    return (key: string) => {
      const keys = key.split('.')
      let value: any = translations[$currentLanguage]
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k]
        } else {
          // Fallback to English if key not found
          value = translations.en
          for (const fallbackKey of keys) {
            if (value && typeof value === 'object' && fallbackKey in value) {
              value = value[fallbackKey]
            } else {
              return key // Return key if not found
            }
          }
          break
        }
      }
      
      return value || key
    }
  }
)