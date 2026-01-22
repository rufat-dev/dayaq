import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { useI18n } from '@app/i18n/I18nProvider'
import { routes } from '@app/routes'
import { LanguageSwitcher, ThemeToggle } from '@components/HeaderControls'
import { register as registerUser } from '@services/api/authApi'
import './RegistrationPage.css'

type RegistrationFormValues = {
  name: string
  surname: string
  fatherName: string
  birthDate: string
  email: string
  phoneNumber: string
  password: string
}

function RegistrationPage() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const commonCopy = t.common
  const copy = t.registration
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const registrationSchema = z.object({
    name: z.string().min(1, copy.form.error),
    surname: z.string().min(1, copy.form.error),
    fatherName: z.string().min(1, copy.form.error),
    birthDate: z.string().min(1, copy.form.error),
    email: z.email(copy.form.error),
    phoneNumber: z.string().min(1, copy.form.error),
    password: z.string().min(8, copy.form.error),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: '',
      surname: '',
      fatherName: '',
      birthDate: '',
      email: '',
      phoneNumber: '',
      password: '',
    },
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

  const onSubmit = handleSubmit(async (values) => {
    setStatus('idle')
    try {
      await registerUser({
        Name: values.name,
        Surname: values.surname,
        FatherName: values.fatherName,
        BirthDate: new Date(values.birthDate).toISOString(),
        Email: values.email,
        PhoneNumber: values.phoneNumber,
        Password: values.password,
      })
      setStatus('success')
      reset()
    } catch (error) {
      setStatus('error')
    }
  })

  return (
    <div
      className={`page registration-page ${isVisible ? 'registration-page--visible' : ''} ${
        isExiting ? 'registration-page--exit' : ''
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
          <div className="card lifted registration-card">
            <h1>{copy.heading}</h1>
            <p className="lede registration-lede">{copy.lede}</p>
            <form className="stack registration-form" onSubmit={onSubmit} noValidate>
              <label className="field">
                <span>{copy.form.name}</span>
                <input type="text" {...register('name')} />
                {errors.name ? (
                  <span className="field-error" role="alert">
                    {errors.name.message}
                  </span>
                ) : null}
              </label>
              <label className="field">
                <span>{copy.form.surname}</span>
                <input type="text" {...register('surname')} />
                {errors.surname ? (
                  <span className="field-error" role="alert">
                    {errors.surname.message}
                  </span>
                ) : null}
              </label>
              <label className="field">
                <span>{copy.form.fatherName}</span>
                <input type="text" {...register('fatherName')} />
                {errors.fatherName ? (
                  <span className="field-error" role="alert">
                    {errors.fatherName.message}
                  </span>
                ) : null}
              </label>
              <label className="field">
                <span>{copy.form.birthDate}</span>
                <input type="date" {...register('birthDate')} />
                {errors.birthDate ? (
                  <span className="field-error" role="alert">
                    {errors.birthDate.message}
                  </span>
                ) : null}
              </label>
              <label className="field">
                <span>{copy.form.email}</span>
                <input type="email" {...register('email')} autoComplete="email" />
                {errors.email ? (
                  <span className="field-error" role="alert">
                    {errors.email.message}
                  </span>
                ) : null}
              </label>
              <label className="field">
                <span>{copy.form.phoneNumber}</span>
                <input type="tel" {...register('phoneNumber')} autoComplete="tel" />
                {errors.phoneNumber ? (
                  <span className="field-error" role="alert">
                    {errors.phoneNumber.message}
                  </span>
                ) : null}
              </label>
              <label className="field">
                <span>{copy.form.password}</span>
                <input type="password" {...register('password')} autoComplete="new-password" />
                {errors.password ? (
                  <span className="field-error" role="alert">
                    {errors.password.message}
                  </span>
                ) : null}
              </label>
              <button className="btn primary full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? copy.form.submitting : copy.form.submit}
              </button>
              {status === 'success' ? (
                <p className="form-status" role="status" aria-live="polite">
                  {copy.form.success}
                </p>
              ) : null}
              {status === 'error' ? (
                <p className="form-status form-status--error" role="alert">
                  {copy.form.error}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default RegistrationPage
