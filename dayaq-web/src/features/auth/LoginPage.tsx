import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { useAuth } from '@app/auth/AuthProvider'
import { useI18n } from '@app/i18n/I18nProvider'
import { routes } from '@app/routes'
import { login } from '@services/api/authApi'
import { ApiError } from '@services/api/httpClient'
import { getResultErrorMessage } from '@utils/apiErrors'
import { getDeviceInfo } from '@utils/deviceInfo'
import { getRoleFromToken } from '@utils/jwt'
import './LoginPage.css'

type LoginFormValues = {
  email: string
  password: string
  rememberMe: boolean
}

function LoginPage() {
  const navigate = useNavigate()
  const { login: setSession } = useAuth()
  const { t } = useI18n()
  const copy = t.login
  const common = t.common
  const loginSchema = z.object({
    email: z.email(copy.form.emailError),
    password: z.string().min(8, copy.form.passwordError),
    rememberMe: z.boolean(),
  })

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    setStatus('idle')
    setErrorMessage(null)
    try {
      const response = await login({
        Username: values.email,
        Password: values.password,
        DeviceInfo: getDeviceInfo(),
      })
      const role = getRoleFromToken(response.accessToken)
      setSession({ token: response.accessToken, role: role ?? 'client' })
      setStatus('success')
      reset({
        email: '',
        password: '',
        rememberMe: false,
      })
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
  })

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

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

  return (
    <div
      className={`page login-page ${isVisible ? 'login-page--visible' : ''} ${
        isExiting ? 'login-page--exit' : ''
      }`}
    >
      <header className="site-header">
        <div className="container header-content">
          <div className="brand">{common.brand}</div>
          <div className="header-actions">
            <button className="btn ghost" type="button" onClick={handleBackHome}>
              {copy.backHome}
            </button>
          </div>
        </div>
      </header>

      <main className="section">
        <div className="container" style={{ maxWidth: '520px', margin: '0 auto' }}>
          <div className="card lifted">
            <p className="pill pill-ghost">{copy.existingMembers}</p>
            <h1>{copy.heading}</h1>
            <p className="lede login-lede">{copy.lede}</p>

            <form className="stack login-form" onSubmit={onSubmit} noValidate>
              <label className="field">
                <span>{copy.form.email}</span>
                <input
                  type="email"
                  {...register('email')}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  autoComplete="email"
                  placeholder="you@example.com"
                />
                {errors.email ? (
                  <span className="field-error" role="alert">
                    {errors.email.message}
                  </span>
                ) : null}
              </label>

              <label className="field">
                <span>{copy.form.password}</span>
                <input
                  type="password"
                  {...register('password')}
                  aria-invalid={errors.password ? 'true' : 'false'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                />
                {errors.password ? (
                  <span className="field-error" role="alert">
                    {errors.password.message}
                  </span>
                ) : null}
              </label>

              <label className="field" style={{ alignItems: 'start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" {...register('rememberMe')} />
                  <span>{copy.form.rememberMe}</span>
                </div>
                {errors.rememberMe ? (
                  <span className="field-error" role="alert">
                    {errors.rememberMe.message}
                  </span>
                ) : null}
              </label>

              <button className="btn primary full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? copy.form.submitting : copy.form.submit}
              </button>
              <p className="fine-print">
                {copy.form.disclaimer}
              </p>
              {status === 'success' ? (
                <p className="form-status" role="status" aria-live="polite">
                  {copy.form.success}
                </p>
              ) : null}
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

export default LoginPage

