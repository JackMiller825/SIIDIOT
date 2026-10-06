import { hero } from '../copy'
import { images } from '../lib/images'
import { ContractAddress, SmartImage } from './ui'

export function Hero() {
  return (
    <section className="hero" id="top" tabIndex={-1} aria-labelledby="hero-title">
      <SmartImage image={images.lab} alt="" eager fit="cover" className="hero-bg" />
      <div className="wrap hero-grid">
        <article className="report hero-report">
          <span className="tape tape-a" aria-hidden="true" />
          <span className="tape tape-b" aria-hidden="true" />
          <div className="hazard" aria-hidden="true" />
          <div className="hero-brand-row">
            <p className="eyebrow">{hero.eyebrow}</p>
            <SmartImage image={images.logo} alt="Superintelligent Idiot logo" eager className="hero-logo" />
          </div>
          <h1 id="hero-title">{hero.headline}</h1>
          <p className="punch">{hero.punchline}</p>
          <p>{hero.description}</p>
          <p className="tagline">{hero.tagline}</p>
          <div className="hero-actions">
            <a className="btn btn-ink" href="#incident">
              Enter the lab
            </a>
          </div>
          <ContractAddress tone="paper" />
          <ul className="comedy-meta">
            {hero.fields.map((field) => (
              <li key={field.label}>
                <span>{field.label}:</span>
                <span>{field.value}</span>
              </li>
            ))}
          </ul>
          <p className="fine">{hero.fieldsNote}</p>
          <p className="stamp">Fictional</p>
        </article>
        <div className="hero-mascot-wrap">
          <SmartImage
            image={images.hero}
            alt="Superintelligent Idiot, a white and gold robot with a glowing orange brain, biting a keyboard."
            eager
            className="hero-mascot"
          />
        </div>
      </div>
    </section>
  )
}
