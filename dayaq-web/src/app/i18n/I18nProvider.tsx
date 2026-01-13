import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

import { translations, type AppTranslations, type Locale } from './translations'

type I18nContextValue = {
  locale: Locale
  t: AppTranslations
  setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

type Props = {
  children: ReactNode
  defaultLocale?: Locale
}

export function I18nProvider({ children, defaultLocale = 'en' }: Props) {
  const [locale, setLocale] = useState<Locale>(defaultLocale)

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      t: translations[locale],
      setLocale,
    }),
    [locale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return ctx
}


