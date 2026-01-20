import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useI18n } from '@app/i18n/I18nProvider'
import { type Locale } from '@app/i18n/translations'
import moonIcon from '@assets/moon.svg'
import sunIcon from '@assets/sun.svg'

const LANGUAGE_OPTIONS: ReadonlyArray<{ locale: Locale; label: string; flag: string }> = [
  { locale: 'en', label: 'English', flag: '🇺🇸' },
  { locale: 'az', label: 'Azərbaycan', flag: '🇦🇿' },
  { locale: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { locale: 'ru', label: 'Русский', flag: '🇷🇺' },
]

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const switcherRef = useRef<HTMLDivElement | null>(null)

  const currentLanguage = useMemo(
    () => LANGUAGE_OPTIONS.find((option) => option.locale === locale) ?? LANGUAGE_OPTIONS[0],
    [locale],
  )

  const startClosing = useCallback(() => {
    setIsOpen(false)
    setIsClosing(true)
  }, [])

  const handleLanguageToggle = () => {
    if (isOpen) {
      startClosing()
      return
    }

    setIsClosing(false)
    setIsOpen(true)
  }

  const handleLanguageSelect = (nextLocale: Locale) => {
    if (nextLocale !== locale) {
      setLocale(nextLocale)
    }
    startClosing()
  }

  useEffect(() => {
    if (!isClosing) return undefined

    const timeoutId = window.setTimeout(() => setIsClosing(false), 180)
    return () => window.clearTimeout(timeoutId)
  }, [isClosing])

  useEffect(() => {
    if (!isOpen) return undefined

    const handleClickOutside = (event: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
        startClosing()
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        startClosing()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, startClosing])

  return (
    <div className="language-switcher" ref={switcherRef}>
      <button
        type="button"
        className="btn ghost language-switcher__trigger"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Change language"
        onClick={handleLanguageToggle}
      >
        <span aria-hidden className="language-switcher__flag" style={{ marginRight: 0 }}>
          {currentLanguage.flag}
        </span>
      </button>
      {(isOpen || isClosing) && (
        <div
          role="menu"
          className={`language-switcher__menu ${isClosing ? 'language-switcher__menu--closing' : ''}`}
        >
          {LANGUAGE_OPTIONS.map((option) => (
            <button
              key={option.locale}
              type="button"
              role="menuitem"
              className={`language-switcher__option ${
                option.locale === locale ? 'language-switcher__option--active' : ''
              }`}
              aria-current={option.locale === locale ? 'true' : undefined}
              onClick={() => handleLanguageSelect(option.locale)}
            >
              <span aria-hidden className="language-switcher__flag">
                {option.flag}
              </span>
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    ((): 'light' | 'dark' => {
      const dataset = typeof document !== 'undefined' ? document.documentElement.dataset.theme : undefined
      return dataset === 'dark' ? 'dark' : 'light'
    })(),
  )

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.dataset.theme = theme
  }, [theme])

  const iconSrc = theme === 'light' ? moonIcon : sunIcon

  const handleToggle = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className={`btn ghost theme-toggle ${theme === 'dark' ? 'theme-toggle--dark' : ''}`}
      onClick={handleToggle}
    >
      <img src={iconSrc} alt="" aria-hidden="true" />
    </button>
  )
}
