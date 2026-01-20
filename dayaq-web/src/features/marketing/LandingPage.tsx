import type { CSSProperties } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { routes } from '@app/routes'
import { useI18n } from '@app/i18n/I18nProvider'
import { HeroSection } from '@components/HeroSection'
import { LanguageSwitcher, ThemeToggle } from '@components/HeaderControls'
import './LandingPage.css'

export function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useI18n()
  const { hero } = t.landing

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const id = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className={`page landing-page ${isVisible ? 'landing-page--visible' : ''}`}>
      <Header />
      <main>
        <section className="section hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="pill">{hero.pill}</p>
              <h1>
                {hero.heading}
                <span className="accent">{hero.accent}</span>
              </h1>
              <p className="lede">{hero.lede}</p>
              <div className="hero-cta">
                <button className="btn primary">{hero.ctaPrimary}</button>
                <button className="btn secondary">{hero.ctaSecondary}</button>
              </div>
              <div className="hero-highlight">{hero.highlight}</div>
            </div>
            <HeroSection />
          </div>
        </section>
        <Pillars />
        <Coverage />
        <Services />
        <Steps />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const landingCopy = t.landing
  const commonCopy = t.common
  const [isLoginAnimating, setIsLoginAnimating] = useState(false)
  const loginButtonRef = useRef<HTMLButtonElement | null>(null)
  const registerButtonRef = useRef<HTMLButtonElement | null>(null)
  const [overlayOrigin, setOverlayOrigin] = useState<{ x: number; y: number } | null>(null)

  const handleNavigation = (path: string, triggerRef?: { current: HTMLButtonElement | null }) => {
    if (isLoginAnimating) return
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      navigate(path)
      return
    }

    if (triggerRef?.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const nextOrigin = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      }
      setOverlayOrigin(nextOrigin)
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty('--login-origin-x', `${nextOrigin.x}px`)
        document.documentElement.style.setProperty('--login-origin-y', `${nextOrigin.y}px`)
      }
    } else {
      setOverlayOrigin(null)
    }

    setIsLoginAnimating(true)
    window.setTimeout(() => navigate(path), 200)
  }

  const overlayStyle = useMemo<CSSProperties | undefined>(() => {
    if (!overlayOrigin) return undefined
    return {
      ['--login-origin-x' as const]: `${overlayOrigin.x}px`,
      ['--login-origin-y' as const]: `${overlayOrigin.y}px`,
    } as CSSProperties
  }, [overlayOrigin])

  return (
    <>
      <header className="site-header">
        <div className="container header-content">
          <div className="brand">{commonCopy.brand}</div>
          <nav aria-label="Primary">
            <ul className="nav">
              {[
                { label: landingCopy.nav.therapy, href: '#therapy' },
                { label: landingCopy.nav.medications, href: '#medications' },
                { label: landingCopy.nav.treatments, href: '#treatments' },
                { label: landingCopy.nav.coverage, href: '#coverage' },
                { label: landingCopy.nav.clinicians, href: '#clinicians' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header-actions">
            <button
              ref={loginButtonRef}
              className="btn ghost"
              onClick={() => handleNavigation(routes.login, loginButtonRef)}
            >
              {landingCopy.header.login}
            </button>
            <button
              ref={registerButtonRef}
              className="btn primary"
              onClick={() => handleNavigation(routes.userCategorySelection, registerButtonRef)}
            >
              {landingCopy.header.getStarted}
            </button>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <div
        className={`nav-overlay ${isLoginAnimating ? 'nav-overlay--active' : ''}`}
        style={overlayStyle}
        aria-hidden
      />
    </>
  )
}

function Pillars() {
  const { t } = useI18n()
  const { pillars, headings } = t.landing
  return (
    <section className="section pillars">
      <div className="container">
        <h2>{headings.pillars}</h2>
        <div className="grid three">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="card subtle">
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Coverage() {
  const { t } = useI18n()
  const { coverage, headings } = t.landing
  return (
    <section className="section coverage" id="coverage-details">
      <div className="container coverage-grid">
        <div>
          <p className="pill pill-ghost">{coverage.pill}</p>
          <h2>{coverage.heading}</h2>
          <p className="lede">{coverage.lede}</p>
          <div className="insurers">
            {coverage.plans.map((plan) => (
              <span key={plan} className="insurer">
                {plan}
              </span>
            ))}
          </div>
        </div>
        <div className="card lifted">
          <h3>{headings.coverageSnapshot}</h3>
          <ul className="checklist">
            {coverage.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <button className="btn secondary full">{coverage.verify}</button>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const { t } = useI18n()
  const { services, headings } = t.landing
  return (
    <section className="section services" id="services">
      <div className="container">
        <h2>{headings.servicesLead}</h2>
        <div className="grid two">
          {services.map((service) => (
            <article key={service.title} className="card outlined">
              <div className="card-header">
                <h3>{service.title}</h3>
              </div>
              <p>{service.description}</p>
              <button className="btn ghost">{service.cta}</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Steps() {
  const { t } = useI18n()
  const { steps, headings } = t.landing
  return (
    <section className="section steps" id="how-it-works">
      <div className="container">
        <h2>{headings.steps}</h2>
        <div className="grid three">
          {steps.map((step, index) => (
            <article key={step.title} className="card subtle">
              <div className="step-index">0{index + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const { t } = useI18n()
  const { testimonials, headings } = t.landing
  return (
    <section className="section testimonials" id="stories">
      <div className="container">
        <h2>{headings.testimonials}</h2>
        <div className="grid three">
          {testimonials.map((item) => (
            <blockquote key={item.name} className="card lifted quote">
              <p>{item.quote}</p>
              <footer>— {item.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

function Faq() {
  const { t } = useI18n()
  const { faqs, headings } = t.landing
  return (
    <section className="section faq" id="faq">
      <div className="container">
        <h2>{headings.faq}</h2>
        <div className="faq-list">
          {faqs.map((item) => (
            <details key={item.question} className="faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const { t } = useI18n()
  const { footer } = t.landing
  const { common } = t
  return (
    <footer className="site-footer" id="clinicians">
      <div className="container footer-grid">
        <div>
          <div className="brand">{common.brand}</div>
          <p className="muted">{footer.body}</p>
          <p className="muted">{footer.emergency}</p>
        </div>
        <div>
          <h4>{footer.exploreHeading}</h4>
          <ul>
            {footer.explore.map((link) => (
              <li key={link} className="site-footer-link">
                <a href="#services">{link}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>{footer.clinicians.heading}</h4>
          <p className="muted">{footer.clinicians.body}</p>
          <button className="btn ghost">{footer.clinicians.cta}</button>
        </div>
      </div>
      <div className="container footer-bottom">
        <p className="muted">{footer.copyright(new Date().getFullYear())}</p>
        <div className="footer-links">
          <a href="#privacy">{footer.privacy}</a>
          <a href="#terms">{footer.terms}</a>
          <a href="#accessibility">{footer.accessibility}</a>
        </div>
      </div>
    </footer>
  )
}

export default LandingPage

