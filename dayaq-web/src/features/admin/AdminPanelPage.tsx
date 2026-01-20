import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@app/auth/AuthProvider'
import { useI18n } from '@app/i18n/I18nProvider'
import { routes } from '@app/routes'
import { LanguageSwitcher, ThemeToggle } from '@components/HeaderControls'
import './AdminPanelPage.css'

function AdminPanelPage() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { t } = useI18n()
  const commonCopy = t.common
  const copy = t.adminPanel
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const handleSignOut = () => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    logout()

    if (prefersReducedMotion) {
      navigate(routes.adminLogin)
      return
    }

    setIsExiting(true)
    setIsVisible(false)
    window.setTimeout(() => navigate(routes.adminLogin), 200)
  }

  return (
    <div
      className={`page admin-panel-page ${isVisible ? 'admin-panel-page--visible' : ''} ${
        isExiting ? 'admin-panel-page--exit' : ''
      }`}
    >
      <header className="site-header">
        <div className="container header-content">
          <div className="brand">{commonCopy.brand}</div>
          <div className="header-actions">
            <button className="btn ghost" type="button" onClick={handleSignOut}>
              {copy.signOut}
            </button>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="section">
        <div className="container" style={{ maxWidth: '520px', margin: '0 auto' }}>
          <div className="card lifted admin-panel-card">
            <h1>{copy.heading}</h1>
            <p className="lede">{copy.lede}</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminPanelPage
