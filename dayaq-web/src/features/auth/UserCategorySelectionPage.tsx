import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useI18n } from '@app/i18n/I18nProvider'
import { routes } from '@app/routes'
import { LanguageSwitcher, ThemeToggle } from '@components/HeaderControls'
import '@features/marketing/LandingPage.css'
import './UserCategorySelectionPage.css'

type UserCategory = 'organization' | 'professional' | 'client'

function UserCategorySelectionPage() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const commonCopy = t.common
  const copy = t.userCategorySelection
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  const categories = useMemo(
    () =>
      [
        { id: 'organization', label: copy.categories.organization },
        { id: 'professional', label: copy.categories.professional },
        { id: 'client', label: copy.categories.client },
      ] satisfies Array<{ id: UserCategory; label: string }>,
    [copy.categories.client, copy.categories.organization, copy.categories.professional],
  )

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const navigateWithTransition = (target: string) => {
    if (prefersReducedMotion) {
      navigate(target)
      return
    }

    setIsExiting(true)
    setIsVisible(false)
    window.setTimeout(() => navigate(target), 200)
  }

  const handleBackHome = () => {
    navigateWithTransition(routes.home)
  }

  const handleSelectCategory = (category: UserCategory) => {
    if (category === 'client') {
      navigateWithTransition(routes.register)
      return
    }

    const params = new URLSearchParams({ category })
    navigateWithTransition(`${routes.register}?${params.toString()}`)
  }

  return (
    <div
      className={`page user-category-selection-page ${
        isVisible ? 'user-category-selection-page--visible' : ''
      } ${isExiting ? 'user-category-selection-page--exit' : ''}`}
    >
      <header className="site-header">
        <div className="container header-content">
          <div className="brand">{commonCopy.brand}</div>
          <div className="header-actions">
            <button className="btn ghost" type="button" onClick={handleBackHome}>
              {copy.backHome}
            </button>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="section">
        <div className="container" style={{ maxWidth: '520px', margin: '0 auto' }}>
          <div className="card lifted user-category-selection-card">
            <h1>{copy.heading}</h1>
            <p className="lede user-category-selection-lede">{copy.lede}</p>
            <div className="stack user-category-selection-actions">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="btn secondary full"
                  type="button"
                  onClick={() => handleSelectCategory(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default UserCategorySelectionPage
