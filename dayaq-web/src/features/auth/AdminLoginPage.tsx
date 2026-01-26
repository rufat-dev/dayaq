import { type FormEvent, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '@app/auth/AuthProvider'
import { useI18n } from '@app/i18n/I18nProvider'
import { routes } from '@app/routes'
import { LanguageSwitcher, ThemeToggle } from '@components/HeaderControls'
import { login as loginRequest } from '@services/api/authApi'
import { ApiError } from '@services/api/httpClient'
import { getResultErrorMessage } from '@utils/apiErrors'
import { getDeviceInfo } from '@utils/deviceInfo'
import { getRoleFromToken } from '@utils/jwt'
import './AdminLoginPage.css'

function AdminLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login: setSession, isAuthenticated, role } = useAuth()
  const { t } = useI18n()
  const commonCopy = t.common
  const copy = t.adminLogin
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    if (isAuthenticated && role === 'admin') {
      const nextPath =
        typeof location.state === 'object' && location.state && 'from' in location.state
          ? String(location.state.from)
          : routes.adminPanel
      navigate(nextPath, { replace: true })
    }
  }, [isAuthenticated, location.state, navigate, role])

  const handleBackHome = () => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      navigate(routes.home)
      return
    }

    setIsExiting(true)
    setIsVisible(false)
    window.setTimeout(() => navigate(routes.home), 200)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('idle')
    setErrorMessage(null)
    try {
      const response = await loginRequest({
        Username: username,
        Password: password,
        DeviceInfo: getDeviceInfo(),
      })
      const role = getRoleFromToken(response.accessToken)
      setSession({ token: response.accessToken, role: role ?? 'admin' })
      navigate(routes.adminPanel)
    } catch (error) {
      setStatus('error')
      if (error instanceof ApiError) {
        const apiMessage = getResultErrorMessage(error.data)
        if (apiMessage) {
          setErrorMessage(apiMessage)
          return
        }
      }
      setErrorMessage('Unable to sign in. Please try again.')
    }
  }

  return (
    <div
      className={`page admin-login-page ${isVisible ? 'admin-login-page--visible' : ''} ${
        isExiting ? 'admin-login-page--exit' : ''
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
          <div className="card lifted admin-login-card">
            <h1>{copy.heading}</h1>
            <p className="lede admin-login-lede">{copy.lede}</p>
            <form className="stack admin-login-form" onSubmit={handleSubmit}>
              <label className="field">
                <span>{copy.form.username}</span>
                <input
                  type="text"
                  autoComplete="username"
                  placeholder={copy.form.usernamePlaceholder}
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </label>
              <label className="field">
                <span>{copy.form.password}</span>
                <input
                  type="password"
                  autoComplete="current-password"
                  placeholder={copy.form.passwordPlaceholder}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>
              <button className="btn primary full" type="submit">
                {copy.form.submit}
              </button>
              {status === 'error' ? (
                <p className="form-status form-status--error" role="alert">
                  {errorMessage}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminLoginPage
