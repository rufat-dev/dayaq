import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useI18n } from '@app/i18n/I18nProvider'
import { routes } from '@app/routes'
import { LanguageSwitcher, ThemeToggle } from '@components/HeaderControls'
import type { UserRole } from '@types/auth'
import './ForbiddenPage.css'

type ForbiddenLocationState = {
  requiredRoles?: UserRole[]
}

const rolePriority: UserRole[] = ['admin', 'organization', 'professional', 'client']
const roleLoginRoutes: Record<UserRole, string> = {
  admin: routes.adminLogin,
  organization: routes.login,
  professional: routes.login,
  client: routes.login,
}

const isUserRole = (value: unknown): value is UserRole =>
  value === 'admin' || value === 'organization' || value === 'professional' || value === 'client'

function ForbiddenPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useI18n()
  const commonCopy = t.common
  const copy = t.forbidden
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  const requiredRoles = useMemo(() => {
    if (!location.state || typeof location.state !== 'object') {
      return []
    }

    const rawRoles = (location.state as ForbiddenLocationState).requiredRoles
    if (!Array.isArray(rawRoles)) {
      return []
    }

    return rawRoles.filter(isUserRole)
  }, [location.state])

  const primaryRole = useMemo(
    () => rolePriority.find((role) => requiredRoles.includes(role)),
    [requiredRoles],
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

  const handleLogin = () => {
    const target = primaryRole ? roleLoginRoutes[primaryRole] : routes.login
    navigateWithTransition(target)
  }

  const ctaLabel = primaryRole ? copy.ctaByRole[primaryRole] : copy.ctaByRole.default

  return (
    <div
      className={`page forbidden-page ${isVisible ? 'forbidden-page--visible' : ''} ${
        isExiting ? 'forbidden-page--exit' : ''
      }`}
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
          <div className="card lifted forbidden-card">
            <p className="pill pill-ghost">403</p>
            <h1>{copy.heading}</h1>
            <p className="lede forbidden-lede">{copy.lede}</p>
            <div className="stack forbidden-actions">
              <button className="btn primary full" type="button" onClick={handleLogin}>
                {ctaLabel}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ForbiddenPage

