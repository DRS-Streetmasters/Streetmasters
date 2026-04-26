import { createI18n } from 'vue-i18n'
import { messages } from './messages'

const DEFAULT_LOCALE = 'nl'
const STORAGE_KEY = 'streetmasters-locale'

const resolveInitialLocale = () => {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE
  }

  const savedLocale = window.localStorage.getItem(STORAGE_KEY)
  if (savedLocale && ['nl', 'en'].includes(savedLocale)) {
    return savedLocale
  }

  const browserLocale = window.navigator.language?.toLowerCase() ?? ''
  if (browserLocale.startsWith('en')) {
    return 'en'
  }

  return DEFAULT_LOCALE
}

const i18n = createI18n({
  legacy: false,
  locale: resolveInitialLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages,
})

export const syncLocale = (locale) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, locale)
  }

  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale
  }
}

syncLocale(i18n.global.locale.value)

export default i18n
