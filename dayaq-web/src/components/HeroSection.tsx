import { useI18n } from '@app/i18n/I18nProvider'
import './HeroSection.css'

export function HeroSection() {
  const { t } = useI18n()
  const { hero } = t.landing

  return (
    <div className="hero-card" id="coverage">
      <h2>{hero.form.title}</h2>
      <p className="muted">{hero.form.subtitle}</p>
      <form className="stack" aria-label="Quick intake (example)">
        <label className="field">
          <span>{hero.form.fullName}</span>
          <input type="text" defaultValue={hero.form.seededFullName} />
        </label>
        <label className="field">
          <span>{hero.form.phoneNumber}</span>
          <input type="tel" defaultValue={hero.form.seededPhoneNumber} />
        </label>
        <label className="field">
          <span>{hero.form.email}</span>
          <input type="email" defaultValue={hero.form.seededEmail} />
        </label>
        <label className="field">
          <span>{hero.form.finCode}</span>
          <input
            type="text"
            inputMode="text"
            maxLength={6}
            pattern="[A-Za-z0-9]{6}"
            title="6 letters or numbers"
            defaultValue={hero.form.seededFinCode}
          />
          <p className="fine-print">{hero.form.finHint}</p>
        </label>
        <button type="button" className="btn primary full">
          {hero.form.submit}
        </button>
        <p className="fine-print">{hero.form.disclaimer}</p>
      </form>
    </div>
  )
}
